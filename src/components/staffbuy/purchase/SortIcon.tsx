import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import { FaSortUp, FaSortDown } from "react-icons/fa";

interface SortIconProps<T> {
  dataList: T[];
  dataField: keyof T;
  setFunction: Dispatch<SetStateAction<T[]>> | ((data: T[]) => void);
}

type Direction = "up" | "down" | "";

export default function SortIcon<T>({
  dataList,
  dataField,
  setFunction,
}: SortIconProps<T>) {
  const [direction, setDirection] = useState<Direction>("");

  const sortComparer = (a: T, b: T): number => {
    const valA = a[dataField];
    const valB = b[dataField];

    if (valA == null || valB == null) return 0;

    let result: number;
    const dateA = new Date(String(valA));
    const dateB = new Date(String(valB));

    if (typeof valA === "number" && typeof valB === "number") {
      // 數字大小排序
      result = valA - valB;
    } else if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      // 字串排序
      result = String(valA).localeCompare(String(valB));
    } else {
      // 日期排序
      result = dateA.getTime() - dateB.getTime();
    }

    return result * (direction === "up" ? 1 : -1);
  };

  useEffect(() => {
    if (!direction) return;

    const sortList = [...dataList].sort(sortComparer);
    setFunction(sortList);
  }, [direction]);

  // 根據狀態決定渲染哪個圖示組件
  const renderIcon = () => {
    const onClick = () =>
      setDirection((prev) => (prev === "up" ? "down" : "up"));

    return (
      <div className="flex flex-col gap-0 justify-center ml-1">
        <FaSortUp
          className={
            "cursor-pointer text-3 -mb-1.5 " +
            (direction === "up" ? "text-staffbuy-primary" : "text-[gray]")
          }
          onClick={onClick}
        />
        <FaSortDown
          className={
            "cursor-pointer text-3 -mt-1.5 " +
            (direction === "down" ? "text-staffbuy-primary" : "text-[gray]")
          }
          onClick={onClick}
        />
      </div>
    );
  };

  return <>{renderIcon()}</>;
}

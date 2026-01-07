import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import AppAlert from "@/components/common/AppAlert";
import QuantityInput from "./QuantityInput";
import SortIcon from "./SortIcon";
import type { Dispatch, SetStateAction } from "react";

interface TableRowData {
  id: string;
  name: string;
  price: number;
  stock: number;
  quantity: number;
  subtotal: number;
}

export default function ProductTable({
  data = [],
  setDataFunction,
  onChangeQty,
  className = "",
  isNoData,
  isLoading,
}: {
  data: TableRowData[];
  setDataFunction:
    | Dispatch<SetStateAction<TableRowData[]>>
    | ((data: TableRowData[]) => void);
  onChangeQty: (prod: TableRowData, qty: number) => void;
  className?: string;
  isNoData?: boolean;
  isLoading?: boolean;
}) {
  const renderTableBody = () => {
    if (isLoading) {
      return (
        <tr>
          <td className="text-center p-5 h-125" colSpan={5}>
            <Spin indicator={<LoadingOutlined spin />} size="large" />
          </td>
        </tr>
      );
    }

    if (isNoData) {
      return (
        <tr>
          <td className="text-center p-5 h-125" colSpan={5}>
            查無資料
          </td>
        </tr>
      );
    }

    return data?.map((item) => (
      <tr
        key={item.id}
        className={
          "hover:bg-[#FFF6E9] " + (item.quantity > 0 ? "bg-[#FFF6E9]" : "")
        }
      >
        <td className="text-center py-[15px]">{item.name}</td>
        <td className="text-center py-[15px]">{item.price}</td>
        <td className="text-center py-[15px]">{item.stock}</td>
        <td className="text-center py-[15px] flex justify-center">
          <QuantityInput
            variant={"stepper"}
            inputNumber={item.quantity}
            onChange={(val) => {
              if (val > item.stock) {
                AppAlert({
                  message: "超過現有庫存數量",
                  hideCancel: true,
                });
                return;
              }
              onChangeQty(item, val);
            }}
          />
        </td>
        <td className="text-center py-[15px]">{item.subtotal}</td>
      </tr>
    ));
  };

  return (
    <div
      className={
        "w-[100%] bg-white border-[#F5F5F5] border-[1px] rounded-[10px] mb-[40px] " +
        className
      }
    >
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-[#F5F5F5] h-[40px] text-left text-[14px] leading-[21px] text-[#333333] sticky top-0 z-99">
            <th className="text-center">
              <div className="flex justify-center gap-1 items-center box-border">
                <span>員購品項</span>{" "}
                <SortIcon
                  dataList={data}
                  dataField={"name"}
                  setFunction={setDataFunction}
                />
              </div>
            </th>
            <th className="text-center">
              <div className="flex justify-center gap-1 items-center box-border">
                <span>購買價格</span>{" "}
                <SortIcon
                  dataList={data}
                  dataField={"price"}
                  setFunction={setDataFunction}
                />
              </div>
            </th>
            <th className="text-center">
              <div className="flex justify-center gap-1 items-center box-border">
                <span>剩餘數量</span>{" "}
                <SortIcon
                  dataList={data}
                  dataField={"stock"}
                  setFunction={setDataFunction}
                />
              </div>
            </th>
            <th className="text-center">
              <div className="flex justify-center gap-1 items-center box-border">
                <span>購買數量</span>{" "}
                <SortIcon
                  dataList={data}
                  dataField={"quantity"}
                  setFunction={setDataFunction}
                />
              </div>
            </th>
            <th className="text-center w-[124px]">
              <div className="flex justify-center gap-1 items-center box-border">
                <span>小計</span>{" "}
                <SortIcon
                  dataList={data}
                  dataField={"subtotal"}
                  setFunction={setDataFunction}
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>{renderTableBody()}</tbody>
      </table>
    </div>
  );
}

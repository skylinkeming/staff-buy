import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import AppAlert from "@/components/common/AppAlert";
import QuantityInput from "./QuantityInput";
import type { Dispatch, SetStateAction } from "react";
import SortIcon from "./SortIcon";

interface TableRowData {
  id: string;
  name: string;
  price: number;
  stock: number;
  quantity: number;
  subtotal: number;
}

export default function MobileProductTable({
  data,
  onChangeQty,
  setDataFunction,
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
          <td className="text-center p-5 h-50" colSpan={5}>
            <Spin indicator={<LoadingOutlined spin />} size="large" />
          </td>
        </tr>
      );
    }

    if (isNoData) {
      return (
        <tr>
          <td className="text-center p-5 h-50" colSpan={5}>
            查無資料
          </td>
        </tr>
      );
    }

    return data?.map((item) => (
      <tr
        key={item.id}
        className={
          "hover:bg-[#FFF6E9] border-b-[2px] border-b-[#F5F5F5] " +
          (item.quantity > 0 ? "bg-[#FFF6E9]" : "")
        }
      >
        <td className="px-2.5 py-2">
          <div>{item.name}</div>
          <div className="flex gap-[10px]">
            <div
              className={
                "text-[#6B5E55] text-[14px] " +
                (item.quantity > 0 ? "" : "bg-[#FBFBFB]")
              }
            >
              價格: {item.price}
            </div>
            <div
              className={
                "text-[#6B5E55] text-[14px] " +
                (item.quantity > 0 ? "" : "bg-[#FBFBFB]")
              }
            >
              剩餘: {item.stock}
            </div>
          </div>
        </td>
        <td className="text-center py-[15px] flex justify-center items-center">
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
        <td className=" text-center w-15">{item.subtotal}</td>
      </tr>
    ));
  };

  return (
    <div
      className={
        "w-[100%] bg-white border-[#F5F5F5] border-[2px] rounded-[10px] mb-[40px] " +
        className
      }
    >
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-[#F5F5F5] h-[40px] text-left text-[14px] leading-6 text-[#333333] sticky z-99 top-0">
            <th className="px-2.5">
              <div className="flex">
                員購品項
                <SortIcon
                  dataList={data}
                  dataField={"name"}
                  setFunction={setDataFunction}
                />
              </div>
            </th>
            <th className="text-center">
              <div className="flex justify-center">
                購買數量
                <SortIcon
                  dataList={data}
                  dataField={"quantity"}
                  setFunction={setDataFunction}
                />
              </div>
            </th>
            <th className="text-center w-15">
              <div className="flex">
                小計
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

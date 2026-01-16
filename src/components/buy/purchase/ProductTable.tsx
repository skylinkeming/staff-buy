import { Table, ConfigProvider } from "antd";
import type { ColumnsType } from "antd/es/table";
import QuantityInput from "./QuantityInput";
import type { ReactNode } from "react";

export interface TableRowData {
  id: string;
  name: string;
  price: number;
  stock: number;
  quantity: number;
  subtotal: number;
  groupBuyItemId?: string;
}

interface ProductTableProps {
  data: TableRowData[];
  onChangeQty: (prod: TableRowData, qty: number) => void;
  className?: string;
  isLoading?: boolean;
  title?: ReactNode;
}

export default function ProductTable({
  data = [],
  onChangeQty,
  className = "",
  isLoading,
  title,
}: ProductTableProps) {
  // 定義欄位設定
  const columns: ColumnsType<TableRowData> = [
    {
      title: "員購品項",
      dataIndex: "name",
      key: "name",
      align: "left",
      width: 220,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, record) => (
        <div className={"flex justify-start "}>
          {record.name + (record.stock === 0 ? "(剩餘:0)" : "")}
        </div>
      ),
    },
    {
      title: "購買價格",
      dataIndex: "price",
      key: "price",
      align: "center",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "剩餘數量",
      dataIndex: "stock",
      key: "stock",
      align: "center",
      sorter: (a, b) => a.stock - b.stock,
      shouldCellUpdate: (prev, next) => prev.stock !== next.stock,
    },
    {
      title: "購買數量",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      shouldCellUpdate: (prev, next) => prev.quantity !== next.quantity,
      sorter: (a, b) => a.quantity - b.quantity,
      render: (_, record) => (
        <div className={"flex justify-center"}>
          {record.stock === 0 ? (
            0
          ) : (
            <QuantityInput
              variant={"stepper"}
              inputNumber={record.quantity}
              onChange={(val) => {
                if (val > record.stock) {
                  onChangeQty(record, record.stock);
                  return;
                }
                onChangeQty(record, val);
              }}
            />
          )}
        </div>
      ),
    },
    {
      title: "小計",
      dataIndex: "subtotal",
      key: "subtotal",
      align: "center",
      width: 124,
      shouldCellUpdate: (prev, next) => prev.subtotal !== next.subtotal,
      sorter: (a, b) => a.subtotal - b.subtotal,
    },
  ];

  return (
    <div
      className={`w-full bg-white border-[#F5F5F5] border-[1px] rounded-[10px] mb-[40px] ${className}`}
    >
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#F5F5F5",
              headerColor: "#333333",
              cellPaddingBlock: 10,
              // headerBorderRadius: 10,
              colorBorderSecondary: "transparent",
              bodySortBg: "#FAFAFA",
              rowHoverBg: "#FFF6E9",
              // borderRadius: 8,
            },
          },
        }}
      >
        <Table
          className="border border-[#E5E5E5] rounded-[5px] overflow-hidden no-padding-title"
          {...(title && { title: () => title })}
          size="large"
          scroll={{ y: 500 }}
          dataSource={data}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          pagination={false}
          sticky
          rowClassName={(record) => {
            if (record.quantity > 0) {
              return "bg-[#FFF6E9] hover:bg-[#FFF6E9]";
            }
            if (record.stock === 0) {
              return "row-disabled";
            }
            return "";
          }}
          locale={{ emptyText: "查無資料" }}
          virtual
          footer={() => <div className="bg-white h-6"></div>}
        />
      </ConfigProvider>
    </div>
  );
}

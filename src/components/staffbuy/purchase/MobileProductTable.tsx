import { Table, ConfigProvider } from "antd";
import type { ColumnsType } from "antd/es/table";
import QuantityInput from "./QuantityInput";

interface TableRowData {
  id: string;
  name: string;
  price: number;
  stock: number;
  quantity: number;
  subtotal: number;
}

interface MobileProductTableProps {
  data: TableRowData[];
  onChangeQty: (prod: TableRowData, qty: number) => void;
  className?: string;
  isLoading?: boolean;
}

export default function MobileProductTable({
  data = [],
  onChangeQty,
  className = "",
  isLoading,
}: MobileProductTableProps) {
  const columns: ColumnsType<TableRowData> = [
    {
      title: "員購品項",
      key: "name",
      render: (_, record) => (
        <div className="">
          <div className="font-medium leading-4 text-[#333] mb-1">
            {record.name}
          </div>
          <div className="flex gap-2.5">
            <div
              className={`text-[12px] leading-3 pr-1 rounded ${
                record.quantity > 0
                  ? "text-[#6B5E55]"
                  : "text-[#999] bg-[#FBFBFB]"
              }`}
            >
              價格: {record.price}
            </div>
            <div
              className={`text-[12px] px-1 leading-3 rounded ${
                record.quantity > 0
                  ? "text-[#6B5E55]"
                  : "text-[#999] bg-[#FBFBFB]"
              }`}
            >
              剩餘: {record.stock}
            </div>
          </div>
        </div>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "數量",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      width: 120,
      sorter: (a, b) => a.quantity - b.quantity,
      shouldCellUpdate: (prev, next) => prev.quantity !== next.quantity,
      render: (qty, record) => (
        <div className="flex justify-center items-center">
          <QuantityInput
            variant={"stepper"}
            inputNumber={qty}
            onChange={(val) => {
              if (val > record.stock) {
                // AppAlert({
                //   message: "超過剩餘數量",
                //   hideCancel: true,
                // });
                onChangeQty(record, record.stock);
                return;
              }
              onChangeQty(record, val);
            }}
          />
        </div>
      ),
    },
    {
      title: "小計",
      dataIndex: "subtotal",
      key: "subtotal",
      align: "center",
      width: 70,
      shouldCellUpdate: (prev, next) => prev.subtotal !== next.subtotal,
      sorter: (a, b) => a.subtotal - b.subtotal,
    },
  ];

  return (
    <div
      className={`w-full bg-white border-[#F5F5F5] border-[2px] rounded-[10px] mb-[40px] ${className}`}
    >
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#F5F5F5",
              headerColor: "#333333",
              cellPaddingBlock: 10,
              cellPaddingInline: 8, 
            },
          },
        }}
      >
        <Table
          dataSource={data}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          pagination={false}
          sticky
          rowClassName={(record) =>
            record.quantity > 0 ? "bg-[#FFF6E9]" : "border-b-[#F5F5F5]"
          }
          locale={{ emptyText: "查無資料" }}
          bordered={false}
          virtual
        />
      </ConfigProvider>
    </div>
  );
}

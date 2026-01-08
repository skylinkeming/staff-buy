import { Table, Spin, ConfigProvider } from "antd";
import type { ColumnsType } from "antd/es/table";
import AppAlert from "@/components/common/AppAlert";
import QuantityInput from "./QuantityInput";

interface TableRowData {
  id: string;
  name: string;
  price: number;
  stock: number;
  quantity: number;
  subtotal: number;
}

interface ProductTableProps {
  data: TableRowData[];
  onChangeQty: (prod: TableRowData, qty: number) => void;
  className?: string;
  isLoading?: boolean;
}

export default function ProductTable({
  data = [],
  onChangeQty,
  className = "",
  isLoading,
}: ProductTableProps) {
  // 定義欄位設定
  const columns: ColumnsType<TableRowData> = [
    {
      title: "員購品項",
      dataIndex: "name",
      key: "name",
      align: "left",
      width: 180,
      sorter: (a, b) => a.name.localeCompare(b.name),
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
    },
    {
      title: "購買數量",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      sorter: (a, b) => a.quantity - b.quantity,
      render: (_, record) => (
        <div className="flex justify-center">
          <QuantityInput
            variant={"stepper"}
            inputNumber={record.quantity}
            onChange={(val) => {
              if (val > record.stock) {
                AppAlert({
                  message: "超過剩餘數量",
                  hideCancel: true,
                });
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
      width: 124,
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
              headerBorderRadius: 10,

              bodySortBg: "#FAFAFA",
            },
          },
        }}
      >
        <Table
          dataSource={data}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          pagination={false} // 依照你原本的設計不分頁
          sticky // 固定的表頭
          // 當數量大於 0 時畫背景色
          rowClassName={(record) =>
            record.quantity > 0 ? "bg-[#FFF6E9] hover:bg-[#FFF6E9]" : ""
          }
          locale={{ emptyText: "查無資料" }}
        />
      </ConfigProvider>
    </div>
  );
}

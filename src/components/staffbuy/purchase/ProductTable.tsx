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
  // 1. 定義通用的搜尋配置函數
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`搜尋 ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            搜尋
          </Button>
          <Button
            onClick={() => {
              clearFilters();
              confirm(); // 立即清除並重整
            }}
            size="small"
            style={{ width: 90 }}
          >
            重置
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    // 2. 這是核心邏輯：如何比對資料
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
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
        <div className="flex justify-center">
          <QuantityInput
            variant={"stepper"}
            inputNumber={record.quantity}
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
              headerBorderRadius: 10,
              colorBorderSecondary: "transparent",
              bodySortBg: "#FAFAFA",
              rowHoverBg: "#FFF6E9",
              borderRadius: 8,
            },
          },
        }}
      >
        <Table
          {...(title && { title: () => title })}
          scroll={{ y: 500 }}
          dataSource={data}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          pagination={false}
          sticky
          rowClassName={(record) =>
            record.quantity > 0 ? "bg-[#FFF6E9] hover:bg-[#FFF6E9]" : ""
          }
          locale={{ emptyText: "查無資料" }}
          virtual
        />
      </ConfigProvider>
    </div>
  );
}

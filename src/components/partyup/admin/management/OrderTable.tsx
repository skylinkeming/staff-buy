import { ConfigProvider, Table, type TableColumnType } from "antd";
import { FaEdit } from "react-icons/fa";
import zhTW from "antd/es/locale/zh_TW";

export interface Order {
    orderNumber: string;
    orderPerson: string;
    orderTime: string;
    orderProduct: string;
    orderQuantity: number;
    orderAmount: number;
    orderStatus: string;
    department: string;
    employeeId: string;
    operation: string;
}

export default function OrderTable({ orders }: { orders: Order[] }) {
    const columns: TableColumnType<Order>[] = [
        {
            title: "訂單編號",
            dataIndex: "orderNumber",
            key: "orderNumber",
        },
        {
            title: "數量",
            dataIndex: "orderQuantity",
            key: "orderQuantity",
        },
        {
            title: "總金額",
            dataIndex: "orderAmount",
            key: "orderAmount",
        },
        {
            title: "訂購時間",
            dataIndex: "orderTime",
            key: "orderTime",
        },
        {
            title: "訂購人",
            dataIndex: "orderPerson",
            key: "orderPerson",
            render: (text: string, record: Order) => (
                <div className="flex gap-1 items-center">
                    <div className="text-xs border-r pr-1 border-[#D9D9D9]">{record.department}</div>
                    <div className="text-xs border-r pr-1 border-[#D9D9D9]">{record.employeeId}</div>
                    <div className="text-xs">{text}</div>
                </div>
            ),
        },
        {
            title: "訂購商品",
            dataIndex: "orderProduct",
            key: "orderProduct",
        },
        {
            title: "訂購狀態",
            dataIndex: "orderStatus",
            key: "orderStatus",
            render: (text: string) => <OrderStatus status={text} />,
        },
        {
            title: "操作",
            dataIndex: "operation",
            key: "operation",
            render: () => <FaEdit size={20} className="cursor-pointer" />,
        },
    ];

    return (
        <ConfigProvider locale={zhTW}
            theme={{
                components: {
                    Table: {
                        headerBg: "#96CEFF",
                        headerSplitColor: 'transparent',
                    },
                },
            }}
        >
            <Table
                columns={columns}
                dataSource={orders.map((order, index) => ({ ...order, key: index }))}
                pagination={{
                    pageSize: 10,
                }}
                rowSelection={{
                    type: "checkbox",
                }}
            />

        </ConfigProvider>
    )
}


const orderStatusStyles = {
    "已取消": "text-[#D9D9D9] border-[#D9D9D9]",
    "已成單": "text-[#FF9800] border-[#FF9800]",
    "已領取": "text-[#00ABAB] border-[#00ABAB]",
};

export function OrderStatus({ status }: { status: string }) {
    const activeStyle = orderStatusStyles[status as keyof typeof orderStatusStyles] || "text-gray-500 border-gray-500";

    return (
        <div className="flex items-center gap-1">
            <div className={`${activeStyle} border rounded-[10px] px-5 py-0.5`}>
                {status}
            </div>
        </div>
    );
}
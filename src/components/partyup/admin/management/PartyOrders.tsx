import OrderSearchGroup from "@/components/common/OrderSearchGroup";
import OrderTable from "./OrderTable";
import { Button } from "antd";
import { FaPlusSquare } from "react-icons/fa";


export default function PartyOrders() {
    return (
        <div className="py-5 min-h-screen">
            <div className="flex justify-between gap-2 mb-3.5 pb-3.5 -mt-3.5">
                <OrderSearchGroup
                    className=" "
                    isLoading={false}
                    placeholder="請輸入訂單編號、訂購人工號、姓名"
                    onClickSearchBtn={(searchParams) => {
                        // setOrderFilter({
                        //     orderId: searchParams.searchTerm,
                        //     startDate: searchParams.startDate,
                        //     endDate: searchParams.endDate,
                        // });
                    }}
                    canSelectOrderStatus
                    buttonClass="bg-[#E3F2FD]! text-black! border-black!"
                />
                <Button
                    type="primary"
                    icon={<FaPlusSquare />}
                    className="bg-[#FFD400]! border-[#FFD400]! text-black! hover:opacity-90!"
                >
                    新增訂單
                </Button>
            </div>
            <OrderTable orders={[
                {
                    orderNumber: "123456789",
                    orderPerson: "張三",
                    orderTime: "2022/01/01 12:00:00",
                    orderProduct: "商品A, 商品B, 商品C...",
                    orderQuantity: 1,
                    orderAmount: 100,
                    orderStatus: "已成單",
                    department: "資訊部",
                    employeeId: "A123456789",
                    operation: "操作",
                },
                {
                    orderNumber: "123456789",
                    orderPerson: "張三",
                    orderTime: "2022/01/01 12:00:00",
                    orderProduct: "商品A, 商品B, 商品C...",
                    orderQuantity: 1,
                    orderAmount: 100,
                    orderStatus: "已取消",
                    department: "資訊部",
                    employeeId: "A123456789",
                    operation: "操作",
                },
                {
                    orderNumber: "123456789",
                    orderPerson: "張三",
                    orderTime: "2022/01/01 12:00:00",
                    orderProduct: "商品A, 商品B, 商品C...",
                    orderQuantity: 1,
                    orderAmount: 100,
                    orderStatus: "已領取",
                    department: "資訊部",
                    employeeId: "A123456789",
                    operation: "操作",
                },
            ]} />
        </div>
    )
}
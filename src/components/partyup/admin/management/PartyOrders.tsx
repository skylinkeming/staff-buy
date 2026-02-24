import OrderSearchGroup from "@/components/common/OrderSearchGroup";
import OrderTable, { type Order } from "./OrderTable";
import { Button } from "antd";
import { FaPlusSquare } from "react-icons/fa";
import EditOrderPopup, { type OrderData } from "./EditOrderPopup";
import { useState } from "react";


export default function PartyOrders() {
    const [isEditOrderPopupOpen, setIsEditOrderPopupOpen] = useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);


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
                    onClick={() => {
                        setIsEditOrderPopupOpen(true);
                        setSelectedOrder(null);
                    }}
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

            <EditOrderPopup
                open={isEditOrderPopupOpen}
                onCancel={() => setIsEditOrderPopupOpen(false)}
                orderData={{
                    "partyId": "123",
                    "orderId": "TK92600677",
                    "totalAmount": "690",
                    "orderDate": "2025/12/3 12:43",
                    "dept": "資訊部",
                    "staffId": "015550",
                    "staffName": "張阿爆",
                    "orderStatus": "2", // 已領取(?)
                    "options": {
                        "orderStatus": [
                            //訂單狀態清單
                            {
                                "value": "已成單",
                                "id": "2"
                            },
                            {
                                "value": "已領取",
                                "id": "3"
                            }
                        ],
                        "productOptions": [
                            {
                                "id": "a1235",
                                "name": "佛羅倫斯系列之毛巾",
                                "price": "260",
                                "img": "https://..."
                            },
                            {
                                "id": "2342525",
                                "name": "佛羅倫斯系列之浴巾",
                                "price": "380",
                                "img": "https://..."
                            }
                        ]
                    },
                    "buyItems": [
                        {
                            "id": "P001",
                            "productName": "佛羅倫斯系列之毛巾",
                            "img": "https://...",
                            "qty": 2,
                            "price": "130"
                        },
                        {
                            "id": "P002",
                            "productName": "佛羅倫斯系列之浴巾",
                            "img": "https://...",
                            "qty": 1,
                            "price": "380"
                        },
                        {
                            "id": "P003",
                            "productName": "佛羅倫斯系列之浴巾",
                            "img": "https://...",
                            "qty": 1,
                            "price": "380"
                        }
                    ],
                    "shippingInfo": {
                        "name": "Steve Lin",
                        "phone": "0912345678",
                        "address": "台北市中山區...",
                        "trackingNumber": "220908799" //宅配單號
                    }
                }}
            />
        </div>
    )
}
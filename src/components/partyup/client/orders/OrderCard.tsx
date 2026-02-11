import type { OrderData } from "@/api/partyupApi";
import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

export default function OrderCard({ orderItem }: { orderItem: OrderData }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const renderRow = (label: string, value: string | number | React.ReactNode, isFullWidth = false) => {
        return (
            <div className={`flex w-full justify-between px-4 md:px-6 ${isFullWidth ? 'md:col-span-2' : ''}`}>
                <p className=" text-[#7E8182] w-[100px] shrink-0">{label}</p>
                <p className=" text-[#20232C] font-medium">{value}</p>
            </div>
        )
    }

    return (
        <div className="border border-[#CFCFCF] rounded-[10px] bg-white">
            {/* Header */}
            <div className="flex justify-between px-4 md:px-6 items-center gap-1.25 text-[14px] border-b border-[#CFCFCF] py-3 bg-[#F9FAFB] rounded-t-[10px]">
                <div className="text-[#7E8182]">
                    訂單編號: <span className="font-bold text-[#0B7F9F] font-['Inria_Sans'] text-[20px] ml-1">{orderItem.orderId}</span>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="text-[14px] font-bold px-2 py-0.5 bg-white border border-[#CFCFCF] rounded-[4px]">{orderItem.orderStatus}</div>
                    {orderItem.orderStatus === "已領取" && (
                        <div className="text-[#7E8182] text-[12px] hidden md:block">{orderItem.pickupDate}</div>
                    )}
                </div>
            </div>

            {/* 訂單內容 */}
            <div className="gap-y-1.5 md:gap-y-1.5 pt-4 pb-2 grid grid-cols-1 md:grid-cols-2">
                {renderRow("揪團名稱:", <span className="text-partyup-primary font-bold">{orderItem.partyName}</span>)}
                {renderRow("訂單時間:", <span className="font-['Inria_Sans']">{orderItem.createdAt}</span>)}
                {renderRow("領取方式:", orderItem.pickupMethod)}
                {renderRow("總金額:", <span className="text-[#FF5C5C] font-bold font-['Inria_Sans'] text-[18px]">${orderItem.totalAmount.toLocaleString()}</span>)}

                {/* 宅配資訊 - 展開後 */}
                {isExpanded && orderItem.shippingInfo && (
                    <>
                        <div className="md:col-span-2 border-t border-dashed border-[#CFCFCF] my-1 mx-4" />
                        {renderRow("收件人姓名", orderItem.shippingInfo.name)}
                        {renderRow("收件人電話", <span className="font-['Inria_Sans']">{orderItem.shippingInfo.phone}</span>)}
                        {renderRow("運費", <span className="font-['Inria_Sans']">${orderItem.shippingInfo.shippingFee}</span>)}
                        {renderRow("物流單號", <span className="font-['Inria_Sans'] bg-gray-100 px-1 rounded">{orderItem.shippingInfo.trackingNumber}</span>)}
                        {renderRow("收件地址", orderItem.shippingInfo.address, true)}
                    </>
                )}
            </div>
            {isExpanded && <div className="md:col-span-2 border-t border-dashed border-[#CFCFCF] my-1 mx-4"></div>}
            {/* 購買商品清單 */}
            {isExpanded &&
                <div className=" pt-2.5 mt-2 px-4 md:px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                        {orderItem.buyItems.map((item, idx) => (
                            <div key={idx} className="flex gap-3.5 p-2 rounded-lg ">
                                <div className=" w-[100px] h-[100px] shrink-0 flex justify-center items-center rounded-md overflow-hidden border border-[#EEE] ">
                                    <img src={item.imageUrl} className="w-full h-full object-cover" alt={item.name} />
                                </div>
                                <div className="flex flex-col justify-center gap-1">
                                    <p className="font-bold text-[#20232C] text-[15px] line-clamp-1">{item.name}</p>
                                    <p className="text-[#7E8182] text-[13px]">數量：x {item.qty}</p>
                                    <p className="text-[#7E8182] text-[13px]">小計：<span className="text-[#FF5C5C] font-bold font-['Inria_Sans']">${item.price}</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }

            {/* 底部按鈕 */}
            <div className="border-t border-[#CFCFCF] py-3 flex justify-center items-center">
                <button
                    type="button"
                    className="flex gap-1.5 justify-center items-center border border-[#1e88e5] px-4 py-1.5 rounded-[5px] hover:bg-[#1e88e5]/5 transition-colors group cursor-pointer"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <span className="text-partyup-primary text-[14px] font-bold">{isExpanded ? "收合明細" : "展開明細"} </span>
                    {isExpanded ?
                        <BiChevronUp className="text-partyup-primary transition-transform group-hover:-translate-y-0.5" size={20} /> :
                        <BiChevronDown className="text-partyup-primary transition-transform group-hover:translate-y-0.5" size={20} />
                    }
                </button>
            </div>
        </div>
    )
}
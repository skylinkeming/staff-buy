import type { OrderData } from "@/api/partyupApi";
import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";



export default function OrderCard({ orderItem }: { orderItem: OrderData }) {
    console.log({ orderItem });
    const [isExpanded, setIsExpanded] = useState(false);

    const renderRow = (label: string, value: string | number | React.ReactNode) => {
        return (
            <div className="flex w-full justify-between px-3.5 ">
                <p className="text-[14px] text-[#7E8182] w-[100px]">{label}</p>
                <p className="text-[14px] text-[#20232C]">{value}</p>
            </div>
        )
    }

    return (
        <div className="border border-[#CFCFCF] rounded-[10px]">
            <div className="flex justify-center items-end gap-1.25 text-[14px] border-b border-[#CFCFCF] py-2.5">
                訂單編號:<span className="font-bold text-lg text-[#0B7F9F] font-['Inria_Sans'] leading-[24px] text-[20px]">{orderItem.orderId}</span>
            </div>
            <div className="flex flex-col gap-2.5 pt-2.5">
                {renderRow("揪團名稱:", <span className="text-partyup-primary">{orderItem.partyName}</span>)}
                {renderRow("訂單時間:", orderItem.createdAt)}
                {renderRow("訂單狀態:", orderItem.orderStatus)}
                {renderRow("領取方式:", orderItem.pickupMethod)}
                {renderRow("領取日期:", orderItem.pickupDate)}
                {renderRow("總金額:", <span className="text-[#FF5C5C] font-bold">{orderItem.totalAmount}</span>)}


                {isExpanded && orderItem.shippingInfo && (
                    <>
                        <div className="h-1.25" />
                        {/* <div className="border-t border-[#CFCFCF] mt-2.5 px-3.5"></div> */}
                        {/* <div className="text-[14px] leading-[18px] w-full text-[#20232C] ml-3.5 pl-2.5 border-l-4 border-l-partyup-primary">宅配資訊</div> */}
                        {renderRow("收件人姓名", orderItem.shippingInfo.name)}
                        {renderRow("收件人電話", orderItem.shippingInfo.phone)}
                        {renderRow("收件地址", orderItem.shippingInfo.address)}
                        {renderRow("運費", orderItem.shippingInfo.shippingFee)}
                        {renderRow("物流單號", orderItem.shippingInfo.trackingNumber)}
                    </>
                )}

            </div>
            {isExpanded && <div className="border-t border-[#CFCFCF] pt-3.5 mt-2.5 px-3.5">
                {orderItem.buyItems.map((item) => (
                    <div key={item.name} className="flex gap-3.5">
                        <div className="bg-[#FBFBFB] w-[115px] h-[125px] flex justify-center items-center">
                            <img src={item.imageUrl} className="w-[95px] object-cover" alt={item.name} />
                        </div>
                        <div className="flex flex-col gap-3.5">
                            <p className="font-bold text-[#20232C]">{orderItem.partyName}</p>
                            <p className="text-[#7E8182]">商品名稱：{item.name}</p>
                            <p className="text-[#7E8182]">數量：x {item.qty} = <span className="text-[#FF5C5C] font-bold">{item.price}</span></p>
                        </div>
                    </div>
                ))}
            </div>}
            <div className="border-t border-[#CFCFCF] py-2.5 mt-2.5 px-3.5 flex justify-center items-center">
                <div className="text-partyup-primary cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? "收合明細" : "展開明細"} </div>
                {isExpanded ? <BiChevronUp className="text-partyup-primary" /> : <BiChevronDown className="text-partyup-primary" />}
            </div>
        </div>
    )
}
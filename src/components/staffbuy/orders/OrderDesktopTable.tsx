import { useState } from "react";
import type { OrderItem } from "@/api/staffbuyApi";
import { FaPlay } from "react-icons/fa";

const DataRow = ({ field, value, isTotalPrice, link }: any) => {
  let textStyle = "text-sm text-[#20232C]";
  if (isTotalPrice) {
    textStyle = `text-[#E5486D] font-bold ${"text-sm"}`;
  }
  return (
    <div
      className={
        "flex w-full mb-2.5 " + (isTotalPrice ? "mt-3.5 items-end" : "")
      }
    >
      <span className={"text-sm w-35 font-bold"}>{field}</span>
      <span className={textStyle}>{value}</span>
    </div>
  );
};

export default function OrderDesktopTable(props: OrderItem) {
  const [openDetail, setOpenDetail] = useState(false);
  const isDelivery = props.transport === "Y";

  const basicInfo = (
    <>
      <div className="grid grid-cols-7 bg-gray-100 border-b border-gray-300 font-medium text-gray-700">
        <div className="border-r border-gray-300 px-2 py-2 text-center">
          訂單編號
        </div>
        <div className="border-r border-gray-300 px-2 py-2 text-center">
          取貨方式
        </div>
        <div className="border-r border-gray-300 px-2 py-2 text-center">
          訂單情況
        </div>
        <div className="border-r border-gray-300 px-2 py-2 text-center">
          訂單日期
        </div>
        <div className="border-r border-gray-300 px-2 py-2 text-center">
          取貨日期
        </div>
        <div className="border-r border-gray-300 px-2 py-2 text-center">
          商品總價
        </div>
        <div className="px-2 py-2 text-center">發票日期</div>
      </div>
      <div className="grid grid-cols-7 hover:bg-gray-50 transition-colors">
        <div
          className="relative flex justify-center items-center px-2 py-2 border-r border-gray-300 cursor-pointer text-blue-600 underline"
          onClick={() => setOpenDetail((prev) => !prev)}
        >
          <FaPlay
            className={`text-black w-2 absolute left-2 transition-transform duration-200 ${
              openDetail ? "rotate-90" : ""
            }`}
          />
          {props.serialNum}
        </div>

        <div className="border-r border-gray-300 text-center flex items-center justify-center leading-3.5">
          {isDelivery ? "宅配" : "自取"}
        </div>

        <div className="border-r border-gray-300 px-2 py-2 text-center flex items-center justify-center leading-3.5">
          {props.shippingInfo.fG_Status}
        </div>

        <div className="border-r border-gray-300 px-2 py-2 text-center flex items-center justify-center leading-3.5">
          {props.date}
        </div>

        <div className="border-r border-gray-300 px-2 py-2 text-center flex items-center justify-center leading-3.5">
          {props.shippingInfo.cX_GetDate}
        </div>

        <div className="border-r border-gray-300 px-2 py-2 text-center flex items-center justify-center font-bold text-staffbuy-primary leading-3.5">
          $ {props.totalPrice}
        </div>

        <div className="px-2 py-2 text-center flex items-center justify-center leading-3.5">
          {props.invoiceInfo.invoiceNumber
            ? props.invoiceInfo.invoiceNumber
            : "尚未開立"}
        </div>
      </div>
    </>
  );

  return (
    <div className="">
      <div
        className={
          "w-full border border-gray-300 rounded-[10px] overflow-hidden bg-white text-sm " +
          (openDetail ? " rounded-bl-none rounded-br-none" : "")
        }
      >
        {basicInfo}
      </div>
      {openDetail && (
        <div className="flex relative border-[1px] border-gray-300 pr-2.5 rounded-bl-[10px] rounded-br-[10px] bg-white">
          <div className="border-l-[12px] border-[rgba(232,200,69,0.36)] absolute left-0 top-0 h-full"></div>
          <div className="pr-2.5 w-[50%] border-r-[1px] border-[#C1C1C1] ">
            <div className="px-10 my-3.5 pb-2.5 max-h-40 overflow-auto min-h-25">
              <div className="pb-2.5 text-[14px] border-b-[1px] mb-2.5 border-[#C1C1C1] font-bold sticky top-0 bg-white">
                購買明細
              </div>
              <div className="flex flex-col gap-2.5">
                {props.details.map((d) => (
                  <div key={d.prodName} className="flex justify-between pr-5">
                    <div className="text-[12px] w-50">{d.prodName}</div>
                    <div className="text-[12px] w-15">{d.price}</div>
                    <div className="text-[12px] w-10">x {d.qty}</div>
                    <div className="text-[12px] flex-1 text-right">
                      {d.subTotal}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="px-7.5 my-3.5 w-[50%]  max-h-40 overflow-auto">
            <DataRow field="附提袋數" value={props.shippingInfo.nQ_Bag} />
            {props.invoiceInfo.carrierId && (
              <DataRow field="載具號碼" value={props.invoiceInfo.carrierId} />
            )}
            {props.shippingInfo.trackingNumber && (
              <DataRow
                field="黑貓宅配單號"
                value={props.shippingInfo.trackingNumber}
              />
            )}
            {isDelivery && props.shippingInfo.receiver && (
              <DataRow field="收件人" value={props.shippingInfo.receiver} />
            )}
            {isDelivery && props.shippingInfo.phone && (
              <DataRow field="收件人電話" value={props.shippingInfo.phone} />
            )}
            {isDelivery && props.shippingInfo.address && (
              <DataRow field="收件地址" value={props.shippingInfo.address} />
            )}
            {isDelivery && !!props.shippingInfo.nQ_Transport_Money && (
              <DataRow
                field="運費"
                value={"$ " + props.shippingInfo.nQ_Transport_Money}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

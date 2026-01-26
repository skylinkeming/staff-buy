import { useState } from "react";
import dayjs from "dayjs";
import type { OrderItem } from "@/api/staffbuyApi";
import { FaPlay } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

const DataRow = ({ field, value, isHighlight, link }: any) => {
  let textStyle = "text-sm text-[#20232C]";
  if (isHighlight) {
    textStyle = `text-[#175dcc] font-bold ${"text-sm"}`;
  } else if (link) {
    textStyle += " text-blue-600 cursor-pointer ";
  }

  return (
    <div
      className={"flex w-full mb-2.5 " + (isHighlight ? " items-end" : "")}
      onClick={() => {
        if (link) window.open(link);
      }}
    >
      <span className={"text-sm font-medium w-35  text-[#020202]"}>{field}</span>
      <span className={textStyle}>{value}</span>
    </div>
  );
};

export default function OrderDesktopTable(props: {
  orderItem: OrderItem;
  onClickDeleteBtn?: (idBuyM: number) => void;
}) {
  const { onClickDeleteBtn, orderItem } = props;
  const [openDetail, setOpenDetail] = useState(false);
  const isDelivery = orderItem.transport === "Y";
  let deliveryMethod = isDelivery ? "宅配" : "自取";

  if (orderItem.groupBuyName && !isDelivery && orderItem.shippingInfo.address) {
    deliveryMethod = orderItem.shippingInfo.address;
  }

  const checkIsOrderLocked = () => {
    const isInPurchasePeriod =
      dayjs(orderItem.purchasePeriod?.split(" ~ ")[1]).isAfter(dayjs()) && dayjs(orderItem.purchasePeriod?.split(" ~ ")[0]).isBefore(dayjs());

    return orderItem.serialNum !== "尚未成單" || !isInPurchasePeriod;
  }

  const basicInfo = (
    <>
      <div
        className={`grid grid-cols-7 bg-gray-100 border-b border-gray-300 font-medium text-gray-700`}
      >
        <div className="border-r border-gray-300 px-2 py-2 text-center text-[#020202]">
          訂單編號
        </div>
        <div className="border-r border-gray-300 px-2 py-2 text-center text-[#020202]">
          取貨方式
        </div>
        {orderItem.shippingInfo.fG_Status && (
          <div className="border-r border-gray-300 px-2 py-2 text-center text-[#020202]">
            訂單情況
          </div>
        )}
        <div className="border-r border-gray-300 px-2 py-2 text-center text-[#020202]">
          訂單日期
        </div>
        {!orderItem.groupBuyName && (
          <div className="border-r border-gray-300 px-2 py-2 text-center text-[#020202]">
            取貨日期
          </div>
        )}
        <div className="border-r border-gray-300 px-2 py-2 text-center text-[#020202]">
          商品總價
        </div>
        <div className="px-2 py-2 text-center text-[#020202]">發票號碼</div>
        {orderItem.groupBuyName && (
          <div className="border-l border-gray-300 px-2 py-2 text-center text-[#020202]">
            功能
          </div>
        )}
      </div>
      <div
        className={`grid grid-cols-7
        } hover:bg-gray-50 transition-colors`}
      >
        <div
          className="relative flex justify-center items-center px-2 py-2 border-r border-gray-300 cursor-pointer text-blue-600 underline"
          onClick={() => setOpenDetail((prev) => !prev)}
        >
          <FaPlay
            className={`text-black w-2 absolute left-2 transition-transform duration-200 ${openDetail ? "rotate-90" : ""
              } text-[#20232C]`}
          />
          {orderItem.serialNum}
        </div>

        <div className="border-r border-gray-300 text-center flex items-center justify-center leading-3.5 text-[#20232C]">
          {deliveryMethod}
        </div>

        {orderItem.shippingInfo.fG_Status && (
          <div className="border-r border-gray-300 px-2 py-2 text-center flex items-center justify-center leading-3.5 text-[#20232C]">
            {orderItem.shippingInfo.fG_Status}
          </div>
        )}

        <div className="border-r border-gray-300 px-2 py-2 text-center flex items-center justify-center leading-3.5 text-[#20232C]">
          {orderItem.date}
        </div>

        {!orderItem.groupBuyName && (
          <div className="border-r border-gray-300 px-2 py-2 text-center flex items-center justify-center leading-3.5 text-[#20232C]">
            {orderItem.shippingInfo.cX_GetDate}
          </div>
        )}

        <div className="border-r border-gray-300 px-2 py-2 text-center flex items-center justify-center font-bold text-staffbuy-primary leading-3.5">
          $ {orderItem.totalPrice}
        </div>

        <div className="px-2 py-2 text-center flex items-center justify-center leading-3.5">
          {orderItem.invoiceInfo.invoiceNumber
            ? orderItem.invoiceInfo.invoiceNumber
            : "尚未開立"}
        </div>

        {/* 刪除按鈕 */}
        {orderItem.groupBuyName && (
          <div className="border-l border-gray-300 px-2 py-2 text-center flex items-center justify-center font-bold text-staffbuy-primary leading-3.5">
            <div
              className={`
                md:grid grid-cols-[20px_35px] shrink-0 items-center px-2.5 py-1.25 rounded-[5px] border transition-all duration-200
                ${checkIsOrderLocked()
                  ? "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white border-red-500 text-red-500 cursor-pointer hover:bg-red-500 hover:text-white"
                }
              `}
              onClick={() => {
                if (!checkIsOrderLocked() && onClickDeleteBtn) {
                  onClickDeleteBtn(orderItem.idBuyM!);
                }
              }}
            >
              <FaRegTrashAlt
                className={
                  checkIsOrderLocked()
                    ? "text-gray-400"
                    : "transition-colors duration-200"
                }
              />
              <div className="font-medium ">刪除</div>
            </div>
          </div>
        )}
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
        <div className="flex relative border-[1px] border-t-0 border-gray-300 pr-2.5 rounded-bl-[10px] rounded-br-[10px] bg-white">
          <div className="border-l-[12px] border-[rgba(232,200,69,0.36)] absolute left-0 top-0 h-full"></div>
          <div className="pr-2.5 w-[50%] border-r-1 border-[#C1C1C1] my-3.5">
            <div className="px-10 pb-2.5 max-h-40 overflow-auto min-h-25">
              <div className="pb-2.5 text-[14px] border-b mb-2.5 border-[#C1C1C1] text-[#020202] sticky top-0 bg-white font-medium">
                購買明細
              </div>
              <div className="flex flex-col gap-2.5">
                {orderItem.details.map((d) => (
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
            {orderItem.shippingInfo.nQ_Bag !== undefined && (
              <DataRow field="附提袋數" value={orderItem.shippingInfo.nQ_Bag} />
            )}
            {orderItem.purchasePeriod && (
              <DataRow field="團購期間" value={orderItem.purchasePeriod} />
            )}
            {orderItem.groupBuyName && (
              <DataRow
                field="團購主題"
                value={orderItem.groupBuyName}
                isHighlight
              />
            )}
            {orderItem.invoiceInfo.invoiceDate && (
              <DataRow
                field="發票日期"
                value={orderItem.invoiceInfo.invoiceDate}
              />
            )}
            {orderItem.invoiceInfo.carrierId && (
              <DataRow
                field="載具號碼"
                value={orderItem.invoiceInfo.carrierId}
              />
            )}
            {orderItem.invoiceInfo.loveCode && (
              <DataRow field="愛心碼" value={orderItem.invoiceInfo.loveCode} />
            )}
            {orderItem.shippingInfo.trackingNumber && (
              <DataRow
                field="黑貓宅配單號"
                value={orderItem.shippingInfo.trackingNumber}
                link={
                  "https://www.t-cat.com.tw/Inquire/Trace.aspx?method=result&billID=" +
                  orderItem.shippingInfo.trackingNumber
                }
              />
            )}
            {isDelivery && orderItem.shippingInfo.receiver && (
              <DataRow field="收件人" value={orderItem.shippingInfo.receiver} />
            )}
            {isDelivery && orderItem.shippingInfo.phone && (
              <DataRow
                field="收件人電話"
                value={orderItem.shippingInfo.phone}
              />
            )}
            {isDelivery && orderItem.shippingInfo.address && (
              <DataRow
                field="收件地址"
                value={orderItem.shippingInfo.address}
              />
            )}
            {isDelivery && !!orderItem.shippingInfo.nQ_Transport_Money && (
              <DataRow
                field="運費"
                value={"$ " + orderItem.shippingInfo.nQ_Transport_Money}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

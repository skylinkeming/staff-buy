import { useState } from "react";
import type { OrderItem } from "@/api/staffbuyApi";

const DataRow = ({
  field,
  value,
  isTotalPrice,
  openDetail,
  link = "",
}: any) => {
  let textStyle = "text-sm text-[#20232C]";
  if (isTotalPrice) {
    textStyle = `text-staffbuy-primary font-bold ${
      openDetail ? "text-md" : "text-sm"
    }`;
  }
  if (link) {
    textStyle += " text-blue cursor-pointer";
  }

  return (
    <div
      className={
        "flex justify-between w-full mb-2.5 " +
        (isTotalPrice && openDetail ? "mt-3.5 items-end" : "")
      }
    >
      <span className={"text-sm"}>{field}</span>
      <span
        className={textStyle}
        onClick={() => {
          if (link) {
            window.open(link);
          }
        }}
      >
        {value}
      </span>
    </div>
  );
};

const BuyItem = ({ prodName, qty, price, subTotal }: any) => (
  <div className="flex justify-between w-full mb-2.5 px-1.25">
    <span className="text-sm w-45">{prodName}</span>
    <span className="text-sm w-15">
      {price} x {qty}
    </span>
    <span className="text-sm flex-1 text-right">{subTotal}</span>
  </div>
);

// 手機版訂單卡片
export default function OrderCard(props: OrderItem) {
  const [openDetail, setOpenDetail] = useState(false);
  const isDelivery = props.transport === "Y";

  const basicInfo = [
    { field: "訂單編號", value: props.serialNum || props.id.toString() },
    { field: "訂單日期", value: props.date },
    { field: "取貨方式", value: isDelivery ? "宅配" : "自取" },
  ];

  const buyDetail = (
    <div className="pt-2.5 mb-5 mt-1 ">
      <div className="text-[#020202] mb-3 border-b-[1px] pb-1.25 border-[#D9D9D9] pl-1.25">
        購物明細
      </div>
      {props.details.map((d) => (
        <BuyItem key={d.prodName} {...d} />
      ))}
      <div></div>
      <div className={"flex justify-between w-full mt-3.5 px-1.25 items-end"}>
        <span className={"text-sm"}>{"總金額"}</span>
        <span className={"text-staffbuy-primary font-bold"}>
          NT$ {props.totalPrice}
        </span>
      </div>
    </div>
  );

  const moreInfo = [
    {
      field: "附提袋數",
      value: props.shippingInfo.nQ_Bag,
      link: "",
    },
    {
      field: "發票號碼/日期",
      value: props.invoiceInfo.invoiceNumber
        ? `${props.invoiceInfo.invoiceNumber} / (${props.invoiceInfo.invoiceDate})`
        : "尚未開立",
      link: "",
    },
    {
      field: "取貨時間",
      value: props.shippingInfo.cX_GetDate,
      link: "",
    },
  ];

  if (props.invoiceInfo.carrierId) {
    moreInfo.push({
      field: "載具號碼",
      value: props.invoiceInfo.carrierId || "無",
      link: "",
    });
  }
  if (props.invoiceInfo.loveCode) {
    moreInfo.push({
      field: "愛心碼",
      value: props.invoiceInfo.loveCode,
      link: "",
    });
  }

  if (isDelivery && props.shippingInfo.trackingNumber) {
    moreInfo.push({
      field: "黑貓宅配單號",
      value: props.shippingInfo.trackingNumber || "",
      link:
        "https://www.t-cat.com.tw/Inquire/Trace.aspx?method=result&billID=" +
        props.shippingInfo.trackingNumber,
    });
  }

  if (isDelivery) {
    moreInfo.push(
      { field: "收件人", value: props.shippingInfo.receiver, link: "" },
      { field: "收件人電話", value: props.shippingInfo.phone, link: "" },
      { field: "到貨地址", value: props.shippingInfo.address, link: "" }
    );
  }

  return (
    <div className="w-full shadow-[1px_2px_4px_0px_rgba(0,0,0,0.25)] rounded-[15px] bg-white overflow-hidden">
      <div className="border-b-[1px] font-[600] border-[#D9D9D9] text-[#020202] py-2.5 px-5">
        訂單資訊
      </div>

      <div className="pt-3">
        <div className="px-5">
          {basicInfo.map((item) => (
            <DataRow key={item.field} field={item.field} value={item.value} />
          ))}
          {!openDetail && (
            <DataRow
              field="總金額"
              value={`NT$ ${props.totalPrice.toLocaleString()}`}
              isTotalPrice
            />
          )}
        </div>
        {openDetail && (
          <>
            <div className="px-2.5 bg-[#FBFBFB] pb-2.5 mx-2.5 rounded-[1px] max-h-75 overflow-auto ">
              {buyDetail}
            </div>
            <div className="px-5 py-3.5  ">
              {moreInfo.map((item) => (
                <DataRow
                  key={item.field}
                  field={item.field}
                  value={item.value}
                  link={item.link}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="bg-[#F5F5F5] py-2 px-3.5 text-right">
        <div
          className="border-[1px] text-sm border-[#20232C] text-[#20232C] py-1.25 px-7.5 inline-block rounded-[5px] cursor-pointer"
          onClick={() => setOpenDetail(!openDetail)}
        >
          {openDetail ? "收合明細" : "展開明細"}
        </div>
      </div>
    </div>
  );
}

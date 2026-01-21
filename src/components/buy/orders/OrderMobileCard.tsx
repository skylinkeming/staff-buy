import { useState } from "react";
import type { OrderItem } from "@/api/staffbuyApi";
import { FaRegTrashAlt } from "react-icons/fa";

const DataRow = ({
  field,
  value,
  isTotalPrice,
  openDetail,
  link = "",
}: any) => {
  let textStyle = "text-sm text-[#20232C] max-w-50 text-right ";
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
      <span className={"text-sm font-medium "}>{field}</span>
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
export default function OrderCard(props: {
  orderItem: OrderItem;
  onClickDeleteBtn?: (idBuyM: number) => void;
}) {
  const { orderItem, onClickDeleteBtn } = props;
  const [openDetail, setOpenDetail] = useState(false);

  if (!orderItem) return <></>;

  const isDelivery = orderItem?.transport === "Y";
  let deliveryMethod = isDelivery ? "宅配" : "自取";

  if (
    orderItem?.groupBuyName &&
    !isDelivery &&
    orderItem?.shippingInfo.address
  ) {
    deliveryMethod = orderItem?.shippingInfo.address;
  }

  const basicInfo = [
    {
      field: "訂單編號",
      value: orderItem.serialNum || orderItem.id.toString(),
    },
    { field: "訂單日期", value: orderItem.date },
    { field: "取貨方式", value: deliveryMethod },
  ];

  const buyDetail = (
    <div className="pt-2.5 mb-5 mt-1 ">
      <div className="text-[#020202] mb-3 border-b-[1px] pb-1.25 border-[#D9D9D9] pl-1.25">
        購物明細
      </div>
      {orderItem.details.map((d) => (
        <BuyItem key={d.prodName} {...d} />
      ))}
      <div></div>
      <div className={"flex justify-between w-full mt-3.5 px-1.25 items-end"}>
        <span className={"text-sm"}>{"總金額"}</span>
        <span className={"text-staffbuy-primary font-bold"}>
          NT$ {orderItem.totalPrice}
        </span>
      </div>
    </div>
  );

  const moreInfo = [
    orderItem.shippingInfo.nQ_Bag !== undefined
      ? {
          ...{
            field: "附提袋數",
            value: orderItem.shippingInfo.nQ_Bag,
            link: "",
          },
        }
      : { ...{} },
    {
      field: "訂單情況",
      value: `${orderItem.shippingInfo.fG_Status}`,
      link: "",
    },
    {
      field: "發票號碼",
      value: orderItem.invoiceInfo.invoiceNumber
        ? `${orderItem.invoiceInfo.invoiceNumber}`
        : "尚未開立",
      link: "",
    },
  ];

  if (orderItem.invoiceInfo.invoiceDate) {
    moreInfo.push({
      field: "發票日期",
      value: orderItem.invoiceInfo.invoiceDate,
      link: "",
    });
  }

  if (orderItem.shippingInfo.cX_GetDate) {
    moreInfo.push({
      field: "取貨時間",
      value: orderItem.shippingInfo.cX_GetDate,
      link: "",
    });
  }
  if (orderItem.groupBuyName) {
    moreInfo.push({
      field: "團購主題",
      value: orderItem.groupBuyName,
      link: "",
    });
  }
  if (orderItem.purchasePeriod) {
    moreInfo.push({
      field: "團購期間",
      value: orderItem.purchasePeriod,
      link: "",
    });
  }
  if (orderItem.invoiceInfo.carrierId) {
    moreInfo.push({
      field: "載具號碼",
      value: orderItem.invoiceInfo.carrierId,
      link: "",
    });
  }
  if (orderItem.invoiceInfo.loveCode) {
    moreInfo.push({
      field: "愛心碼",
      value: orderItem.invoiceInfo.loveCode,
      link: "",
    });
  }

  if (isDelivery && orderItem.shippingInfo.trackingNumber) {
    moreInfo.push({
      field: "黑貓宅配單號",
      value: orderItem.shippingInfo.trackingNumber || "",
      link:
        "https://www.t-cat.com.tw/Inquire/Trace.aspx?method=result&billID=" +
        orderItem.shippingInfo.trackingNumber,
    });
  }

  if (isDelivery) {
    moreInfo.push(
      { field: "收件人", value: orderItem.shippingInfo.receiver, link: "" },
      { field: "收件人電話", value: orderItem.shippingInfo.phone, link: "" },
      { field: "到貨地址", value: orderItem.shippingInfo.address, link: "" },
    );
  }

  return (
    <div className="w-full shadow-[1px_2px_4px_0px_rgba(0,0,0,0.25)] rounded-[15px] bg-white overflow-hidden">
      <div className="border-b font-[600] border-[#D9D9D9] text-[#020202] py-2.5 px-5 flex justify-between items-center">
        訂單資訊
        {orderItem.groupBuyName && orderItem.serialNum === "尚未成單" && (
          <FaRegTrashAlt
            onClick={() => {
              if (onClickDeleteBtn) {
                onClickDeleteBtn(orderItem.idBuyM!);
              }
            }}
          />
        )}
      </div>

      <div className="pt-3">
        <div className="px-5">
          {basicInfo.map((item) => (
            <DataRow key={item.field} field={item.field} value={item.value} />
          ))}
          {!openDetail && (
            <DataRow
              field="總金額"
              value={`NT$ ${orderItem.totalPrice.toLocaleString()}`}
              isTotalPrice
            />
          )}
        </div>
        {openDetail && (
          <>
            <div className="px-2.5 bg-[#EFF9FF] pb-2.5 mx-2.5 rounded-[15px] max-h-75 overflow-auto ">
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

      <div className="bg-gray-100 py-2 px-3.5 text-right">
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

import type { ReactNode } from "react";
import CheckoutItems from "../../components/business/CheckoutItems";
import OrdererInfo from "../../components/business/OrdererInfo";
import ShippingInfo from "../../components/business/ShippingInfo";
import InvoiceInfo from "../../components/business/InvoiceInfo";

export default function StaffCheckoutPage() {
  return (
    <div className="w-full p-[15px] bg-[#FBFBFB] pb-[80px]">
      <div>
        <BlockTitle className="mt-[28px] mb-[10px]">購買商品</BlockTitle>
        <CheckoutItems />
        <BlockTitle className="mt-[30px] mb-[10px]">訂購資訊</BlockTitle>
        <OrdererInfo />
        <BlockTitle className="mt-[30px] mb-[10px]">取貨資訊</BlockTitle>
        <ShippingInfo />
        <BlockTitle className="mt-[30px] mb-[10px]">發票資訊</BlockTitle>
        <InvoiceInfo />
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

const BlockTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={"text-[24px] w-full text-left " + className}>{children}</div>
);

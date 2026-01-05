import CheckoutItems from "../../components/business/CheckoutItems";
import OrdererInfo from "../../components/business/OrdererInfo";
import ShippingInfo from "../../components/business/ShippingInfo";
import InvoiceInfo from "../../components/business/InvoiceInfo";
import MobileCheckoutBar from "@/components/business/MobileCheckoutBar";
import CartSummary from "@/components/business/CartSummary";
import { BlockTitle } from "./StaffProductPage";

export default function StaffCheckoutPage() {
  const handlePurchase = () => {};

  return (
    <div className="w-full p-[15px] bg-[#FBFBFB] pb-[120px] md:flex md:gap-[40px] md:justify-center">
      <div className="">
        <BlockTitle className="mt-[28px] mb-[10px]">購買商品</BlockTitle>
        <CheckoutItems />
        <BlockTitle className="mt-[30px] mb-[10px]">訂購資訊</BlockTitle>
        <OrdererInfo />
        <BlockTitle className="mt-[30px] mb-[10px]">取貨資訊</BlockTitle>
        <ShippingInfo />
        <BlockTitle className="mt-[30px] mb-[10px]">發票資訊</BlockTitle>
        <InvoiceInfo />
      </div>
      <div className="hidden md:inline-block sticky top-[0px] h-[400px] ">
        <CartSummary />
      </div>
      <MobileCheckoutBar
        className="md:hidden"
        onClickPurchaseBtn={handlePurchase}
      />
    </div>
  );
}


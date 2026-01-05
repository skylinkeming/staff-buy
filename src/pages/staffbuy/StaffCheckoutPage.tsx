import CheckoutItems from "../../components/staffbuy/checkout/CheckoutItems";
import OrdererInfo from "../../components/staffbuy/checkout/OrdererInfo";
import ShippingInfo from "../../components/staffbuy/checkout/ShippingInfo";
import InvoiceInfo from "../../components/staffbuy/checkout/InvoiceInfo";
import MobileCheckoutBar from "@/components/staffbuy/purchase/MobileCheckoutBar";
import CartSummary from "@/components/staffbuy/purchase/CartSummary";
import { BlockTitle } from "./StaffProductPage";
import Breadcrumbs from "@/components/common/BreadCrumbs";

export default function StaffCheckoutPage() {
  const handlePurchase = () => {};

  return (
    <div className="w-full p-[15px] bg-[#FBFBFB] pb-[120px] md:flex md:gap-[40px] md:justify-center">
      <div className="">
        <div className="max-w-7xl mx-auto mt-10">
          <Breadcrumbs />
        </div>
        <BlockTitle className="mt-[28px] mb-[10px]">購買商品</BlockTitle>
        <CheckoutItems />
        <BlockTitle className="mt-[30px] mb-[10px]">訂購資訊</BlockTitle>
        <OrdererInfo />
        <BlockTitle className="mt-[30px] mb-[10px]">取貨資訊</BlockTitle>
        <ShippingInfo />
        <BlockTitle className="mt-[30px] mb-[10px]">發票資訊</BlockTitle>
        <InvoiceInfo />
      </div>
      <div className="hidden md:inline-block sticky top-[0px] h-[400px] mt-15">
        <CartSummary />
      </div>
      <MobileCheckoutBar className="md:hidden" onClickBtn={handlePurchase} />
    </div>
  );
}

import CheckoutItems from "../../components/staffbuy/checkout/CheckoutItems";
import OrdererInfo from "../../components/staffbuy/checkout/OrdererInfo";
import ShippingInfo from "../../components/staffbuy/checkout/ShippingInfo";
import InvoiceInfo from "../../components/staffbuy/checkout/InvoiceInfo";
import MobileCheckoutBar from "@/components/staffbuy/purchase/MobileCheckoutBar";
import CartSummary from "@/components/staffbuy/purchase/CartSummary";
import { BlockTitle } from "./StaffProductPage";
import Breadcrumbs from "@/components/common/BreadCrumbs";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import AppAlert from "@/components/common/AppAlert";

export default function StaffCheckoutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formErrors = useCartStore((state) => state.formErrors);

  const handlePurchase = async () => {
    setIsSubmitting(true);
    if (formErrors.shipping || formErrors.invoice) {
      await AppAlert({
        title: "資訊錯誤",
        message: "請檢查填寫欄位資訊是否有誤",
        okText: "確定",
        hideCancel: true,
      });
      return;
    }
  };

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
        <ShippingInfo isSubmitting={isSubmitting} />
        <BlockTitle className="mt-[30px] mb-[10px]">發票資訊</BlockTitle>
        <InvoiceInfo isSubmitting={isSubmitting} />
      </div>
      <div className="hidden md:inline-block sticky top-[0px] h-[400px] mt-15">
        <CartSummary />
      </div>
      <MobileCheckoutBar className="md:hidden" onClickBtn={handlePurchase} />
    </div>
  );
}

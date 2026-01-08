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
import { useStaffbuyApi } from "@/api/useStaffbuyApi";
import type { CreateOrderRequest } from "@/api/staffbuyApi";

export default function StaffCheckoutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const staffCart = useCartStore((state) => state.staffCart);
  const formErrors = useCartStore((state) => state.formErrors);
  const invoiceInfo = useCartStore((state) => state.invoiceInfo);
  const shippingInfo = useCartStore((state) => state.shippingInfo);

  const { mutate: handleCreateOrder, isPending } =
    useStaffbuyApi.useCreateOrderMutation();

  const cartItems = Object.values(staffCart);

  const handleClickPurchaseButton = async () => {
    setIsSubmitting(true);

    if (cartItems.length === 0) {
      await AppAlert({
        message: "購物車裡沒有商品",
        okText: "確定",
        hideCancel: true,
      });
      return;
    }

    if (formErrors.shipping || formErrors.invoice) {
      await AppAlert({
        title: "資訊錯誤",
        message: "請檢查填寫資訊是否有誤",
        okText: "確定",
        hideCancel: true,
      });
      return;
    }

    const body: CreateOrderRequest = {
      master: {
        fG_Transport: shippingInfo.isDelivery,
        cX_GetDate: shippingInfo.pickupDate,
        cX_Ship_Name: shippingInfo.name,
        cX_Tel: shippingInfo.phone,
        cX_Address: shippingInfo.address,
        cX_Ship_Time: shippingInfo.deliveryTime,
        nQ_Bag: parseInt(shippingInfo.bagQty),
        cX_Invoice_ForWeb: invoiceInfo.carrierId,
        cX_Love_Code: invoiceInfo.donationCode,
      },
      detail: cartItems.map((ci) => ({
        iD_Product: parseInt(ci.productId),
        nQ_BuyQuantity: ci.quantity,
      })),
    };
    handleCreateOrder(body);
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
        <CartSummary
          onClickPurchaseBtn={handleClickPurchaseButton}
          disableBtn={isPending}
        />
      </div>
      <MobileCheckoutBar
        disableBtn={isPending}
        className="md:hidden"
        onClickBtn={handleClickPurchaseButton}
      />
    </div>
  );
}

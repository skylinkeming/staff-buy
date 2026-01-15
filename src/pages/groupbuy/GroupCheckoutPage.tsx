import CheckoutItems from "../../components/staffbuy/checkout/CheckoutItems";
import OrdererInfo from "../../components/staffbuy/checkout/OrdererInfo";
import ShippingInfo from "../../components/staffbuy/checkout/ShippingInfo";
import InvoiceInfo from "../../components/staffbuy/checkout/InvoiceInfo";
import MobileCheckoutBar from "@/components/staffbuy/purchase/MobileCheckoutBar";
import CartSummary from "@/components/staffbuy/purchase/CartSummary";
import Breadcrumbs from "@/components/common/BreadCrumbs";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import AppAlert from "@/components/common/AppAlert";
import type { CreateOrderRequest } from "@/api/groupbuyApi";
import { useNavigate } from "react-router";
import { useGroupbuyApi } from "@/api/useGroupbuyApi";

export default function GroupCheckoutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const groupCart = useCartStore((state) => state.groupCart);
  const selectedGroup = useCartStore((state) => state.selectedGroup);
  const clearCart = useCartStore((state) => state.clearCart);
  const formErrors = useCartStore((state) => state.formErrors);
  const invoiceInfo = useCartStore((state) => state.invoiceInfo);
  const shippingInfo = useCartStore((state) => state.shippingInfo);
  const navigate = useNavigate();

  const { mutate: handleCreateOrder, isPending } =
    useGroupbuyApi.useCreateOrderMutation();

  const cartItems = Object.values(groupCart);

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
        cX_Love_Code: invoiceInfo.loveCode,
        iD_GroupBy: selectedGroup.id,
        cX_Invoice_Store: invoiceInfo.location,
      },
      detail: cartItems.map((ci) => ({
        iD_Product: parseInt(ci.productId),
        nQ_BuyQuantity: ci.quantity,
      })),
    };

    handleCreateOrder(body, {
      onSuccess: async (data) => {
        console.log("訂單建立成功:", data);
        await AppAlert({
          message: "訂單建立成功",
          type: "success",
        });

        clearCart("staff");
        navigate("/groupbuy/orders");
      },
      onError: (error) => {
        console.error("建立失敗:", error);
        AppAlert({
          title: "訂購失敗",
          message: (error as any).response?.data?.message || error.message,
          type: "error",
        });
      },
    });
  };

  return (
    <div className="w-full p-[15px] bg-[#FBFBFB] pb-[120px] md:flex md:gap-[40px] md:justify-center">
      <div className="">
        <Breadcrumbs className="max-w-7xl mx-auto mt-10" />
        <CheckoutItems />
        <OrdererInfo />
        <ShippingInfo isSubmitting={isSubmitting} />
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

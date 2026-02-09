


import MobileCheckoutBar from "@/components/buy/purchase/MobileCheckoutBar";
import Breadcrumbs from "@/components/common/BreadCrumbs";
import { useState } from "react";
import AppAlert from "@/components/common/AppAlert";
import { useNavigate } from "react-router";
import { useGroupbuyApi } from "@/api/useGroupbuyApi";
import CartSummary from "@/components/partyup/client/CartSummary";
import CheckoutItems from "@/components/partyup/client/checkoutPage/CheckoutItems";
import ShippingInfo from "@/components/partyup/client/checkoutPage/ShippingInfo";
import { usePartyupStore } from "@/store/usePartyupStore";

export default function PartyCheckoutPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const partyCarts = usePartyupStore((state) => state.cartsByParty);
    // const clearCart = usePartyupStore((state) => state.clearCart);
    const navigate = useNavigate();

    const { mutate: handleCreateOrder, isPending } =
        useGroupbuyApi.useCreateOrderMutation();

    // const cartItems = Object.values(groupCart);



    const handleAmountChange = async (

    ) => {
    };

    const handleClickPurchaseButton = async () => {
        setIsSubmitting(true);

        if (Object.values(partyCarts).some((cart) => Object.values(cart.items).length === 0)) {
            await AppAlert({
                message: "購物車裡沒有商品",
                okText: "確定",
                hideCancel: true,
            });
            return;
        }

        if (Object.values(partyCarts).some((cart) => cart.formError)) {
            await AppAlert({
                title: "資訊錯誤",
                message: "請檢查填寫資訊是否有誤",
                okText: "確定",
                hideCancel: true,
            });
            return;
        }
        // const body: CreateOrderRequest = {
        //     master: {
        //         fG_Transport: shippingInfo.isDelivery,
        //         cX_GetDate: shippingInfo.pickupDate,
        //         cX_Ship_Name: shippingInfo.name,
        //         cX_Tel: shippingInfo.phone,
        //         cX_Address: shippingInfo.address || shippingInfo.location,
        //         cX_Ship_Time: shippingInfo.deliveryTime,
        //         nQ_Bag: parseInt(shippingInfo.bagQty),
        //         cX_Invoice_ForWeb: invoiceInfo.carrierId,
        //         cX_Love_Code: invoiceInfo.loveCode,
        //         iD_GroupBy: selectedGroup.id,
        //         cX_Invoice_Store: invoiceInfo.location,
        //     },
        //     detail: cartItems.map((ci) => ({
        //         iD_Product: parseInt(ci.productId),
        //         nQ_BuyQuantity: ci.quantity,
        //         iD_GroupBy_Item: parseInt(ci.groupItemId!),
        //     })),
        // };

        // handleCreateOrder(body, {
        //     onSuccess: async (data) => {
        //         setIsSubmitting(false);
        //         console.log("訂單建立成功:", data);
        //         await AppAlert({
        //             message: "訂單建立成功",
        //             type: "success",
        //         });

        //         clearCart("group");
        //         navigate("/groupbuy/orders");
        //     },
        //     onError: (error) => {
        //         console.error("建立失敗:", error);
        //         AppAlert({
        //             title: "訂購失敗",
        //             message: (error as any).response?.data?.message || error.message,
        //             type: "error",
        //         });
        //     },
        // });
    };

    return (
        <div className="w-full bg-[#FBFBFB] pb-[120px] md:flex md:gap-[40px] md:justify-center">

            <div className="">

                <Breadcrumbs className="max-w-7xl mx-auto mt-5" />
                <div className="mt-[28px] mb-[25px] text-[24px] font-bold">我的購物車</div>

                <CheckoutItems onAmountChange={handleAmountChange} />
                {
                    Object.keys(partyCarts).map((partyId) => (
                        <ShippingInfo key={partyId} isSubmitting={isSubmitting} partyId={partyId} />
                    ))
                }
            </div>
            <div className="hidden md:inline-block sticky top-35 h-100 mt-15">
                <CartSummary
                    onClickPurchaseBtn={handleClickPurchaseButton}
                    disableBtn={isPending}
                    showDetail={false}
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

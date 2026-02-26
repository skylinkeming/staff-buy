


import MobileCheckoutBar from "@/components/partyup/client/MobileCheckoutBar";
import Breadcrumbs from "@/components/common/BreadCrumbs";
import { useEffect, useState } from "react";
import AppAlert from "@/components/common/AppAlert";
import { useNavigate } from "react-router";
import CartSummary from "@/components/partyup/client/CartSummary";
import { usePartyupStore } from "@/store/usePartyupStore";
import PartyCheckoutForm from "@/components/partyup/client/checkoutPage/PartyCheckoutForm";
import { usePartyupApi } from "@/api/partyup/usePartyupApi";
import { partyupApi, type CreateOrderRequest } from "@/api/partyup/partyupApi";

export default function ClientCheckoutPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const partyCarts = usePartyupStore((state) => state.cartsByParty);
    const getApiPayload = usePartyupStore((state) => state.getApiPayload);
    // const clearCart = usePartyupStore((state) => state.clearCart);
    const navigate = useNavigate();

    const { mutate: handleCreateOrder, isPending } =
        usePartyupApi.useCreateOrderMutation();

    // const cartItems = Object.values(groupCart);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


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

        if (Object.values(partyCarts).some((partyCart) => partyCart.formError)) {
            await AppAlert({
                title: "資訊錯誤",
                message: "請檢查填寫資訊是否有誤",
                okText: "確定",
                hideCancel: true,
            });
            return;
        }


        const payloads = getApiPayload();
        console.log("payloads", payloads);

        const results = await postOrders(payloads);
        console.log("results", results);

        // handleCreateOrder(body, {
        //     onSuccess: async (data) => {
        //         setIsSubmitting(false);
        //         console.log("訂單建立成功:", data);
        //         await AppAlert({
        //             message: "訂單建立成功",
        //             type: "success",
        //         });

        //         // clearCart("group");
        //         navigate("/partyup/orders");
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


    const postOrders = async (payloads: CreateOrderRequest[]) => {
        const results = [];

        for (const data of payloads) {
            try {
                console.log(`正在發送事件 ID: ${data.eventId}...`);

                // await 會暫停迴圈，直到這支 API 回傳結果
                const response = await partyupApi.createOrder(data);

                // const result = await response.json();
                results.push(response);

                console.log(`事件 ${data.eventId} 完成！`);
            } catch (error) {
                console.error(`事件 ${data.eventId} 失敗:`, error);
                // 根據需求決定：要中斷整個迴圈（break）還是繼續下一支（continue）
                break;
            }
        }

        return results;
    };

    return (
        <div className="w-full bg-[#FBFBFB] pb-[120px] md:flex md:gap-[40px] md:justify-center">

            <div className="">

                <Breadcrumbs className="max-w-7xl mx-auto mt-5" />
                <div className="mt-[28px] mb-[25px] text-[24px] font-bold">我的購物車</div>
                <div className="flex-col flex gap-10">
                    {
                        Object.keys(partyCarts).map((partyCartId) => (
                            <PartyCheckoutForm key={partyCartId} partyId={partyCartId} isSubmitting={isSubmitting} />
                        ))
                    }
                </div>
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

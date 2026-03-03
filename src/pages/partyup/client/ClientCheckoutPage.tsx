


import MobileCheckoutBar from "@/components/partyup/client/MobileCheckoutBar";
import Breadcrumbs from "@/components/common/BreadCrumbs";
import { useEffect, useState } from "react";
import AppAlert from "@/components/common/AppAlert";
import { useNavigate } from "react-router";
import CartSummary from "@/components/partyup/client/CartSummary";
import { usePartyupStore } from "@/store/usePartyupStore";
import PartyCheckoutForm from "@/components/partyup/client/checkoutPage/PartyCheckoutForm";
import { partyupApi, type CreateOrderRequest } from "@/api/partyup/partyupApi";

export default function ClientCheckoutPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const partyCarts = usePartyupStore((state) => state.cartsByParty);
    const removeFromCart = usePartyupStore((state) => state.removeFromCart);
    const getApiPayload = usePartyupStore((state) => state.getApiPayload);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


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

        setIsPending(true);
        const results = await postOrders(payloads);
        setIsPending(false);
        setIsSubmitting(false);

        handleOrderResults(results);

    };


    const postOrders = async (payloads: CreateOrderRequest[]) => {
        const results = [];

        for (const data of payloads) {
            try {
                const response = await partyupApi.createOrder(data);
                results.push(response);
                if (response.success) {
                    // 訂單建成後就把商品從購物車移除
                    data.items.forEach((item) => {
                        removeFromCart(data.partyId, item.optionId);
                    });
                }
            } catch (error) {
                console.error(`訂購揪團 ${data.partyId} 失敗:`, error);
                break;
            }
        }

        return results;
    };

    const handleOrderResults = async (results: any[]) => {
        let isAllSuccess = true;
        let failPartyNames: string[] = [];
        results.forEach((result) => {
            if (!result.success) {
                isAllSuccess = false;
                failPartyNames.push(result.data.partyName);
            }
        });
        if (isAllSuccess) {
            await AppAlert({
                message: "訂單建立成功",
                type: "success",
            });
            navigate("/partyup/orders");
        } else {
            await AppAlert({
                message: `${failPartyNames.join(", ")} 訂購失敗，請重新訂購 `,
                type: "error",
            });
        }
    }

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

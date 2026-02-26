import { usePartyupStore, type PartyCartData } from "@/store/usePartyupStore";
import CheckoutItems from "./CheckoutItems";
import FormInput from "@/components/common/FormInput";
import { Checkbox } from "antd";
import { useEffect } from "react";

export default function PartyCheckoutForm({
    partyId,
    isSubmitting,
}: {
    partyId: string;
    isSubmitting: boolean;
}) {
    const partyCart = usePartyupStore((state) => state.cartsByParty[partyId]);

    if (!partyCart) {
        return null;
    }
    const isPartyChecked = !Object.values(partyCart.items).find(item => !item.checked)
    const shippingInfo = partyCart.shippingInfo;
    const updateShippingInfo = usePartyupStore((state) => state.updateShippingInfo);
    const togglePartyAllChecked = usePartyupStore((state) => state.togglePartyAllChecked);
    const updateFormError = usePartyupStore(state => state.updateFormError);

    const getFieldErrorMsg: (key: keyof typeof shippingInfo) => string = (
        key,
    ) => {
        if (!isSubmitting) return "";

        return validateRules(shippingInfo)[key]();
    };

    const hasError = Object.values(validateRules(shippingInfo)).some(
        (rule) => rule() !== "",
    );

    useEffect(() => {
        updateFormError(partyId, hasError);
    }, [hasError]);



    return <div className="flex flex-col shadow-sm  bg-white border-[#D9D9D9] border rounded-[10px]">
        <div className="flex gap-2.5 text-[18px] font-bold px-5 py-5 border-b border-[#d9d9d9]">
            <Checkbox checked={isPartyChecked} onChange={(e) => {
                togglePartyAllChecked(partyId, !isPartyChecked)
            }} /> {partyCart.partyName}</div>
        <CheckoutItems partyId={partyId} onAmountChange={(cartItem, qty) => { }} />
        <div className="px-5 font-bold border-t border-[#d9d9d9] pt-3.5">宅配資訊</div>
        <div className=" grid grid-cols-1 px-5 py-5 rounded-[15px] max-w-200 md:grid-cols-2 gap-3.5">
            <FormInput
                required
                label="收件人姓名"
                value={shippingInfo.name}
                errorMsg={getFieldErrorMsg("name")}
                onChange={(val) => {
                    updateShippingInfo(partyId, {
                        ...shippingInfo,
                        name: val,
                    });
                }}
            />
            <FormInput
                required
                label="收件人電話"
                value={shippingInfo.phone}
                errorMsg={getFieldErrorMsg("phone")}
                onChange={(val) => {
                    updateShippingInfo(partyId, {
                        ...shippingInfo,
                        phone: val,
                    });
                }}
            />
            <FormInput
                required
                label="到貨地址"
                value={shippingInfo.address}
                errorMsg={getFieldErrorMsg("address")}
                onChange={(val) => {
                    updateShippingInfo(partyId, {
                        ...shippingInfo,
                        address: val,
                    });
                }}
            /></div></div>;
}



const validateRules = (
    shippingInfo: Partial<PartyCartData["shippingInfo"]>,
) => ({
    name: () => {
        if (!shippingInfo.name) return "請填寫收件人";
        return "";
    },
    phone: () => {
        if (!shippingInfo.phone) return "請填寫收件人電話";
        return "";
    },
    address: () => {
        if (!shippingInfo.address) return "請填寫收件人地址";
        return "";
    },
});

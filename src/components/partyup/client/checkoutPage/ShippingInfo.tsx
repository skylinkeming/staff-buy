import { useCartStore, type CartState } from "@/store/useCartStore";
import { useEffect } from "react";
import { BlockTitle } from "@/pages/staffbuy/StaffProductPage";
import { useLocation } from "react-router";
import FormInput from "@/components/common/FormInput";
import { usePartyupStore } from "@/store/usePartyupStore";

export default function ShippingInfo({
    isSubmitting,
    partyId,
}: {
    isSubmitting: boolean;
    partyId: string;
}) {
    const updateShippingInfo = usePartyupStore((state) => state.updateShippingInfo);
    const partyCarts = usePartyupStore((state) => state.cartsByParty);
    const shippingInfo = partyCarts[partyId].shippingInfo;


    const getFieldErrorMsg: (key: keyof typeof shippingInfo) => string = (
        key,
    ) => {
        if (!isSubmitting) return "";

        return validateRules(shippingInfo)[key]();
    };

    const hasError = Object.values(validateRules(shippingInfo)).some(
        (rule) => rule() !== "",
    );

    // useEffect(() => {
    //     setFormError("shipping", hasError);
    // }, [hasError]);

    return (
        <>
            <BlockTitle className="mt-[30px] mb-[10px] border-l-4 border-l-partyup-primary pl-2.5 font-medium">{partyCarts[partyId].partyName} <span className="text-sm ml-1.25">宅配資訊</span></BlockTitle>
            <div className="border-[#D9D9D9] border bg-[white] grid grid-cols-1 px-3.5 py-5 rounded-[15px] max-w-200 md:grid-cols-2 gap-2.5 pb-12.5">
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
                />
            </div>
        </>
    );
}

const validateRules = (
    shippingInfo: Partial<CartState["shippingInfo"]>,
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

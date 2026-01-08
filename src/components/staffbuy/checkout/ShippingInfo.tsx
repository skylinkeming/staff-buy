import { useCartStore, type CartState } from "@/store/useCartStore";
import FormInput from "../../common/FormInput";
import { useEffect } from "react";
import { useStaffbuyApi } from "@/api/useStaffbuyApi";

export default function ShippingInfo({
  isSubmitting,
}: {
  isSubmitting: boolean;
}) {
  const { data: bagList } = useStaffbuyApi.useBagListQuery();
  const { data: shiptimeList } = useStaffbuyApi.useShiptimeListQuery();
  const updateShippingInfo = useCartStore((state) => state.updateShippingInfo);
  const shippingInfo = useCartStore((state) => state.shippingInfo);
  const setFormError = useCartStore((state) => state.setFormError);

  const getFieldErrorMsg: (key: keyof typeof shippingInfo) => string = (
    key
  ) => {
    if (!isSubmitting) return "";
    return validateRules(shippingInfo)[key]();
  };

  const hasError = Object.values(validateRules(shippingInfo)).some(
    (rule) => rule() !== ""
  );

  useEffect(() => {
    setFormError("shipping", hasError);
  }, [hasError]);

  return (
    <div className="bg-[white] grid grid-cols-1 px-2.5 py-5 rounded-[15px] max-w-175 md:grid-cols-2 gap-2.5">
      <FormInput
        required
        variant="date"
        label="取貨日期"
        value={shippingInfo.pickupDate}
        errorMsg={getFieldErrorMsg("pickupDate")}
        onChange={(val) => {
          updateShippingInfo({
            pickupDate: val,
          });
        }}
      />
      <FormInput
        required
        variant="select"
        label="附提袋數"
        value={shippingInfo.bagQty}
        errorMsg={getFieldErrorMsg("bagQty")}
        optionData={
          bagList
            ? bagList?.map((b) => ({
                value: b.value,
                label: b.text,
                disabled: b.disabled,
              }))
            : []
        }
        onChange={(val) => {
          updateShippingInfo({
            bagQty: val,
          });
        }}
      />
      <FormInput
        required
        variant="select"
        label="取貨方式"
        value={shippingInfo.pickupMethod}
        optionData={[
          { value: "0", label: "總管理處" },
          { value: "1", label: "宅配" },
        ]}
        errorMsg={getFieldErrorMsg("pickupMethod")}
        onChange={(val) => {
          updateShippingInfo({
            pickupMethod: val,
          });
        }}
      />
      <FormInput
        required
        label="收件人姓名"
        value={shippingInfo.name}
        errorMsg={getFieldErrorMsg("name")}
        onChange={(val) => {
          updateShippingInfo({
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
          updateShippingInfo({
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
          updateShippingInfo({
            address: val,
          });
        }}
      />
      <FormInput
        required
        variant="select"
        label="希望到貨時段"
        value={shippingInfo.deliveryTime}
        optionData={
          shiptimeList
            ? shiptimeList?.map((b) => ({
                value: b.value,
                label: b.text,
                disabled: b.disabled,
              }))
            : []
        }
        errorMsg={getFieldErrorMsg("deliveryTime")}
        onChange={(val) => {
          updateShippingInfo({
            deliveryTime: val,
          });
        }}
      />
    </div>
  );
}

const validateRules = (shippingInfo: Partial<CartState["shippingInfo"]>) => ({
  pickupDate: () => {
    if (!shippingInfo.pickupDate) return "請選擇取件日期";
    return "";
  },
  bagQty: () => {
    if (!shippingInfo.bagQty) return "請填寫附提袋數量";
    return "";
  },
  pickupMethod: () => {
    if (!shippingInfo.pickupMethod) return "請選擇取件方式";
    return "";
  },
  name: () => {
    //todo: 加檢查是否宅配才需要檢查宅配資訊
    if (!shippingInfo.name) return "請填寫收件人";
    return "";
  },
  phone: () => {
    //todo: 加檢查是否宅配才需要檢查宅配資訊
    if (!shippingInfo.phone) return "請填寫收件人電話";
    return "";
  },
  address: () => {
    //todo: 加檢查是否宅配才需要檢查宅配資訊
    if (!shippingInfo.address) return "請填寫收件人地址";
    return "";
  },
  deliveryTime: () => {
    //todo: 加檢查是否宅配才需要檢查宅配資訊
    if (!shippingInfo.deliveryTime) return "請填寫希望宅配時間";
    return "";
  },
});

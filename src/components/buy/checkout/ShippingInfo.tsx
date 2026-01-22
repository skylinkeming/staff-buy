import { useCartStore, type CartState } from "@/store/useCartStore";
import FormInput from "../../common/FormInput";
import { useEffect } from "react";
import { BlockTitle } from "@/pages/staffbuy/StaffProductPage";
import { useGroupbuyApi } from "@/api/useGroupbuyApi";
import { useLocation } from "react-router";
import { useCommonApi } from "@/api/useCommonApi";

export default function ShippingInfo({
  isSubmitting,
}: {
  isSubmitting: boolean;
}) {
  const location = useLocation();
  const isGroupBuy = location.pathname.includes("groupbuy");
  const { data: bagList } = useCommonApi.useBagListQuery();
  const { data: shiptimeList } = useCommonApi.useShiptimeListQuery();
  const selectedGroup = useCartStore((state) => state.selectedGroup);
  const { data: pickupStoreList } = useGroupbuyApi.usePickupStoreListQuery(
    selectedGroup?.id,
  );
  const updateShippingInfo = useCartStore((state) => state.updateShippingInfo);
  const shippingInfo = useCartStore((state) => state.shippingInfo);
  const setFormError = useCartStore((state) => state.setFormError);

  const getFieldErrorMsg: (key: keyof typeof shippingInfo) => string = (
    key,
  ) => {
    if (!isSubmitting) return "";

    return validateRules(shippingInfo, isGroupBuy)[key]();
  };

  const hasError = Object.values(validateRules(shippingInfo, isGroupBuy)).some(
    (rule) => rule() !== "",
  );

  useEffect(() => {
    setFormError("shipping", hasError);
  }, [hasError]);

  return (
    <>
      <BlockTitle className="mt-[30px] mb-[10px]">取貨資訊</BlockTitle>
      <div className="bg-[white] grid grid-cols-1 px-2.5 py-5 rounded-[15px] max-w-175 md:grid-cols-2 gap-2.5">
        {!isGroupBuy && (
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
        )}
        {!isGroupBuy && (
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
        )}
        {pickupStoreList && isGroupBuy ? (
          <FormInput
            required
            variant="select"
            label="取貨方式"
            value={shippingInfo.location}
            optionData={
              pickupStoreList
                ? pickupStoreList?.map((b) => ({
                    value: b.cX_ShipPlace,
                    label: b.cX_ShipPlace === "Y" ? "宅配" : b.cX_ShipPlace,
                  }))
                : []
            }
            errorMsg={getFieldErrorMsg("location")}
            onChange={(val) => {
              if (val === "Y") {
                updateShippingInfo({
                  isDelivery: val as "Y" | "N",
                  location: "宅配",
                });
              } else {
                updateShippingInfo({
                  location: val,
                  isDelivery: "N",
                });
              }
            }}
          />
        ) : (
          <FormInput
            required
            variant="select"
            label="取貨方式"
            value={shippingInfo.isDelivery}
            optionData={[
              { value: "N", label: "自取" },
              { value: "Y", label: "宅配" },
            ]}
            errorMsg={getFieldErrorMsg("isDelivery")}
            onChange={(val) => {
              updateShippingInfo({
                isDelivery: val as "Y" | "N",
              });
            }}
          />
        )}
        {shippingInfo.isDelivery === "Y" && (
          <>
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
          </>
        )}
      </div>
    </>
  );
}

const validateRules = (
  shippingInfo: Partial<CartState["shippingInfo"]>,
  isGroupBuy?: boolean,
) => ({
  pickupDate: () => {
    if (!isGroupBuy && !shippingInfo.pickupDate) return "請選擇取件日期";
    return "";
  },
  bagQty: () => {
    if (!shippingInfo.bagQty) return "請填寫附提袋數量";
    return "";
  },
  isDelivery: () => {
    if (!shippingInfo.isDelivery) return "請選擇取件方式";
    return "";
  },
  name: () => {
    if (shippingInfo.isDelivery === "N") return "";
    if (!shippingInfo.name) return "請填寫收件人";
    return "";
  },
  phone: () => {
    if (shippingInfo.isDelivery === "N") return "";
    if (!shippingInfo.phone) return "請填寫收件人電話";
    return "";
  },
  address: () => {
    if (shippingInfo.isDelivery === "N") return "";
    if (!shippingInfo.address) return "請填寫收件人地址";
    return "";
  },
  deliveryTime: () => {
    if (shippingInfo.isDelivery === "N") return "";
    if (!shippingInfo.deliveryTime) return "請填寫希望宅配時間";
    return "";
  },
  location: () => {
    if (!isGroupBuy || shippingInfo.location) return "";
    if (!shippingInfo.location) return "請選擇取貨方式";
    return "";
  },
});

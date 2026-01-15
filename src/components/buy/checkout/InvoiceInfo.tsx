import { useCartStore, type CartState } from "@/store/useCartStore";
import FormInput from "../../common/FormInput";
import { useEffect } from "react";
import { useStaffbuyApi } from "@/api/useStaffbuyApi";
import { useLocation } from "react-router";
import { BlockTitle } from "@/pages/staffbuy/StaffProductPage";

export default function InvoiceInfo({
  isSubmitting,
}: {
  isSubmitting: boolean;
}) {
  const location = useLocation();
  const isGroupBuy = location.pathname.includes("groupbuy");
  const { data: invoicePickupStoreList } =
    useStaffbuyApi.useInvoicePickStoreListQuery(isGroupBuy);


  const updateInvoiceInfo = useCartStore((state) => state.updateInvoiceInfo);
  const invoiceInfo = useCartStore((state) => state.invoiceInfo);
  const setFormError = useCartStore((state) => state.setFormError);

  // 驗證表單資訊
  const validateRules = (invoiceInfo: Partial<CartState["invoiceInfo"]>) => ({
    location: () => {
      if (isGroupBuy && !invoiceInfo.location) return "請選擇發票領取地點";
      return "";
    },
    carrierId: () => {
      if (!!invoiceInfo.carrierId && !invoiceInfo.carrierId.startsWith("/")) {
        return "請確認載具格式";
      }
      if (!!invoiceInfo.carrierId && !!invoiceInfo.loveCode) {
        return "載具跟愛心碼只能填一個";
      }
      return "";
    },
    loveCode: () => {
      if (!!invoiceInfo.carrierId && !!invoiceInfo.loveCode) {
        return "載具跟愛心碼只能填一個";
      }
      return "";
    },
  });

  // 取得欄位錯誤訊息
  const getFieldErrorMsg: (key: keyof typeof invoiceInfo) => string = (key) => {
    if (!isSubmitting) return "";
    return validateRules(invoiceInfo)[key]();
  };

  const hasError = Object.values(validateRules(invoiceInfo)).some(
    (rule) => rule() !== ""
  );

  useEffect(() => {
    setFormError("invoice", hasError);
  }, [hasError]);

  return (
    <>
      <BlockTitle className="mt-[30px] mb-[10px]">發票資訊</BlockTitle>
      <div className="bg-[white] px-[10px] py-[20px] rounded-[15px] md:w-175 grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {isGroupBuy && (
          <FormInput
            required
            variant="select"
            label="發票領取地點"
            value={invoiceInfo.location}
            optionData={
              invoicePickupStoreList
                ? invoicePickupStoreList?.map((b) => ({
                    value: b.value,
                    label: b.text,
                    disabled: b.disabled,
                  }))
                : []
            }
            errorMsg={getFieldErrorMsg("location")}
            onChange={(val) => {
              updateInvoiceInfo({
                location: val,
              });
            }}
          />
        )}
        <FormInput
          label="愛心碼"
          value={invoiceInfo.loveCode}
          onChange={(val) => {
            updateInvoiceInfo({
              loveCode: val,
            });
          }}
        />
        <FormInput
          label="載具編號"
          value={invoiceInfo.carrierId}
          errorMsg={getFieldErrorMsg("carrierId")}
          onChange={(val) => {
            updateInvoiceInfo({
              carrierId: val,
            });
          }}
        />
      </div>
    </>
  );
}

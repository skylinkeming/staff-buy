import { useCartStore } from "@/store/useCartStore";
import FormInput from "../../common/FormInput";

export default function InvoiceInfo() {
  const updateInvoiceInfo = useCartStore((state) => state.updateInvoiceInfo);
  const invoiceInfo = useCartStore((state) => state.invoiceInfo);

  return (
    <div className="bg-[white] px-[10px] py-[20px] rounded-[15px] md:w-175 grid grid-cols-1 md:grid-cols-2 gap-2.5">
      <FormInput
        required
        variant="select"
        label="發票領取地點"
        value={invoiceInfo.location}
        optionData={[
          { value: "jack", label: "Jack" },
          { value: "lucy", label: "Lucy" },
          { value: "Yiminghe", label: "yiminghe" },
          { value: "disabled", label: "Disabled", disabled: true },
        ]}
        onChange={(val) => {
          updateInvoiceInfo({
            location: val,
          });
        }}
      />
      <FormInput
        label="愛心碼"
        value={invoiceInfo.donationCode}
        onChange={(val) => {
          updateInvoiceInfo({
            donationCode: val,
          });
        }}
      />
      <FormInput
        label="載具編號"
        value={invoiceInfo.carrierId}
        onChange={(val) => {
          updateInvoiceInfo({
            carrierId: val,
          });
        }}
      />
    </div>
  );
}

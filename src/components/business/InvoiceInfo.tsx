import FormInput from "../common/FormInput";

export default function InvoiceInfo() {
  return (
    <div className="bg-[white] flex flex-col gap-[10px] px-[10px] py-[20px] rounded-[15px]">
      <FormInput
        required
        variant="select"
        label="發票領取地點"
        value={"jack"}
        optionData={[
          { value: "jack", label: "Jack" },
          { value: "lucy", label: "Lucy" },
          { value: "Yiminghe", label: "yiminghe" },
          { value: "disabled", label: "Disabled", disabled: true },
        ]}
        onChange={(val) => {
          console.log(val);
        }}
      />
      <FormInput disabled label="愛心碼" value={"資訊部"} />
      <FormInput disabled label="載具編號" value={"016555/王大明"} />
    </div>
  );
}

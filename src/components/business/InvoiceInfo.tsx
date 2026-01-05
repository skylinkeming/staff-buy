import FormInput from "../common/FormInput";

export default function InvoiceInfo() {
  return (
    <div className="bg-[white] px-[10px] py-[20px] rounded-[15px] md:w-175 grid grid-cols-1 md:grid-cols-2 gap-2.5">
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
      <FormInput label="愛心碼" value={"資訊部"} />
      <FormInput label="載具編號" value={"016555/王大明"} />
    </div>
  );
}

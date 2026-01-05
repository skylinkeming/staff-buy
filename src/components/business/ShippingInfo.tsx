import FormInput from "../common/FormInput";

export default function ShippingInfo() {
  return (
    <div className="bg-[white] grid grid-cols-1 px-2.5 py-5 rounded-[15px] max-w-175 md:grid-cols-2 gap-2.5">
      <FormInput
        required
        variant="date-picker"
        label="取貨日期"
        value={"2025/12/14"}
        onChange={(val) => {
          console.log(val);
        }}
      />
      <FormInput required label="附提袋數" value={"2"} />
      <FormInput
        required
        variant="select"
        label="取貨方式"
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
      <FormInput required label="收件人姓名" value={"2"} />
      <FormInput required label="收件人電話" value={"2"} />
      <FormInput required label="到貨地址" value={"2"} />
      <FormInput
        required
        variant="select"
        label="希望到貨時段"
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
    </div>
  );
}

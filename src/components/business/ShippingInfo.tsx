import { Select } from "antd";
import FormInput from "../common/FormInput";

export default function ShippingInfo() {
  return (
    <div className="bg-[white] flex flex-col gap-[10px] px-[10px] py-[20px] rounded-[15px]">
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

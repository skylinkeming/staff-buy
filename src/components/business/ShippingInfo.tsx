import FormInput from "../common/FormInput";

export default function ShippingInfo() {
  return (
    <div className="bg-[white] flex flex-col gap-[10px] px-[10px] py-[20px] rounded-[15px]">
      <FormInput required label="取貨日期" value={"2025/12/14"} />
      <FormInput required label="附提袋數" value={"2"} />
      <FormInput required label="收件人姓名" value={"2"} />
      <FormInput required label="收件人電話" value={"2"} />
      <FormInput required label="到貨地址" value={"2"} />
    </div>
  );
}

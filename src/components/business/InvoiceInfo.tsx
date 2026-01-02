import FormInput from "../common/FormInput";

export default function InvoiceInfo() {
  return (
    <div className="bg-[white] flex flex-col gap-[10px] px-[10px] py-[20px] rounded-[15px]">
      <FormInput disabled label="愛心碼" value={"資訊部"} />
      <FormInput disabled label="載具編號" value={"016555/王大明"} />
    </div>
  );
}

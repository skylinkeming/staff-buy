import FormInput from "../../common/FormInput";

export default function OrdererInfo() {
  return (
    <div className="bg-[white] grid grid-cols-1 gap-[10px] px-[10px] py-[20px] rounded-[15px] md:w-175 md:grid-cols-2">
      <FormInput disabled label="部門" value={"資訊部"} />
      <FormInput disabled label="工號/姓名" value={"016555/王大明"} />
    </div>
  );
}

import FormInput from "../../common/FormInput";
import { useStaffbuyApi } from "@/api/useStaffbuyApi";

export default function OrdererInfo() {
  const { data } = useStaffbuyApi.useUserInfoQuery();

  return (
    <div className="bg-[white] grid grid-cols-1 gap-[10px] px-[10px] py-[20px] rounded-[15px] md:w-175 md:grid-cols-2">
      <FormInput
        disabled
        label="部門"
        value={data?.deptName}
        onChange={() => {}}
      />
      <FormInput
        disabled
        label="工號/姓名"
        value={data?.eID + "/" + data?.displayName}
        onChange={() => {}}
      />
    </div>
  );
}

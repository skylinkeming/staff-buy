import { BlockTitle } from "@/pages/staffbuy/StaffProductPage";
import FormInput from "../../common/FormInput";
import { useCommonApi } from "@/api/useCommonApi";

export default function OrdererInfo() {
  const { data } = useCommonApi.useUserInfoQuery();

  return (
    <>
      <BlockTitle className="mt-[30px] mb-[10px]">訂購資訊</BlockTitle>
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
    </>
  );
}

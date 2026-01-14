import { ConfigProvider, DatePicker, type GetProps } from "antd";
import zhTW from "antd/es/locale/zh_TW";
import dayjs from "dayjs";
import "dayjs/locale/zh-tw";

type RangePickerProps = GetProps<typeof DatePicker>;
type DisabledDateFn = RangePickerProps["disabledDate"];

dayjs.locale("zh-tw");

export default function CustomDatePicker({
  disabled = false,
  value,
  onChange,
  status,
  className = "",
  customDisabledDate,
}: {
  disabled: boolean;
  value: string;
  errorMsg?: string;
  onChange: (dateStr: string) => void;
  status: "error" | "";
  className?: string;
  customDisabledDate?: DisabledDateFn;
}) {
  // 預設:只能選兩天後
  const defaultDisabledDate: DisabledDateFn = (current) => {
    return current && current < dayjs().add(2, "day").startOf("day");
  };

  const finalDisabledDate = customDisabledDate ?? defaultDisabledDate;

  return (
    <ConfigProvider locale={zhTW}>
      <DatePicker
        disabled={disabled}
        status={status}
        className={"md:w-full " + className}
        // 注意：value 建議處理一下，避免傳入無效字串導致 dayjs 報錯
        value={value && dayjs(value).isValid() ? dayjs(value) : undefined}
        onChange={(_, str) => {
          // AntD v5 的 str 可能是 string 或 string[]，這裡強制轉為 string
          const dateStr = Array.isArray(str) ? str[0] : str;
          onChange(dateStr || "");
        }}
        disabledDate={finalDisabledDate}
      />
    </ConfigProvider>
  );
}

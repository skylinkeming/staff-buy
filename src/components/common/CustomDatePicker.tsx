import { ConfigProvider, DatePicker } from "antd";
import zhTW from "antd/es/locale/zh_TW";
import dayjs from "dayjs";
import "dayjs/locale/zh-tw";

export default function CustomDatePicker({
  disabled = false,
  value,
  onChange,
  status,
  className = "",
}: {
  disabled: boolean;
  value: string;
  errorMsg?: string;
  onChange: (dateStr: string) => void;
  status: "error" | "";
  className?: string;
}) {
  dayjs.locale("zh-tw");
  return (
    <ConfigProvider locale={zhTW}>
      <DatePicker
        disabled={disabled}
        status={status}
        className={"md:w-full " + className}
        value={value ? dayjs(value) : undefined}
        onChange={(_, str) => {
          onChange(str || "");
        }}
      />
    </ConfigProvider>
  );
}

import { ConfigProvider, DatePicker } from "antd";
import zhTW from "antd/es/locale/zh_TW";
import dayjs from "dayjs";
import "dayjs/locale/zh-tw";

export default function CustomDatePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (dateStr: string) => void;
}) {
  dayjs.locale("zh-tw");
  return (
    <ConfigProvider locale={zhTW}>
      <DatePicker
        value={dayjs(value)}
        onChange={(_, str) => {
          onChange(str || "");
        }}
      />
    </ConfigProvider>
  );
}

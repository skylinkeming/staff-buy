import { ConfigProvider, DatePicker } from "antd";
import zhTW from "antd/es/locale/zh_TW";
import dayjs from "dayjs";
import "dayjs/locale/zh-tw";
const { RangePicker } = DatePicker;

export default function CustomDateRangePicker({
  onChange,
  className = "",
}: {
  onChange: (dateStr1: string, dateStr2: string) => void;
  className?: string;
}) {
  dayjs.locale("zh-tw");
  return (
    <ConfigProvider locale={zhTW}>
      <RangePicker
        format="YYYY/MM/DD"
        className={className}
        onChange={(_, dates) => {
          onChange(dates[0], dates[1]);
        }}
        allowClear
      />
    </ConfigProvider>
  );
}

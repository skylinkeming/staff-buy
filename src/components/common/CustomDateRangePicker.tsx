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
        className={className}
        onChange={(_, dates) => {
          console.log(dates);
          onChange(dates[0], dates[1]);
        }}
        // value={[dayjs(searchStartDate), dayjs(searchEndDate)]}
        // 為了讓面板在 Popover 裡顯示更自然，可以使用以下設定
        allowClear
      />
    </ConfigProvider>
  );
}

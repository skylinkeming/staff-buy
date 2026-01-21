import { ConfigProvider, DatePicker, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import zhTW from "antd/es/locale/zh_TW";
import dayjs from "dayjs";
import "dayjs/locale/zh-tw";
const { RangePicker } = DatePicker;

export default function OrderSearchGroup({
  className,
  isLoading,
  onClickSearchBtn,
  placeholder,
}: {
  className?: string;
  isLoading: boolean;
  onClickSearchBtn: (params: {
    searchTerm: string;
    startDate: string;
    endDate: string;
  }) => void;
  placeholder?: string;
}) {
  const defaultStart = dayjs().subtract(6, "month").format("YYYY-MM-DD");
  const defaultEnd = dayjs().format("YYYY-MM-DD");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [startDate, setStartDate] = useState<string>(defaultStart);
  const [endDate, setEndDate] = useState<string>(defaultEnd);

  const handleSearch = () => {
    onClickSearchBtn({
      searchTerm,
      startDate,
      endDate,
    });
  };

  return (
    <ConfigProvider locale={zhTW}>
      <div className={"block md:flex md:gap-1.25 " + className}>
        <Input
          className="full mb-2.5! md:w-70! md:mb-0!"
          placeholder={placeholder ? placeholder : "請輸入關鍵字查詢"}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
          onClear={() => {
            onClickSearchBtn({
              searchTerm: "",
              startDate,
              endDate,
            });
          }}
          onPressEnter={handleSearch}
        />
        <RangePicker
          className="w-full md:w-60"
          onChange={(_, dates) => {
            if (dates) {
              setStartDate(dates[0]);
              setEndDate(dates[1]);
            } else {
              setStartDate("");
              setEndDate("");
              onClickSearchBtn({
                searchTerm,
                startDate: "",
                endDate: "",
              });
            }
          }}
          value={[
            startDate ? dayjs(startDate) : undefined,
            endDate ? dayjs(endDate) : undefined,
          ]}
        />
        <Button
          loading={isLoading}
          type="primary"
          icon={<SearchOutlined />}
          className="w-full bg-staffbuy-primary! border-bg-staffbuy-primary! hover:opacity-90! mt-2.5 md:mt-0 md:max-w-25"
          onClick={handleSearch}
        >
          搜尋
        </Button>
      </div>
    </ConfigProvider>
  );
}

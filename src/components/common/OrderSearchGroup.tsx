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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const triggerClear = () => {
    setSearchTerm("");
    onClickSearchBtn({
      searchTerm: "",
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
          onClear={triggerClear}
        />
        <RangePicker
          className="w-full md:w-60"
          onChange={(_, dates) => {
            setStartDate(dates[0]);
            setEndDate(dates[1]);
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
          onClick={() => {
            onClickSearchBtn({
              searchTerm,
              startDate,
              endDate,
            });
          }}
        >
          搜尋
        </Button>
      </div>
    </ConfigProvider>
  );
}

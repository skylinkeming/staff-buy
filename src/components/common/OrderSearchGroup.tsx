import { ConfigProvider, DatePicker, Input, Button, Select } from "antd";
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
  buttonClass,
  canSelectOrderStatus
}: {
  className?: string;
  isLoading: boolean;
  onClickSearchBtn: (params: {
    searchTerm: string;
    startDate: string;
    endDate: string;
  }) => void;
  placeholder?: string;
  buttonClass?: string;
  canSelectOrderStatus?: boolean;
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
          className="w-[240px]! md:w-60"
          format="YYYY/MM/DD"
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
        {canSelectOrderStatus && (
          <Select
            disabled={false}
            status={""}
            value={""}
            onChange={(val) => { }}
            placeholder={"訂單狀態"}
            className={`w-25!`}
            options={[
              { value: "", label: "全部" },
              { value: "1", label: "未付款" },
              { value: "2", label: "已付款" },
              { value: "3", label: "已領取" },
              { value: "4", label: "已完成" },
              { value: "5", label: "已取消" },
            ]}
          />
        )}
        <Button
          loading={isLoading}
          type="primary"
          icon={<SearchOutlined />}
          className={"w-full! hover:opacity-90! mt-2.5 md:mt-0 md:max-w-25 " + (buttonClass ? buttonClass : "bg-staffbuy-primary! border-bg-staffbuy-primary! ")}
          onClick={handleSearch}
        >
          搜尋
        </Button>
      </div>
    </ConfigProvider>
  );
}

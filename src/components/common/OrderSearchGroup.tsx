import { DatePicker, Input, Button } from "antd";
import dayjs from "dayjs";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
const { RangePicker } = DatePicker;

export default function OrderSearchGroup({
  isLoading,
  onClickSearchBtn,
}: {
  isLoading: boolean;
  onClickSearchBtn: (params: {
    searchTerm: string;
    startDate: string;
    endDate: string;
  }) => void;
}) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  return (
    <div className="block md:flex">
      <Input
        className="full md:max-w-20 mb-2.5!"
        placeholder="Basic usage"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <RangePicker
        className="w-full md:w-[auto]"
        onChange={(_, dates) => {
          setStartDate(dates[0]);
          setEndDate(dates[1]);
        }}
        value={[
          startDate ? dayjs(startDate) : undefined,
          endDate ? dayjs(endDate) : undefined,
        ]}
        allowClear
      />
      <Button
        loading={isLoading}
        disabled={!searchTerm && !startDate && !endDate}
        type="primary"
        icon={<SearchOutlined />}
        className="w-full bg-staffbuy-primary! border-bg-staffbuy-primary! hover:opacity-90! mt-2.5"
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
  );
}

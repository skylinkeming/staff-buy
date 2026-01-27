import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useRef } from "react";

interface KeywordSearchActionProps {
  className?: string;
  onClickSearch: (searchKey: string) => void;
  placeholder?: string;
  buttonColor?: string;
}

export default function KeywordSearchAction({
  className = "",
  onClickSearch,
  placeholder = "請輸入關鍵字",
  buttonColor = "bg-staffbuy-primary!",
}: KeywordSearchActionProps) {
  const inputRef = useRef<any>(null);

  const handleSearch = () => {
    const value = inputRef.current?.input?.value || "";
    onClickSearch(value);
  };

  const onClearTrigger = () => {
    onClickSearch("");
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Input
        ref={inputRef}
        placeholder={placeholder}
        allowClear
        onClear={onClearTrigger}
        className=" rounded-[15px] border-[#E5E5E5] text-[16px] group 
                   [&_.ant-input-clear-icon]:opacity-0 hover:[&_.ant-input-clear-icon]:opacity-100 transition-all"
        onPressEnter={handleSearch}
        onChange={(e) => {
          if (e.target.value === "") {
            onClickSearch("");
          }
        }}
      />
      <Button
        type="primary"
        icon={<SearchOutlined />}
        onClick={handleSearch}
        style={{ color: buttonColor === "bg-staffbuy-primary!" ? "white" : "black" }}
        className={"h-10 rounded-[15px] px-5 " + buttonColor + " hover:opacity-90! flex items-center justify-center"}
      >
        <span className={"whitespace-nowrap ml-1"}>搜尋</span>
      </Button>
    </div>
  );
}

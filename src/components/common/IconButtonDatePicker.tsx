import { DatePicker } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

const IconButtonDatePicker = () => {
  return (
    <DatePicker
      suffixIcon={
        <CalendarOutlined style={{ fontSize: "20px", color: "#FF9D00" }} />
      }
      variant="borderless"
      style={{ width: "32px" }}
      placeholder=""
      allowClear={false}
      onChange={(date, dateString) => {
        console.log("Selected Date:", dateString);
      }}
    />
  );
};

export default IconButtonDatePicker;

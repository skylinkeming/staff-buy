import { Input } from "antd";
import { Select } from "antd";
import CustomDatePicker from "./CustomDatePicker";

export default function FormInput({
  variant = "",
  label,
  className = "",
  placeholder = "",
  disabled = false,
  required,
  value,
  optionData,
  onChange = () => {},
}: {
  variant?: "date-picker" | "select" | "";
  label: string;
  value: string;
  onChange?: (val: string) => void;
  optionData?: Array<{ value: string; label: string; disabled?: boolean }>;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}) {
  let targetInput = (
    <Input
      // className={`
      //   px-[10px] py-[8px]`}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      onChange={(e) => !onChange || onChange(e.target.value)}
    />
  );

  if (variant === "date-picker") {
    targetInput = <CustomDatePicker value={value} onChange={onChange} />;
  }

  if (variant === "select" && optionData) {
    targetInput = (
      <Select
        value={value}
        style={{ width: "100%" }}
        onChange={onChange}
        options={optionData}
      />
    );
  }

  return (
    <div className={"flex flex-col gap-[3px] " + className}>
      <div>
        {required ? <span className="text-[red]">*</span> : ""}
        {label}
      </div>
      {targetInput}
    </div>
  );
}

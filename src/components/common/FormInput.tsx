import { Input, Select } from "antd";
import CustomDatePicker from "./CustomDatePicker";

interface FormInputProps {
  label?: string;
  required?: boolean;
  variant?: "text" | "number" | "select" | "date";
  value?: string;
  onChange: (val: string) => void;
  optionData?: { value: string; label: string; disabled?: boolean }[];
  errorMsg?: string | false;
  placeholder?: string;
  className?: string;
  disabled?: boolean; // 補回組件層級的 disabled
}

export default function FormInput({
  label,
  required,
  variant = "text",
  value,
  onChange,
  optionData,
  errorMsg,
  placeholder,
  className = "",
  disabled = false, // 預設為 false
}: FormInputProps) {
  const status = errorMsg ? "error" : "";
  const errorClass = status === "error" ? "!bg-red-50" : "";

  const renderInput = () => {
    switch (variant) {
      case "select":
        return (
          <Select
            disabled={disabled}
            status={status}
            value={value}
            onChange={(val) => onChange(val || "")}
            options={optionData}
            placeholder={placeholder}
            className={`w-full ${errorClass} ${className}`}
          />
        );
      case "date":
        return (
          <CustomDatePicker
            className={`w-full ${errorClass} ${className}`}
            disabled={disabled}
            status={status}
            value={value || ""}
            onChange={(val) => onChange(val || "")}
          />
        );
      case "number":
        return (
          <Input
            type="number"
            disabled={disabled}
            status={status}
            value={value}
            onChange={(e) => {
              onChange(e.target.value || "");
            }}
            placeholder={placeholder}
            className={`${errorClass} ${className}`}
          />
        );
      default:
        return (
          <Input
            disabled={disabled}
            status={status}
            value={value}
            onChange={(e) => onChange(e.target.value || "")}
            placeholder={placeholder}
            className={`${errorClass} ${className}`}
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full relative">
      {label && (
        <label className="text-md font-medium text-gray-700">
          {required && <span className="text-red-500 mr-1">*</span>}
          {label}
        </label>
      )}
      {renderInput()}
      {errorMsg && (
        <span className="absolute top-2.5 right-0 text-xs text-red-500">
          {errorMsg}
        </span>
      )}
    </div>
  );
}

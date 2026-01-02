export default function FormInput({
  label,
  className = "",
  placeholder = "",
  disabled = false,
  required,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange?: (val: string) => void;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={"flex flex-col gap-[3px] " + className}>
      <div>
        {required ? <span className="text-[red]">*</span> : ""}
        {label}
      </div>
      <input
        className={`border-[1px] border-[#D9D9D9] 
          px-[10px] py-[8px]
          ${disabled ? " bg-[#fbfbfb]" : ""}`}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

import { FaPlay } from "react-icons/fa";

export default function QuantityInput({
  variant = "stepper",
  className = "",
  inputNumber,
  onChange,
}: {
  variant: string;
  inputNumber: number;
  onChange: (newVal: number) => void;
  className?: string;
}) {
  const handleIncrement = () => {
    onChange(inputNumber + 1);
  };

  const handleDecrement = () => {
    if (inputNumber === 0) {
      return;
    }
    onChange(inputNumber - 1);
  };

  const handleChange = (e) => {
    onChange(parseInt(e.target.value ? e.target.value : "0"));
  };

  if (variant === "classic") {
    return (
      <div
        className={
          "flex border-[1px] border-[#E5E5E5] w-[70px] rounded-[7px] " +
          className
        }
      >
        <div
          className="flex cursor-pointer items-center w-[20px] bg-[#F5F5F5] px-[5px] rounded-tl-[7px] rounded-bl-[7px]"
          onClick={handleDecrement}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </div>
        <div className="w-[38px] text-center border-[#E5E5E5] border-r-[1px] border-l-[1px]">
          {inputNumber}
        </div>
        <div
          onClick={handleIncrement}
          className="flex cursor-pointer items-center w-[20px] px-[5px] bg-[#F5F5F5] rounded-tr-[7px] rounded-br-[7px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="size-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className={"flex " + className}>
      <div
        className="flex cursor-pointer items-center w-[14px] rotate-180"
        onClick={handleDecrement}
      >
        <FaPlay className="w-[7px]" />
      </div>
      <input
        value={inputNumber}
        onChange={handleChange}
        type="number"
        className="w-7.5 text-[#4F48E5] font-bold  text-[16px] md:font-normal text-center appearance-none bg-transparent border-0 p-0 m-0 outline-none focus:outline-none focus:ring-0 shadow-none md:text-inherit
         [&::-webkit-outer-spin-button]:appearance-none
         [&::-webkit-inner-spin-button]:appearance-none"
      />
      <div
        onClick={handleIncrement}
        className="flex cursor-pointer items-center w-[14px]"
      >
        <FaPlay className="w-[7px]" />
      </div>
    </div>
  );
}

import { useRef } from "react";
import { GrClose } from "react-icons/gr";
import { IoIosSearch } from "react-icons/io";

export default function Searchbar({
  className = "",
  onClickSearch,
  placeholder = "",
}: {
  className?: string;
  onClickSearch: (searchKey: string) => void;
  placeholder?: string;
  showDatePickerIcon?: boolean;
  showRangePicker?: boolean;
}) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={"flex gap-[10px] " + className}>
      <div className="relative flex-1 group">
        <input
          placeholder={placeholder}
          ref={searchInputRef}
          className="rounded-[15px] w-full h-full bg-white border-[#E5E5E5] border-[1px]  text-[16px] px-[15px] appearance-none p-0 m-0 outline-none focus:outline-none focus:ring-0 shadow-none text-inherit
          [&::-webkit-outer-spin-button]:appearance-none
          [&::-webkit-inner-spin-button]:appearance-none"
          onChange={(e) => {
            if (e.target.value.length === 0) {
              onClickSearch("");
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onClickSearch(searchInputRef?.current?.value || "");
            }
          }}
        />
        <div className="absolute right-2.5 top-[50%] translate-y-[-50%] flex items-center z-99">
          <GrClose
            className={
              "w-3 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            }
            onClick={() => {
              if (!searchInputRef?.current?.value) return;
              if (searchInputRef.current) searchInputRef.current.value = "";
              onClickSearch("");
            }}
          />
        </div>
      </div>
      <div
        className="flex items-center gap-[10px] bg-staffbuy-primary text-[white] rounded-[15px] px-[20px] py-[5px] text-center cursor-pointer"
        onClick={() => {
          if (!searchInputRef?.current?.value) {
            return;
          }
          onClickSearch(searchInputRef?.current?.value || "");
        }}
      >
        <IoIosSearch />
        <span className="whitespace-nowrap">搜尋</span>
      </div>
    </div>
  );
}

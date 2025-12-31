import { useRef } from "react";

export default function Searchbar({
  className = "",
  onClickSearch,
}: {
  className?: string;
  onClickSearch: (searchKey: string) => void;
}) {
  const searchInputRef = useRef(null);

  return (
    <div className={"flex gap-[20px] " + className}>
      <input
        ref={searchInputRef}
        className="rounded-[5px] border-[#E5E5E5] border-[1px] w-[250px] text-[16px] pl-[20px] appearance-none bg-transparent border-0 p-0 m-0 outline-none focus:outline-none focus:ring-0 shadow-none text-inherit
         [&::-webkit-outer-spin-button]:appearance-none
         [&::-webkit-inner-spin-button]:appearance-none"
      />
      <div
        className="flex items-center gap-[10px] bg-[#4F48E5] text-[white] rounded-[10px] px-[20px] py-[5px] text-center cursor-pointer"
        onClick={() => onClickSearch(searchInputRef?.current || "")}
      >
        <div className="w-[16px] flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        <span>搜尋</span>
      </div>
    </div>
  );
}

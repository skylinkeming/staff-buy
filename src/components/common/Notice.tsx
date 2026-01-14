import { useStaffbuyApi } from "@/api/useStaffbuyApi";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import AppAlert from "./AppAlert";

export default function Notice({ className = "" }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(true);
  const { data } = useStaffbuyApi.useAnnouncementQuery();

  useEffect(() => {
    if (data) {
      AppAlert({
        title: "員購公告",
        message: (
          <div dangerouslySetInnerHTML={{ __html: data.announcement }}></div>
        ),
        hideCancel: true,
      });
    }
  }, [data]);

  return (
    <div
      className={
        "w-full bg-white border-[#E5E5E5] border-1 overflow-hidden rounded-[5px] " +
        className
      }
    >
      <div
        className="bg-staffbuy-primary flex items-center pl-3.5 text-white h-[32px] relative cursor-pointer z-20"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">注意事項</span>
        <div className="absolute right-2.5">
          <IoIosArrowDown
            size={20}
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </div>

      <div
        className="relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
            isOpen ? "max-h-[1000px]" : "max-h-0"
          }`}
        >
          {data?.notice && (
            <div
              className="py-[15px] px-[15px] whitespace-pre-line text-sm text-gray-700 leading-relaxed pb-8"
              dangerouslySetInnerHTML={{ __html: data?.notice }}
            />
          )}
        </div>
        <div
          className={`absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white via-white/80 to-transparent transition-opacity duration-300 pointer-events-none z-10 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
    </div>
  );
}

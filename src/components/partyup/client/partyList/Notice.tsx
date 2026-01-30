import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function Notice({
    className = "",
    notice = "",
    color = ""
}: {
    className?: string;
    notice: string;
    color?: string;
}) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div
            className={
                "w-full overflow-hidden rounded-[10px] border border-[#7ab77e] " +
                className
            }
        >
            <div
                className={"bg-[#679a4e] flex items-center pl-3.5 text-white py-1.25 relative cursor-pointer z-20"}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-medium text-md">注意事項</span>
                <div className="absolute right-2.5">
                    <IoIosArrowDown
                        size={20}
                        className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
                            }`}
                    />
                </div>
            </div>

            <div
                className="relative cursor-pointer bg-[#F4FFF1]"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div
                    className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-[1000px]" : "max-h-0"
                        }`}
                >
                    {notice && (
                        <div
                            className="min-h-[150px] py-[15px] px-[15px] whitespace-pre-line text-sm text-gray-700 leading-relaxed pb-8"
                            dangerouslySetInnerHTML={{ __html: notice }}
                        />
                    )}
                </div>
                <div
                    className={`absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white via-white/80 to-transparent transition-opacity duration-300 pointer-events-none z-10 ${isOpen ? "opacity-0" : "opacity-100"
                        }`}
                />
            </div>
        </div>
    );
}

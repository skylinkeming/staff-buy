import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function Notice({ className = "" }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={
        "w-full bg-white border-[#E5E5E5] border-[1px] rounded-[10px] overflow-hidden " +
        className
      }
    >
      <div
        className="bg-staffbuy-primary flex items-center justify-center text-white h-[32px] relative cursor-pointer z-20"
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

      <div className="relative cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div
          className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
            isOpen ? "max-h-[1000px]" : "max-h-[90px]"
          }`}
        >
          <div className="py-[15px] px-[20px] whitespace-pre-line text-sm text-gray-700 leading-relaxed pb-8">
            {`購物流程:
1.線上輸入購買產品數量 > 2.自行選定取貨日期(宅配請提前一日出貨) > 3.索取發票 > 4.依日期至倉儲取貨

其他說明:
1. 如購買錯誤時，請盡速與承辦人聯繫取消訂單，商品已出貨則無法取消
2. 取貨日最快為下單後2天，若有特殊需求請與承辦人聯繫
3. 所需提袋數量請下單時一併選定
4. 有需要使用載具請於結帳時主動出示，若填寫錯誤則會印出紙本發票
5. **發票請盡量使用載具**`}
          </div>
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

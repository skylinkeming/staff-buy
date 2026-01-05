import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function Notice({ className = "" }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={
        "w-full bg-white border-[#E5E5E5] border-[1px] rounded-tr-[10px] rounded-tl-[10px] overflow-hidden transition-all duration-300 " +
        className
      }
    >
      {/* 標題區塊 */}
      <div
        className="bg-[#4F48E5] flex items-center justify-center text-white h-[32px] relative cursor-pointer"
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
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="py-[15px] px-[20px] whitespace-pre-line text-sm text-gray-700 leading-relaxed">
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
      </div>
    </div>
  );
}

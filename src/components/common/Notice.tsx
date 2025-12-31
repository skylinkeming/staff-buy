export default function Notice({ className = "" }: { className?: string }) {
  return (
    <div
      className={
        "w-[100%] bg-white border-[#E5E5E5] border-[1px] rounded-[10px] " +
        className
      }
    >
      <div className="bg-[#4F48E5] flex items-center justify-center text-[white] h-[32px] rounded-tl-[10px] rounded-tr-[10px]">
        注意事項
      </div>
      <div className="py-[15px] px-[20px]">
        {`購物流程:
1.線上輸入購買產品數量 >2.自行選定取貨日期(宅配請提前一日出貨) > 3.索取發票> 4.依日期至倉儲取貨
其他說明:1.如購買錯誤時，請盡速與承辦人聯繫取消訂單，商品已出貨則無法取消2.取貨日最快為下單後2天，若有特殊需求請與承辦人聯繫3.所需提袋數量請下單時一併選定4.有需要使用載具請於結帳時主動出示，若填寫錯誤則會印出紙本發票
5.**發票請盡量使用載具**`}
      </div>
    </div>
  );
}

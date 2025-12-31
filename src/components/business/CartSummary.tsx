export default function CartSummary({ className = "" }: { className?: string }) {
  return (
    <div
      className={
        "border-[1px] border-[#D9D9D9] p-[30px] w-[260px] rounded-[10px] " +
        className
      }
    >
      <div className="bg-[#4F48E5] text-[white] rounded-[15px] px-[60px] py-[8px] text-center cursor-pointer">
        購買商品
      </div>
    </div>
  );
}

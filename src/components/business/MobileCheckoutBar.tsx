import { useCartStore } from "@/store/useCartStore";
import { useLocation } from "react-router";

export default function MobileCheckoutBar({
  onClickPurchaseBtn,
  className = "",
}: {
  onClickPurchaseBtn: () => void;
  className?: string;
}) {
  const location = useLocation();
  const isStaffBuy = location.pathname.includes("staffbuy");
  const cart = useCartStore((state) =>
    isStaffBuy ? state.staffCart : state.groupCart
  );
  const cartItems = Object.values(cart);

  return (
    <div
      className={
        "fixed drop-shadow-[0_-1px_5px_rgb(232,232,232)] bottom-[0px] left-[0px] w-screen bg-[white] px-[15px] py-[15px] z-50 box-border flex justify-between items-end " +
        className
      }
    >
      <div className="flex items-end gap-[30px]">
        <div className="shrink-0">總金額</div>
        <div className="text-[#4F48E5]  h-[32px]">
          $NT
          <span className="text-[24px] ml-[10px] font-[700]">
            {cartItems.reduce((sum, cartItem) => {
              return sum + cartItem.price * cartItem.quantity;
            }, 0)}
          </span>
        </div>
      </div>
      <div className="bg-[#4F48E5] text-[white] w-[130px] rounded-[15px] py-[5px] text-center cursor-pointer hover:text-[white] inline-block underline-offset-0 ">
        完成訂購
      </div>
    </div>
  );
}

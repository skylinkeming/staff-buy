import { useLocation } from "react-router";
import { useCartStore } from "../../store/useCartStore";

export default function CartSummary({
  className = "",
}: {
  className?: string;
}) {
  const location = useLocation();
  const cart = useCartStore((state) =>
    location.pathname.includes("staffbuy") ? state.staffCart : state.groupCart
  );
  const cartItems = Object.values(cart);

  return (
    <div
      className={
        "border-[1px] border-[#D9D9D9] p-[30px] w-[260px] rounded-[10px] " +
        className
      }
    >
      {cartItems.length > 0 && (
        <div className="w-full flex flex-col gap-[15px] mb-[20px]">
          {cartItems.map((cartItem) => {
            return (
              <div
                key={cartItem.productId}
                className="flex space-around w-full"
              >
                <div className="w-[170px] flex-shrink-0">
                  {cartItem.productName}
                </div>
                <div className="w-[40px] flex-shrink-0">
                  x {cartItem.quantity}
                </div>
                <div className="w-[25px] flex-shrink-0 flex-1 text-right">
                  {cart[cartItem.productId]?.quantity * cartItem.price}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="flex justify-between items-end mb-[20px]">
        <div className="flex-shrink-0">總金額</div>
        <div className="text-[#4F48E5]">
          $NT
          <span className="text-[22px] ml-[10px] font-[700]">
            {cartItems.reduce((sum, cartItem) => {
              return sum + cartItem.price * cartItem.quantity;
            }, 0)}
          </span>
        </div>
      </div>
      <div className="bg-[#4F48E5] text-[white] rounded-[15px] px-[60px] py-[8px] text-center cursor-pointer">
        購買商品
      </div>
    </div>
  );
}

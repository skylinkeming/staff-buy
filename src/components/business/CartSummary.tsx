import { Link, useLocation } from "react-router";
import { useCartStore } from "../../store/useCartStore";

export default function CartSummary({
  className = "",
  showDetail = false,
}: {
  className?: string;
  showDetail?: boolean;
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
        "border border-[#D9D9D9] p-[20px] w-[260px] rounded-[10px] " + className
      }
    >
      {cartItems.length > 0 && showDetail && (
        <div className="w-full flex flex-col gap-[15px] mb-[20px] max-h-[500px] overflow-y-auto">
          {cartItems.map((cartItem) => {
            return (
              <div
                key={cartItem.productId}
                className="flex space-around w-full"
              >
                <div className="w-35 flex-shrink-0 font-bold text-[14px]">
                  {cartItem.productName}
                </div>
                <div className="w-[40px] flex-shrink-0 text-[14px]">
                  x {cartItem.quantity}
                </div>
                <div className="w-[25px] flex-shrink-0 flex-1 text-right pr-[5px] text-[14px]">
                  {cart[cartItem.productId]?.quantity * cartItem.price}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="flex justify-between items-end mb-[20px]">
        <div className="flex-shrink-0 text-[14px]">總金額</div>
        <div className="text-staffbuy-primary">
          $NT
          <span className="text-[22px] ml-[10px] font-[700]">
            {cartItems.reduce((sum, cartItem) => {
              return sum + cartItem.price * cartItem.quantity;
            }, 0)}
          </span>
        </div>
      </div>

      <div
        // to={isStaffBuy ? "/staffbuy/checkout" : "/groupbuy/checkout"}
        onClick={() => {}}
        className="bg-staffbuy-primary text-[white] rounded-[15px] py-[5px] text-center cursor-pointer hover:text-[white] w-full inline-block underline-offset-[0px] "
      >
        購買商品
      </div>
    </div>
  );
}

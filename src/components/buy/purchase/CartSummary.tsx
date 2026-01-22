import { useLocation, useNavigate } from "react-router";
import { useCartStore } from "../../../store/useCartStore";
import AppAlert from "@/components/common/AppAlert";

export default function CartSummary({
  className = "",
  showDetail = false,
  onClickPurchaseBtn,
  disableBtn,
}: {
  className?: string;
  showDetail?: boolean;
  onClickPurchaseBtn?: () => void;
  disableBtn?: boolean;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const isStaffBuy = location.pathname.includes("staffbuy");
  const isCheckoutStage = location.pathname.includes("checkout");
  const cart = useCartStore((state) =>
    isStaffBuy ? state.staffCart : state.groupCart,
  );
  const cartItems = Object.values(cart);

  const handleClickBtn = async () => {
    if (isCheckoutStage && onClickPurchaseBtn) {
      onClickPurchaseBtn();
      return;
    }

    if (cartItems.length === 0) {
      await AppAlert({
        title: "購物車沒有商品",
        message: "請放入商品",
        okText: "確認",
        hideCancel: true,
      });

      return;
    }
    navigate(isStaffBuy ? "/staffbuy/checkout" : "/groupbuy/checkout");
  };

  return (
    <div
      className={
        "border border-[#D9D9D9] p-[20px] w-[280px] rounded-[10px] bg-white " +
        className
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
                <div className="w-35 shrink-0 font-bold text-[14px]">
                  {cartItem.productName}
                </div>
                <div className="w-[40px] shrink-0 text-[14px] text-right">
                  x {cartItem.quantity}
                </div>
                <div className="w-[25px] shrink-0 flex-1 text-right pr-[5px] text-[14px]">
                  {cart[cartItem.productId]?.quantity * cartItem.price}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex justify-between items-end mb-[20px]">
        <div className="shrink-0 text-[14px]">總金額</div>
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
        onClick={handleClickBtn}
        className={
          "bg-staffbuy-primary cursor-pointer text-[white] rounded-[15px] py-[5px] text-center hover:text-[white] w-full inline-block underline-offset-[0px] " +
          (disableBtn ? "pointer-events-none opacity-50" : "")
        }
      >
        購買商品
      </div>
    </div>
  );
}

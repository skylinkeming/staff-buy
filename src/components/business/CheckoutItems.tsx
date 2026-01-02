import { useLocation } from "react-router";
import { useCartStore } from "../../store/useCartStore";
import QuantityInput from "./QuantityInput";
import TrashCan from "../../assets/trash_can.png";

export default function CheckoutItems() {
  const location = useLocation();
  const isStaffBuy = location.pathname.includes("staffbuy");
  const cart = useCartStore((state) =>
    isStaffBuy ? state.staffCart : state.groupCart
  );
  const updateCart = useCartStore((state) => state.updateCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const cartItems = Object.values(cart);
  const CART_TYPE = isStaffBuy ? "staff" : "group";

  const handleClickRemoveButton = (itemId: string) => {
    removeFromCart(CART_TYPE, itemId);
  };

  return (
    <div>
      {cartItems.length > 0 && (
        <div className="w-full flex flex-col gap-[5px] mb-[20px] ">
          {cartItems.map((cartItem) => {
            return (
              <div
                key={cartItem.productId}
                className="flex space-around w-full bg-[white] py-[15px] px-[10px] box-border rounded-[10px] items-center max-h-[54px] border-box"
              >
                <div className="w-[140px] flex-shrink-0">
                  {cartItem.productName}
                </div>
                <div className="w-[40px] flex-shrink-0">${cartItem.price}</div>
                <QuantityInput
                  className="ml-[20px] flex justify-center"
                  variant="stepper"
                  inputNumber={cartItem.quantity}
                  onChange={(qty) => {
                    updateCart(
                      CART_TYPE,
                      {
                        productId: cartItem.productId,
                        productName: cartItem.productName,
                        price: cartItem.price,
                      },
                      qty
                    );
                  }}
                />
                <div className="w-[25px] flex-shrink-0 text-right pr-[5px] ml-[20px]">
                  ${cart[cartItem.productId]?.quantity * cartItem.price}
                </div>
                <div className="flex-1 flex items-center justify-end">
                  <img
                    className="cursor-pointer"
                    width={20}
                    src={TrashCan}
                    alt="刪除按鈕"
                    onClick={() => handleClickRemoveButton(cartItem.productId)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

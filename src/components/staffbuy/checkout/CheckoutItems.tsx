import { useLocation } from "react-router";
import { useCartStore, type CartItem } from "@/store/useCartStore";
import QuantityInput from "../purchase/QuantityInput";
import { FaRegTrashAlt } from "react-icons/fa";
import AppAlert from "@/components/common/AppAlert";
import { BlockTitle } from "@/pages/staffbuy/StaffProductPage";
import { useDebounce } from "@/hooks/useDebounce";
import { staffbuyApi } from "@/api/staffbuyApi";

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

  const handleClickRemoveButton = async (itemId: string) => {
    const res = await AppAlert({
      message: "確認刪除品項?",
    });
    if (res === "ok") {
      removeFromCart(CART_TYPE, itemId);
    }
  };

  // 取得庫存數量
  const debouncedFetchStock = useDebounce(
    async (cartItem: CartItem, requestedQty: number) => {
      let realStock = 9999;

      const result = await staffbuyApi.getProductStockList(cartItem.productId);
      if (result.data.length > 0) realStock = result.data[0].nQ_StockQty;

      if (realStock !== undefined && requestedQty > realStock) {
        // 發現庫存不足，主動校正購物車數量回庫存最大值
        AppAlert({ message: `庫存不足，目前剩餘 ${realStock}` });
        updateCart(
          CART_TYPE,
          {
            productId: cartItem.productId,
            productName: cartItem.productName,
            price: cartItem.price,
          },
          realStock
        );
      }
    },
    500
  );

  const handleAmountChange = async (cartItem: CartItem, qty: number) => {
    if (qty === 0) {
      const res = await AppAlert({
        message: "確認刪除品項?",
      });
      if (res === "cancel") {
        return;
      }
    }
    updateCart(
      CART_TYPE,
      {
        productId: cartItem.productId,
        productName: cartItem.productName,
        price: cartItem.price,
      },
      qty
    );

    if (isStaffBuy) {
      // 先更新購物車 但是背景去打庫存API 檢查庫存數夠不夠
      debouncedFetchStock(cartItem, qty);
    }
  };

  return (
    <>
      <BlockTitle className="mt-[28px] mb-[10px]">購買商品</BlockTitle>
      <div>
        {cartItems.length > 0 && (
          <div className="w-full flex flex-col gap-[5px] mb-[20px] md:w-[700px]">
            {cartItems.map((cartItem) => {
              return (
                <div
                  key={cartItem.productId}
                  className="flex justify-around w-full bg-[white] py-[15px] px-[10px] box-border rounded-[10px] items-center max-h-[54px] border-box md:justify-between"
                >
                  <div className="w-35 max-w-[115px] md:max-w-[140px] font-bold">
                    {cartItem.productName}
                  </div>
                  <div className="w-10">${cartItem.price}</div>
                  <QuantityInput
                    className="ml-5 flex justify-center"
                    variant="stepper"
                    inputNumber={cartItem.quantity}
                    onChange={async (qty) => {
                      handleAmountChange(cartItem, qty);
                    }}
                  />
                  <div className="w-10 shrink-0 text-right pr-[5px] ml-[20px] md:ml-0 md:pr-0">
                    ${cart[cartItem.productId]?.quantity * cartItem.price}
                  </div>
                  <div
                    className="flex-none shrink-0 w-8 flex items-center justify-end md:flex-none"
                    onClick={() => handleClickRemoveButton(cartItem.productId)}
                  >
                    <FaRegTrashAlt className="md:hidden" />
                    <div className="hidden cursor-pointer md:grid grid-cols-[20px_35px] shrink-0 items-center bg-staffbuy-secondary px-2.5 py-1.25 rounded-[5px]">
                      <FaRegTrashAlt color={"white"} />
                      <div className="text-white">刪除</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

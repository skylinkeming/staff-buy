import CartSummary from "../../components/business/CartSummary";
import Notice from "../../components/common/Notice";
import ProductTable from "../../components/business/ProductTable";
import Searchbar from "../../components/common/Searchbar";
import { useCartStore } from "../../store/useCartStore";

const productArr = (() => {
  const result = [];
  for (let i = 0; i < 10; i++) {
    result.push({
      id: i.toString(),
      name: "小籠包",
      price: 50,
      stock: 100,
    });
  }

  return result;
})();

const CART_TYPE = "staff";

export default function StaffProductPage() {
  const updateCart = useCartStore((state) => state.updateCart);
  const staffCart = useCartStore((state) => state.staffCart);

  return (
    <div className="min-h-[100%] w-[100%] relative flex flex-col items-center justify-center gap-[40px] bg-[#FBFBFB]">
      <div>
        <h2>員購商品</h2>
        <div className="flex gap-[40px] ">
          <div className="w-[740px] inline-block">
            <Notice className="mb-[30px]" />
            <Searchbar
              className="mb-[30px]"
              onClickSearch={(searchKey) => {}}
            />
            <ProductTable
              data={productArr.map((prd) => {
                return {
                  ...prd,
                  quantity: staffCart[prd.id] ? staffCart[prd.id].quantity : 0,
                  subtotal: staffCart[prd.id]
                    ? staffCart[prd.id]?.quantity * prd.price
                    : 0,
                };
              })}
              onChange={(item, qty) => {
                // 打stock api檢查庫存數量

                updateCart(
                  CART_TYPE,
                  {
                    productId: item.id,
                    productName: item.name,
                    price: item.price,
                  },
                  qty
                );
              }}
            />
          </div>
          <div className="sticky top-[0px] h-[400px] inline-block">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

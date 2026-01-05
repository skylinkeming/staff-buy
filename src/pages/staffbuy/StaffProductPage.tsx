import CartSummary from "../../components/business/CartSummary";
import Notice from "../../components/common/Notice";
import ProductTable from "../../components/business/ProductTable";
import Searchbar from "../../components/common/Searchbar";
import { useCartStore } from "../../store/useCartStore";
import type { ReactNode } from "react";
import MobileProductTable from "@/components/business/MobileProductTable";
import MobileCheckoutBar from "@/components/business/MobileCheckoutBar";
import { useNavigate } from "react-router";
import Breadcrumbs from "@/components/common/BreadCrumbs";

const productArr = (() => {
  const result = [];
  for (let i = 0; i < 20; i++) {
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

export const BlockTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={"text-[20px] text-[#020202] w-full text-left " + className}>
    {children}
  </div>
);

export default function StaffProductPage() {
  const updateCart = useCartStore((state) => state.updateCart);
  const staffCart = useCartStore((state) => state.staffCart);
  const navigate = useNavigate();

  return (
    <div className="px-3.5 md:px-0 pb-20 min-h-[100%] w-[100%] relative flex flex-col items-center justify-center gap-[40px] bg-[#FBFBFB]">
      <div>
        <div className="max-w-7xl mx-auto mt-10">
          <Breadcrumbs />
        </div>
        <BlockTitle className="mb-4">員購</BlockTitle>
        <div className="flex gap-[40px] ">
          <div className="w-full md:w-[740px] inline-block">
            <Notice className="mb-[30px] w-full md:w-auto" />
            <Searchbar
              className="mb-[30px] md:w-[400px]"
              onClickSearch={(searchKey) => {}}
            />
            <ProductTable
              className="hidden md:inline-block"
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
            <MobileProductTable
              className="inline-block md:hidden"
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
          <div className="hidden md:inline-block sticky top-[0px] h-[400px] ">
            <CartSummary showDetail/>
          </div>
          <MobileCheckoutBar
            btnText="購買商品"
            className="md:hidden"
            onClickBtn={() => {
              navigate("/staffbuy/checkout");
            }}
          />
        </div>
      </div>
    </div>
  );
}

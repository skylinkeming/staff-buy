import { useState, type ReactNode } from "react";
import { Grid } from "antd";
import CartSummary from "../../components/staffbuy/purchase/CartSummary";
import Notice from "../../components/common/Notice";
import ProductTable from "../../components/staffbuy/purchase/ProductTable";
import Searchbar from "../../components/common/Searchbar";
import { useCartStore } from "../../store/useCartStore";
import MobileProductTable from "@/components/staffbuy/purchase/MobileProductTable";
import MobileCheckoutBar from "@/components/staffbuy/purchase/MobileCheckoutBar";
import { useNavigate } from "react-router";
import Breadcrumbs from "@/components/common/BreadCrumbs";

const productArr = (() => {
  const result = [];
  for (let i = 0; i < 20; i++) {
    result.push({
      id: i.toString(),
      name: i + "小籠包",
      price: 50 * i,
      stock: 5 + i,
    });
  }

  return result;
})();

const CART_TYPE = "staff";
const { useBreakpoint } = Grid;

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
  const screens = useBreakpoint();
  const [searchkey, setSearchkey] = useState("");
  const [loading, setLoading] = useState(false);
  const updateCart = useCartStore((state) => state.updateCart);
  const staffCart = useCartStore((state) => state.staffCart);
  const [displayProducts, setDisplayProducts] = useState(productArr);

  const navigate = useNavigate();

  const handleSearch = (inputVal: string) => {
    setLoading(true);
    setTimeout(() => {
      setSearchkey(inputVal);
      const copyProductArr = [...productArr];
      setDisplayProducts(
        copyProductArr.filter((prd) => prd.name.includes(inputVal))
      );
      setLoading(false);
    }, 200);
  };

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
              className="mb-[30px] md:w-[100%]"
              placeholder="搜尋員購商品"
              onClickSearch={handleSearch}
            />
            {screens.md ? (
              <ProductTable
                setDataFunction={setDisplayProducts}
                className="hidden md:inline-block"
                isLoading={loading}
                isNoData={displayProducts.length === 0 && !!searchkey}
                data={displayProducts.map((prd) => {
                  return {
                    ...prd,
                    quantity: staffCart[prd.id]
                      ? staffCart[prd.id].quantity
                      : 0,
                    subtotal: staffCart[prd.id]
                      ? staffCart[prd.id]?.quantity * prd.price
                      : 0,
                  };
                })}
                onChangeQty={(item, qty) => {
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
            ) : (
              <MobileProductTable
                setDataFunction={setDisplayProducts}
                className="inline-block md:hidden"
                isLoading={loading}
                isNoData={displayProducts.length === 0 && !!searchkey}
                data={displayProducts.map((prd) => {
                  return {
                    ...prd,
                    quantity: staffCart[prd.id]
                      ? staffCart[prd.id].quantity
                      : 0,
                    subtotal: staffCart[prd.id]
                      ? staffCart[prd.id]?.quantity * prd.price
                      : 0,
                  };
                })}
                onChangeQty={(item, qty) => {
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
            )}
          </div>
          <div className="hidden md:inline-block sticky top-[0px] h-[400px] ">
            <CartSummary showDetail />
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

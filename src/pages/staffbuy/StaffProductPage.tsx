import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCartStore } from "@/store/useCartStore";
import { useNavigate } from "react-router";
import { Grid } from "antd";
import { useStaffbuyApi } from "@/api/useStaffbuyApi";
import CartSummary from "@/components/staffbuy/purchase/CartSummary";
import Notice from "@/components/common/Notice";
import ProductTable from "@/components/staffbuy/purchase/ProductTable";
import KeywordSearchAction from "@/components/common/KeywordSearchAction";
import MobileProductTable from "@/components/staffbuy/purchase/MobileProductTable";
import MobileCheckoutBar from "@/components/staffbuy/purchase/MobileCheckoutBar";
import Breadcrumbs from "@/components/common/BreadCrumbs";
import AppAlert from "@/components/common/AppAlert";

const CART_TYPE = "staff";
const { useBreakpoint } = Grid;

export const BlockTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={
      "text-[20px] font-bold text-[#020202] w-full text-left " + className
    }
  >
    {children}
  </div>
);

export default function StaffProductPage() {
  const [searchkey, setSearchkey] = useState("");
  const [targetId, setTargetId] = useState("");
  const [loading, setLoading] = useState(false);
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const updateCart = useCartStore((state) => state.updateCart);
  const staffCart = useCartStore((state) => state.staffCart);
  const {
    data: rawProducts,
    isLoading: fetching,
    refetch: refetchProductList,
  } = useStaffbuyApi.useProductListQuery();
  const queryClient = useQueryClient();

  const { data: stockInfo } = useStaffbuyApi.useProductStockListQuery(targetId);

  const cartItems = Object.values(staffCart);

  const displayProducts = useMemo(() => {
    if (!rawProducts) return [];
    const showList = [...rawProducts];

    // 根據搜尋字串過濾
    return showList.filter((p) =>
      p.name.toLowerCase().includes(searchkey.toLowerCase())
    );
  }, [rawProducts, searchkey, targetId]);

  useEffect(() => {
    //在商品增減數量的時候 順便更新商品庫存數
    if (stockInfo?.[0] && targetId) {
      const newStock = stockInfo[0].nQ_StockQty;

      queryClient.setQueryData(["staffbuy_product_list"], (oldRes: any) => {
        if (!oldRes) return oldRes;
        return {
          ...oldRes,
          data: oldRes.data.map((p: any) =>
            p.iD_Product === targetId ? { ...p, nQ_Quantity: newStock } : p
          ),
        };
      });
    }
  }, [stockInfo, targetId, queryClient]);

  const handleSearch = (inputVal: string) => {
    setLoading(true);
    setTimeout(() => {
      setSearchkey(inputVal);
      setLoading(false);
    }, 200);
  };

  return (
    <div className="px-3.5 md:px-0 pb-20 min-h-[100%] w-[100%] relative flex flex-col items-center gap-[40px] bg-[#FBFBFB]">
      <div>
        <Breadcrumbs className="max-w-7xl mx-auto mt-10" />
        <BlockTitle className="mb-4">員購</BlockTitle>
        <div className="flex gap-[40px] ">
          <div className="w-full md:w-[740px] inline-block">
            <Notice className="mb-[30px] w-full md:w-auto" />
            <KeywordSearchAction
              className="mb-[30px] md:w-[100%]"
              placeholder="搜尋員購商品"
              onClickSearch={handleSearch}
            />
            {screens.md ? (
              <ProductTable
                key={rawProducts?.length}
                className="hidden md:inline-block"
                isLoading={loading || fetching}
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
                  setTargetId(item.id);
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
                key={rawProducts?.length}
                className="inline-block md:hidden"
                isLoading={loading}
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
                  refetchProductList();
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
            onClickBtn={async () => {
              if (cartItems.length === 0) {
                await AppAlert({
                  title: "購物車沒有商品",
                  message: "請放入商品",
                  okText: "確認",
                  hideCancel: true,
                });

                return;
              }
              navigate("/staffbuy/checkout");
            }}
          />
        </div>
      </div>
    </div>
  );
}

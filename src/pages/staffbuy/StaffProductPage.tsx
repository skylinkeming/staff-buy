import { useMemo, useState, type ReactNode } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useNavigate } from "react-router";
import { Grid } from "antd";
import { useStaffbuyApi } from "@/api/useStaffbuyApi";
import CartSummary from "@/components/buy/purchase/CartSummary";
import Notice from "@/components/common/Notice";
import ProductTable, {
  type TableRowData,
} from "@/components/buy/purchase/ProductTable";
import KeywordSearchAction from "@/components/common/KeywordSearchAction";
import MobileProductTable from "@/components/buy/purchase/MobileProductTable";
import MobileCheckoutBar from "@/components/buy/purchase/MobileCheckoutBar";
import Breadcrumbs from "@/components/common/BreadCrumbs";
import AppAlert from "@/components/common/AppAlert";
import { useDebounce } from "@/hooks/useDebounce";
import { staffbuyApi } from "@/api/staffbuyApi";

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
  const [loading, setLoading] = useState(false);
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const updateCart = useCartStore((state) => state.updateCart);
  const staffCart = useCartStore((state) => state.staffCart);
  const { data: rawProducts, isLoading: fetching } =
    useStaffbuyApi.useProductListQuery();

  const cartItems = Object.values(staffCart);

  const filteredProducts = useMemo(() => {
    if (!rawProducts) return [];
    const showList = [...rawProducts];

    // 根據搜尋字串過濾
    return showList.filter((p) =>
      p.name.toLowerCase().includes(searchkey.toLowerCase())
    );
  }, [rawProducts, searchkey]);

  const tableData = filteredProducts.map((prd) => {
    return {
      ...prd,
      quantity: staffCart[prd.id] ? staffCart[prd.id].quantity : 0,
      subtotal: staffCart[prd.id] ? staffCart[prd.id]?.quantity * prd.price : 0,
    };
  });

  const handleSearch = (inputVal: string) => {
    setLoading(true);
    setTimeout(() => {
      setSearchkey(inputVal);
      setLoading(false);
    }, 200);
  };

  // 取得庫存數量
  const debouncedFetchStock = useDebounce(
    async (item: TableRowData, requestedQty: number) => {
      let realStock = 9999;

      const result = await staffbuyApi.getProductStockList(item.id);
      if (result?.data?.length > 0) realStock = result.data[0].nQ_StockQty;

      if (realStock !== undefined && requestedQty > realStock) {
        // 發現庫存不足，主動校正購物車數量回庫存最大值
        AppAlert({ message: `庫存不足，目前剩餘 ${realStock}` });
        updateCart(
          CART_TYPE,
          {
            productId: item.id,
            productName: item.name,
            price: item.price,
          },
          realStock
        );
      }
    },
    500
  );

  const handleAmountChange = (item: TableRowData, qty: number) => {
    updateCart(
      CART_TYPE,
      {
        productId: item.id,
        productName: item.name,
        price: item.price,
      },
      qty
    );

    // 先更新購物車 但是背景去打庫存API 檢查庫存數夠不夠
    debouncedFetchStock(item, qty);
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
                data={tableData}
                onChangeQty={handleAmountChange}
              />
            ) : (
              <MobileProductTable
                key={rawProducts?.length}
                className="inline-block md:hidden"
                isLoading={loading}
                data={tableData}
                onChangeQty={handleAmountChange}
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

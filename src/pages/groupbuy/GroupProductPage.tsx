import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useCartStore } from "@/store/useCartStore";
import { data, useNavigate } from "react-router";
import { Grid, Select } from "antd";
import { useStaffbuyApi } from "@/api/useStaffbuyApi";
import CartSummary from "@/components/staffbuy/purchase/CartSummary";
import Notice from "@/components/common/Notice";
import ProductTable, {
  type TableRowData,
} from "@/components/staffbuy/purchase/ProductTable";
import KeywordSearchAction from "@/components/common/KeywordSearchAction";
import MobileProductTable from "@/components/staffbuy/purchase/MobileProductTable";
import MobileCheckoutBar from "@/components/staffbuy/purchase/MobileCheckoutBar";
import Breadcrumbs from "@/components/common/BreadCrumbs";
import AppAlert from "@/components/common/AppAlert";
import { useDebounce } from "@/hooks/useDebounce";
import { staffbuyApi } from "@/api/staffbuyApi";
import { useGroupbuyApi } from "@/api/useGroupbuyApi";

const CART_TYPE = "group";
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

export default function GroupBuyProductPage() {
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const [searchkey, setSearchkey] = useState("");
  const [loading, setLoading] = useState(false);
  const selectedGroup = useCartStore((state) => state.selectedGroup);
  const updateSelectedGroup = useCartStore(
    (state) => state.updateSelectedGroup
  );
  const updateCart = useCartStore((state) => state.updateCart);
  const groupCart = useCartStore((state) => state.groupCart);

  const { data: rawProducts, isLoading: fetching } =
    useStaffbuyApi.useProductListQuery();
  const { data: groupbuyList } = useGroupbuyApi.useGroupBuyListQuery();
  const { data: groupbuyItems } = useGroupbuyApi.useGroupBuyDataQuery(
    selectedGroup.id
  );

  const cartItems = Object.values(groupCart);

  const filteredProducts = useMemo(() => {
    if (!groupbuyItems) return [];
    const showList = [...groupbuyItems];

    // 根據搜尋字串過濾
    return showList.filter((p) =>
      p.name.toLowerCase().includes(searchkey.toLowerCase())
    );
  }, [groupbuyItems, searchkey]);

  const tableData = filteredProducts.map((prd) => {
    return {
      ...prd,
      quantity: groupCart[prd.id] ? groupCart[prd.id].quantity : 0,
      subtotal: groupCart[prd.id] ? groupCart[prd.id]?.quantity * prd.price : 0,
    };
  });

  const groupTitle =
    selectedGroup.id && selectedGroup.canBuyFrom ? (
      <div className="bg-[#e6f4ff] p-2.5">
        <div className="text-center text-[#0958d9] text-[16px] mb-2.5">{selectedGroup.name}</div>
        <div className="text-[#1E1E1E] flex justify-center gap-2.5">
          <div className="">{"開放購買日期: "}</div>
          <div className="font-bold">{selectedGroup.canBuyFrom}</div>
          <div>{" ~  截止購買日期: "}</div>
          <div className="font-bold">{selectedGroup.canBuyTo}</div>
        </div>
      </div>
    ) : null;

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
    // debouncedFetchStock(item, qty);
  };

  return (
    <div className="px-3.5 md:px-0 pb-20 min-h-[100%] w-[100%] relative flex flex-col items-center gap-[40px] bg-[#FBFBFB]">
      <div>
        <Breadcrumbs className="max-w-7xl mx-auto mt-10" />
        <BlockTitle className="mb-4">團購</BlockTitle>

        <div className="flex gap-[40px] ">
          <div className="w-full md:w-[740px] inline-block">
            <Notice className="mb-[30px] w-full md:w-auto" />
            <div className="px-3.5 flex flex-col md:px-0 md:flex-row md:items-center md:gap-2.5 mb-5">
              <Select
                className={"mb-2.5 w-150"}
                value={
                  selectedGroup?.id
                    ? selectedGroup?.id
                    : groupbuyList?.length
                    ? groupbuyList[0].iD_GroupBy.toString()
                    : ""
                }
                popupMatchSelectWidth={false}
                onChange={(val) => {
                  const targetGroup = groupbuyList?.find(
                    (g) => g.iD_GroupBy.toString() == val
                  );
                  if (!targetGroup) return;
                  updateSelectedGroup({
                    name: targetGroup.cX_GroupBy_Name,
                    id: targetGroup?.iD_GroupBy.toString(),
                    canBuyFrom: targetGroup?.dT_CanBuyFrom,
                    canBuyTo: targetGroup?.dT_CanBuyTo,
                  });
                }}
                options={
                  groupbuyList
                    ? groupbuyList.map((g) => ({
                        value: g.iD_GroupBy.toString(),
                        label: g.cX_GroupBy_Name,
                        // disabled: g.,
                      }))
                    : []
                }
              />
              <KeywordSearchAction
                className="w-screen md:w-full"
                placeholder="搜尋此團購的商品"
                onClickSearch={handleSearch}
              />
            </div>
            {screens.md ? (
              <ProductTable
                key={rawProducts?.length}
                className="hidden md:inline-block"
                isLoading={loading || fetching}
                data={tableData}
                onChangeQty={handleAmountChange}
                title={groupTitle}
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

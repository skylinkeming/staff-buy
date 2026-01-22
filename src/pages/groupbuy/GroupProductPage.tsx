import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useNavigate } from "react-router";
import { Grid, Select } from "antd";
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
import { useGroupbuyApi } from "@/api/useGroupbuyApi";
import { groupbuyApi } from "@/api/groupbuyApi";

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
    (state) => state.updateSelectedGroup,
  );
  const updateCart = useCartStore((state) => state.updateCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const groupCart = useCartStore((state) => state.groupCart);

  const { data: groupbuyTopicList } = useGroupbuyApi.useGroupBuyListQuery();
  const { data: groupbuyProducts, isLoading: isFetching } =
    useGroupbuyApi.useGroupBuyProductListQuery(selectedGroup.id);
  const { data: annoData } = useGroupbuyApi.useAnnouncementQuery();

  const cartItems = Object.values(groupCart);

  useEffect(() => {
    const expiry = localStorage.getItem("groupbuy-anno-expiry");
    if (
      annoData?.announcement &&
      (!expiry || new Date().getTime() > parseInt(expiry))
    ) {
      AppAlert({
        title: "公告",
        message: (
          <div
            dangerouslySetInnerHTML={{ __html: annoData?.announcement }}
          ></div>
        ),
        hideCancel: true,
      }).then(() => {
        const expiryDate = new Date().getTime() + 4 * 60 * 60 * 1000; // 4小時後才能再顯示一次公告
        localStorage.setItem("groupbuy-anno-expiry", expiryDate.toString());
      });
    }
  }, [annoData]);

  //團購主題選取器
  const groupSelect = (
    <Select
      className={"w-full h-8 " + (selectedGroup?.id ? "" : "")}
      value={
        selectedGroup?.id
          ? selectedGroup?.id
          : groupbuyTopicList?.length
            ? groupbuyTopicList[0].iD_GroupBy.toString()
            : ""
      }
      popupMatchSelectWidth={false}
      onChange={(val) => {
        const targetGroup = groupbuyTopicList?.find(
          (g) => g.iD_GroupBy.toString() == val,
        );
        setSearchkey("");
        if (!targetGroup) {
          return;
        }
        clearCart(CART_TYPE);
        updateSelectedGroup({
          name: targetGroup.cX_GroupBy_Name,
          id: targetGroup.iD_GroupBy.toString(),
          canBuyFrom: targetGroup.dT_CanBuyFrom,
          canBuyTo: targetGroup.dT_CanBuyTo,
        });
      }}
      options={
        groupbuyTopicList
          ? groupbuyTopicList.map((g) => ({
            value: g.iD_GroupBy.toString(),
            label: g.cX_GroupBy_Name,
            // disabled: g.,
          }))
          : []
      }
    />
  );

  // 商品表格title資訊
  const tableTitle =
    selectedGroup.id && selectedGroup.canBuyFrom ? (
      <div className="bg-[#e6f4ff] p-3.5 border-b border-[#91d5ff]">
        <div className="text-[#0958d9] text-center text-[16px] mb-2.5 font-bold">
          團購主題: {selectedGroup.name}
        </div>
        <div className="text-[#1E1E1E] flex flex-col justify-center gap-2.5 md:flex-row ">
          <div className="flex justify-center gap-2.5">
            <div className="">{"開放購買日期:"}</div>
            <div className="font-bold">{selectedGroup.canBuyFrom}</div>
          </div>
          <div className="flex justify-center gap-2.5">
            <div>{" ~  截止購買日期: "}</div>
            <div className="font-bold">{selectedGroup.canBuyTo}</div>
          </div>
        </div>
      </div>
    ) : null;

  // 根據搜尋字串過濾
  const filteredProducts = useMemo(() => {
    if (!groupbuyProducts) return [];
    const showList = [...groupbuyProducts];

    return showList.filter((p) =>
      p.name.toLowerCase().includes(searchkey.toLowerCase()),
    );
  }, [groupbuyProducts, searchkey]);

  const tableData = filteredProducts.map((prd) => {
    return {
      ...prd,
      quantity: groupCart[prd.id] ? groupCart[prd.id].quantity : 0,
      subtotal: groupCart[prd.id] ? groupCart[prd.id]?.quantity * prd.price : 0,
    };
  });

  const renderProductTable = () => {
    if (!selectedGroup?.id) return <></>;

    return screens.md ? (
      <ProductTable
        key={groupbuyProducts?.length}
        className="hidden md:inline-block"
        isLoading={loading || isFetching}
        data={tableData}
        onChangeQty={handleAmountChange}
        title={tableTitle}
      />
    ) : (
      <MobileProductTable
        key={groupbuyProducts?.length}
        className="inline-block md:hidden"
        isLoading={loading}
        data={tableData}
        onChangeQty={handleAmountChange}
        title={tableTitle}
      />
    );
  };

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

      //PS: 查庫存要用groupBuyItemId, 但建立訂單要用id
      const result = await groupbuyApi.getStock(item.groupBuyItemId!);
      if (!result) return;

      realStock = result.data.nQ_Less;
      if (realStock !== undefined && requestedQty > realStock) {
        // 發現庫存不足，主動校正購物車數量回庫存最大值
        AppAlert({ message: `庫存不足，目前剩餘 ${realStock}` });
        updateCart(
          CART_TYPE,
          {
            productId: item.id,
            productName: item.name,
            groupItemId: item.groupBuyItemId!,
            price: item.price,
          },
          realStock,
        );
      }
    },
    500,
  );

  const handleAmountChange = (item: TableRowData, qty: number) => {
    updateCart(
      CART_TYPE,
      {
        productId: item.id,
        groupItemId: item.groupBuyItemId!,
        productName: item.name,
        price: item.price,
      },
      qty,
    );

    // 先更新購物車 但是背景去打庫存API 檢查庫存數夠不夠
    debouncedFetchStock(item, qty);
  };

  return (
    <div className="md:px-0 pb-20 min-h-[100%] w-[100%] relative flex flex-col items-center gap-[40px] bg-[#FBFBFB]">
      <div className="w-full md:w-auto">
        <Breadcrumbs className="max-w-7xl mx-auto mt-5" />
        <BlockTitle className="mb-4">團購</BlockTitle>
        <div className="flex gap-[40px] ">
          <div className="w-full md:w-[740px] inline-block">
            <Notice
              className="mb-5  w-full md:w-auto"
              notice={annoData?.notice || ""}
            />
            <div className="flex flex-col md:flex-row gap-2.5 mb-5">
              {groupSelect}
              <KeywordSearchAction
                key={selectedGroup?.id}
                className={"w-full " + (selectedGroup?.id ? "" : "hidden")}
                placeholder="搜尋此團購的商品"
                onClickSearch={handleSearch}
              />
            </div>
            {renderProductTable()}
          </div>
          <div className="hidden md:inline-block sticky top-16 h-100  ">
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

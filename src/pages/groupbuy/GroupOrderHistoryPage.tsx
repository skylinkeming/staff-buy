import { useState } from "react";
import { Pagination, ConfigProvider, Spin, Grid } from "antd";
import Breadcrumbs from "@/components/common/BreadCrumbs";
import OrderCard from "@/components/buy/orders/OrderMobileCard";
import OrderSearchGroup from "@/components/common/OrderSearchGroup";
import OrderDesktopTable from "@/components/buy/orders/OrderDesktopTable";
import { BlockTitle } from "./GroupProductPage";
import { useGroupbuyApi } from "@/api/useGroupbuyApi";
import AppAlert from "@/components/common/AppAlert";
const { useBreakpoint } = Grid;

export default function GroupOrderHistoryPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [orderFilter, setOrderFilter] = useState<{
    searchTerm: string;
    startDate: string;
    endDate: string;
  }>({
    searchTerm: "",
    startDate: "",
    endDate: "",
  });
  const {
    data,
    isLoading,
    refetch: refetchOrders,
  } = useGroupbuyApi.useOrderListQuery({
    page: currentPage,
    pageSize: pageSize,
    searchTerm: orderFilter.searchTerm,
    startDate: orderFilter.startDate,
    endDate: orderFilter.endDate,
  });
  const { mutate: handleDeleteOrder, isPending: isDeleting } =
    useGroupbuyApi.useDeleteOrderMutation();

  const screens = useBreakpoint();

  const onPageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
    window.scrollTo(0, 0);
  };

  let orderlistContainer = <></>;

  if (isLoading) {
    orderlistContainer = (
      <div className="w-full h-full">
        <Spin />
      </div>
    );
  }

  const handleClickDeleteBtn = async (idBuyM: number) => {
    const res = await AppAlert({
      message: "確定要刪除團購訂單?",
    });

    if (res !== "ok" || !idBuyM) {
      return;
    }

    handleDeleteOrder(idBuyM, {
      onSuccess: async (data) => {
        // setIsSubmitting(false);
        console.log("訂單刪除成功:", data);
        await AppAlert({
          message: "訂單刪除成功",
          type: "success",
        });
        refetchOrders();
        // clearCart("staff");
        // navigate("/staffbuy/orders");
      },
      onError: (error) => {
        console.error("建立失敗:", error);
        AppAlert({
          title: "訂單刪除失敗",
          message: (error as any).response?.data?.message || error.message,
          type: "error",
        });
      },
    });
  };

  orderlistContainer = (
    <div className="w-full flex flex-col gap-5">
      {data?.orderList.map((o) => (
        <>
          {screens.md ? (
            <OrderDesktopTable
              orderItem={{ id: o.idBuyM, ...o }}
              onClickDeleteBtn={handleClickDeleteBtn}
            />
          ) : (
            <OrderCard
              orderItem={{ id: o.idBuyM, ...o }}
              onClickDeleteBtn={handleClickDeleteBtn}
            />
          )}
        </>
      ))}
      {data?.orderList.length === 0 && (
        <div className="w-full flex justify-center bg-gray-100 items-center h-60 rounded-[15px]">
          無購買紀錄
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center bg-[#fbfbfb]">
      <div className="w-full flex flex-col items-center md:w-250">
        <div className="w-full py-5">
          <Breadcrumbs />
          <BlockTitle className="w-full text-left mb-5">團購紀錄</BlockTitle>
          <OrderSearchGroup
            className=" mb-5 border-b-[1px] border-[#d9d9d9] pb-5"
            isLoading={isLoading}
            placeholder="請輸入團購名稱或商品名稱"
            onClickSearchBtn={(searchParams) => {
              setOrderFilter({
                searchTerm: searchParams.searchTerm,
                startDate: searchParams.startDate,
                endDate: searchParams.endDate,
              });
            }}
          />
        </div>
        {orderlistContainer}

        <div className="mt-8 mb-10 flex justify-center">
          <ConfigProvider
            theme={{
              components: {
                Pagination: {
                  itemBg: "#D9D9D9",
                  itemActiveBg: "rgb(23, 93, 204)",
                  colorPrimary: "white",
                  colorPrimaryHover: "#D9D9D9",
                },
              },
            }}
          >
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={data?.pagination.total || 0}
              onChange={onPageChange}
              showSizeChanger
              showTotal={(total) => `共 ${total} 筆訂單`}
              responsive={true}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}

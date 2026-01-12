import { useState } from "react";
import { Pagination, ConfigProvider, Spin } from "antd";
import Breadcrumbs from "@/components/common/BreadCrumbs";
import { useStaffbuyApi } from "@/api/useStaffbuyApi";
import { BlockTitle } from "./StaffProductPage";
import OrderCard from "@/components/staffbuy/myOrder/OrderCard";
import OrderSearchGroup from "@/components/common/OrderSearchGroup";

export default function StaffOrderHistoryPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(1);
  const [orderFilter, setOrderFilter] = useState<{
    orderId: string;
    startDate: string;
    endDate: string;
  }>({
    orderId: "",
    startDate: "",
    endDate: "",
  });
  const { data, isLoading } = useStaffbuyApi.useOrderListQuery({
    page: currentPage,
    pageSize: pageSize,
    orderId: orderFilter.orderId,
    startDate: orderFilter.startDate,
    endDate: orderFilter.endDate,
  });

  const onPageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
    window.scrollTo(0, 0);
  };

  let contentDiv = <></>;

  if (isLoading) {
    contentDiv = (
      <div className="w-full h-full">
        <Spin />
      </div>
    );
  }

  contentDiv = (
    <div className="w-full px-3.5">
      {data?.orderList.map((o) => (
        <OrderCard {...o} />
      ))}
      {data?.orderList.length === 0 && (
        <div className="w-full flex justify-center border-[1px] border-[#ccc] items-center h-80 rounded-[15px]">
          無購買紀錄
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full px-3.5 py-5">
        <Breadcrumbs />
        <BlockTitle className="w-full text-left mb-5">員購紀錄</BlockTitle>
        <OrderSearchGroup
          isLoading={isLoading}
          onClickSearchBtn={(searchParams) => {
            setOrderFilter({
              orderId: searchParams.searchTerm,
              startDate: searchParams.startDate,
              endDate: searchParams.endDate,
            });
          }}
        />
      </div>
      {contentDiv}
      {/* 分頁區塊 */}
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
  );
}

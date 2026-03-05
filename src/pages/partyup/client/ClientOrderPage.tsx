import { usePartyupApi } from "@/api/partyup/usePartyupApi";
import Breadcrumbs from "@/components/common/BreadCrumbs";
import OrderSearchGroup from "@/components/common/OrderSearchGroup";
import OrderCard from "@/components/partyup/client/orderPage/OrderCard";
import { ConfigProvider, Pagination } from "antd";
import { useState } from "react";


export default function ClientOrderPage() {
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
    const { data, isLoading } = usePartyupApi.useOrderListQuery({
        page: currentPage,
        pageSize: pageSize,
        ...orderFilter
    });

    const onPageChange = (page: number, pageSize: number) => {
        console.log(page, pageSize);
        setCurrentPage(page);
        setPageSize(pageSize);
        window.scrollTo(0, 0);
    }

    return (
        <div>
            <Breadcrumbs />
            <div className="md:max-w-[850px] mx-auto">
                <h2 className="text-[24px] font-bold">揪團訂購紀錄</h2>
                <OrderSearchGroup
                    placeholder="搜尋商品名稱、訂單編號或日期區間"
                    buttonClass="bg-[#FFD400]! text-[#20232C]!"
                    className="mt-5"
                    isLoading={isLoading}
                    onClickSearchBtn={(params) => {
                        debugger;
                        setOrderFilter({
                            searchTerm: params.searchTerm,
                            startDate: params.startDate,
                            endDate: params.endDate,
                        });
                        setCurrentPage(1);
                    }}
                />
                <div className="mt-5 grid grid-cols-1 gap-8">
                    {data?.list.map((order) => (
                        <OrderCard key={order.orderId} orderItem={order} />
                    ))}
                </div>
                <ConfigProvider
                    theme={{
                        components: {
                            Pagination: {
                                itemBg: "#D9D9D9",
                                itemActiveBg: "#1E88E5",
                                colorPrimary: "white",
                                colorPrimaryHover: "#D9D9D9",
                            },
                        },
                    }}
                >
                    <Pagination
                        current={data?.page || 1}
                        pageSize={data?.pageSize || 10}
                        total={data?.total || 0}
                        onChange={onPageChange}
                        showSizeChanger
                        showTotal={(total) => `共 ${total} 筆訂單`}
                        responsive={true}
                        className="my-10! flex justify-center!"
                    />
                </ConfigProvider>
            </div>
        </div>
    )
}
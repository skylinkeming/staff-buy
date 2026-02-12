import { usePartyupApi } from "@/api/usePartyupApi";
import Breadcrumbs from "@/components/common/BreadCrumbs";
import OrderSearchGroup from "@/components/common/OrderSearchGroup";
import OrderCard from "@/components/partyup/client/orders/OrderCard";


export default function PartyOrdersPage() {

    const { data, isLoading } = usePartyupApi.useOrderListQuery();

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
                    onClickSearchBtn={() => { }}
                />
                <div className="mt-5">
                    {data?.map((order) => (
                        <OrderCard key={order.orderId} orderItem={order} />
                    ))}
                </div>
            </div>
        </div>
    )
}
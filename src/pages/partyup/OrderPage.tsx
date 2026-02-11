import { usePartyupApi } from "@/api/usePartyupApi";
import Breadcrumbs from "@/components/common/BreadCrumbs";
import OrderSearchGroup from "@/components/common/OrderSearchGroup";
import OrderCard from "@/components/partyup/client/orders/OrderCard";


export default function PartyOrdersPage() {

    const { data, isLoading } = usePartyupApi.useOrderListQuery();

    return (
        <div>
            <Breadcrumbs />
            <h2 className="text-[24px] font-bold">揪團訂購紀錄</h2>
            <OrderSearchGroup className="mt-5" isLoading={isLoading} onClickSearchBtn={() => { }} />
            <div className="mt-5">
                {data?.map((order) => (
                    <OrderCard key={order.id} orderItem={order} />
                ))}
            </div>
        </div>
    )
}
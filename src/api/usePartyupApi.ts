


import { useQuery } from "@tanstack/react-query";
import { partyupApi } from "./partyupApi";

export const usePartyupApi = {
    useOrderListQuery: () =>
        useQuery({
            queryKey: ["partyup_orderList"],
            queryFn: () => partyupApi.getOrderList(),
            select: (res) => {
                return res.data;
            },
            staleTime: 0,
        }),
};

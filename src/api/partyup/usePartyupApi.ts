


import { useMutation, useQuery } from "@tanstack/react-query";
import { partyupApi, type CreateOrderRequest } from "./partyupApi";

export const usePartyupApi = {
    usePartyListQuery: (searchText?: string) =>
        useQuery({
            queryKey: ["partyup_partyList", searchText],
            queryFn: () => partyupApi.getPartyList(searchText),
            staleTime: 0,
            select: (data) => data.data,
        }),
    usePartyDetailQuery: (id: string) =>
        useQuery({
            queryKey: ["partyup_partyDetail", id],
            queryFn: () => partyupApi.getPartyDetail(id),
            staleTime: 0,
            select: (data) => data.data,
        }),
    useCreateOrderMutation: () =>
        useMutation({
            mutationFn: (body: CreateOrderRequest) => partyupApi.createOrder(body),
        }),
    useOrderListQuery: ({
        page = 1,
        pageSize = 10,
        orderId,
        startDate,
        endDate,
        searchTxt,
    }: {
        page: number;
        pageSize?: number;
        orderId?: string;
        startDate?: string;
        endDate?: string;
        searchTxt?: string;
    }) =>
        useQuery({
            queryKey: ["partyup_orderList", page, pageSize, orderId, startDate, endDate, searchTxt],
            queryFn: () => partyupApi.getOrderList({ page, pageSize, orderId, startDate, endDate, searchTxt }),
            staleTime: 0,
            select: (data) => data.data,
        }),
};

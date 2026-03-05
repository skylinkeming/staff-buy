


import { useMutation, useQuery } from "@tanstack/react-query";
import { partyupApi, type CreateOrderRequest } from "./partyupApi";

export const usePartyupApi = {
    usePartyListQuery: (searchText?: string) =>
        useQuery({
            queryKey: ["partyup_partyList"],
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
    }: {
        page: number;
        pageSize?: number;
        orderId?: string;
        startDate?: string;
        endDate?: string;
    }) =>
        useQuery({
            queryKey: ["partyup_orderList", page, pageSize, orderId, startDate, endDate],
            queryFn: () => partyupApi.getOrderList({ page, pageSize, orderId, startDate, endDate }),
            staleTime: 0,
            select: (data) => data.data,
        }),
};

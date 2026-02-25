


import { useQuery } from "@tanstack/react-query";
import { partyupApi } from "./partyupApi";

export const usePartyupApi = {
    usePartyListQuery: () =>
        useQuery({
            queryKey: ["partyup_partyList"],
            queryFn: () => partyupApi.getPartyList(),
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
};

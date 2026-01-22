import { useQuery } from "@tanstack/react-query";
import { commonApi } from "./commonApi";

export const useCommonApi = {
  useHasLayoutQuery: () =>
    useQuery({
      queryKey: ["has_layout"],
      queryFn: () => commonApi.getHasLayout(),
      select: (res) => {
        return res.data;
      },
      staleTime: 30000,
    }),
  useUserInfoQuery: () =>
    useQuery({
      queryKey: ["userInfo"],
      queryFn: () => commonApi.getUserInfo(),
      select: (res) => {
        return res.data;
      },
      staleTime: 0,
    }),
  useBagListQuery: () =>
    useQuery({
      queryKey: ["staffbuy_bagList"],
      queryFn: () => commonApi.getBagList(),
      select: (res) => res.data,
    }),
  useShiptimeListQuery: () =>
    useQuery({
      queryKey: ["staffbuy_shiptimeList"],
      queryFn: () => commonApi.getShipTimeList(),
      select: (res) => res.data,
    }),
  useInvoicePickStoreListQuery: (enabled = true) =>
    useQuery({
      queryKey: ["groupbuy_invoicePickupStoreLIst"],
      queryFn: () => commonApi.getInvoicePickupStoreList(),
      select: (res) => res.data,
      enabled: enabled,
    }),
};

import { staffbuyApi } from "@/api/staffbuyApi";
import { useQuery } from "@tanstack/react-query";


export const useStaffbuyApi = {
  useUserInfoQuery: () =>
    useQuery({
      queryKey: ["staffbuy_userInfo"],
      queryFn: () => staffbuyApi.getUserInfo(),
      select: (res) => {
        return res.data;
      },
      staleTime: 30000,
    }),
  useAnnouncementQuery: () =>
    useQuery({
      queryKey: ["staffbuy_announcement"],
      queryFn: () => staffbuyApi.getAnnouncment(),
      select: (res) => {
        return res.data;
      },
      staleTime: 30000,
    }),
  useBagListQuery: () =>
    useQuery({
      queryKey: ["staffbuy_bagList"],
      queryFn: () => staffbuyApi.getBagList(),
      select: (res) => res.data,
    }),
  useShiptimeListQuery: () =>
    useQuery({
      queryKey: ["staffbuy_shiptimeList"],
      queryFn: () => staffbuyApi.getShipTimeList(),
      select: (res) => res.data,
    }),
  useInvoicePickStoreListQuery: (enabled = true) =>
    useQuery({
      queryKey: ["groupbuy_invoicePickupStoreLIst"],
      queryFn: () => staffbuyApi.getInvoicePickupStoreList(),
      select: (res) => res.data,
      enabled: enabled
    }),
};

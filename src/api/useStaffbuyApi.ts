import { staffbuyApi, type CreateOrderRequest } from "@/api/staffbuyApi";
import AppAlert from "@/components/common/AppAlert";
import { useMutation, useQuery } from "@tanstack/react-query";

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
  useProductListQuery: () =>
    useQuery({
      queryKey: ["staffbuy_product_list"],
      queryFn: () => staffbuyApi.getProducts(),
      select: (res) => {
        return res.data.map((p) => ({
          id: p.iD_Product,
          name: p.cX_ProductName,
          price: p.nQ_BuyPrice,
          stock: p.nQ_StockQty,
        }));
      },
      staleTime: 0,
    }),
  useProductStockListQuery: (productId?: string) => {
    return useQuery({
      queryKey: ["staffbuy_product_stock_list", productId],
      queryFn: () => staffbuyApi.getProductStockList(productId),
      select: (res) => {
        return res.data;
      },
      staleTime: 0,
      gcTime: 0,
      enabled: !!productId,
    });
  },
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
      enabled: enabled,
    }),
  useCreateOrderMutation: () =>
    useMutation({
      mutationFn: (body: CreateOrderRequest) => staffbuyApi.createOrder(body),
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
      queryKey: [
        "staffbuy_orderList",
        {
          page,
          pageSize,
          orderId,
          startDate,
          endDate,
        },
      ],
      queryFn: () =>
        staffbuyApi.getMyOrders({
          page,
          pageSize,
          orderId,
          startDate,
          endDate,
        }),
      select: (res) => res.data,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }),
};

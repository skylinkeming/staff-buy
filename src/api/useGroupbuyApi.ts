import { groupbuyApi, type CreateOrderRequest } from "@/api/groupbuyApi";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGroupbuyApi = {
  useGroupBuyListQuery: () =>
    useQuery({
      queryKey: ["groupbuy_list"],
      queryFn: () => groupbuyApi.getGroupBuyList(),
      select: (res) => {
        return res.data;
      },
      staleTime: 30000,
    }),
  useGroupBuyProductListQuery: (groupbuyId: string) =>
    useQuery({
      queryKey: ["groupbuy_data", groupbuyId],
      queryFn: () => groupbuyApi.getGroupBuyData(groupbuyId),
      enabled: !!groupbuyId,
      select: (res) => {
        return res.data.detail.map((p) => ({
          id: p.iD_Product.toString(),
          groupBuyItemId: p.iD_GroupBy_Item.toString(),
          name: p.cX_ProductName,
          price: p.nQ_Price,
          stock: p.nQ_Less,
        }));
      },
      staleTime: 30000,
    }),
  useGroupBuyStockQuery: (groupbuyItemId: string) =>
    useQuery({
      queryKey: ["groupbuy_stock", groupbuyItemId],
      queryFn: () => groupbuyApi.getStock(groupbuyItemId),
      enabled: !!groupbuyItemId,
      select: (res) => {
        return {
          id: res.data.iD_GroupBy_Item.toString(),
          name: res.data.cX_ProductName,
          stock: res.data.iD_GroupBy_Item,
        };
      },
      staleTime: 30000,
    }),
  useInvoicePickStoreListQuery: (enabled = true) =>
    useQuery({
      queryKey: ["groupbuy_invoicePickupStoreList"],
      queryFn: () => groupbuyApi.getInvoicePickupStoreList(),
      select: (res) => res.data,
      enabled: enabled,
    }),
  usePickupStoreListQuery: (groupbuyId: string) =>
    useQuery({
      queryKey: ["groupbuy_pickupPlaceList"],
      queryFn: () => groupbuyApi.getPickupPlaceByGroupId(groupbuyId),
      select: (res) => res.data,
      enabled: !!groupbuyId,
    }),
  useCreateOrderMutation: () =>
    useMutation({
      mutationFn: (body: CreateOrderRequest) => groupbuyApi.createOrder(body),
    }),
};

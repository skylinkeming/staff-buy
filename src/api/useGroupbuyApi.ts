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
  useGroupBuyDataQuery: (groupbuyId: string) =>
    useQuery({
      queryKey: ["groupbuy_data", groupbuyId],
      queryFn: () => groupbuyApi.getGroupBuyData(groupbuyId),
      enabled: !!groupbuyId,
      select: (res) => {
        return res.data.detail.map((p) => ({
          id: p.iD_Product.toString(),
          name: p.cX_ProductName,
          price: p.nQ_Price,
          stock: p.iD_GroupBy_Item,
        }));
      },
      staleTime: 30000,
    }),
  useCreateOrderMutation: () =>
    useMutation({
      mutationFn: (body: CreateOrderRequest) => groupbuyApi.createOrder(body),
    }),
};

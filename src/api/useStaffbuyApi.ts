import { staffbuyApi, type CreateOrderRequest } from "@/api/staffbuyApi";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useStaffbuyApi = {
  useAnnouncementQuery: () =>
    useQuery({
      queryKey: ["staffbuy_announcement"],
      queryFn: () => staffbuyApi.getAnnouncment(),
      select: (res) => {
        return res.data;
      },
      staleTime: 3000,
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
    }),
};

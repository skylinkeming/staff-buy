import { groupbuyApi, type CreateOrderRequest } from "@/api/groupbuyApi";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGroupbuyApi = {
  useAnnouncementQuery: () =>
    useQuery({
      queryKey: ["groupbuy_announcement"],
      queryFn: () => groupbuyApi.getAnnouncment(),
      select: (res) => {
        return res.data;
      },
      staleTime: 3000,
    }),
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
  useOrderListQuery: (params: {
    page: number;
    pageSize?: number;
    searchTerm?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    return useQuery({
      queryKey: ["groupbuy_orderList", params],
      queryFn: () => groupbuyApi.getMyOrders(params),
      select: (res) => {
        //轉換成訂單UI要用的格式
        return {
          orderList: res.data.list.map((o) => {
            return {
              idBuyM: o.iD_BuyM,
              serialNum: o.cX_Serialnumber ? o.cX_Serialnumber : "尚未成單",
              groupBuyName: o.iD_GroupByNavigation.cX_GroupBy_Name,
              groupBuyId: o.iD_GroupBy.toString(),
              purchasePeriod:
                o.iD_GroupByNavigation.dT_CanBuyFrom
                  .replace("T", " ")
                  .slice(0, 16) +
                " ~ " +
                o.iD_GroupByNavigation.dT_CanBuyTo
                  .replace("T", " ")
                  .slice(0, 16),
              date: o.dT_Create.replace("T", " ").slice(0, 16),
              transport: o.fG_Transport as "Y" | "N",
              totalPrice: o.buyDs.reduce((acc, d) => {
                const price = d.iD_ProductNavigation?.nQ_Price || 0;
                const qty = d.nQ_BuyQuantity || 0;
                return acc + price * qty;
              }, 0),
              details: o.buyDs.map((g) => {
                return {
                  prodName: g.iD_ProductNavigation!.cX_ProductName,
                  qty: g.nQ_BuyQuantity,
                  price: g.iD_ProductNavigation!.nQ_Price,
                  subTotal: g.iD_ProductNavigation!.nQ_Price * g.nQ_BuyQuantity,
                };
              }),
              invoiceInfo: {
                carrierId: o.cX_Invoice_ForWeb,
                loveCode: o.cX_Love_Code,
                invoiceNumber: o.orderMs[0]?.cX_Invoice_Number,
                invoiceDate: o.orderMs[0]?.cX_Invoice_Date,
              },
              shippingInfo: {
                receiver: o.cX_Ship_Name,
                phone: o.cX_Tel,
                address: o.cX_Address,
                shipTime: o.cX_Ship_Time,
                trackingNumber: "",
                fG_Status: o.iD_GroupByNavigation.fG_Status,
                cX_GetDate: "",
                nQ_Bag: 0,
                nQ_Transport_Money: 0,
              },
            };
          }),
          pagination: res.data.pagination,
        };
      },
    });
  },
  useDeleteOrderMutation: () =>
    useMutation({
      mutationFn: (idBuyM: number) => groupbuyApi.deleteOrder(idBuyM),
    }),
};

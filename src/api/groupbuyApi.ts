import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (!res.success) {
      const error: any = new Error(res.message || "系統錯誤");

      if (res.statusCode?.includes("401") || res.code === 401) {
        error.name = "AuthError";
        error.message = "登入逾時，請重新登入";
      }

      return Promise.reject(error);
    }
    return response;
  },
  (error) => Promise.reject(error),
);

export interface ApiResponse<T> {
  data: T;
  eventId: string;
  message: string;
  statusCode: string;
  success: boolean;
}

export interface GroupBuyData {
  iD_GroupBy: number;
  iD_Product: number;
  cX_GroupBy_Name: string;
  nQ_GroupBy_Total_Quantity: number;
  fG_Status: string | null;
  cX_GetDate: string | null;
  staff_PID: string | null;
  dT_Create: string;
  dT_Modify: string | null;
  fG_IsTranning: boolean;
  dT_CanBuyFrom: string;
  dT_CanBuyTo: string;
  buyDs: any[];
  buyMs: any[];
  groupByItems: any[];
  iD_ProductNavigation: any | null;
  orderMs: any[];
  shipPlaces: any[];
}

export interface GroupByResponse {
  master: GroupByMaster;
  detail: GroupBuyProduct[];
}

export interface GroupByMaster {
  fG_Transport: string;
  cX_GetDate: string | null;
  cX_Tel: string | null;
  cX_Address: string | null;
  nQ_Bag: number;
  cX_Invoice_ForWeb: string | null;
  cX_Love_Code: string | null;
  cX_Ship_Name: string | null;
  cX_Ship_Time: string | null;
  iD_GroupBy: number;
}

export interface GroupBuyProduct {
  iD_Product: number;
  cX_ProductName: string;
  nQ_BuyQuantity: number;
  nQ_Price: number;
  cX_UnitName: string;
  nQ_Total: number;
  nQ_Less: number;
  iD_GroupBy_Item: number;
}

export interface Option {
  disabled: boolean;
  selected: boolean;
  text: string;
  value: string;
}

export interface StockInfo {
  iD_GroupBy_Item: number;
  cX_ProductName: string;
  nQ_Less: number;
  nQ_OneMayQty: number;
}

export interface CreateOrderRequest {
  master: {
    //是否宅配
    fG_Transport: "Y" | "N";
    cX_GetDate: string;
    cX_Tel: string;
    cX_Address: string;
    nQ_Bag: number;
    //載具條碼
    cX_Invoice_ForWeb: string;
    //愛心碼
    cX_Love_Code: string;
    //收件人姓名
    cX_Ship_Name: string;
    cX_Ship_Time: string;
    //團購主題id
    iD_GroupBy: string;
    //發票領取地點
    cX_Invoice_Store?: string;
  };
  detail: Array<{
    iD_Product: number;
    iD_GroupBy_Item: number;
    nQ_BuyQuantity: number;
  }>;
}

interface ProductNavigation {
  iD_Product: number;
  cX_ProductName: string;
  nQ_Quantity: number;
  nQ_Original_Price: number | null;
  nQ_Price: number;
  cX_Unit: string;
  nQ_Sort: number | null;
  fG_IsUse: boolean | null;
  cX_ItemNo: string | null;
  dT_Create: string | null;
  dT_Modify: string | null;
  cX_ProductName_Shot: string | null;
  nQ_StockQty: number | null;
  fG_IsCal: boolean;
  buyDs: any[];
  cX_UnitNavigation: any | null;
  groupBies: any[];
  groupByItems: any[];
  orderDs: any[];
}

interface GroupByItem {
  iD_GroupBy_Item: number;
  iD_GroupBy: number;
  iD_Product: number;
  nQ_MaxQty: number;
  nQ_OneMayQty: number;
  buyDs: any[];
  iD_GroupByNavigation: any | null;
  iD_ProductNavigation: ProductNavigation | null;
}
interface BuyD {
  iD_BuyD: number;
  iD_BuyM: number;
  iD_GroupBy: number;
  iD_GroupBy_Item: number;
  iD_Product: number;
  nQ_BuyQuantity: number;
  dT_Create: string;
  iD_BuyMNavigation: any | null;
  iD_GroupByNavigation: any | null;
  iD_GroupBy_ItemNavigation: GroupByItem;
  iD_ProductNavigation: ProductNavigation;
}

interface ShipPlace {
  iD_GroupBy: number;
  cX_ShipPlace: string;
  cX_Creater: string;
  dT_Create: string;
  cX_IP: string;
  iD_GroupByNavigation: any | null;
}

interface GroupByNavigation {
  iD_GroupBy: number;
  iD_Product: number;
  cX_GroupBy_Name: string;
  nQ_GroupBy_Total_Quantity: number;
  fG_Status: string;
  cX_GetDate: string | null;
  staff_PID: string | null;
  dT_Create: string;
  dT_Modify: string | null;
  fG_IsTranning: boolean;
  dT_CanBuyFrom: string;
  dT_CanBuyTo: string;
  buyDs: any[];
  buyMs: any[];
  groupByItems: GroupByItem[];
  iD_ProductNavigation: any | null;
  orderMs: any[];
  shipPlaces: ShipPlace[];
}

export interface OrderItem {
  iD_BuyM: number;
  iD_GroupBy: number;
  cX_Serialnumber: string | null;
  cX_Name: string;
  cX_PID: string;
  fG_Transport: string; // "N" or "Y"
  cX_Tel: string;
  cX_Address: string;
  cX_Ship_Name: string;
  cX_Ship_Time: string;
  cX_BuyIP: string | null;
  dT_Create: string;
  dT_Modify: string | null;
  cX_Sender_Name: string | null;
  cX_Sender_Tel: string | null;
  cX_Invoice_Store: string;
  cX_Invoice_ForWeb: string;
  cX_Love_Code: string;
  buyDs: BuyD[];
  iD_GroupByNavigation: GroupByNavigation;
  orderMs: any[];
}

export interface OrderListResponse {
  list: Array<OrderItem>;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export const groupbuyApi = {
  getAnnouncment: () =>
    api
      .get<
        ApiResponse<{
          announcement: string;
          notice: string;
        }>
      >("/Common/GetAnnouncement?cx_Code=groupbuy")
      .then((res) => res.data),
  getGroupBuyList: () =>
    api
      .get<ApiResponse<Array<GroupBuyData>>>("/GroupBuy/GetGroupBuyList")
      .then((res) => res.data),
  getGroupBuyData: (groupBuyId: string) =>
    api
      .get<
        ApiResponse<GroupByResponse>
      >("/GroupBuy/GetGroupBuyData?id=" + groupBuyId)
      .then((res) => res.data),
  getStock: (groupItemId: string) =>
    api
      .get<ApiResponse<StockInfo>>("/GroupBuy/GetStock?id=" + groupItemId)
      .then((res) => res.data),
  getInvoicePickupStoreList: () =>
    api
      .get<ApiResponse<Array<Option>>>("/Common/GetInvoicePickupStoreList")
      .then((res) => res.data),
  getPickupPlaceByGroupId: (groupId: string) =>
    api
      .get<
        ApiResponse<Array<ShipPlace>>
      >("/Common/GetPickupPlaceByGroupBuyId?id_group=" + groupId)
      .then((res) => res.data),
  createOrder: (body: CreateOrderRequest) =>
    api
      .post<ApiResponse<string>>("/GroupBuy/Create", body)
      .then((res) => res.data),
  getMyOrders: async ({
    page = 1,
    pageSize = 10,
    searchTerm,
    startDate,
    endDate,
  }: {
    page: number;
    pageSize?: number;
    searchTerm?: string;
    startDate?: string | null;
    endDate?: string | null;
  }) => {
    if (!startDate && !endDate) {
      startDate = null;
      endDate = null;
    }
    const data = {
      page,
      pageSize,
      startDate,
      endDate,
      cX_GroupBy_Name: searchTerm,
    };

    return api
      .post<ApiResponse<OrderListResponse>>("/GroupBuy/GetMyGroupBuyList", data)
      .then((res) => res.data);
  },
  deleteOrder: async (idBuyM: number) => {
    return api
      .post<ApiResponse<any>>("/GroupBuy/Delete?iD_BuyM=" + idBuyM)
      .then((res) => res.data);
  },
};

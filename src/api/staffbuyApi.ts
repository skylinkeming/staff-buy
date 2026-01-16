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
  (error) => Promise.reject(error)
);

export interface ApiResponse<T> {
  data: T;
  eventId: string;
  message: string;
  statusCode: string;
  success: boolean;
}

export interface StaffBuyProduct {
  iD_Product: string;
  cX_ProductName: string;
  nQ_Quantity: number;
  nQ_Original_Price: number;
  nQ_BuyPrice: number;
  nQ_BuyQuantity: number;
  cX_UnitName: string;
  nQ_BuyTotalPrice: number;
  nQ_Less: number;
  iD_GroupBy_Item: number;
  nQ_OneMayQty: number;
  nQ_StockQty: number;
}

export interface Option {
  disabled: boolean;
  selected: boolean;
  text: string;
  value: string;
}

export interface OrderItem {
  id: number;
  serialNum: string;
  date: string;
  totalPrice: number;
  //是否宅配
  transport: "Y" | "N";
  invoiceInfo: {
    invoiceNumber: string | null;
    invoiceDate: string | null;
    carrierId: string;
    loveCode: string;
  };
  shippingInfo: {
    receiver: string;
    phone: string;
    address: string;
    shipTime: string;
    trackingNumber: string | null;
    fG_Status: string;
    cX_GetDate: string;
    nQ_Bag: number;
    nQ_Transport_Money: number;
  };
  details: {
    prodName: string;
    qty: number;
    price: number;
    subTotal: number;
  }[];
}

export interface OrderListResponse {
  orderList: Array<OrderItem>;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
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
    //團購主題id 員購不用帶
    iD_GroupBy?: string;
  };
  detail: Array<{
    iD_Product: number;
    nQ_BuyQuantity: number;
  }>;
}

export const staffbuyApi = {
  login: (body: { qwe: string }) =>
    api.post<ApiResponse<string>>("/Auth/login", body).then((res) => res.data),
  getUserInfo: () =>
    api
      .get<
        ApiResponse<{
          eID: string;
          displayName: string;
          deptId: string;
          deptName: string;
        }>
      >("/Auth/userinfo")
      .then((res) => res.data),
  getAnnouncment: () =>
    api
      .get<
        ApiResponse<{
          announcement: string;
          notice: string;
        }>
      >("/Common/GetAnnouncement?cx_Code=buy")
      .then((res) => res.data),
  getProducts: () =>
    api
      .get<ApiResponse<Array<StaffBuyProduct>>>("/Product/GetProductList")
      .then((res) => res.data),
  getProductStockList: (productId?: string) => {
    if (!productId) return Promise.reject("No ID provided");

    let url = "/Product/GetProductStockList";
    if (productId) {
      url += "?ID_Product=" + productId;
    }
    return api
      .get<ApiResponse<Array<{ iD_Product: string; nQ_StockQty: number }>>>(url)
      .then((res) => res.data);
  },
  getShipTimeList: () =>
    api
      .get<ApiResponse<Array<Option>>>("/Common/ShipTimeList")
      .then((res) => res.data),
  getBagList: () =>
    api
      .get<ApiResponse<Array<Option>>>("/Common/BagList")
      .then((res) => res.data),
  getInvoicePickupStoreList: () =>
    api
      .get<ApiResponse<Array<Option>>>("/Common/GetInvoicePickupStoreList")
      .then((res) => res.data),
  createOrder: (body: CreateOrderRequest) =>
    api
      .post<ApiResponse<string>>("/Order/CreateOrder", body)
      .then((res) => res.data),
  getMyOrders: ({
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
  }) => {
    let baseUrl = `/Order/GetOrderList?Page=${page}&PageSize=${pageSize}`;

    if (orderId) {
      baseUrl += `&OrderId=${orderId}`;
    }

    if (startDate && endDate) {
      baseUrl += `&StartDate=${startDate}&EndDate=${endDate}`;
    }

    return api
      .get<ApiResponse<OrderListResponse>>(baseUrl)
      .then((res) => res.data);
  },
};

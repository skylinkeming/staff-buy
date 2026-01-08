import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (!res.success) {
      let error = new Error(res.message || "系統錯誤");
      if (res.statusCode.includes("401")) {
        error = new Error("登入逾時，請重新登入");
      }
      return Promise.reject(error);
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
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
}

export interface Option {
  disabled: boolean;
  selected: boolean;
  text: string;
  value: string;
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
  getProductStockList: () =>
    api
      .get<ApiResponse<Array<{ iD_Product: string; nQ_StockOty: number }>>>(
        "/Product/GetProductStockList"
      )
      .then((res) => res.data),
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
  getMyOrders: () =>
    api
      .get<ApiResponse<Array<StaffBuyProduct>>>("/Product/GetProductList")
      .then((res) => res.data),
  createOrder: (body: CreateOrderRequest) =>
    api
      .post<ApiResponse<string>>("/Order/CreateOrder", body)
      .then((res) => res.data),
};

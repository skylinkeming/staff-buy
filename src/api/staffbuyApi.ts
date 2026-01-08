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
    if (res.code !== 200 && !res.success) {
      const error = new Error(
        res.Message +
          (res.statusCode ? ", statusCode=" + res.statusCode : "") || "系統錯誤"
      );
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
  getShipTimeList: () =>
    api
      .get<
        ApiResponse<
          Array<{
            disabled: boolean;
            selected: boolean;
            text: string;
            value: string;
          }>
        >
      >("/Common/ShipTimeList")
      .then((res) => res.data),
  getBagList: () =>
    api
      .get<
        ApiResponse<
          Array<{
            disabled: boolean;
            selected: boolean;
            text: string;
            value: string;
          }>
        >
      >("/Common/BagList")
      .then((res) => res.data),
  getMyOrders: () =>
    api
      .get<ApiResponse<Array<StaffBuyProduct>>>("/Product/GetProductList")
      .then((res) => res.data),
};

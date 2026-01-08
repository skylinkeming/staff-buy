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
  //   getUsers: () => api.get<UserInfo>("/users"),
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
  getMyOrders: () =>
    api
      .get<ApiResponse<Array<StaffBuyProduct>>>("/Product/GetProductList")
      .then((res) => res.data),
};

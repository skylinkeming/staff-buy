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

export interface Option {
  disabled: boolean;
  selected: boolean;
  text: string;
  value: string;
}

// 共用的API
export const commonApi = {
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
  getHasLayout: () =>
    api.get<ApiResponse<boolean>>("/Common/HasLayout").then((res) => res.data),
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
};

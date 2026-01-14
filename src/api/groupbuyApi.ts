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
    // if (!res.success) {
    //   let error = new Error(res.message || "系統錯誤");
    //   if (res.statusCode?.includes("401")) {
    //     error = new Error("登入逾時，請重新登入");
    //   }
    //   return Promise.reject(error);
    // }

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
  detail: GroupByDetail[];
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

export interface GroupByDetail {
  iD_Product: number;
  cX_ProductName: string;
  nQ_BuyQuantity: number;
  nQ_Price: number;
  cX_UnitName: string;
  nQ_Total: number;
  nQ_Less: number;
  iD_GroupBy_Item: number;
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
  };
  detail: Array<{
    iD_Product: number;
    nQ_BuyQuantity: number;
  }>;
}

export const groupbuyApi = {
  getGroupBuyList: () =>
    api
      .get<ApiResponse<Array<GroupBuyData>>>("/GroupBuy/GetGroupBuyList")
      .then((res) => res.data),
  getGroupBuyData: (groupBuyId: string) =>
    api
      .get<ApiResponse<GroupByResponse>>(
        "/GroupBuy/GetGroupBuyData?id=" + groupBuyId
      )
      .then((res) => res.data),
  createOrder: (body: CreateOrderRequest) =>
    api
      .post<ApiResponse<string>>("/GroupBuy/Create", body)
      .then((res) => res.data),
};

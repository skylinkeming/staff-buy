import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import type { ApiResponse } from "../staffbuyApi";

const api = axios.create({
    baseURL: import.meta.env.VITE_PARTYUP_API_BASE_URL,
    timeout: 10000,
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().tokens.partyup;
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

            if (res.statusCode?.includes("403") || res.code === 403) {
                error.name = "AuthError";
                error.message = "權限不足";
            }

            return Promise.reject(error);
        }
        return response;
    },
    (error) => Promise.reject(error)
);



/** 團購商品選項介面 */
export interface ProductOption {
    productId: string;     // 商品 ID
    imgUrl: string;        // 商品圖片網址
    prodName: string;      // 商品名稱
    optionDesc: string;    // 選項描述 (例如顏色、尺寸)
    partyPrice: number;    // 團購價格
    originalPrice: number; // 原價
}

/** 揪團活動主資料介面 */
export interface PartyUpData {
    id: string;                      // 團購 ID
    partyName: string;               // 團購名稱
    participants: number;            // 參與人數
    period: string;                  // 團購期間 (格式: YYYY/MM/DD~YYYY/MM/DD)
    partyStatus: number;             // 團購狀態: 1 = 上架中, 0 = 下架 (可依需求定義 Enum)
    productOptions: ProductOption[]; // 商品選項清單
    otherPrdImages: string[];        // 其他商品圖片網址清單
    productSummary: string;          // 商品簡介
    productSpec: string;             // 商品規格說明
    note: string;                    // 備註/注意事項
    requiresShippingInfo: boolean;   // 是否需要宅配資訊
}


/** 訂單列表 API 回傳總介面 */
export interface OrderListResponse {
    list: Order[];
    page: number;
    pageSize: number;
    total: number;
}
export interface OrderItem {
    optionName: string;
    specText: string;
    qty: number;
    unitPrice: number;
    subtotal: number;
    imageUrl: string;
}

export interface Order {
    partyId: string;
    orderId: string;
    orderNo: string;
    createdAt: string; // 若需處理 Date 物件，可在接收後自行轉換
    status: 'SUBMITTED' | 'CANCELLED' | 'COMPLETED'; // 這裡可根據實際狀況擴充狀態字串
    deliveryMethod: 'PICKUP' | 'DELIVERY'; // 同上，建議用 Union Type 增加精確度
    totalAmount: number;
    partyTitle: string;
    items: OrderItem[];
    receiverAddress: string;
    receiverName: string;
    receiverPhone: string;
}

export interface OrderShippingInfo {
    trackingNumber: string; // 物流單號
    shippingFee: number;    // 運費
    name: string;           // 收件人姓名
    phone: string;          // 收件人電話
    address: string;        // 收件地址
}

export interface Pagination {
    page: number;     // 目前頁碼
    pageSize: number; // 每頁筆數
    total: number;    // 總筆數
}

export interface PartySummary {
    id: string;
    imageUrl: string;
    minPrice: number;
    participants: number;
    period: string;
    status: 'OPEN' | 'CLOSED' | string;
    title: string;
}

export interface PartyListResponse {
    list: PartySummary[];
    page: number;
    pageSize: number;
    totalCount: number;
}

// 揪團商品選項
export interface PartyOption {
    id: string;
    optionName: string;
    specText: string;
    price: number;
    seqNo: number;
    imageUrls: string[];
}

export interface PartyDetail {
    id: string;
    title: string;
    status: 'OPEN' | 'CLOSED' | string;
    startDate: string;
    endDate: string;
    introContent: string;
    noticeContent: string;
    isDeliveryNeeded: boolean;
    participants: number;
    imageUrls: string[];
    options: PartyOption[];
}


export interface CheckoutItem {
    /** 商品選項 ID (UUID) */
    optionId: string;
    /** 購買數量 */
    qty: number;
}

export interface CreateOrderRequest {
    /** 團購活動/事件 ID (UUID) */
    partyId: string;
    deliveryMethod: 'DELIVERY' | 'PICKUP';
    receiverName?: string;
    receiverPhone?: string;
    receiverAddress?: string;
    deliveryNote?: string;
    /** 購買商品清單 */
    items: CheckoutItem[];
}

export const partyupApi = {
    // PS:partyup的登入API路徑與staffbuyLogin的API路徑不同 所以另外寫一隻login
    async partyupLogin(body: { qwe: string }): Promise<ApiResponse<string>> {
        const response = await api.post<ApiResponse<string>>("/Auth/login", body);
        return response.data;
    },
    async getUserInfo(): Promise<ApiResponse<{
        eID: string;
        displayName: string;
        deptId: string;
        deptName: string;
    }>> {
        const response = await api.get<ApiResponse<{
            eID: string;
            displayName: string;
            deptId: string;
            deptName: string;
        }>>("/Auth/userinfo");
        return response.data;
    },
    async getPartyList(searchText?: string): Promise<ApiResponse<PartyListResponse>> {
        let url = `/PartyUp?Page=1&PageSize=10`;
        if (searchText) {
            url += `&SearchText=${searchText}`;
        }
        const response = await api.get(url);
        return response.data;
    },
    async getPartyDetail(id: string): Promise<ApiResponse<PartyDetail>> {
        const response = await api.get(`/PartyUp/${id}`);
        return response.data;
    },
    async createOrder(body: CreateOrderRequest): Promise<ApiResponse<any>> {
        const response = await api.post(`/Orders`, body);
        return response.data;
    },
    getOrderList: async ({
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
        let baseUrl = `/Orders?Page=${page}&PageSize=${pageSize}`;

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

}

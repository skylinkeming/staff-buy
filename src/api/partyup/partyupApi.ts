import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import type { ApiResponse } from "../staffbuyApi";

const api = axios.create({
    baseURL: import.meta.env.VITE_PARTYUP_API_BASE_URL,
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
    orderList: OrderData[];
    pagination: Pagination;
}

/** 單筆訂單主資料 */
export interface OrderData {
    orderId: string;           // 訂單編號
    createdAt: string;         // 建立時間 (YYYY-MM-DD HH:mm)
    pickupDate: string;        // 領取/送達時間
    pickupMethod: "自取" | "宅配"; // 領取方式
    orderStatus: string;       // 訂單狀態 (如：已領取、待發貨)
    totalAmount: number;       // 總金額
    partyName: string;         // 團購活動名稱
    buyItems: OrderBuyItem[];  // 購買商品清單
    shippingInfo?: OrderShippingInfo; // 配送資訊 (若為自取可能為 null 或不帶，故設為可選)
}

export interface OrderBuyItem {
    imageUrl: string; // 商品圖片網址
    name: string;     // 商品名稱
    qty: number;      // 數量
    price: number;    // 單價
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
    eventId: string;
    /** 配送方式 (例如: 'HOME_DELIVERY', 'OFFICE_PICKUP') */
    deliveryMethod: string;
    receiverName: string;
    receiverPhone: string;
    receiverAddress: string;
    /** 配送備註 (選填) */
    deliveryNote?: string;
    /** 購買商品清單 */
    items: CheckoutItem[];
}

export const partyupApi = {
    async getPartyList(): Promise<ApiResponse<PartyListResponse>> {
        const response = await api.get(`/PartyUp?Page=1&PageSize=10`);
        return response.data;
    },
    async getPartyDetail(id: string): Promise<ApiResponse<PartyDetail>> {
        const response = await api.get(`/PartyUp/${id}`);
        return response.data;
    },
    async createOrder(body: CreateOrderRequest): Promise<ApiResponse<CreateOrderResponse>> {
        const response = await api.post(`/Orders`, body);
        return response.data;
    },

}

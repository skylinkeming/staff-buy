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

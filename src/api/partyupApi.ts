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

export const partyupApi = {
    /** 取得團購商品列表 */
    async getPartyUpProductList(partyId: string): Promise<PartyUpData> {
        const response = await api.get(`/api/partyup/product/${partyId}`);
        return response.data;
    },

    /** 取得訂購紀錄 */
    async getOrderList(): Promise<OrderData[]> {
        // const response = await api.get(`/api/partyup/order/${partyId}`);
        // return response.data;

        return new Promise((resolve) => {

            setTimeout(() => {
                let res = {} as any;
                res.data = [
                    {
                        orderId: "123",
                        createdAt: "2025/11/1",
                        pickupDate: "2025/11/1",
                        pickupMethod: "自取",
                        orderStatus: "已領取",
                        totalAmount: 100,
                        partyName: "毛巾團購",
                        buyItems: [
                            {
                                imageUrl: "https://i5.momoshop.com.tw/1769164284/goodsimg/TP000/6553/0011/974/TP00065530011974_R.webp",
                                name: "毛巾",
                                qty: 1,
                                price: 100
                            }
                        ],
                        shippingInfo: {
                            trackingNumber: "123",
                            shippingFee: 100,
                            name: "Steve Lin",
                            phone: "0912345678",
                            address: "台北市中山區..."
                        }
                    }
                ]
                resolve(res)
            }, 1000)
        })
    },


}

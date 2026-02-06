import type { ProductOption } from "@/api/partyupApi";
import { create } from "zustand";



/** 每個團購活動在購物車中的實體 */
export interface PartyCartEntry {
    partyId: string;
    partyName: string; // 方便 UI 顯示
    requiresShippingInfo: boolean;
    items: Record<string, ProductOption & { quantity: number }>;
}

export interface CartState {
    // 改為 Record<partyId, PartyCartEntry>
    cartsByParty: Record<string, PartyCartEntry>;

    // UI 需要的資訊暫存
    ordererInfo: { name: string; dept: string; staffId: string };
    shippingInfo: { name: string; phone: string; address: string; /* ...其他欄位 */ };

    // Actions
    /** 更新商品，需傳入該商品所屬的團購資訊 */
    updateCart: (
        party: { id: string; name: string; requiresShippingInfo: boolean },
        product: ProductOption,
        targetQuantity: number
    ) => void;

    removeFromCart: (partyId: string, productId: string) => void;
    clearAllCarts: () => void;

    /** 核心：產出符合 API 格式的資料 */
    getApiPayload: () => any;
}

export const usePartyupStore = create<CartState>((set, get) => ({
    cartsByParty: {},
    ordererInfo: { name: "", dept: "", staffId: "" },
    shippingInfo: { name: "", phone: "", address: "" },

    updateCart: (party, product, targetQuantity) =>
        set((state) => {
            const newCarts = { ...state.cartsByParty };
            const partyId = party.id;

            // 如果該團購還不在購物車裡，先初始化
            if (!newCarts[partyId]) {
                newCarts[partyId] = {
                    partyId: partyId,
                    partyName: party.name,
                    requiresShippingInfo: party.requiresShippingInfo,
                    items: {},
                };
            }

            if (targetQuantity <= 0) {
                delete newCarts[partyId].items[product.productId];
                // 如果該團購下沒東西了，就把整個團購移除
                if (Object.keys(newCarts[partyId].items).length === 0) {
                    delete newCarts[partyId];
                }
            } else {
                newCarts[partyId].items[product.productId] = {
                    ...product,
                    quantity: targetQuantity,
                };
            }

            return { cartsByParty: newCarts };
        }),

    removeFromCart: (partyId, productId) =>
        set((state) => {
            const newCarts = { ...state.cartsByParty };
            if (newCarts[partyId]) {
                delete newCarts[partyId].items[productId];
                if (Object.keys(newCarts[partyId].items).length === 0) {
                    delete newCarts[partyId];
                }
            }
            return { cartsByParty: newCarts };
        }),

    clearAllCarts: () => set({ cartsByParty: {} }),

    getApiPayload: () => {
        const { cartsByParty, shippingInfo } = get();

        return {
            cart: Object.values(cartsByParty).map((partyEntry) => {
                const payload: any = {
                    partyId: partyEntry.partyId,
                    buyItems: Object.values(partyEntry.items).map((item) => ({
                        productId: item.productId,
                        qty: item.quantity,
                    })),
                };

                // 只有需要宅配資訊的團購才帶入 shippingInfo
                if (partyEntry.requiresShippingInfo) {
                    payload.shippingInfo = {
                        name: shippingInfo.name,
                        phone: shippingInfo.phone,
                        address: shippingInfo.address,
                    };
                }

                return payload;
            }),
        };
    },
}));
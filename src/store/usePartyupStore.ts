import type { PartyOption, ProductOption } from "@/api/partyup/partyupApi";
import { create } from "zustand";



/** 每個團購活動在購物車中的實體 */
export interface PartyCartData {
    partyId: string;
    partyName: string; // 方便 UI 顯示
    requiresShippingInfo: boolean;
    items: Record<string, PartyOption & { quantity: number }>;
    shippingInfo: { name: string; phone: string; address: string; };
    formError: boolean;
}

export interface CartState {
    // Record<partyId, PartyCartEntry>
    cartsByParty: Record<string, PartyCartData>;

    // Actions
    updateCart: (
        party: { id: string; name: string; requiresShippingInfo: boolean },
        product: PartyOption,
        targetQuantity: number
    ) => void;

    updateShippingInfo: (partyId: string, shippingInfo: { name: string; phone: string; address: string; }) => void;
    removeFromCart: (partyId: string, productId: string) => void;
    clearAllCarts: () => void;
    updateFormError: (partyId: string, formError: boolean) => void;
    /** 產出符合 API 格式的資料 */
    getApiPayload: () => any;
}

export const usePartyupStore = create<CartState>((set, get) => ({
    cartsByParty: {},

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
                    shippingInfo: { name: "", phone: "", address: "" },
                    formError: false,
                };
            }

            if (targetQuantity <= 0) {
                delete newCarts[partyId].items[product.id];
                // 如果該團購下沒東西了，就把整個團購移除
                if (Object.keys(newCarts[partyId].items).length === 0) {
                    delete newCarts[partyId];
                }
            } else {
                newCarts[partyId].items[product.id] = {
                    ...product,
                    quantity: targetQuantity,
                };
            }

            return { cartsByParty: newCarts };
        }),

    updateShippingInfo: (partyId, shippingInfo) =>
        set((state) => {
            const newCarts = { ...state.cartsByParty };
            if (newCarts[partyId]) {
                newCarts[partyId].shippingInfo = { ...shippingInfo };
            }
            return { cartsByParty: newCarts };
        }),
    updateFormError: (partyId, formError) =>
        set((state) => {
            const newCarts = { ...state.cartsByParty };
            if (newCarts[partyId]) {
                newCarts[partyId].formError = formError;
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
        const { cartsByParty } = get();

        return {
            cart: Object.values(cartsByParty).map((partyEntry) => {
                const payload: any = {
                    partyId: partyEntry.partyId,
                    buyItems: Object.values(partyEntry.items).map((item) => ({
                        productId: item.id,
                        qty: item.quantity,
                    })),
                };

                // 只有需要宅配資訊的團購才帶入 shippingInfo
                if (partyEntry.requiresShippingInfo) {
                    payload.shippingInfo = {
                        name: partyEntry.shippingInfo.name,
                        phone: partyEntry.shippingInfo.phone,
                        address: partyEntry.shippingInfo.address,
                    };
                }

                return payload;
            }),
        };
    },
}));
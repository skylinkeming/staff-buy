import type { CreateOrderRequest, PartyOption } from "@/api/partyup/partyupApi";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 擴充商品型別，加入 quantity 與 checked
export type CartItem = PartyOption & { quantity: number; checked: boolean };

export interface PartyCartData {
    partyId: string;
    partyName: string;
    requiresShippingInfo: boolean;
    items: Record<string, CartItem>;
    shippingInfo: { name: string; phone: string; address: string; };
    formError: boolean;
}

export interface CartState {
    cartsByParty: Record<string, PartyCartData>;
    updateCart: (
        party: { id: string; name: string; requiresShippingInfo: boolean },
        product: PartyOption,
        targetQuantity: number
    ) => void;
    toggleItemChecked: (partyId: string, productId: string, checked: boolean) => void;
    togglePartyAllChecked: (partyId: string, checked: boolean) => void;
    updateShippingInfo: (partyId: string, shippingInfo: { name: string; phone: string; address: string; }) => void;
    removeFromCart: (partyId: string, productId: string) => void;
    clearAllCarts: () => void;
    updateFormError: (partyId: string, formError: boolean) => void;
    getApiPayload: () => any;
}

export const usePartyupStore = create<CartState>()(
    persist(
        (set, get) => ({
            cartsByParty: {},

            updateCart: (party, product, targetQuantity) =>
                set((state) => {
                    const newCarts = { ...state.cartsByParty };
                    const partyId = party.id;

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
                        if (Object.keys(newCarts[partyId].items).length === 0) {
                            delete newCarts[partyId];
                        }
                    } else {
                        // 新增商品時，預設為勾選狀態 (checked: true)
                        const isNewItem = !newCarts[partyId].items[product.id];
                        newCarts[partyId] = {
                            ...newCarts[partyId],
                            items: {
                                ...newCarts[partyId].items,
                                [product.id]: {
                                    ...product,
                                    quantity: targetQuantity,
                                    checked: isNewItem ? true : newCarts[partyId].items[product.id].checked,
                                }
                            }
                        };
                    }

                    return { cartsByParty: newCarts };
                }),
            toggleItemChecked: (partyId, productId, checked) =>
                set((state) => {
                    const newCarts = { ...state.cartsByParty };
                    if (newCarts[partyId] && newCarts[partyId].items[productId]) {
                        newCarts[partyId].items[productId] = {
                            ...newCarts[partyId].items[productId],
                            checked,
                        };
                    }
                    return { cartsByParty: newCarts };
                }),
            togglePartyAllChecked: (partyId, checked) =>
                set((state) => {
                    const newCarts = { ...state.cartsByParty };

                    // 檢查該 Party 是否存在
                    if (newCarts[partyId]) {
                        const party = newCarts[partyId];
                        const newItems = { ...party.items };

                        // 遍歷所有商品，統一修改 checked 狀態
                        Object.keys(newItems).forEach((productId) => {
                            newItems[productId] = {
                                ...newItems[productId],
                                checked: checked,
                            };
                        });

                        // 更新該 Party 的實體
                        newCarts[partyId] = {
                            ...party,
                            items: newItems,
                        };
                    }

                    return { cartsByParty: newCarts };
                }),
            updateShippingInfo: (partyId, shippingInfo) =>
                set((state) => {
                    const newCarts = { ...state.cartsByParty };
                    if (newCarts[partyId]) {
                        newCarts[partyId] = { ...newCarts[partyId], shippingInfo: { ...shippingInfo } };
                    }
                    return { cartsByParty: newCarts };
                }),

            updateFormError: (partyId, formError) =>
                set((state) => {
                    const newCarts = { ...state.cartsByParty };
                    if (newCarts[partyId]) {
                        newCarts[partyId] = { ...newCarts[partyId], formError };
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
            getApiPayload: (): CreateOrderRequest[] => {
                const { cartsByParty } = get();

                return Object.values(cartsByParty)
                    .map((partyEntry) => {
                        // 1. 只取出有勾選的商品
                        const checkedItems = Object.values(partyEntry.items).filter(item => item.checked);

                        // 如果該揪團沒有任何勾選商品，則不產出該筆訂單
                        if (checkedItems.length === 0) return null;

                        // 2. 組裝符合 CreateOrderRequest 格式的物件
                        const request: CreateOrderRequest = {
                            eventId: partyEntry.partyId,
                            deliveryMethod: partyEntry.requiresShippingInfo ? 'HOME_DELIVERY' : 'OFFICE_PICKUP',
                            receiverName: partyEntry.shippingInfo.name || "",
                            receiverPhone: partyEntry.shippingInfo.phone || "",
                            receiverAddress: partyEntry.shippingInfo.address || "",
                            items: checkedItems.map((item) => ({
                                optionId: item.id,
                                qty: item.quantity,
                            })),
                        };

                        return request;
                    })
                    .filter((item): item is CreateOrderRequest => item !== null); // 確保回傳型別正確且移除 null
            },
        }),
        {
            name: "party-cart-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ cartsByParty: state.cartsByParty }),
        }
    )
);
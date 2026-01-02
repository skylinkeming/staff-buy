import { create } from "zustand";

interface CartItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

interface CartState {
  staffCart: Record<string, CartItem>;
  groupCart: Record<string, CartItem>;
  updateCart: (
    type: "staff" | "group",
    product: Omit<CartItem, "quantity">,
    targetQuantity: number
  ) => void;
  clearCart: (type: "staff" | "group") => void;
}

export const useCartStore = create<CartState>((set) => ({
  staffCart: {},
  groupCart: {},
  updateCart: (type, product, targetQuantity) =>
    set((state) => {
      const cartKey = type === "staff" ? "staffCart" : "groupCart";
      const newCart = { ...state[cartKey] };

      if (targetQuantity <= 0) {
        delete newCart[product.productId];
      } else {
        newCart[product.productId] = { ...product, quantity: targetQuantity };
      }

      return { [cartKey]: newCart };
    }),
  clearCart: (type) =>
    set({ [type === "staff" ? "staffCart" : "groupCart"]: [] }),
}));

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
  pickupMethod: string;
  ordererInfo: {
    name: string;
    dept: string;
    staffId: string;
  };
  shippingInfo: {
    name: string;
    phone: string;
    address: string;
    deliveryTime: string;
  };
  invoiceInfo: {
    location: string;
    donationCode: string;
    carrierId: string;
  };
  updateCart: (
    type: "staff" | "group",
    product: Omit<CartItem, "quantity">,
    targetQuantity: number
  ) => void;
  removeFromCart: (type: "staff" | "group", productId: string) => void;
  updateShippingInfo: (info: Partial<CartState["shippingInfo"]>) => void;
  updateInvoiceInfo: (info: Partial<CartState["invoiceInfo"]>) => void;
  updateOrdererInfo: (info: Partial<CartState["ordererInfo"]>) => void;
}

export const useCartStore = create<CartState>((set) => ({
  staffCart: {},
  groupCart: {},
  pickupMethod: "2",
  ordererInfo: {
    name: "王大名",
    dept: "資訊部",
    staffId: "016655",
  },
  shippingInfo: {
    name: "",
    phone: "",
    address: "",
    deliveryTime: "",
  },
  invoiceInfo: {
    location: "",
    donationCode: "",
    carrierId: "",
  },
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
  removeFromCart: (type, productId) =>
    set((state) => {
      const cartKey = type === "staff" ? "staffCart" : "groupCart";
      const newCart = { ...state[cartKey] };
      delete newCart[productId];

      return { [cartKey]: newCart };
    }),
  updateShippingInfo: (info) =>
    set((state) => ({
      shippingInfo: { ...state.shippingInfo, ...info },
    })),
  updateInvoiceInfo: (info) =>
    set((state) => ({
      invoiceInfo: { ...state.invoiceInfo, ...info },
    })),
  updateOrdererInfo: (info) =>
    set((state) => ({
      ordererInfo: { ...state.ordererInfo, ...info },
    })),
}));

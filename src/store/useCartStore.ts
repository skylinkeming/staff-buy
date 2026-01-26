import { create } from "zustand";

export interface CartItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  limit?: number;
  //團購才會用到
  groupItemId?: string;
}

export interface CartState {
  selectedGroup: {
    id: string;
    name: string;
    canBuyFrom: string;
    canBuyTo: string;
  };
  staffCart: Record<string, CartItem>;
  groupCart: Record<string, CartItem>;
  ordererInfo: {
    name: string;
    dept: string;
    staffId: string;
  };
  shippingInfo: {
    isDelivery: "Y" | "N";
    pickupDate: string;
    location: string;
    name: string;
    phone: string;
    address: string;
    deliveryTime: string;
    bagQty: string;
  };
  invoiceInfo: {
    location: string;
    loveCode: string;
    carrierId: string;
  };
  formErrors: {
    shipping: boolean;
    invoice: boolean;
  };
  updateSelectedGroup: (params: {
    id: string;
    name: string;
    canBuyFrom: string;
    canBuyTo: string;
  }) => void;
  updateCart: (
    type: "staff" | "group",
    product: Omit<CartItem, "quantity">,
    targetQuantity: number
  ) => void;
  removeFromCart: (type: "staff" | "group", productId: string) => void;
  clearCart: (type: "staff" | "group") => void;
  updateShippingInfo: (info: Partial<CartState["shippingInfo"]>) => void;
  updateInvoiceInfo: (info: Partial<CartState["invoiceInfo"]>) => void;
  updateOrdererInfo: (info: Partial<CartState["ordererInfo"]>) => void;
  setFormError: (module: "invoice" | "shipping", hasError: boolean) => void;
}

// 員購 團購 專用的store
export const useCartStore = create<CartState>((set) => ({
  selectedGroup: {
    id: "",
    name: "",
    canBuyFrom: "",
    canBuyTo: "",
  },
  staffCart: {},
  groupCart: {},
  ordererInfo: {
    name: "",
    dept: "",
    staffId: "",
  },
  shippingInfo: {
    pickupDate: "",
    name: "",
    phone: "",
    address: "",
    deliveryTime: "",
    isDelivery: "N",
    bagQty: "0",
    location: "",
  },
  invoiceInfo: {
    location: "",
    loveCode: "",
    carrierId: "",
  },
  formErrors: {
    shipping: true,
    invoice: true,
  },
  updateSelectedGroup: (params: {
    id: string;
    name: string;
    canBuyFrom: string;
    canBuyTo: string;
  }) =>
    set((state) => {
      return { ...state, selectedGroup: { ...params } };
    }),
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
  clearCart: (type) =>
    set(() => {
      const cartKey = type === "staff" ? "staffCart" : "groupCart";
      return {
        [cartKey]: {},
        selectedGroup: {
          id: "",
          name: "",
          canBuyFrom: "",
          canBuyTo: "",
        },
        shippingInfo: {
          pickupDate: "",
          name: "",
          phone: "",
          address: "",
          deliveryTime: "",
          isDelivery: "N",
          bagQty: "0",
          location: "",
        },
        invoiceInfo: {
          location: "",
          loveCode: "",
          carrierId: "",
        },
        formErrors: {
          shipping: true,
          invoice: true,
        },
      };
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
  setFormError: (module, hasError) =>
    set((state) => ({
      formErrors: { ...state.formErrors, [module]: hasError },
    })),
}));

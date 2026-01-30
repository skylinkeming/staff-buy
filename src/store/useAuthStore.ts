import { create } from "zustand";
import { persist } from "zustand/middleware";
import CryptoJS from "crypto-js";


const SECRET_KEY = "鼎泰豐讚啦~~";

//混淆token
const cryptoHelper = {
  encrypt: (data: any): string => {
    try {
      const jsonStr = JSON.stringify(data);
      return CryptoJS.AES.encrypt(jsonStr, SECRET_KEY).toString();
    } catch (e) {
      console.error("Encryption failed", e);
      return "";
    }
  },
  decrypt: (cipherText: string): any => {
    try {
      const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      if (!originalText) return null;
      return JSON.parse(originalText);
    } catch (e) {
      // 當密鑰更換或資料受損時會進入此處
      console.warn("Decryption failed: data may be corrupted or key mismatched.");
      return null;
    }
  },
};


interface User {
  eID: string;
  displayName: string;
  deptName: string;
  deptId: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  clearAuth: () => void;
}


export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      clearAuth: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: (name) => {
          const encryptedToken = localStorage.getItem(`${name}-token`);
          const userData = localStorage.getItem(`${name}-user`);

          const decryptedData = encryptedToken ? cryptoHelper.decrypt(encryptedToken) : null;

          return {
            state: {
              token: decryptedData?.token || null,
              user: userData ? JSON.parse(userData) : null,
            },
            version: 0,
          };
        },
        setItem: (name, value) => {
          const { token, user } = value.state;

          // 1. 加密 Token 並儲存 (儲存為字串)
          if (token) {
            const encryptedToken = cryptoHelper.encrypt({ token });
            localStorage.setItem(`${name}-token`, encryptedToken);
          } else {
            localStorage.removeItem(`${name}-token`);
          }

          if (user) {
            localStorage.setItem(`${name}-user`, JSON.stringify(user));
          } else {
            localStorage.removeItem(`${name}-user`);
          }
        },
        removeItem: (name) => {
          localStorage.removeItem(`${name}-token`);
          localStorage.removeItem(`${name}-user`);
        },
      },
    }
  )
);
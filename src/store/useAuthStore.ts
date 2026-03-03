import { create } from "zustand";
import { persist } from "zustand/middleware";
import CryptoJS from "crypto-js";

const SECRET_KEY = "鼎泰豐讚啦~~";

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

export type TokenType = 'partyup' | 'staffbuy';

interface AuthState {
  tokens: {
    partyup: string | null;
    staffbuy: string | null;
  };
  user: User | null;
  setToken: (type: TokenType, token: string | null) => void;
  setUser: (user: User | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      tokens: {
        partyup: null,
        staffbuy: null,
      },
      user: null,
      setToken: (type, token) => {
        set((state) => ({
          tokens: { ...state.tokens, [type]: token }
        }))
      },
      setUser: (user) => set({ user }),
      clearAuth: () => set({ tokens: { partyup: null, staffbuy: null }, user: null }),
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: (name) => {
          const encryptedTokens = localStorage.getItem(`${name}-tokens`);
          const userData = localStorage.getItem(`${name}-user`);

          const decryptedTokens = encryptedTokens ? cryptoHelper.decrypt(encryptedTokens) : null;

          return {
            state: {
              tokens: decryptedTokens || { partyup: null, staffbuy: null },
              user: userData ? JSON.parse(userData) : null,
            },
            version: 0,
          };
        },
        setItem: (name, value) => {
          const { tokens, user } = value.state;
          // 1. 加密整個 tokens 物件
          if (tokens && (tokens.partyup || tokens.staffbuy)) {
            const encryptedTokens = cryptoHelper.encrypt(tokens);
            localStorage.setItem(`${name}-tokens`, encryptedTokens);
          } else {
            localStorage.removeItem(`${name}-tokens`);
          }

          // 2. 儲存 user
          if (user) {
            localStorage.setItem(`${name}-user`, JSON.stringify(user));
          } else {
            localStorage.removeItem(`${name}-user`);
          }
        },
        removeItem: (name) => {
          localStorage.removeItem(`${name}-tokens`);
          localStorage.removeItem(`${name}-user`);
        },
      },
    }
  )
);
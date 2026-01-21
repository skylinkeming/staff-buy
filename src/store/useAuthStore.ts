import { create } from "zustand";
import { persist, type PersistStorage } from "zustand/middleware";

const base64Storage: PersistStorage<any> = {
  getItem: (name) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    try {
      return JSON.parse(atob(str));
    } catch (e) {
      return null;
    }
  },
  setItem: (name, value) => {
    const str = JSON.stringify(value);
    localStorage.setItem(name, btoa(unescape(encodeURIComponent(str))));
  },
  removeItem: (name) => localStorage.removeItem(name),
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
          const tokenData = base64Storage.getItem(`${name}-token`) as any;
          const userData = localStorage.getItem(`${name}-user`);
          
          return {
            state: {
              token: (tokenData && 'state' in tokenData) ? tokenData.state.token : null,
              user: userData ? JSON.parse(userData) : null,
            },
            version: 0,
          };
        },
        setItem: (name, value) => {
          // 混淆儲存 token
          base64Storage.setItem(`${name}-token`, { 
            state: { token: value.state.token } 
          });
          // 儲存user
          localStorage.setItem(`${name}-user`, JSON.stringify(value.state.user));
        },
        removeItem: (name) => {
          localStorage.removeItem(`${name}-token`);
          localStorage.removeItem(`${name}-user`);
        },
      },
    }
  )
);
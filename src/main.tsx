import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"; // 1. 引入
import "./index.css";
import App from "./App.tsx";
import { createHashRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import StaffProductPage from "@/pages/staffbuy/StaffProductPage.tsx";
import StaffCheckoutPage from "@/pages/staffbuy/StaffCheckoutPage.tsx";
import StaffOrderOrderHistoryPage from "@/pages/staffbuy/StaffOrderHistoryPage.tsx";
import AppAlert from "@/components/common/AppAlert.tsx";
import AuthWrapper from "@/components/AuthWrapper.tsx";
import GroupBuyProductPage from "@/pages/groupbuy/GroupProductPage.tsx";
import GroupCheckoutPage from "@/pages/groupbuy/GroupCheckoutPage.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";
import GroupOrderHistoryPage from "./pages/groupbuy/GroupOrderHistoryPage.tsx";
import MainLayout from "./components/layout/MainLayout.tsx";
import { useAuthStore } from "./store/useAuthStore.ts";
import PartyBuyListPage from "./pages/partyup/client/PartyBuyListPage.tsx";
import PartyProductPage from "./pages/partyup/client/PartyProductPage.tsx";
import PartyCheckoutPage from "./pages/partyup/client/PartyCheckoutPage.tsx";
import PartyOrdersPage from "./pages/partyup/client/OrderPage.tsx";
import PartyListPage from "./pages/partyup/admin/PartyListPage.tsx";
import PartyEditorPage from "./pages/partyup/admin/PartyEditorPage.tsx";

const router = createHashRouter([
  {
    element: <AuthWrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "/", element: <App /> },
          { path: "/staffbuy", element: <StaffProductPage /> },
          { path: "/staffbuy/purchase", element: <StaffProductPage /> },
          { path: "/staffbuy/checkout", element: <StaffCheckoutPage /> },
          {
            path: "/staffbuy/orders",
            element: <StaffOrderOrderHistoryPage />,
          },
          {
            path: "/groupbuy",
            element: <GroupBuyProductPage />,
          },
          {
            path: "/groupbuy/purchase",
            element: <GroupBuyProductPage />,
          },
          { path: "/groupbuy/checkout", element: <GroupCheckoutPage /> },
          {
            path: "/groupbuy/orders",
            element: <GroupOrderHistoryPage />,
          },
          {
            path: "/partyup",
            element: (
              <PartyBuyListPage />
            ),
          },
          {
            path: "/partyup/partyDetail/:id",
            element: (
              <PartyProductPage />
            ),
          },
          {
            path: "/partyup/checkout",
            element: <PartyCheckoutPage />
          },
          {
            path: "/partyup/orders",
            element: <PartyOrdersPage />
          }
        ],
      },
    ],
  },
  {
    path: "/partyup/admin/list",
    element: (
      <PartyListPage />
    ),
  },
  {
    path: "/partyup/admin/:id",
    element: (
      <PartyEditorPage />
    ),
  }
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 失敗自動重試 1 次
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      const isAuthError =
        error.name === "AuthError" || error.message.includes("請重新登入");

      if (isAuthError) {
        queryClient.clear();
        useAuthStore.getState().clearAuth();

        if (typeof window !== "undefined" && !window.location.href.includes("qwe")) {//如果不是正在登入中
          AppAlert({ message: error.message, type: "warning" }).then(() => {
            window.location.href = "/";
          });
        }

        return;
      }

      console.error(error);
      AppAlert({
        message: error.message || "系統發生錯誤",
        type: "error",
      });
    },
  }),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"; // 1. 引入
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import StaffProductPage from "./pages/staffbuy/StaffProductPage.tsx";
import StaffCheckoutPage from "./pages/staffbuy/StaffCheckoutPage.tsx";
import StaffOrderOrderHistoryPage from "./pages/staffbuy/StaffOrderHistoryPage.tsx";
import AppAlert from "./components/common/AppAlert.tsx";
import AuthWrapper from "./components/AuthWrapper.tsx";
import GroupBuyProductPage from "./pages/groupbuy/GroupProductPage.tsx";
import GroupCheckoutPage from "./pages/groupbuy/GroupCheckoutPage.tsx";

const router = createBrowserRouter([
  {
    element: <AuthWrapper />,
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
        path: "/partyup",
        element: (
          <>
            <h1>揪團頁面</h1>
          </>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 失敗自動重試 1 次
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error.message.includes("請重新登入")) {
        AppAlert({
          message: "登入已逾時，請重新登入",
          type: "warning",
        }).then(() => {
          // window.location.href = "/login"; // 或是使用 navigate
        });
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
  </StrictMode>
);

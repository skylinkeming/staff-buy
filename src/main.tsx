import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // 1. 引入
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import StaffProductPage from "./pages/staffbuy/StaffProductPage.tsx";
import StaffCheckoutPage from "./pages/staffbuy/StaffCheckoutPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/staffbuy",
    element: <StaffProductPage />,
  },
  {
    path: "/staffbuy/products",
    element: <StaffProductPage />,
  },
  {
    path: "/staffbuy/checkout",
    element: <StaffCheckoutPage />,
  },
  {
    path: "/groupbuy",
    element: (
      <>
        <h1>團購頁面</h1>
      </>
    ),
  },
  {
    path: "/partyup",
    element: (
      <>
        <h1>揪團頁面</h1>
      </>
    ),
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 這裡可以放全域設定
      retry: 1, // 失敗自動重試 1 次
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
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
    path: "/staffbuy/purchase",
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

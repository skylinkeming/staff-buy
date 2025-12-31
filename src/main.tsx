import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/staffbuy",
    element: (
      <>
        <h1>員購頁面</h1>
      </>
    ),
  },
  {
    path: "/staffbuy/products",
    element: (
      <>
        <h1>員購商品頁面</h1>
      </>
    ),
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

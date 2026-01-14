import { Link, useLocation } from "react-router";
import { IoIosArrowForward } from "react-icons/io";
import { HiHome } from "react-icons/hi";

export default function Breadcrumbs({ className }: { className?: string }) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbNameMap: { [key: string]: string } = {
    cart: "購物車",
    shipping: "填寫配送資訊",
    success: "訂購成功",
    purchase: "Step 1. 商品列表",
    staffbuy: "員購",
    groupbuy: "團購",
    checkout: "Step 2. 填寫資料",
    "/staffbuy/orders": "員購紀錄",
    "/groupbuy/orders": "團購紀錄",
  };

  // 1. 定義路徑重新導向地圖
  const pathRedirectMap: { [key: string]: string } = {
    "/staffbuy": "/staffbuy/purchase", // 按下員購，導向員購商品列表
    "/groupbuy": "/groupbuy/purchase", // 按下團購，導向團購商品列表
  };

  return (
    <nav className={"flex items-center text-gray-500 text-sm mb-6 " + className}>
      <ol className="flex items-center space-x-2">
        <li className="flex items-center">
          <Link to="/" className="hover:text-staffbuy-primary flex items-center">
            <HiHome className="mr-1" size={18} />
            <span>首頁</span>
          </Link>
        </li>

        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          // 2. 判斷點擊後實際要前往的路徑
          // 如果 to 是 "/staffbuy"，則實際連結改為 "/staffbuy/purchase"
          const actualLink = pathRedirectMap[to] || to;

          const displayName =
            breadcrumbNameMap[to] ||
            breadcrumbNameMap[value] ||
            value.charAt(0).toUpperCase() + value.slice(1);

          return (
            <li key={to} className="flex items-center">
              <IoIosArrowForward className="mx-2 text-gray-400" size={14} />
              {last ? (
                <span className="text-gray-900 font-medium">{displayName}</span>
              ) : (
                <Link
                  to={actualLink} // 使用重新導向後的路徑
                  className="hover:text-staffbuy-primary transition-colors"
                >
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

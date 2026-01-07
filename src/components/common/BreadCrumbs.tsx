import { Link, useLocation } from "react-router";
import { IoIosArrowForward } from "react-icons/io";
import { HiHome } from "react-icons/hi";

export default function Breadcrumbs() {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbNameMap: { [key: string]: string } = {
    cart: "購物車",
    shipping: "填寫配送資訊",
    success: "訂購成功",
    products: "Step 1. 商品列表",
    staffbuy: "員購",
    checkout: "Step 2. 填寫資料",
    myorder: "員購紀錄",
  };

  return (
    <nav
      className="flex items-center text-gray-500 text-sm mb-6"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {/* 首頁圖示連結 */}
        <li className="flex items-center">
          <Link
            to="/"
            className="hover:text-staffbuy-primary transition-colors flex items-center"
          >
            <HiHome className="mr-1" size={18} />
            <span>首頁</span>
          </Link>
        </li>

        {pathnames.map((value, index) => {
          // 組合出目前的完整路徑
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          // 取得顯示名稱，若地圖沒定義則顯示原字首大寫的英文
          const displayName =
            breadcrumbNameMap[value] ||
            value.charAt(0).toUpperCase() + value.slice(1);

          return (
            <li key={to} className="flex items-center">
              <IoIosArrowForward className="mx-2 text-gray-400" size={14} />
              {last ? (
                // 最後一項（目前頁面）：不給連結，顏色變深
                <span className="text-gray-900 font-medium">{displayName}</span>
              ) : (
                // 中間路徑：可點擊連結
                <Link
                  to={to}
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

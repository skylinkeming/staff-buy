import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import {
  LogoutOutlined,
  UserOutlined,
  ShoppingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import AppAlert from "@/components/common/AppAlert"; // 假設你的 AppAlert 路徑
import { useNavigate } from "react-router";

export default function UserDropdown() {
  const { user, clearAuth } = useAuthStore();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const onLogout = async () => {
    const res = await AppAlert({
      title: "確定要登出嗎？",
      message: "登出後將清除您的身分驗證資訊。",
    });

    if (res === "ok") {
      clearAuth();
      queryClient.clear();
      window.location.href = "/";
    }
  };

  // 選單配置資料
  const menuItems = [
    {
      label: "個人設定",
      icon: <UserOutlined />,
      onClick: () => navigate(""),
    },
    {
      label: "我的員購紀錄",
      icon: <ShoppingOutlined />,
      onClick: () => navigate("/staffbuy/orders"),
    },
    {
      label: "我的團購紀錄",
      icon: <ShoppingOutlined />,
      onClick: () => navigate("/groupbuy/orders"),
    },
    {
      label: "我的揪團訂單",
      icon: <TeamOutlined />,
      onClick: () => console.log("揪團"),
    },
  ];

  return (
    <div
      className=""
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* 頭像 Icon */}
      <div className="border-2 border-transparent transition duration-200 hover:border-[#1890ff] cursor-pointer text-[16px] leading-4 flex justify-center items-center bg-[#87d068] w-12 h-12 rounded-full overflow-hidden text-white font-bold">
        {user?.displayName ? user.displayName[0] : "U"}
      </div>

      {/* 下拉選單主體 */}
      <div
        className={`
          absolute right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 py-2
          transition-all duration-300 ease-in-out
          ${
            isOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-2 invisible"
          }
        `}
      >
        {/* 選單列表 */}
        <div className="mt-1">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={item.onClick}
              className="whitespace-nowrap w-full flex bg-white! justify-start  items-center gap-2 px-8 py-2 text-sm text-gray-600 hover:bg-[#f0f2f5]! hover:text-[#1890ff] transition-colors cursor-pointer"
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </div>
          ))}

          <div className="my-1 border-t border-gray-100"></div>

          {/* 登出按鈕 */}
          <div
            onClick={onLogout}
            className="w-full bg-white! justify-start flex items-center gap-3 px-8 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogoutOutlined className="text-lg" />
            <span>登出系統</span>
          </div>
        </div>
      </div>
    </div>
  );
}

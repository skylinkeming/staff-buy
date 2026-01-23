import { useNavigate } from "react-router";
import "./App.css";
import type { ReactNode } from "react";
import {
  ShoppingOutlined,
} from "@ant-design/icons";


function App() {
  const navigate = useNavigate();

  const renderMenuItem = (name: string, link: string, icon: ReactNode) => {
    return (
      <div className="flex flex-col items-center cursor-pointer"
        onClick={() => navigate(link)}>
        <div className="w-35 h-35 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
          {icon}
        </div>
        <div
          className="text-lg cursor-pointer text-blue-400"

        >
          {name}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-screen flex items-center justify-center items-center gap-5 ">
      {renderMenuItem("員購頁面", "/staffbuy/purchase", <ShoppingOutlined className="text-5xl" />)}
      {renderMenuItem("團購頁面", "/groupbuy/purchase", <ShoppingOutlined className="text-5xl" />)}
    </div>
  );
}

export default App;

import { useNavigate } from "react-router";
import "./App.css";

function App() {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col items-center justify-center gap-5">
      <div
        className="text-lg cursor-pointer text-blue-400"
        onClick={() => navigate("/staffbuy/purchase")}
      >
        員購頁面
      </div>
      <div
        className="text-lg cursor-pointer text-blue-400"
        onClick={() => navigate("/groupbuy/purchase")}
      >
        團購頁面
      </div>
    </div>
  );
}

export default App;

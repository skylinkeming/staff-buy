import "./App.css";

function App() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-5">
      <div className="text-lg cursor-pointer text-blue-400" onClick={() => (location.href = "/staffbuy/purchase")}>員購頁面</div>
      <div className="text-lg cursor-pointer text-blue-400" onClick={() => (location.href = "/groupbuy/purchase")}>團購頁面</div>
    </div>
  );
}

export default App;

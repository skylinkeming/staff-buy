import { useState } from "react";

export default function OrderCard() {
  const [openDetail, setOpenDetail] = useState(false);

  const renderDataRow = (key: string, data: string, isPrice?: boolean) => {
    return (
      <div className="flex justify-between w-full mb-2.5 px-5">
        <span className="text-sm">{key}</span>
        <span
          className={isPrice ? "text-[#E5486D] text-sm font-bold" : "text-sm"}
        >
          {data}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full shadow-[1px_2px_4px_0px_rgba(0,0,0,0.25)] mt-5 rounded-[15px] bg-white overflow-hidden">
      {/* 標題列 */}
      <div className="border-b-[1px] font-bold border-[#D9D9D9] text-[#020202] py-2.5 px-5">
        訂單資訊
      </div>

      {/* 內容區域 */}
      <div className="pt-3">
        {/* 常駐顯示的欄位 */}
        {renderDataRow("訂單編號", "D20251111001")}
        {renderDataRow("訂單日期", "2025-11-09 11:15")}
        {renderDataRow("訂單情況", "成立")}
        {renderDataRow("取貨方式", "宅配")}
        {renderDataRow("黑貓宅配單號", "907344452512")}

        {/* 根據狀態切換顯示不同的內容 */}
        {!openDetail ? (
          /* 收合狀態：只顯示總價 */
          renderDataRow("總價", "$NT 2500", true)
        ) : (
          /* 展開狀態：顯示完整明細 */
          <>
            <div className="border-t-[1px] border-b-[1px] border-[#D9D9D9] pt-3 mb-3.5 mt-1">
              <div className="text-[#020202] ml-5 mb-3">購物明細</div>
              {renderDataRow("商品 A", "x 1")}
              {renderDataRow("商品 B", "x 2")}
              {renderDataRow("總價", "$NT 2500", true)}
            </div>

            {renderDataRow("提袋數", "1")}
            {renderDataRow("載具號碼", "/ABC-123")}
            {renderDataRow("取貨日期", "2025-11-12")}
            {renderDataRow("發票號碼/發票日期", "907344452512")}
            {renderDataRow("到貨地址", "台北市忠孝東路三段 1 號")}
          </>
        )}
      </div>

      {/* 按鈕區域 */}
      <div className="bg-[#F5F5F5] py-2 px-3.5 mt-2 text-right">
        <div
          className="border-[1px] text-sm border-[#20232C] text-[#20232C] py-1.25 px-7.5 inline-block rounded-[5px] cursor-pointer leading-3.5"
          onClick={() => setOpenDetail((prev) => !prev)}
        >
          {openDetail ? "收合明細" : "展開明細"}
        </div>
      </div>
    </div>
  );
}

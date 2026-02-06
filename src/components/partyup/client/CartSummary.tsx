import { useLocation, useNavigate } from "react-router";
import AppAlert from "@/components/common/AppAlert";
import { usePartyupStore } from "@/store/usePartyupStore";

interface CartSummaryProps {
    className?: string;
    showDetail?: boolean;
    onClickPurchaseBtn?: (payload: any) => void; // 傳出準備好的 API Payload
    disableBtn?: boolean;
}

export default function CartSummary({
    className = "",
    showDetail = true,
    onClickPurchaseBtn,
    disableBtn,
}: CartSummaryProps) {
    const location = useLocation();
    const navigate = useNavigate();

    const cartsByParty = usePartyupStore((state) => state.cartsByParty);
    const clearAllCarts = usePartyupStore((state) => state.clearAllCarts);
    const getApiPayload = usePartyupStore((state) => state.getApiPayload);

    const isCheckoutStage = location.pathname.includes("checkout");

    const partyEntries = Object.values(cartsByParty);
    const hasItems = partyEntries.length > 0;

    const totalAmount = partyEntries.reduce((sum, party) => {
        const partyTotal = Object.values(party.items).reduce(
            (s, item) => s + item.partyPrice * item.quantity,
            0
        );
        return sum + partyTotal;
    }, 0);

    const handleClickClearBtn = async () => {
        if (!hasItems) return;

        const res = await AppAlert({
            message: "確認清空所有購物車商品?",
        });

        if (res !== "cancel") {
            clearAllCarts();
        }
    };

    const handleClickPurchaseBtn = async () => {
        if (!hasItems) {
            await AppAlert({
                title: "購物車是空的",
                message: "請先挑選商品後再結帳",
                hideCancel: true,
            });
            return;
        }

        if (isCheckoutStage) {
            if (onClickPurchaseBtn) {
                const payload = getApiPayload();
                onClickPurchaseBtn(payload);
            }
        } else {
            navigate("/partyup/checkout");
        }
    };

    return (
        <div
            className={`flex flex-col border border-[#D9D9D9] p-[20px] w-[300px] rounded-[10px] bg-white shadow-sm ${className}`}
        >
            <h3 className="font-bold text-[16px] mb-4 flex items-center gap-2">
                🛒 購物清單
            </h3>

            {/* 商品細目區塊 */}
            {showDetail && (
                <div className="flex-1 overflow-y-auto mb-1.25 border-b border-dashed pb-1.25  max-h-[400px] pr-2 custom-scrollbar">
                    {
                        partyEntries.map((party) => (
                            <div key={party.partyId} className="mb-4 last:mb-0">
                                {Object.values(party.items).map((item) => (
                                    <div
                                        key={item.productId}
                                        className="flex justify-between items-start mb-2 gap-2"
                                    >
                                        <div className="flex-1">
                                            <div className="text-[13px] font-bold text-gray-700 leading-tight">
                                                {item.prodName}
                                            </div>

                                        </div>
                                        <div className="text-[13px] text-gray-500 whitespace-nowrap">
                                            x {item.quantity}
                                        </div>
                                        <div className="text-[13px] font-medium text-gray-800 w-[60px] text-right">
                                            ${(item.partyPrice * item.quantity).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    }
                </div>
            )}

            <div className="mb-4">
                <div className="flex justify-between items-end">
                    <div className="text-[14px] text-gray-600">應付總額</div>
                    <div className="text-staffbuy-primary font-bold">
                        <span className="text-[12px] mr-1">$NT</span>
                        <span className="text-[24px]">
                            {totalAmount.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* 操作按鈕 */}
            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={handleClickClearBtn}
                    className="cursor-pointer flex-1 border border-gray-300 text-gray-500 text-[14px] py-2 rounded-[5px] hover:bg-gray-50 transition-colors"
                >
                    清空
                </button>
                <button
                    type="button"
                    disabled={disableBtn}
                    onClick={handleClickPurchaseBtn}
                    className={`cursor-pointer flex-[2] text-[14px] py-2 rounded-[5px] font-bold transition-all ${disableBtn
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-[#FFD400] text-gray-800 hover:bg-[#ffdf40] active:scale-95"
                        }`}
                >
                    {isCheckoutStage ? "送出訂單" : "前往結帳"}
                </button>
            </div>

            {/* 溫馨提示 */}
            {!isCheckoutStage && hasItems && (
                <p className="text-[11px] text-gray-400 text-center mt-3">
                    * 訂單將依團購活動分開處理
                </p>
            )}
        </div>
    );
}
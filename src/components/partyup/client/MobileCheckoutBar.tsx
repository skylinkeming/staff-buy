import { useCartStore } from "@/store/useCartStore";
import { usePartyupStore } from "@/store/usePartyupStore";
import { useLocation } from "react-router";

export default function MobileCheckoutBar({
    onClickBtn,
    className = "",
    btnText = "完成訂購",
    disableBtn,
}: {
    onClickBtn: () => void;
    className?: string;
    btnText?: string;
    disableBtn?: boolean;
}) {
    const partyCarts = usePartyupStore((state) =>
        state.cartsByParty
    );
    const partyEntries = Object.values(partyCarts);

    const totalAmount = partyEntries.reduce((sum, party) => {
        const partyTotal = Object.values(party.items).reduce(
            (s, item) => s + item.partyPrice * item.quantity,
            0
        );
        return sum + partyTotal;
    }, 0);


    return (
        <div
            className={
                "z-100 fixed drop-shadow-[0_-1px_5px_rgb(232,232,232)] bottom-[0px] left-[0px] w-screen bg-[white] px-[15px] py-[15px] z-50 box-border flex justify-between items-end " +
                className
            }
        >
            <div className="flex items-end gap-[30px]">
                <div className="shrink-0 text-gray-800">總金額</div>
                <div className="text-partyup-primary  h-[32px]">
                    $NT
                    <span className="text-[24px] ml-[10px] font-[700]">
                        {totalAmount}
                    </span>
                </div>
            </div>
            <div
                className={
                    "bg-[#FFD400] text-gray-800 w-[130px] rounded-[15px] py-[5px] text-center cursor-pointer hover:text-[white] inline-block underline-offset-0 " +
                    (disableBtn ? "pointer-events-none opacity-50" : "")
                }
                onClick={onClickBtn}
            >
                {btnText}
            </div>
        </div>
    );
}

import { useLocation } from "react-router";
import { useCartStore, type CartItem } from "@/store/useCartStore";
import { FaRegTrashAlt } from "react-icons/fa";
import AppAlert from "@/components/common/AppAlert";
import QuantityInput from "@/components/buy/purchase/QuantityInput";
import { usePartyupStore, type PartyCartEntry } from "@/store/usePartyupStore";

export default function CheckoutItems({
    onAmountChange,
}: {
    onAmountChange: (cartItem: CartItem, qty: number) => void;
}) {
    const cartsByParty = usePartyupStore((state) =>
        state.cartsByParty
    );
    const updateCart = usePartyupStore((state) => state.updateCart);
    const removeFromCart = usePartyupStore((state) => state.removeFromCart);
    const partyCarts = Object.values(cartsByParty);
    const cartItems = partyCarts.map(partyCart => partyCart.items);
    console.log({ cartsByParty })
    console.log({ partyCarts })
    console.log({ cartItems })

    const handleClickRemoveButton = async (partyData: PartyCartEntry, itemId: string) => {
        const res = await AppAlert({
            message: "確認刪除品項?",
        });
        if (res === "ok") {
            removeFromCart(partyData.partyId, itemId);
        }
    };

    const handleAmountChange = async (partyData: PartyCartEntry, cartItem: any, qty: number) => {
        if (qty === 0) {
            const res = await AppAlert({
                message: "確認刪除品項?",
            });
            if (res === "cancel") {
                return;
            }
        }

        updateCart({
            id: partyData.partyId,
            name: partyData.partyName,
            requiresShippingInfo: partyData.requiresShippingInfo,
        }, cartItem, qty)


        onAmountChange(cartItem, qty);
    };

    return (
        <>
            <div className=" bg-white border md:w-200 box-border border-[#D9D9D9] rounded-[10px] overflow-hidden py-5 px-5">
                {partyCarts.map(partyCart => {
                    return <div key={partyCart.partyId} className=" flex flex-col gap-5">{
                        Object.keys(partyCart.items).map(itemId => {
                            const item = partyCart.items[itemId];
                            return <div key={itemId} className=" relative flex items-center bg-white">
                                <div className="md:w-50 md:h-40 flex justify-center items-center bg-[#FBFBFB] rounded-sm">
                                    <img className="w-35" src={item.imageUrls[0]} />
                                </div>
                                <div className="flex flex-col items-start pl-10 h-40 justify-between">
                                    <div>
                                        <div className="text-[20px] font-medium max-w-95">{partyCart.partyName}</div>
                                        <div className="mt-3.5">{item.optionName}</div>
                                    </div>
                                    <div className="text-[20px] text-[#FF0000]">NT$ {item.price}</div>
                                    <QuantityInput
                                        height={30}
                                        className="h-[30px] shadow-sm md:absolute right-2.5 top-0 w-42 md:w-28 flex justify-center"
                                        variant="classic"
                                        inputNumber={item.quantity}
                                        onChange={async (qty) => {
                                            handleAmountChange(partyCart, item, qty);
                                        }}
                                    />
                                    <div
                                        className="flex-none shrink-0 w-8 flex items-center justify-end md:flex-none absolute right-0 top-1.25 md:bottom-0 md:top-auto md:right-2.5"
                                        onClick={() => handleClickRemoveButton(partyCart, itemId)}
                                    >
                                        <FaRegTrashAlt className="md:hidden" />
                                        <div className="hidden cursor-pointer md:grid grid-cols-[15px_25px] shrink-0 items-center border border-gray-300 text-gray-500 px-2.5 py-1.25 rounded-[5px] hover:bg-gray-50 transition-colors">
                                            <FaRegTrashAlt color={"#807E7C"} size={12} />
                                            <div className="text-[#807E7C] text-[12px]">刪除</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }</div>
                })}
            </div >
            {/* <div>
                {cartItems.length > 0 && (
                    <div className="w-full flex flex-col gap-[5px] mb-[20px] md:w-[700px]">
                        {cartItems.map((cartItem) => {
                            return (
                                <div
                                    key={car}
                                    className="flex justify-around w-full bg-[white] py-[15px] px-[10px] box-border rounded-[10px] items-center max-h-[54px] border-box md:justify-between"
                                >
                                    <div className="w-35 max-w-[115px] md:max-w-[140px] font-bold">
                                        {cartItem.productName}
                                    </div>
                                    <div className="w-10">${cartItem.price}</div>
                                    <QuantityInput
                                        className="ml-5 flex justify-center"
                                        variant="stepper"
                                        inputNumber={cartItem.quantity}
                                        onChange={async (qty) => {
                                            handleAmountChange(cartItem, qty);
                                        }}
                                    />
                                    <div className="w-10 shrink-0 text-right pr-[5px] ml-[20px] md:ml-0 md:pr-0">
                                        ${cart[cartItem.productId]?.quantity * cartItem.price}
                                    </div>
                                    <div
                                        className="flex-none shrink-0 w-8 flex items-center justify-end md:flex-none"
                                        onClick={() => handleClickRemoveButton(cartItem.productId)}
                                    >
                                        <FaRegTrashAlt className="md:hidden" />
                                        <div className="hidden cursor-pointer md:grid grid-cols-[20px_35px] shrink-0 items-center border border-staffbuy-primary text-staffbuy-primary px-2.5 py-1.25 rounded-[5px]">
                                            <FaRegTrashAlt color={"#175dcc"} />
                                            <div className="text-staffbuy-primary">刪除</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div> */}
        </>
    );
}

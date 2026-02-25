import { BlockTitle } from "@/pages/groupbuy/GroupProductPage";
import type { PartyDetail, PartyOption, PartyUpData, ProductOption } from "@/api/partyup/partyupApi";
import { useEffect, useState } from "react";
import QuantityInput from "@/components/buy/purchase/QuantityInput";
import { Button } from "antd";
import Breadcrumbs from "@/components/common/BreadCrumbs";
import { IoIosPeople } from "react-icons/io";
import { usePartyupStore } from "@/store/usePartyupStore";


// 揪團商品詳情
export default function ProductInfo({
    className = "",
    data,
}: {
    className?: string;
    data: PartyDetail;
}) {
    const [displayImg, setDisplayImg] = useState("");
    const [displayIdx, setDisplayIdx] = useState(1);
    const [selectedOption, setSelectedOption] = useState<PartyOption | null>(
        null,
    );
    const [amountValue, setAmountValue] = useState(1);
    const updateCart = usePartyupStore((state) => state.updateCart);
    const cartsByParty = usePartyupStore((state) => state.cartsByParty);
    const amountInCart = selectedOption?.id && cartsByParty[data.id]?.items[selectedOption?.id]?.quantity || 0;

    const handleAmountChange = (amount: number) => {
        setAmountValue(amount);
    };

    useEffect(() => {
        setSelectedOption(data?.options[0]);
        setDisplayImg(data?.imageUrls[0]);
    }, [data]);

    useEffect(() => {
        setAmountValue(1);
    }, [selectedOption]);

    const renderOptionImg = (o: PartyOption, idx: number) => {
        if (o.imageUrls.length === 0) return null;
        return (<img
            className={
                "w-12 cursor-pointer " +
                (displayImg === o.imageUrls[0] ? "border-2 rounded-[5px] border-[#46a3e1]" : "")
            }
            src={o.imageUrls[0]}
            onClick={() => {
                setDisplayImg(o.imageUrls[0]);
                setDisplayIdx(idx);
                const targetOption = data?.options.find(
                    (p) => p.imageUrls[0] === o.imageUrls[0],
                );
                if (targetOption) {
                    setSelectedOption(targetOption);
                }
            }}
        />)
    }

    const handleAddToCart = () => {
        updateCart({
            id: data.id,
            name: data.title,
            requiresShippingInfo: data.isDeliveryNeeded,
        }, selectedOption!, amountValue + amountInCart)
    }

    return (
        <div className="pb-10">
            <Breadcrumbs />
            <BlockTitle className="pl-2.5 md:pl-0">{data.title}</BlockTitle>
            <div className="mt-1.25 mb-2.5 md:mb-5 flex flex-col items-center md:flex-row gap-8 w-screen md:w-205 md:border md:border-[#d9d9d9] p-6.25 rounded-[10px] bg-white">
                <div className="w-full">
                    <div className=" h-64 mb-2.5 flex justify-center items-center relative">
                        <img className="w-56" src={displayImg} />
                        <div className="md:hidden absolute right-0 md:right-5 bottom-5 border border-[#ff9800] text-sm py-1 px-4 rounded-[15px]">
                            {(displayIdx + 1)}<span className="text-[#d9d9d9]">{"/" + (data?.options.length + data?.imageUrls.length)}</span>
                        </div>

                    </div>
                    <div className="flex flex-wrap">
                        <div className="flex gap-2.5 px-2.5">
                            {data?.options.map((o, idx) => (
                                renderOptionImg(o, idx)
                            ))}
                        </div>
                        <div className="flex gap-2.5 mt-2.5">
                            {data?.imageUrls.map((url, idx) => {
                                return (<img
                                    className={
                                        "w-12 cursor-pointer " +
                                        (displayImg === url ? "border-2 rounded-[5px] border-[#46a3e1]" : "")
                                    }
                                    src={url}
                                    onClick={() => {
                                        setDisplayImg(url);
                                        setDisplayIdx(data?.options.length + idx);
                                    }}
                                />)
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between w-full">
                    <div className="w-full">
                        <div className="flex flex-col gap-1.25 justify-between  mb-5 md:mb-6 w-full">
                            <div className="font-medium">團購期間: {data?.startDate} ~ {data?.endDate}</div>
                            <div className="flex items-center gap-1.25"> <IoIosPeople size={20} className="text-[#D9D9D9]" /> <span className="text-[#FF9800]">{data?.participants}人已購買</span></div>
                        </div>
                        <div className="text-[20px] font-bold mb-2.5 md:mb-6">
                            {selectedOption?.optionName}
                        </div>
                        <div className="mb-2.5 md:mb-5">{selectedOption?.specText || "(無說明)"}</div>
                        <div className="">
                            <span className="text-[#FF5C5C] font-bold mr-2.5">團購價</span>
                            <span className="text-[#FF5C5C] font-bold text-[24px]">
                                NT${selectedOption?.price}
                            </span>
                        </div>
                        <div className="line-through mb-5">
                            <span className="">原價 </span>
                            <span className=" ">NT${selectedOption?.price}</span>
                        </div>
                        {/* 商品選項 */}
                        <div className="flex flex-wrap gap-2.5 mb-5">
                            {data?.options.map((o) => (
                                <div
                                    className={
                                        "cursor-pointer rounded-[10px] py-1 px-4 inline-block " +
                                        (o.id === selectedOption?.id
                                            ? "font-medium border-2 border-[#1E88E5] bg-[#CFF8FF] text-[#1E88E5]"
                                            : "border border-[#D9D9D9]")
                                    }
                                    onClick={() => {
                                        setSelectedOption(o)
                                        setDisplayImg(o.imageUrls[0]);
                                    }}
                                >
                                    {o.optionName}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-5">
                        <QuantityInput
                            inputNumber={amountValue}
                            variant="classic"
                            onChange={handleAmountChange}
                        />
                        <Button className="bg-[#1E88E5]! text-white! px-17.5! rounded-[15px]! md:rounded-[5px]! py-2.5! text-md!" onClick={handleAddToCart}>加入購買</Button>
                    </div>
                    <div></div>
                </div>
            </div>
            {data?.introContent && <>
                <BlockTitle className="pl-2.5 md:pl-0">商品介紹</BlockTitle>
                <div dangerouslySetInnerHTML={{ __html: data?.introContent }} className=" mt-1.25 mb-5 flex gap-8 md:w-205 md:border md:border-[#d9d9d9] p-6.25 rounded-[10px] bg-white">
                </div></>
            }
            {/* {data?. && <>
                <BlockTitle className="pl-2.5 md:pl-0">商品規格</BlockTitle>
                <div className="mt-1.25 mb-5 flex gap-8 md:w-205 md:border md:border-[#d9d9d9] p-6.25 rounded-[10px] bg-white">
                    {data?.specContent}
                </div>
            </>} */}
            {data?.noticeContent && <>
                <BlockTitle className="pl-2.5 md:pl-0">注意事項</BlockTitle>
                <div className="mt-1.25 mb-5 flex gap-8 md:w-205 md:border md:border-[#d9d9d9] p-6.25 rounded-[10px] bg-white"

                    dangerouslySetInnerHTML={{ __html: data?.noticeContent }}
                >
                </div>
            </>}
        </div>
    );
}

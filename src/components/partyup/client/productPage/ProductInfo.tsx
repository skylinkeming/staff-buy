import { BlockTitle } from "@/pages/groupbuy/GroupProductPage";
import type { PartyUpData, ProductOption } from "@/api/partyupApi";
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
    data: PartyUpData;
}) {
    const [displayImg, setDisplayImg] = useState("");
    const [displayIdx, setDisplayIdx] = useState(1);
    const [selectedOption, setSelectedOption] = useState<ProductOption | null>(
        null,
    );
    const [amountValue, setAmountValue] = useState(1);
    const updateCart = usePartyupStore((state) => state.updateCart);
    const cartsByParty = usePartyupStore((state) => state.cartsByParty);
    const amountInCart = selectedOption?.productId && cartsByParty[data.id]?.items[selectedOption?.productId]?.quantity || 0;

    const handleAmountChange = (amount: number) => {
        setAmountValue(amount);
    };

    useEffect(() => {
        setSelectedOption(data?.productOptions[0]);
        setDisplayImg(data?.productOptions[0].imgUrl);
    }, [data]);

    useEffect(() => {
        setAmountValue(1);
    }, [selectedOption]);

    const renderOptionImg = (o: ProductOption, idx: number) => {
        return (<img
            className={
                "w-12 cursor-pointer " +
                (displayImg === o.imgUrl ? "border border-[#CFCFCF]" : "")
            }
            src={o.imgUrl}
            onClick={() => {
                setDisplayImg(o.imgUrl);
                setDisplayIdx(idx);
                const targetOption = data?.productOptions.find(
                    (p) => p.imgUrl === o.imgUrl,
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
            name: data.partyName,
            requiresShippingInfo: data.requiresShippingInfo,
        }, selectedOption!, amountValue + amountInCart)
    }

    return (
        <div className="pb-10">
            <Breadcrumbs />
            <BlockTitle className="pl-2.5 md:pl-0">{data.partyName}</BlockTitle>
            <div className="mt-1.25 mb-2.5 md:mb-5 flex flex-col items-center md:flex-row gap-8 w-screen md:w-205 md:border md:border-[#d9d9d9] p-6.25 rounded-[10px] bg-white">
                <div className="w-full">
                    <div className=" h-64 mb-2.5 flex justify-center items-center relative">
                        <img className="w-56" src={displayImg} />
                        <div className="md:hidden absolute right-0 md:right-5 bottom-5 border border-[#ff9800] text-sm py-1 px-4 rounded-[15px]">
                            {(displayIdx + 1)}<span className="text-[#d9d9d9]">{"/" + (data?.productOptions.length + data?.otherPrdImages.length)}</span>
                        </div>

                    </div>
                    <div className="flex flex-wrap">
                        <div className="flex gap-2.5 px-2.5">
                            {data?.productOptions.map((o, idx) => (
                                renderOptionImg(o, idx)
                            ))}
                        </div>
                        <div className="flex gap-2.5 mt-2.5">
                            {data?.otherPrdImages.map((url, idx) => {
                                return (<img
                                    className={
                                        "w-12 cursor-pointer " +
                                        (displayImg === url ? "border border-[#CFCFCF]" : "")
                                    }
                                    src={url}
                                    onClick={() => {
                                        setDisplayImg(url);
                                        setDisplayIdx(data?.productOptions.length + idx);
                                    }}
                                />)
                            })
                            }
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between w-full">
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-5 md:mb-6 w-full">
                            <div className="font-medium">團購期間 {data?.period}</div>
                            <div className="flex items-center gap-1.25"> <IoIosPeople size={20} className="text-[#D9D9D9]" /> <span className="text-[#FF9800]">{data?.participants}人已購買</span></div>
                        </div>
                        <div className="text-[20px] font-bold mb-2.5 md:mb-6">
                            {selectedOption?.prodName}
                        </div>
                        <div className="mb-2.5 md:mb-5">{selectedOption?.optionDesc || "(無說明)"}</div>
                        <div className="">
                            <span className="text-[#FF5C5C] font-bold mr-2.5">團購價</span>
                            <span className="text-[#FF5C5C] font-bold text-[24px]">
                                NT${selectedOption?.partyPrice}
                            </span>
                        </div>
                        <div className="line-through mb-5">
                            <span className="">原價 </span>
                            <span className=" ">NT${selectedOption?.originalPrice}</span>
                        </div>
                        {/* 商品選項 */}
                        <div className="flex flex-wrap gap-2.5 mb-5">
                            {data?.productOptions.map((o) => (
                                <div
                                    className={
                                        "cursor-pointer rounded-[10px] py-1 px-4 inline-block " +
                                        (o.productId === selectedOption?.productId
                                            ? "font-medium border-2 border-[#1E88E5] bg-[#CFF8FF] text-[#1E88E5]"
                                            : "border border-[#D9D9D9]")
                                    }
                                    onClick={() => {
                                        setSelectedOption(o)
                                        setDisplayImg(o.imgUrl);
                                    }}
                                >
                                    {o.prodName}
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
            {data?.productSummary && <>
                <BlockTitle className="pl-2.5 md:pl-0">商品介紹</BlockTitle>
                <div className=" mt-1.25 mb-5 flex gap-8 md:w-205 md:border md:border-[#d9d9d9] p-6.25 rounded-[10px] bg-white">
                    {data?.productSummary}
                </div></>
            }
            {data?.productSpec && <>
                <BlockTitle className="pl-2.5 md:pl-0">商品規格</BlockTitle>
                <div className="mt-1.25 mb-5 flex gap-8 md:w-205 md:border md:border-[#d9d9d9] p-6.25 rounded-[10px] bg-white">
                    {data?.productSpec}
                </div>
            </>}
            {data?.note && <>
                <BlockTitle className="pl-2.5 md:pl-0">注意事項</BlockTitle>
                <div className="mt-1.25 mb-5 flex gap-8 md:w-205 md:border md:border-[#d9d9d9] p-6.25 rounded-[10px] bg-white">
                    {data?.note}
                </div>
            </>}
        </div>
    );
}

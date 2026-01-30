import { BlockTitle } from "@/pages/groupbuy/GroupProductPage"
import type { PartyUpData, ProductOption } from "@/api/partyupApi";
import { useState } from "react";
import QuantityInput from "@/components/buy/purchase/QuantityInput";
import { Button } from "antd";

export default function ProductDetail({ className = "", data }: { className?: string, data: PartyUpData }) {
    const [displayImg, setDisplayImg] = useState("");
    const [selectedOption, setSelectedOption] = useState<ProductOption | null>(null);

    const handleAmountChange = (amount: number) => {

    }


    return (
        <>
            <div>
                <BlockTitle>{data.partyName}</BlockTitle>
                <div className="mt-2.5 flex md:w-205 border border-[#d9d9d9] p-6.25 rounded-[10px]">
                    <div>
                        <div><img src={displayImg} /></div>
                        <div>{data?.productOptions.map(o => <img src={o.imgUrl} onClick={() => setDisplayImg(o.imgUrl)} />)}</div>
                    </div>
                    <div>
                        <div>團購期間 {data?.period}</div>
                        <div>{selectedOption?.prodName}</div>
                        <div>{selectedOption?.optionDesc}</div>
                        <div>{selectedOption?.partyPrice}</div>
                        <div>{selectedOption?.originalPrice}</div>
                        <div>{data?.productOptions.map(o => <div onClick={() => setSelectedOption(o)}>{o.prodName}</div>)}</div>
                        <div className="flex gap-5"><QuantityInput inputNumber={1} variant="classic" onChange={handleAmountChange} /><Button type="primary">加入購買</Button></div>
                        <div></div>

                    </div>
                </div>
                <BlockTitle>商品介紹</BlockTitle>
                <div></div>
                <BlockTitle>商品規格</BlockTitle>
                <div></div>
                <BlockTitle>注意事項</BlockTitle>
                <div></div>
            </div>
        </>
    )
}
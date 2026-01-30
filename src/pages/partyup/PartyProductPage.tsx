import ProductDetail from "@/components/partyup/client/partyDetail/ProductDetail";


export default function PartyBuyProductPage() {
    return (
        <div>

            <div className="flex gap-7.5 jusitfy-center">
                <ProductDetail data={{
                    "id": "g223",
                    "partyName": "毛巾團購",
                    "participants": 236,
                    "period": "2025/11/1~2025/11/30",
                    "partyStatus": 1, //上架中
                    "productOptions": [
                        {
                            "productId": "a1235",
                            "imgUrl": "",
                            "prodName": "佛羅倫斯系列之毛巾",
                            "optionDesc": "",
                            "partyPrice": 260,
                            "originalPrice": 320
                        },
                        {
                            "productId": "2342525",
                            "imgUrl": "",
                            "prodName": "佛羅倫斯系列之浴巾",
                            "optionDesc": "",
                            "partyPrice": 380,
                            "originalPrice": 400
                        }
                    ],
                    "otherPrdImages": ["https://....", ""],
                    "productSummary": "",
                    "productSpec": "",
                    "note": "",
                    "requiresShippingInfo": false //是否需要宅配資訊
                }} />
            </div>
        </div>
    )
}
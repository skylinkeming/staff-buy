import CartSummary from "@/components/partyup/client/CartSummary";
import ProductDetail from "@/components/partyup/client/partyDetail/ProductDetail";


export default function PartyBuyProductPage() {
    return (
        <div className="flex gap-7.5 justify-center">

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
                            "imgUrl": "https://i5.momoshop.com.tw/1769164284/goodsimg/TP000/6553/0011/974/TP00065530011974_R.webp",
                            "prodName": "棉被",
                            "optionDesc": "最溫暖的棉被",
                            "partyPrice": 260,
                            "originalPrice": 320
                        },
                        {
                            "productId": "2342525",
                            "imgUrl": "https://www.ihergo.com/photo/product/92/750_1357292_1747104132082.jpg",
                            "prodName": "維他命B群團購",
                            "optionDesc": "來自XX家便宜實惠的維他命",
                            "partyPrice": 380,
                            "originalPrice": 400
                        },
                        {
                            "productId": "23333",
                            "imgUrl": "https://www.ihergo.com/photo/product/68/750_1435268_1679811751431.jpg",
                            "prodName": "葉黃素團購",
                            "optionDesc": "",
                            "partyPrice": 380,
                            "originalPrice": 400
                        }
                    ],
                    "otherPrdImages": ["https://www.ihergo.com/photo/product/20/750_1286520_1734426566463.jpg", "https://www.ihergo.com/photo/product/50/750_1282850_1692347388309.jpg"],
                    "productSummary": "1.熊與兔浴巾/條:團購價$250,不可挑色、鬆撚泡泡缎毛巾/包:團購價$330,毛巾每包六條不可挑色。2. 佛羅倫斯、歐風浴巾/條:團購價$230,且不可挑色。3. 佛羅倫斯、歐風毛巾/包:團購價$320,毛巾每包六條且不可挑色,最低訂購量以「包」為單位。4. MIT, 100%純棉、吸水性強、透氣佳。",
                    "productSpec": "1.熊與兔浴巾/條:團購價$250,不可挑色、鬆撚泡泡缎毛巾/包:團購價$330,毛巾每包六條不可挑色",
                    "note": "1.熊與兔浴巾/條:團購價$250,不可挑色、鬆撚泡泡缎毛巾/包:團購價$330,毛巾每包六條不可挑色",
                    "requiresShippingInfo": false //是否需要宅配資訊
                }} />
            </div>
            <div className="hidden md:inline-block sticky top-16 h-100  mt-21">
                <CartSummary />
            </div>
        </div>
    )
}
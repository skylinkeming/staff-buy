import Breadcrumbs from "@/components/common/BreadCrumbs";
import Notice from "@/components/common/Notice";
import { BlockTitle } from "../staffbuy/StaffProductPage";
import KeywordSearchAction from "@/components/common/KeywordSearchAction";
import PartyProductCard from "@/components/partyup/client/list/ProductCard";


export default function PartyBuyListPage() {

    const handleSearch = () => { }



    return (
        <div className="w-full bg-[#FBFBFB] pb-[120px] flex flex-col justify-center gap-5">
            <div className="w-full md:w-auto">
                <Breadcrumbs className="max-w-7xl mx-auto mt-5" />
            </div>
            <BlockTitle className="">揪團</BlockTitle>
            <Notice className="max-w-300 mb-5" notice="揪團功能暫未開放" color="bg-[#1E88E5]" />
            <div className="w-full md:w-auto">
                <div className="max-w-300 border-b border-[#E5E5E5] pb-2.5 md:flex justify-between items-center">
                    <BlockTitle className="mb-2.5 md:mb-0">本期團購</BlockTitle>
                    <KeywordSearchAction className="md:w-200" onClickSearch={handleSearch} buttonColor="bg-[#FFD400]!" />

                </div>
                <div className="justify-center md:justify-start flex gap-2.5 py-5 flex-wrap md:px-0">
                    <PartyProductCard partyData={{
                        id: "1",
                        name: "菸斗牌浴、毛巾團購",
                        description: "商品描述",
                        price: 100,
                        image: "https://i5.momoshop.com.tw/1769164284/goodsimg/TP000/6553/0011/974/TP00065530011974_R.webp",
                        participants: 10,
                        purchasePeriod: "2026-01-26 ~ 2026-01-26",
                    }} />
                    <PartyProductCard partyData={{
                        id: "1",
                        name: "菸斗牌浴、毛巾團購",
                        description: "商品描述",
                        price: 100,
                        image: "https://i5.momoshop.com.tw/1769164284/goodsimg/TP000/6553/0011/974/TP00065530011974_R.webp",
                        participants: 10,
                        purchasePeriod: "2026-01-26 ~ 2026-01-26",
                    }} />
                    <PartyProductCard partyData={{
                        id: "1",
                        name: "菸斗牌浴、毛巾團購",
                        description: "商品描述",
                        price: 100,
                        image: "https://i5.momoshop.com.tw/1769164284/goodsimg/TP000/6553/0011/974/TP00065530011974_R.webp",
                        participants: 10,
                        purchasePeriod: "2026-01-26 ~ 2026-01-26",
                    }} />
                    <PartyProductCard partyData={{
                        id: "1",
                        name: "菸斗牌浴、毛巾團購",
                        description: "商品描述",
                        price: 100,
                        image: "https://i5.momoshop.com.tw/1769164284/goodsimg/TP000/6553/0011/974/TP00065530011974_R.webp",
                        participants: 10,
                        purchasePeriod: "2026-01-26 ~ 2026-01-26",
                    }} />
                </div>

            </div>
        </div>
    );
}
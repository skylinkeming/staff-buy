import Breadcrumbs from "@/components/common/BreadCrumbs";
import Notice from "@/components/partyup/client/partyList/Notice";
import { BlockTitle } from "../staffbuy/StaffProductPage";
import KeywordSearchAction from "@/components/common/KeywordSearchAction";
import PartyProductCard from "@/components/partyup/client/partyList/ProductCard";
import { ConfigProvider, Pagination } from "antd";
import { useState } from "react";


export default function PartyBuyListPage() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);

    const handleSearch = () => { }

    const onPageChange = () => {

    }


    return (
        <div className="w-full bg-[#FBFBFB] pb-[120px] flex flex-col items-center justify-center gap-10">
            <div className="md:w-[1060px]">
                <div className="w-full md:w-auto">
                    <Breadcrumbs className="max-w-7xl mx-auto mt-5" />
                </div>
                <BlockTitle className="mb-5">揪團</BlockTitle>
                <Notice className="md:w-[1060px] mb-10" notice={"購物流程:1.線上輸入購買產品數量  >2.自行選定取貨日期(宅配請提前一日出貨) > 3.索取發票> 4.依日期至倉儲取貨<br/>其他說明:1.如購買錯誤時，請盡速與承辦人聯繫取消訂單，商品已出貨則無法取消2.取貨日最快為下單後2天，若有特殊需求請與承辦人聯繫3.所需提袋數量請下單時一併選定4.有需要使用載具請於結帳時主動出示，若填寫錯誤則會印出紙本發票5.**發票請盡量使用載具**"} color="bg-[#1E88E5]" />
                <div className="w-full md:w-auto flex flex-col gap-2.5 items-center">
                    <div className="w-full md:w-[1060px] border-b border-[#E5E5E5] pb-2.5 md:flex justify-between items-center">
                        <BlockTitle className="mb-2.5 md:mb-0">本期團購</BlockTitle>
                        <KeywordSearchAction className="md:w-200" onClickSearch={handleSearch} buttonColor="bg-[#FFD400]!" />

                    </div>
                    <div className="justify-center md:justify-center flex gap-5 py-5 flex-wrap md:px-0 max-w-300">
                        <PartyProductCard partyData={{
                            id: "1",
                            name: "棉被團購",
                            description: "商品描述",
                            price: 100,
                            image: "https://i5.momoshop.com.tw/1769164284/goodsimg/TP000/6553/0011/974/TP00065530011974_R.webp",
                            participants: 109,
                            purchasePeriod: "2026-01-26 ~ 2026-01-26",
                        }} />
                        <PartyProductCard partyData={{
                            id: "1",
                            name: "維他命B群團購",
                            description: "商品描述",
                            price: 100,
                            image: "https://www.ihergo.com/photo/product/92/750_1357292_1747104132082.jpg",
                            participants: 1220,
                            purchasePeriod: "2026-01-26 ~ 2026-01-26",
                        }} />
                        <PartyProductCard partyData={{
                            id: "1",
                            name: "葉黃素團購",
                            description: "商品描述",
                            price: 100,
                            image: "https://www.ihergo.com/photo/product/68/750_1435268_1679811751431.jpg",
                            participants: 10,
                            purchasePeriod: "2026-01-26 ~ 2026-01-26",
                        }} />
                        <PartyProductCard partyData={{
                            id: "1",
                            name: "鍋寶316快煮壺團購",
                            description: "商品描述",
                            price: 100,
                            image: "https://www.ihergo.com/photo/product/22/750_1437922_1693900545054.jpg",
                            participants: 98,
                            purchasePeriod: "2026-01-26 ~ 2026-01-26",
                        }} />
                        <PartyProductCard partyData={{
                            id: "1",
                            name: "棉被團購",
                            description: "商品描述",
                            price: 100,
                            image: "https://www.ihergo.com/photo/product/54/750_1025754_1710812499616.jpg",
                            participants: 77,
                            purchasePeriod: "2026-01-26 ~ 2026-01-26",
                        }} />
                        <PartyProductCard partyData={{
                            id: "1",
                            name: "維他命B群團購",
                            description: "商品描述",
                            price: 100,
                            image: "https://www.ihergo.com/photo/product/20/750_1286520_1734426566463.jpg",
                            participants: 88,
                            purchasePeriod: "2026-01-26 ~ 2026-01-26",
                        }} />
                        <PartyProductCard partyData={{
                            id: "1",
                            name: "葉黃素團購",
                            description: "商品描述",
                            price: 100,
                            image: "https://www.ihergo.com/photo/product/50/750_1282850_1692347388309.jpg",
                            participants: 9,
                            purchasePeriod: "2026-01-26 ~ 2026-01-26",
                        }} />
                        <PartyProductCard partyData={{
                            id: "1",
                            name: "鍋寶316快煮壺團購",
                            description: "商品描述",
                            price: 100,
                            image: "https://www.ihergo.com/photo/product/01/750_1248901_1736393260644.jpg",
                            participants: 14,
                            purchasePeriod: "2026-01-26 ~ 2026-01-26",
                        }} />
                    </div>

                </div>
            </div>
            <ConfigProvider
                theme={{
                    components: {
                        Pagination: {
                            itemBg: "#D9D9D9",
                            itemActiveBg: "#679a4e",
                            colorPrimary: "white",
                            colorPrimaryHover: "#D9D9D9",
                        },
                    },
                }}
            >
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={10}
                    onChange={onPageChange}
                    showSizeChanger
                    showTotal={(total) => `共 ${total} 筆訂單`}
                    responsive={true}
                />
            </ConfigProvider>
        </div >
    );
}

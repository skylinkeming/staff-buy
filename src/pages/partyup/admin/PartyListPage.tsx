import OrderSearchGroup from "@/components/common/OrderSearchGroup";
import PartyCard from "@/components/partyup/admin/list/PartyCard";
import { Button, ConfigProvider, Pagination } from "antd";
import { useState } from "react";
import { FaPlusSquare } from "react-icons/fa";


export default function PartyListPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };
    return (
        <div className="w-full flex justify-center bg-partyup-admin-bg">
            <div className="w-[800px] mx-auto pt-15 pb-10">
                <div className="flex justify-between">
                    <h2 className="text-[24px] font-bold">揪團訂購</h2>
                    <Button
                        type="primary"
                        className="bg-[#FFD400]!  text-[#20232C]!"
                        onClick={() => { }}
                    ><FaPlusSquare />新增揪團</Button>
                </div>
                <div className="border-t border-[#D9D9D9] mt-3.5" />
                <div className="mt-2.5">
                    <OrderSearchGroup
                        placeholder="輸入揪團名稱、商品名稱"
                        buttonClass="bg-[#E3F2FD]! border! border-black! text-[#20232C]!"
                        className="md:w-200"
                        onClickSearchBtn={(params) => { }}
                        isLoading={false}
                    />
                </div>
                <div className="grid grid-cols-1 gap-3.5 pt-5 mb-10">
                    <PartyCard />
                    <PartyCard />
                    <PartyCard />
                    <PartyCard />
                    <PartyCard />
                    <PartyCard />
                    <PartyCard />
                    <PartyCard />
                    <PartyCard />
                    <PartyCard />
                </div>
                <ConfigProvider
                    theme={{
                        components: {
                            Pagination: {
                                itemBg: "#D9D9D9",
                                itemActiveBg: "#1E88E5",
                                colorPrimary: "white",
                                colorPrimaryHover: "#D9D9D9",
                            },
                        },
                    }}
                >
                    <Pagination
                        className="w-full justify-center"
                        current={currentPage}
                        pageSize={pageSize}
                        total={10}
                        onChange={onPageChange}
                        showSizeChanger
                        showTotal={(total) => `共 ${total} 筆訂單`}
                        responsive={true}
                    />
                </ConfigProvider>
            </div>
        </div>
    )
}
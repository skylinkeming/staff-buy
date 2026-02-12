import { Button } from "antd";
import { IoPeopleSharp } from "react-icons/io5";



export default function PartyCard() {
    return (
        <div className="border border-[#D9D9D9] rounded-[10px] py-3.5 px-5 bg-white border-l-15 border-l-partyup-primary">
            <div className="flex justify-between">
                <div>
                    <h3 className="text-[20px] font-bold mb-3.5">毛巾團購</h3>
                    <p className="ml-3.5 text-[14px]">團購期間: 2025/11/1~2025/11/30</p>
                    <p className="ml-3.5 mt-1 text-[14px]">團購狀態: 已下架</p>
                </div>
                <div className="flex flex-col justify-between items-end">
                    <p className="ml-3.5 mt-1 text-[14px] flex gap-2.5 items-center"><IoPeopleSharp />
                        <span className="text-[#FF9800] font-bold">236人</span></p>
                    <div className="flex gap-3.5">
                        <div className="text-[#4F48E5] cursor-pointer">編輯</div>
                        <div className="text-[#4F48E5] cursor-pointer">下架</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
import CustomDatePicker from "@/components/common/CustomDatePicker";
import CustomDateRangePicker from "@/components/common/CustomDateRangePicker";
import TiptapEditor from "@/components/common/TiptapEditor";
import { Checkbox, Input, Select } from "antd";
import { IoPeopleSharp } from "react-icons/io5";



export default function PartyManagement() {
    return (
        <div className="pl-5 flex flex-col gap-3.5 justify-between  w-full pt-5">
            <div className="flex gap-3.5 justify-between items-center w-200">
                <div className="flex gap-3.5 justify-between items-center ">
                    <label className="whitespace-nowrap">揪團名稱:</label>
                    <Input placeholder="搜尋商品名稱" className="w-100!" />
                </div>
                <div className="flex gap-3.5 justify-between items-center ">
                    <label className="whitespace-nowrap">揪團狀態:</label>
                    <Select
                        disabled={false}
                        status={""}
                        value={""}
                        onChange={(val) => { }}
                        options={[]}
                        placeholder={""}
                        className={`w-50!`}
                    />
                </div>
            </div>
            <div className="w-200 flex items-center gap-3.5">
                <div>參與人數:</div> <div className="flex items-center gap-2"><IoPeopleSharp color={"#CFCFCF"} size={16} /><span className="text-[#FF9800] font-bold">10人</span></div>
            </div>
            <div className="flex gap-3.5 items-center">
                揪團期間:
                <CustomDateRangePicker
                    className={``}
                    onChange={(val) => { }}
                />

                <Checkbox className="ml-5!">需要宅配資訊</Checkbox>
            </div>
            <div className="w-200 flex items-start gap-3.5">
                <div className="whitespace-nowrap">商品介紹:</div> <div className="w-full h-60"><TiptapEditor value={"請輸入商品介紹..."} onChange={(html) => { }} /></div>
            </div>
            <div className="w-200 flex items-start gap-3.5">
                <div className="whitespace-nowrap">商品規格:</div> <div className="w-full h-60"><TiptapEditor value={"請輸入商品規格..."} onChange={(html) => { }} /></div>
            </div>
            <div className="w-200 flex items-start gap-3.5">
                <div className="whitespace-nowrap">注意事項:</div> <div className="w-full h-60"><TiptapEditor value={"請輸入注意事項..."} onChange={(html) => { }} /></div>
            </div>
        </div>
    )
}
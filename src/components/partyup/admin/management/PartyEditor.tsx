import CustomDateRangePicker from "@/components/common/CustomDateRangePicker";
import TiptapEditor from "@/components/common/TiptapEditor";
import { Button, Checkbox, Input, Select } from "antd";
import { IoPeopleSharp } from "react-icons/io5";
import ProductOption from "./ProductOption";
import { FaPlusSquare } from "react-icons/fa";



export default function PartyEditor() {
    return (
        <div className="pl-5 pb-10 flex flex-col gap-3.5 justify-between  w-full min-h-screen pt-5">
            <div className="flex gap-3.5 justify-between items-center w-200">
                <div className="flex gap-3.5 justify-between items-center ">
                    <label className="whitespace-nowrap font-bold w-20">
                        <span className="text-red-500">*</span>
                        揪團名稱:
                    </label>
                    <Input placeholder="搜尋商品名稱" className="w-100!" />
                </div>
                <div className="flex gap-3.5 justify-between items-center ">
                    <label className="whitespace-nowrap font-bold">
                        <span className="text-red-500">*</span>
                        揪團狀態:</label>
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
                <div className=" w-20 pl-1.25">參與人數:</div> <div className="flex items-center gap-2"><IoPeopleSharp color={"#CFCFCF"} size={16} /><span className="text-[#FF9800] font-bold">10人</span></div>
            </div>
            <div className="flex gap-3.5 items-center">
                <label className="w-20 whitespace-nowrap font-bold">
                    <span className="text-red-500">*</span>
                    揪團期間:</label>
                <CustomDateRangePicker
                    className={``}
                    onChange={(val) => { }}
                />

                <Checkbox className="ml-5!">需要宅配資訊</Checkbox>
            </div>
            <div className="w-200 flex items-start gap-3.5">
                <label className="w-20 shrink-0 whitespace-nowrap font-bold">
                    <span className="text-red-500">*</span>
                    商品介紹:</label>
                <div className="w-full h-60"><TiptapEditor value={""} placeholder="請輸入商品介紹..." onChange={(html) => { }} /></div>
            </div>
            <div className="w-200 flex items-start gap-3.5">
                <label className="w-20 shrink-0 whitespace-nowrap ">
                    商品規格:</label>
                <div className="w-full h-60"><TiptapEditor value={""} placeholder="請輸入商品規格..." onChange={(html) => { }} /></div>
            </div>
            <div className="w-200 flex items-start gap-3.5">
                <div className="w-20 shrink-0 whitespace-nowrap">注意事項:</div>
                <div className="w-full h-60"><TiptapEditor value={""} placeholder="請輸入注意事項..." onChange={(html) => { }} /></div>
            </div>
            <div className="border-b border-[#E2E2E2] mt-5 pb-2.5 font-bold text-[18px] flex justify-between">商品選項
                <Button
                    type="primary"
                    className="mr-42 bg-[#FFD400]!  text-[#20232C]!"
                    onClick={() => { }}
                ><FaPlusSquare />新增商品選項</Button>
            </div>
            <ProductOption optionNumber={1} />
            <ProductOption optionNumber={2} />
            <ProductOption optionNumber={3} />
            <div className="mt-10 w-200 flex gap-5 justify-center pt-5 border-t border-[#E2E2E2]">
                <Button className='bg-[#E3F2FD]! border-0! mt-3! w-50 flex items-center justify-center'>確定</Button>
                <Button className='bg-[#D9D9D9]! border-0! mt-3! w-50 flex items-center justify-center'>取消</Button>
            </div>
        </div>
    )
}
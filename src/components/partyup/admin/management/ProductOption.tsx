
import { Button, Input } from 'antd';
import ManualUpload from '../common/ManualUpload';
import { FaRegTrashAlt } from 'react-icons/fa';




export default function ProductOption({ optionNumber }: { optionNumber?: number }) {


    return (
        <div className="flex gap-5 w-200 mt-5">
            <div className="flex flex-col gap-3.5 ">
                <div className="flex gap-3.5">
                    <div className="whitespace-nowrap w-20 font-bold">
                        <span className="text-red-500">*</span>
                        {optionNumber ? `商品選項(${optionNumber})` : "商品選項"}
                    </div>
                    <Input className="w-125!" />
                </div>
                <div className="flex gap-3.5">
                    <div className="whitespace-nowrap w-20">
                        <span className="text-red-500">*</span>
                        選項描述
                    </div>
                    <Input.TextArea className="w-125! h-25!" />
                </div>
                <div className="flex gap-5 w-148.5">
                    <div className="flex flex-1 gap-3.5">
                        <div className="whitespace-nowrap w-20 shrink-0"><span className="text-red-500">*</span>
                            團購價格
                        </div>
                        <Input type="number" />
                    </div>
                    <div className="flex flex-1 gap-3.5">
                        <div className="text-right whitespace-nowrap w-20 shrink-0">
                            市價
                        </div>
                        <Input type="number" />
                    </div>
                </div>
            </div>
            <div>
                <ManualUpload />
                <Button className='bg-[#DFE8EC]! border-0! mt-3! w-full flex items-center justify-center'><FaRegTrashAlt />刪除選項</Button>
            </div>
        </div>
    )
}
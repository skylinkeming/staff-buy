import { useNavigate } from "react-router";
import { IoIosPeople, IoIosArrowForward, IoIosArrowBack } from "react-icons/io";




export interface PartyBuyData {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    participants: number;
    purchasePeriod: string;
}



export default function PartyProductCard({ className = "", partyData }: { className?: string, partyData: PartyBuyData }) {
    const navigate = useNavigate();
    return (
        <div className={"overflow-hidden w-[250px] pb-2 duration-300 cursor-pointer transition-all  border-[#D9D9D9] rounded-[10px] bg-yellow-50 hover:shadow-[0_4px_10px_0px_rgba(0,0,0,0.10)] " + className}
            onClick={() => {
                navigate(`/partyup/partyDetail/${partyData.id}`)
            }}
        >
            <div className="flex justify-center items-center bg-[#FBFBFB] relative h-[180px] overflow-hidden">
                <IoIosArrowBack color={"#74a26e"} className="absolute top-[50%] left-0 -translate-y-1/2" />
                <img className="w-full h-[180px] object-cover" src={partyData.image} alt="" />
                <IoIosArrowForward color={"#74a26e"} className="absolute top-[50%] right-0 -translate-y-1/2" />
            </div>
            <div className="px-3.5 text-lg text-center font-[500] text-black mt-2">{partyData.name}</div>
            <div className="p-3.5 pt-2 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <p className="font-[500] text-[#2a4e41] text-sm">參與人數</p>
                    <div className="flex items-center gap-1">
                        <IoIosPeople size={20} className="text-[#e5861e]" />
                        <p className="text-sm text-[#e5861e] font-[500]">{partyData.participants}</p>
                    </div>
                </div>
                {/* <div className="flex justify-between items-center">
                    <p className="font-bold text-[#447360] text-sm">起始日期</p>
                    <div>
                        <p className="text-sm md:text-md text-right max-w-[120px] md:max-w-[180px] text-sm">{partyData.purchasePeriod.split("~")[0]}</p>
                    </div>
                </div> */}
                <div className="flex justify-between items-center">
                    <p className="font-[500] text-[#2a4e41] text-sm">結束日期</p>
                    <div>
                        <p className="text-sm md:text-md text-right max-w-[120px] md:max-w-[180px] text-sm">{partyData.purchasePeriod.split("~")[1]}</p>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <p className="font-[500] text-[#2a4e41] text-sm">團購價格</p>
                    <p className="font-[500] text-[#FF3434] text-sm">${partyData.price}起</p>
                </div>
                {/* <div className="flex justify-center items-center">
                    <div className="w-full bg-[#1E88E5] text-white text-center rounded-[10px] py-2 cursor-pointer leading-4"
                        onClick={() => {
                            navigate(`/partyup/partyDetail/${partyData.id}`)
                        }}
                    >查看揪團資訊</div>
                </div> */}
            </div>
        </div>
    )
}
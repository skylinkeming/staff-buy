import { useNavigate } from "react-router";

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
        <div className={"overflow-hidden w-[290px] border border-[#E5E5E5] rounded-[10px] bg-white  " + className}>
            <div className="flex justify-center items-center py-2.5 bg-[#FBFBFB]">
                <img className="max-h-[150px] object-cover" src={partyData.image} alt="" />
            </div>
            <div className="px-3.5 text-center text-lg font-bold">{partyData.name}</div>
            <div className="p-3.5">
                <div className="flex justify-between items-center">
                    <p className="font-bold">參與人數</p>
                    <p>{partyData.participants}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="font-bold ">團購期間</p>
                    <p className="text-sm md:text-md text-right max-w-[120px] md:max-w-[180px]">{partyData.purchasePeriod}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="font-bold">團購價格</p>
                    <p className="font-bold text-[#FF3434]">${partyData.price}起</p>
                </div>
                <div className="flex justify-center items-center mt-5">
                    <div className="w-full bg-[#1E88E5] text-white text-center rounded-[10px] py-2 cursor-pointer leading-4"
                        onClick={() => {
                            navigate(`/partyup/partyDetail/${partyData.id}`)
                        }}
                    >查看揪團資訊</div>
                </div>
            </div>
        </div>
    )
}
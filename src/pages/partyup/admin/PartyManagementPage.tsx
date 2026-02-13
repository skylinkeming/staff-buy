
import PartyAdminTabs from "@/components/partyup/admin/PartyAdminTabs";

export default function PartyManagementPage() {
    return (
        <div className="w-full h-full flex justify-center bg-partyup-admin-bg">
            <div className="w-[1000px] mx-auto pt-15 pb-10">
                <h2 className="text-[24px] font-bold mb-7.5 ml-5">揪團管理</h2>
                <PartyAdminTabs />

            </div>
        </div>
    )
}
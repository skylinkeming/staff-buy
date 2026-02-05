import { useGroupbuyApi } from "@/api/useGroupbuyApi";
import { useCartStore } from "@/store/useCartStore";
import { Select } from "antd";



export default function GroupSelect({ onChangeGroup }: { onChangeGroup: () => void }) {
    const selectedGroup = useCartStore((state) => state.selectedGroup);
    const clearCart = useCartStore((state) => state.clearCart);
    const updateSelectedGroup = useCartStore(
        (state) => state.updateSelectedGroup,
    );
    const { data: groupbuyTopicList } = useGroupbuyApi.useGroupBuyListQuery();
    return (
        <div className="w-full border border-gray-200 rounded-lg">
            <div className="bg-white p-3.5 py-3.5 flex-col gap-3.5 flex rounded-[10px]">
                <div className="flex gap-3.5 items-center">
                    <div className="w-30 font-[500]">
                        選擇團購主題
                    </div>
                    <Select
                        variant="filled"
                        style={{ backgroundColor: '#E3F2FD' }}
                        className={"w-full h-8 " + (selectedGroup?.id ? "" : "")}
                        value={
                            selectedGroup?.id
                                ? selectedGroup?.id
                                : groupbuyTopicList?.length
                                    ? groupbuyTopicList[0].iD_GroupBy.toString()
                                    : ""
                        }
                        popupMatchSelectWidth={false}
                        onChange={(val) => {
                            const targetGroup = groupbuyTopicList?.find(
                                (g) => g.iD_GroupBy.toString() == val,
                            );
                            if (!targetGroup) {
                                return;
                            }
                            clearCart("group");
                            updateSelectedGroup({
                                name: targetGroup.cX_GroupBy_Name,
                                id: targetGroup.iD_GroupBy.toString(),
                                canBuyFrom: targetGroup.dT_CanBuyFrom,
                                canBuyTo: targetGroup.dT_CanBuyTo,
                            });
                            onChangeGroup();
                        }}
                        options={
                            groupbuyTopicList
                                ? groupbuyTopicList.map((g) => ({
                                    value: g.iD_GroupBy.toString(),
                                    label: g.cX_GroupBy_Name,
                                }))
                                : []
                        }
                    />

                </div>
                {selectedGroup.canBuyFrom && selectedGroup.canBuyTo && <div className="flex gap-5 items-center">
                    <div className="font-[500]">開放購買期間</div>
                    <div>{selectedGroup.canBuyFrom}{" ~ "}<span className="text-[#ff4d4f]">{selectedGroup.canBuyTo}</span></div>
                </div>}


            </div></div>
    )

}
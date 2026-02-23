import { ConfigProvider, Tabs } from "antd";
import PartyEditor from "./PartyEditor";
import PartyOrders from "./PartyOrders";

export default function PartyAdminTabs() {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Tabs: {
                        horizontalItemPadding: '6px 20px', // 這裡的 40px 就是控制橫槓變長的關鍵
                        colorInfoActive: "#1E88E5",
                        colorInfo: "#1E88E5",
                    },
                },
            }}
        >
            <Tabs defaultActiveKey="1"
                className="w-full"

            >
                <Tabs.TabPane tab="編輯揪團資訊" key="1">
                    <PartyEditor />
                </Tabs.TabPane>
                <Tabs.TabPane tab="查看揪團訂單" key="2">
                    <PartyOrders />
                </Tabs.TabPane>
            </Tabs>
        </ConfigProvider>
    )
}
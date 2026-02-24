import React, { useMemo } from 'react';
import { Modal, Input, Select, Button, Table, ConfigProvider } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { FaRegTrashAlt } from "react-icons/fa";

import QuantityInput from '@/components/buy/purchase/QuantityInput';

// --- Interfaces ---
export interface BuyItem {
    id: string;
    productName: string;
    img: string;
    qty: number;
    price: string;
}

export interface ShippingInfo {
    name: string;
    phone: string;
    address: string;
    trackingNumber: string;
}

export interface OrderData {
    partyId: string;
    orderId: string;
    staffId: string;
    dept: string;
    staffName: string;
    orderDate: string;
    orderStatus: string;
    totalAmount: string;
    buyItems: BuyItem[];
    shippingInfo?: ShippingInfo;
    options: {
        orderStatus: { value: string; id: string }[];
        productOptions: { id: string; name: string; price: string; img: string }[];
    };
}

interface EditOrderPopupProps {
    orderData: OrderData | null;
    open: boolean;
    onCancel: () => void;
}

// --- Component ---
const EditOrderPopup: React.FC<EditOrderPopupProps> = ({ orderData, open, onCancel }) => {
    if (!open) return null;

    return (
        <ConfigProvider
            theme={{
                components: {
                    Modal: {
                        padding: 0,
                        paddingLG: 0,
                        paddingMD: 0,
                        paddingSM: 0,
                        paddingXS: 0,
                        paddingContentHorizontal: 0,
                        paddingContentVertical: 0,
                        paddingContentVerticalLG: 0,
                        paddingContentHorizontalLG: 0,
                        paddingContentHorizontalSM: 0,
                        paddingContentVerticalSM: 0,
                        borderRadius: 15
                    },
                },
            }}
        >
            <Modal
                open={open}
                onCancel={onCancel}
                footer={null}
                width={600}
                centered
            >
                <style>
                    {`
                        .ant-modal-close {
                            top: 10px !important;      
                            right: 14px !important;   
                            color: rgba(0, 0, 0, 0.45); 
                        }
                        .ant-modal-close:hover {
                            background-color: rgba(0, 0, 0, 0.05) !important;
                        }
                        .no-border-table .ant-table-thead > tr > th { 
                            background-color: #F5F7FA !important; 
                            border-bottom: none !important;
                            padding: 10px 16px !important;
                        }
                        .no-border-table .ant-table-thead > tr > th::before { display: none !important; }
                        .no-border-table .ant-table-tbody > tr > td { border-bottom: 1px solid #F0F0F0 !important; }
                    `}
                </style>
                {/* Header */}
                <div className="bg-[#FFD700] py-3 text-center rounded-t-[10px]">
                    <span className="text-lg font-bold tracking-[0.3em]">編輯揪團訂單</span>
                </div>

                {!orderData ? (
                    <div className="p-10 text-center">Loading...</div>
                ) : (
                    <div className="p-8 space-y-4 text-[14px]">

                        <div className="grid grid-cols-2 gap-x-12 gap-y-3">
                            <div className="flex items-center">
                                <span className="w-28 text-gray-700">訂單編號</span>
                                <span className="flex-1">{orderData.orderId}</span>
                            </div>
                            <div />
                            <div className="flex items-center">
                                <span className="w-28 text-gray-700"><span className="text-red-500">*</span>訂單狀態</span>
                                <Select
                                    className="flex-1"
                                    defaultValue={orderData.orderStatus}
                                    options={orderData.options?.orderStatus?.map(s => ({ label: s.value, value: s.id }))}
                                />
                            </div>

                            <div className="flex items-center">
                                <span className="w-28 text-gray-700">訂單日期</span>
                                <span className="flex-1">{orderData.orderDate}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-28 text-gray-700 text-nowrap">訂購人工號/部門</span>
                                <span className="flex-1">{orderData.staffId}/{orderData.dept}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-28 text-gray-700">訂購人姓名</span>
                                <span className="flex-1">{orderData.staffName}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-28 text-gray-700"><span className="text-red-500">*</span>收件人</span>
                                <Input className="flex-1" defaultValue={orderData.shippingInfo?.name} />
                            </div>

                            {/* 收件人電話對齊右側 */}
                            <div className="flex items-center">
                                <span className="w-28 text-gray-700"><span className="text-red-500">*</span>收件人電話</span>
                                <Input className="flex-1" defaultValue={orderData.shippingInfo?.phone} />
                            </div>
                        </div>

                        {/* 全寬欄位區 */}
                        <div className="flex items-center">
                            <span className="w-28 text-gray-700"><span className="text-red-500">*</span>收件地址</span>
                            <Input className="flex-1" defaultValue={orderData.shippingInfo?.address} />
                        </div>

                        <div className="flex items-center">
                            <span className="w-28 text-gray-700">宅配單號</span>
                            <Input className="w-[120px]!" defaultValue={orderData.shippingInfo?.trackingNumber} />
                        </div>

                        {/* 3. 商品 Table 區 */}
                        <div className="mt-8">

                            <Table
                                className="no-border-table"
                                dataSource={orderData.buyItems}
                                pagination={false}
                                size="small"
                                rowKey="productId"
                                columns={[
                                    {
                                        title: '商品名稱', dataIndex: 'productName', render: (t, r) => (
                                            <Select className="w-full" defaultValue={r.id} options={orderData.options.productOptions.map(o => ({ label: o.name, value: o.id }))} />
                                        )
                                    },
                                    {
                                        title: '數量', dataIndex: 'qty', width: 130, render: (v) => (
                                            <QuantityInput
                                                className='w-[120px] h-8'
                                                variant="classic"
                                                inputNumber={v}
                                                onChange={(value) => console.log(value)}
                                            />
                                        )
                                    },
                                    { title: '小計', key: 'price', width: 80, render: () => <span className="font-medium">$440</span> },
                                    { title: '', key: 'del', width: 40, render: () => <FaRegTrashAlt className="text-lg text-gray-400 cursor-pointer" /> }
                                ]}
                            />
                            <Button icon={<PlusOutlined />} className="mt-3 bg-[#F9FAFB] text-gray-600">新增商品</Button>
                        </div>

                        {/* 4. 底部總金額與按鈕 */}
                        <div className="pt-2.5 border-t mt-2.5">
                            <div className="flex justify-end items-center gap-4 mb-8">
                                <span className="text-gray-500 font-bold">總金額</span>
                                <span className="text-red-500 text-2xl font-bold">${orderData.totalAmount}</span>
                            </div>

                            <div className="flex justify-center gap-4">
                                <Button onClick={onCancel} className="w-36 h-10 bg-[#E8F4FF] text-[#1890FF] border-none font-bold hover:opacity-80">確定</Button>
                                <Button onClick={onCancel} className="w-36 h-10 bg-[#D9D9D9] text-gray-700 border-none font-bold hover:opacity-80">取消</Button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </ConfigProvider>
    );
};
export default EditOrderPopup;
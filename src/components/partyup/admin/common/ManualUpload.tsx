import { useState } from "react";
import { Upload, message } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import type { RcFile } from "antd/es/upload/interface";

export default function ManualUpload({ onChange }: { onChange?: (file: RcFile) => void }) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 預覽網址
    const [fileToUpload, setFileToUpload] = useState<RcFile | null>(null); // 待上傳的檔案物件

    const handleBeforeUpload = (file: RcFile) => {
        // 1. 檢查檔案格式
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('只能上傳圖片檔案！');
            return Upload.LIST_IGNORE;
        }

        // 2. 產生預覽網址並儲存檔案
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setFileToUpload(file);
        onChange?.(file);
        // 3. 回傳 false 阻止自動上傳
        return false;
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation(); // 防止觸發 Upload 的點擊事件
        setPreviewUrl(null);
        setFileToUpload(null);
    };

    return (
        <div className="flex flex-col gap-4">
            {/* 灰色預覽區塊 */}
            <div className="relative w-50 h-37 bg-[#F5F5F5] border-2 border-dashed border-gray-300 rounded-lg hover:border-partyup-primary transition-all group overflow-hidden">
                <Upload
                    showUploadList={false}
                    beforeUpload={handleBeforeUpload}
                    accept="image/*"
                    className="w-full h-full flex items-center justify-center"
                >
                    {previewUrl ? (
                        <div className="relative w-36 flex items-center justify-center">
                            <img
                                src={previewUrl}
                                className="w-full h-full object-cover"
                                alt="預覽圖"
                            />
                            {/* 懸浮刪除按鈕 */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <DeleteOutlined
                                    className="text-white text-2xl"
                                    onClick={handleRemove}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="w-50 h-40 flex flex-col items-center justify-center cursor-pointer text-gray-400">
                            <PlusOutlined className="text-2xl mb-2" />
                            <span>選擇圖片</span>
                        </div>
                    )}
                </Upload>
            </div>


        </div>
    );
}
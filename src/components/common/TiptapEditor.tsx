import { useEditor, EditorContent, Extension } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Color from "@tiptap/extension-color";
import Placeholder from '@tiptap/extension-placeholder'
import { TextStyle } from "@tiptap/extension-text-style";
import { ColorPicker, Button, Space, Select } from "antd";
import {
    BoldOutlined,
    ItalicOutlined,
    LinkOutlined,
    FontColorsOutlined
} from "@ant-design/icons";
import { useState } from "react";

/** 富文本編輯器 component */




// 自定義一個 FontSize 擴充
const FontSize = Extension.create({
    name: "fontSize",
    addOptions() {
        return {
            types: ["textStyle"],
        };
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: (element) => element.style.fontSize?.replace(/['"]+/g, ""),
                        renderHTML: (attributes) => {
                            if (!attributes.fontSize) return {};
                            return { style: `font-size: ${attributes.fontSize}` };
                        },
                    },
                },
            },
        ];
    },
    addCommands() {
        return {
            setFontSize: (fontSize: string) => ({ chain }) => {
                return chain().setMark("textStyle", { fontSize }).run();
            },
            unsetFontSize: () => ({ chain }) => {
                return chain().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run();
            },
        };
    },
});



//編輯器的按鈕bar
const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) return null;

    const fontSizeOptions = [
        { value: "12px", label: "12px" },
        { value: "14px", label: "14px" },
        { value: "16px", label: "16px" },
        { value: "20px", label: "20px" },
        { value: "24px", label: "24px" },
        { value: "32px", label: "32px" },
    ];


    return (
        <div className="flex flex-wrap gap-2 items-center">
            <Space wrap>
                {/* 字體大小 */}
                <Select
                    placeholder="大小"
                    style={{ width: 85 }}
                    options={fontSizeOptions}
                    onChange={(value) => editor.chain().focus().setFontSize(value).run()}
                    value={editor.getAttributes("textStyle").fontSize || "16px"}
                />

                {/* 粗體 */}
                <Button
                    type={editor.isActive("bold") ? "primary" : "default"}
                    icon={<BoldOutlined />}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                />

                {/* 斜體 */}
                <Button
                    type={editor.isActive("italic") ? "primary" : "default"}
                    icon={<ItalicOutlined />}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                />

                {/* 顏色 */}
                <ColorPicker
                    value={editor.getAttributes("textStyle").color || "#000000"}
                    onChange={(color) => editor.chain().focus().setColor(color.toHexString()).run()}
                >
                    <Button icon={<FontColorsOutlined />}>顏色</Button>
                </ColorPicker>

                {/* 連結 */}
                <Button
                    type={editor.isActive("link") ? "primary" : "default"}
                    icon={<LinkOutlined />}
                    onClick={() => {
                        const url = window.prompt("請輸入網址:");
                        if (url) editor.chain().focus().setLink({ href: url }).run();
                    }}
                />
            </Space>
        </div>
    );
};

/** 富文本編輯器 component */
export default function TiptapEditor({
    value,
    onChange,
    placeholder
}: {
    value?: string;
    onChange: (html: string) => void;
    placeholder?: string;
}) {
    const [changedTime, setChangedTime] = useState(0);

    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,
            Color,
            FontSize,
            Placeholder.configure({
                placeholder: placeholder || '請輸入內容...',
                showOnlyWhenEditable: true,
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-partyup-primary underline",
                },
            }),
        ],
        content: value || "",
        onUpdate: ({ editor }) => {
            setChangedTime(Date.now());
            // console.log(editor.getJSON().content);
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                // 重點：移除這裡的 h-full，讓它由外層容器控制
                class: "prose prose-sm focus:outline-none max-w-none p-4",
            },
        },
    });

    return (
        <div className="border border-[#D9D9D9] rounded-[10px] w-full h-full flex flex-col bg-white focus-within:border-partyup-primary transition-colors overflow-hidden">

            {/* 頂部 MenuBar - 固定高度 */}
            <div className="p-2.5 border-b border-gray-100 bg-gray-50/30">
                <MenuBar key={changedTime} editor={editor} />
            </div>

            {/* 內容編輯區 - 自動填滿剩餘高度並允許捲軸 */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <EditorContent editor={editor} />
            </div>

            <style>{`
                /* 確保編輯器本體填滿容器 */
                .tiptap {
                    min-height: 100%;
                }
                /* 自定義捲軸樣式，看起來更美觀 */
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #E2E2E2;
                    border-radius: 10px;
                }
                /* 當編輯器為空時，顯示 placeholder 內容 */
                .tiptap p.is-editor-empty:first-child::before {
                    content: attr(data-placeholder);
                    float: left;
                    color: #adb5bd; 
                    pointer-events: none;
                    height: 0;
                }
            `}</style>
        </div>
    );
}
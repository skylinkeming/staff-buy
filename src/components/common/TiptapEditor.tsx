import { useEditor, EditorContent, Extension } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { ColorPicker, Button, Space, Select } from "antd";
import {
    BoldOutlined,
    ItalicOutlined,
    LinkOutlined,
    FontColorsOutlined
} from "@ant-design/icons";
import { useState } from "react";

// 富文本編輯器 component




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
        <div className="flex flex-wrap gap-2 mb-3 border-b pb-3 border-gray-100 items-center">
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
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-partyup-primary underline",
                },
            }),
        ],
        content: value || `<span class="text-gray-400">${placeholder}</span>`,
        onUpdate: ({ editor }) => {
            setChangedTime(Date.now());
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                // 使用 prose 來確保內部的 h1, ul, li 有樣式
                class: "prose prose-sm focus:outline-none min-h-[300px] max-w-none",
            },
        },
    });

    return (
        <div className="border border-[#D9D9D9] rounded-[10px] w-full h-full p-2.5 bg-white focus-within:border-partyup-primary transition-colors">
            <MenuBar key={changedTime} editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
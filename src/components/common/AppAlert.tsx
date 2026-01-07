import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

// 儲存目前的 Modal 實例
let currentModalInstance: { destroy: () => void } | null = null;

type AlertResponse = "ok" | "cancel";

interface AppAlertProps {
  title?: string;
  message: string | React.ReactNode;
  okText?: string;
  cancelText?: string;
  hideCancel?: boolean;
  type?: "confirm" | "info" | "success" | "error" | "warning";
}

export default async function AppAlert({
  title = "系統提示",
  message,
  okText = "確定",
  cancelText = "取消",
  hideCancel = false,
  type = "confirm",
}: AppAlertProps): Promise<AlertResponse> {
  
  // --- 重點：如果已有 Modal 在顯示，先關閉它 ---
  if (currentModalInstance) {
    currentModalInstance.destroy();
    currentModalInstance = null;
  }

  return new Promise((resolve) => {
    const method = Modal[type];

    // 取得新 Modal 的實例
    const instance = method({
      title: title,
      content: <div className="mt-2 text-gray-600">{message}</div>,
      icon: <ExclamationCircleFilled />,
      okText: okText,
      cancelText: cancelText,
      cancelButtonProps: hideCancel ? { style: { display: "none" } } : {},
      onOk() {
        currentModalInstance = null; // 清除引用
        resolve("ok");
      },
      onCancel() {
        currentModalInstance = null; // 清除引用
        resolve("cancel");
      },
    });

    // 將新實例存起來
    currentModalInstance = instance;
  });
}
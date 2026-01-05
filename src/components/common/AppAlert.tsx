import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

type AlertResponse = "ok" | "cancel";

interface AppAlertProps {
  title?: string;
  message: string | React.ReactNode;
  okText?: string;
  cancelText?: string;
  hideCancel?: boolean;
  type?: "confirm" | "info" | "success" | "error" | "warning";
}

/**
 * 
 */
export default async function AppAlert({
  title = "系統提示",
  message,
  okText = "確定",
  cancelText = "取消",
  hideCancel = false,
  type = "confirm",
}: AppAlertProps): Promise<AlertResponse> {
  return new Promise((resolve) => {
    const method = Modal[type];

    method({
      title: title,
      content: <div className="mt-2 text-gray-600">{message}</div>,
      icon: <ExclamationCircleFilled />,
      okText: okText,
      cancelButtonProps: hideCancel ? { style: { display: "none" } } : {},
      cancelText: cancelText,
      onOk() {
        resolve("ok");
      },
      onCancel() {
        resolve("cancel");
      },
    });
  });
}

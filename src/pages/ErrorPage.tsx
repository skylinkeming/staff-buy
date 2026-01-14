import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router';
import { Button, Result } from 'antd'; 

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  // 判斷是否為路由錯誤 (例如 404, 403, 500 等)
  if (isRouteErrorResponse(error)) {
    return (
      <Result
        status={error.status as any}
        title={error.status}
        subTitle={error.statusText || error.data?.message || "抱歉，您訪問的頁面不存在。"}
        extra={<Button type="primary" onClick={() => navigate('/')}>回首頁</Button>}
      />
    );
  }

  // 處理程式碼邏輯出錯 (例如變數 undefined)
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>哎呀！系統發生預期外的錯誤</h1>
      <pre style={{ color: 'red' }}>
        {error instanceof Error ? error.message : '未知錯誤'}
      </pre>
      <Button onClick={() => window.location.reload()}>重新整理</Button>
    </div>
  );
}
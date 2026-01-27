import { useEffect } from "react";
import { Outlet } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { Spin } from "antd";
import { useAuthStore } from "@/store/useAuthStore";
import { commonApi } from "@/api/commonApi";

export default function AuthWrapper() {
  const { setToken, setUser } = useAuthStore();
  const nativeParams = new URLSearchParams(window.location.search);
  const qweValue = nativeParams.get("qwe");

  const { mutate: autoLogin, isPending } = useMutation({
    mutationFn: (qwe: string) => commonApi.login({ qwe }),
    onSuccess: (res) => {
      // 儲存 token
      setToken(res.data);

      // 取得使用者資訊 
      commonApi
        .getUserInfo()
        .then((res) => res.data)
        .then((result) => {
          setUser(result);
        });

      // 清除網址上的qwe
      const url = new URL(window.location.href);
      url.searchParams.delete("qwe");

      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
    },
  });

  useEffect(() => {
    if (qweValue) {
      autoLogin(qweValue);
    }
  }, []);

  if (qweValue && isPending) {
    return (
      <div className="flex h-screen w-screen items-center justify-center gap-2.5">
        <Spin size="large" tip="自動登入中..." />
        自動登入中...
      </div>
    );
  }

  return <Outlet />;
}

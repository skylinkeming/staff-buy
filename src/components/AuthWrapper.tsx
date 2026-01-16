import { useEffect } from "react";
import { Outlet, useSearchParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { staffbuyApi } from "@/api/staffbuyApi";
import { Spin } from "antd";
import { useAuthStore } from "@/store/useAuthStore";

export default function AuthWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setToken, setUser, user } = useAuthStore();
  const nativeParams = new URLSearchParams(window.location.search);
  const qweValue = nativeParams.get("qwe");

  const { mutate: autoLogin, isPending } = useMutation({
    mutationFn: (qwe: string) => staffbuyApi.login({ qwe }),
    onSuccess: (res) => {
      // 儲存 token
      setToken(res.data);
      if (!user?.eID) {
        staffbuyApi
          .getUserInfo()
          .then((res) => res.data)
          .then((result) => {
            setUser(result);
          });
      }
      // 清除網址上的參數
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("qwe");
      setSearchParams(newParams, { replace: true });
    },
  });

  useEffect(() => {
    if (qweValue) {
      autoLogin(qweValue);
    }
  }, []);

  if (qweValue && isPending) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spin size="large" tip="自動登入中..." />
      </div>
    );
  }

  return <Outlet />;
}

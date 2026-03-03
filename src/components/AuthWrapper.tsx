import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { Spin } from "antd";
import { useAuthStore } from "@/store/useAuthStore";
import { commonApi } from "@/api/commonApi";
import { partyupApi } from "@/api/partyup/partyupApi";

export default function AuthWrapper() {
  const { setToken, setUser } = useAuthStore();
  const [pending, setPending] = useState(false);
  const getParam = (key: string) => {
    // 先嘗試從標準 search 拿，拿不到就從 hash 拿
    const params = new URLSearchParams(window.location.search);
    if (params.has(key)) return params.get(key);

    const hashParams = new URLSearchParams(window.location.hash.split('?')[1]);
    return hashParams.get(key);
  };
  const qweValue = getParam("qwe");

  const autoLogin = async () => {
    setPending(true);
    try {
      const partyupLoginData = await partyupApi.partyupLogin({ qwe: qweValue! })
      const staffbuyLoginData = await commonApi.staffBuyLogin({ qwe: qweValue! })
      // const partyupUserInfo = await partyupApi.getUserInfo()
      const staffbuyUserInfo = await commonApi.getUserInfo()
      setUser(staffbuyUserInfo.data);
      setToken('partyup', partyupLoginData.data);
      setToken('staffbuy', staffbuyLoginData.data);
    } catch (error) {
      console.error(error);
    } finally {
      setPending(false);
    }
    clearQwe();
  }

  const clearQwe = () => {
    // 1. 處理標準 Search 部分 (針對 http://domain.com/?qwe=xxx#/)
    const url = new URL(window.location.href);
    if (url.searchParams.has("qwe")) {
      url.searchParams.delete("qwe");
    }

    // 2. 處理 Hash 部分 (針對 http://domain.com/#/path?qwe=xxx)
    let currentHash = url.hash;
    if (currentHash.includes("?")) {
      const [hashPath, hashQuery] = currentHash.split("?");
      const hashParams = new URLSearchParams(hashQuery);

      if (hashParams.has("qwe")) {
        hashParams.delete("qwe");
        const newHashQuery = hashParams.toString();
        currentHash = newHashQuery ? `${hashPath}?${newHashQuery}` : hashPath;
      }
    }

    window.history.replaceState(
      {},
      "",
      url.pathname + url.search + currentHash
    );
  };


  useEffect(() => {
    if (qweValue) {
      autoLogin();
    }
  }, []);

  if (qweValue && pending) {
    return (
      <div className="flex h-screen w-screen items-center justify-center gap-2.5">
        <Spin size="large" tip="自動登入中..." />
        自動登入中...
      </div>
    );
  }



  return <Outlet />;
}

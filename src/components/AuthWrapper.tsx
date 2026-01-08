import { useEffect } from "react";
import { Outlet, useSearchParams } from "react-router"; // 確保你有安裝 react-router-dom
import { useMutation } from "@tanstack/react-query";
import { staffbuyApi } from "@/api/staffbuyApi";

export default function AuthWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { mutate: autoLogin } = useMutation({
    mutationFn: (qwe: string) => staffbuyApi.login({ qwe }),
    onSuccess: (res) => {
      localStorage.setItem("token", res.data);
      searchParams.delete("qwe");
      setSearchParams(searchParams, { replace: true });
    },
  });

  useEffect(() => {
    const qweValue = searchParams.get("qwe");

    if (qweValue) {
      autoLogin(qweValue);
    }
  }, [searchParams, autoLogin]);

  return <Outlet />;
}

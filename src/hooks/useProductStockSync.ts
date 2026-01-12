import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useStaffbuyApi } from "@/api/useStaffbuyApi";

export const useProductStockSync = (targetId: string | null) => {
  const queryClient = useQueryClient();

  const queryResult = useStaffbuyApi.useProductStockListQuery(targetId || "");

  const { data: stockInfo } = queryResult;

  useEffect(() => {
    if (targetId && stockInfo?.[0]) {
      const newStock = stockInfo[0].nQ_StockQty;

      queryClient.setQueryData(["staffbuy_product_list"], (oldRes: any) => {
        if (!oldRes) return oldRes;

        //更新庫存數量
        const currentData = oldRes.data.map((p: any) => {
          if (p.iD_Product === targetId) {
            if (p.nQ_Quantity === newStock) return p;
            return { ...p, nQ_Quantity: newStock };
          }
          return p;
        });

        return { ...oldRes, data: currentData };
      });
    }
  }, [stockInfo, targetId, queryClient]);

  return queryResult;
};

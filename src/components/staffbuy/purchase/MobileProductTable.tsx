import QuantityInput from "./QuantityInput";

interface TableRowData {
  id: string;
  name: string;
  price: number;
  stock: number;
  quantity: number;
  subtotal: number;
}

export default function MobileProductTable({
  data,
  onChange,
  className = "",
}: {
  data?: TableRowData[];
  onChange: (prod: TableRowData, qty: number) => void;
  className?: string;
}) {
  return (
    <div
      className={
        "w-[100%] bg-white border-[#F5F5F5] border-[2px] rounded-[10px] mb-[40px] " +
        className
      }
    >
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-[#F5F5F5] h-[40px] text-left text-[14px] leading-[21px] text-[#333333] sticky z-99 top-0">
            <th className="px-2.5">員購品項</th>
            <th className="text-center">購買數量</th>
            <th className="text-center w-15">小計</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr
              key={item.id}
              className={
                "hover:bg-[#FFF6E9] border-b-[2px] border-b-[#F5F5F5] " +
                (item.quantity > 0 ? "bg-[#FFF6E9]" : "")
              }
            >
              <td className="px-2.5 py-2">
                <div>{item.name}</div>
                <div className="flex gap-[10px]">
                  <div
                    className={
                      "text-[#6B5E55] text-[14px] " +
                      (item.quantity > 0 ? "" : "bg-[#FBFBFB]")
                    }
                  >
                    價格: {item.price}
                  </div>
                  <div
                    className={
                      "text-[#6B5E55] text-[14px] " +
                      (item.quantity > 0 ? "" : "bg-[#FBFBFB]")
                    }
                  >
                    剩餘: {item.stock}
                  </div>
                </div>
              </td>
              <td className="text-center py-[15px] flex justify-center items-center">
                <QuantityInput
                  variant={"stepper"}
                  inputNumber={item.quantity}
                  onChange={(val) => {
                    onChange(item, val);
                  }}
                />
              </td>
              <td className=" text-center w-15">{item.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

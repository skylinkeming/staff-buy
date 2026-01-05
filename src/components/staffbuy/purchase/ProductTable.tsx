import QuantityInput from "./QuantityInput";

interface TableRowData {
  id: string;
  name: string;
  price: number;
  stock: number;
  quantity: number;
  subtotal: number;
}

export default function ProductTable({
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
        "w-[100%] bg-white border-[#F5F5F5] border-[1px] rounded-[10px] mb-[40px] " +
        className
      }
    >
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-[#F5F5F5] h-[40px] text-left text-[14px] leading-[21px] text-[#333333] sticky top-0 z-99">
            <th className="text-center">員購品項</th>
            <th className="text-center">購買價格</th>
            <th className="text-center">剩餘數量</th>
            <th className="text-center">購買數量</th>
            <th className="text-center w-[124px]">小計</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr
              key={item.id}
              className={
                "hover:bg-[#FFF6E9] " +
                (item.quantity > 0 ? "bg-[#FFF6E9]" : "")
              }
            >
              <td className="text-center py-[15px]">{item.name}</td>
              <td className="text-center py-[15px]">{item.price}</td>
              <td className="text-center py-[15px]">{item.stock}</td>
              <td className="text-center py-[15px] flex justify-center">
                <QuantityInput
                  variant={"stepper"}
                  inputNumber={item.quantity}
                  onChange={(val) => {
                    onChange(item, val);
                  }}
                />
              </td>
              <td className="text-center py-[15px]">{item.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

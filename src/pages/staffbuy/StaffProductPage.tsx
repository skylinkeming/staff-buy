import CartSummary from "../../components/business/CartSummary";
import Notice from "../../components/common/Notice";
import ProductListTable from "../../components/business/ProductListTable";

// interface TableRowData {
//   name: string;
//   price: number;
//   stock: number;
//   quantity: number;
//   subtotal: number;
// }

export default function StaffProductPage() {
  return (
    <div className="min-h-[100%] w-[100%] relative flex flex-col items-center justify-center gap-[40px] bg-[#FBFBFB]">
      <div>
        <h2>員購商品</h2>
        <div className="flex gap-[40px] ">
          <div className="w-[740px] inline-block">
            <Notice />
            <ProductListTable
              data={[
                {
                  name: "小籠包",
                  price: 50,
                  stock: 100,
                  quantity: 2,
                  subtotal: 100,
                },
                {
                  name: "小籠包",
                  price: 50,
                  stock: 100,
                  quantity: 2,
                  subtotal: 100,
                },
                {
                  name: "小籠包",
                  price: 50,
                  stock: 100,
                  quantity: 2,
                  subtotal: 100,
                },
                {
                  name: "小籠包",
                  price: 50,
                  stock: 100,
                  quantity: 2,
                  subtotal: 100,
                },
                {
                  name: "小籠包",
                  price: 50,
                  stock: 100,
                  quantity: 2,
                  subtotal: 100,
                },
                {
                  name: "小籠包",
                  price: 50,
                  stock: 100,
                  quantity: 2,
                  subtotal: 100,
                },
                {
                  name: "小籠包",
                  price: 50,
                  stock: 100,
                  quantity: 2,
                  subtotal: 100,
                },
                {
                  name: "小籠包",
                  price: 50,
                  stock: 100,
                  quantity: 2,
                  subtotal: 100,
                },
                {
                  name: "小籠包",
                  price: 50,
                  stock: 100,
                  quantity: 2,
                  subtotal: 100,
                },
                {
                  name: "小籠包",
                  price: 50,
                  stock: 100,
                  quantity: 2,
                  subtotal: 100,
                },
                {
                  name: "小籠包",
                  price: 50,
                  stock: 100,
                  quantity: 2,
                  subtotal: 100,
                },
              ]}
            />
          </div>
          <div className="sticky top-[0px] h-[400px] inline-block">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

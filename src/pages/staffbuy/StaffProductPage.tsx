import CartSummary from "../../components/business/CartSummary";
import Notice from "../../components/business/Notice";
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
    <div className="min-h-[100vh] w-[100vw] relative flex gap-[40px]">
      <div className="w-[740px] inline-block">
        <h2>員購商品</h2>
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
          ]}
        />
      </div>
      <div className="sticky w-80 inline-block mt-[75px]">
        <CartSummary />
      </div>
    </div>
  );
}

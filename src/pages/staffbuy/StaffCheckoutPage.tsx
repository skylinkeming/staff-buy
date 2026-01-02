import type { ReactNode } from "react";
import CheckoutItems from "../../components/business/CheckoutItems";

const BlockTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={"text-[24px] w-full text-left" + className}>{children}</div>
);

export default function StaffCheckoutPage() {
  return (
    <div className="w-full p-[15px] bg-[#FBFBFB]">
      <div>
        <BlockTitle className="mt-[28px] mb-[10px]">購買商品</BlockTitle>
        <CheckoutItems />
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

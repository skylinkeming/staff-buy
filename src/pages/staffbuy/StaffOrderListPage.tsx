import Breadcrumbs from "@/components/common/BreadCrumbs";
import { BlockTitle } from "./StaffProductPage";
import Searchbar from "@/components/common/Searchbar";
import OrderCard from "@/components/staffbuy/myOrder/OrderCard";

export default function StaffOrderListPage() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full px-3.5 py-5">
        <Breadcrumbs />
        <BlockTitle className="w-full text-left">員購紀錄</BlockTitle>
        <Searchbar className="mt-5" onClickSearch={() => {}} />
        <div>
          <OrderCard />
        </div>
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

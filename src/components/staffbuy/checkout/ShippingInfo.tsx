import { useCartStore } from "@/store/useCartStore";
import FormInput from "../../common/FormInput";

export default function ShippingInfo() {
  const updateShippingInfo = useCartStore((state) => state.updateShippingInfo);
  const shippingInfo = useCartStore((state) => state.shippingInfo);

  return (
    <div className="bg-[white] grid grid-cols-1 px-2.5 py-5 rounded-[15px] max-w-175 md:grid-cols-2 gap-2.5">
      <FormInput
        required
        variant="date-picker"
        label="取貨日期"
        value={shippingInfo.pickupDate}
        onChange={(val) => {
          updateShippingInfo({
            pickupDate: val,
          });
        }}
      />
      <FormInput
        required
        label="附提袋數"
        value={shippingInfo.bagQty}
        onChange={(val) => {
          updateShippingInfo({
            bagQty: val,
          });
        }}
      />
      <FormInput
        required
        variant="select"
        label="取貨方式"
        value={shippingInfo.pickupMethod}
        optionData={[
          { value: "1", label: "Jack" },
          { value: "2", label: "Lucy" },
          { value: "3", label: "yiminghe" },
          { value: "4", label: "Disabled", disabled: true },
        ]}
        onChange={(val) => {
          updateShippingInfo({
            pickupMethod: val,
          });
        }}
      />
      <FormInput
        required
        label="收件人姓名"
        value={shippingInfo.name}
        onChange={(val) => {
          updateShippingInfo({
            name: val,
          });
        }}
      />
      <FormInput
        required
        label="收件人電話"
        value={shippingInfo.phone}
        onChange={(val) => {
          updateShippingInfo({
            phone: val,
          });
        }}
      />
      <FormInput
        required
        label="到貨地址"
        value={shippingInfo.address}
        onChange={(val) => {
          updateShippingInfo({
            address: val,
          });
        }}
      />
      <FormInput
        required
        variant="select"
        label="希望到貨時段"
        value={shippingInfo.deliveryTime}
        optionData={[
          { value: "jack", label: "Jack" },
          { value: "lucy", label: "Lucy" },
          { value: "Yiminghe", label: "yiminghe" },
          { value: "disabled", label: "Disabled", disabled: true },
        ]}
        onChange={(val) => {
          updateShippingInfo({
            deliveryTime: val,
          });
        }}
      />
    </div>
  );
}

import OrderDetail from "@/components/pages/User/OrderDetail/OrderDetail";

export default function Page({ params }: { params: { order_id: string } }) {
  const order_id = params.order_id;
  return <OrderDetail orderId={order_id} />;
}

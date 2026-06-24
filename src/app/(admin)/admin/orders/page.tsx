import { OrdersTable } from '@widgets/admin/orders-table/OrdersTable';

export default function Orders() {
  return (
    <div className='sm:p-4'>
      <h1 className="text-2xl font-bold mb-6">Orders panel</h1>
      <OrdersTable />
    </div>
  );
}
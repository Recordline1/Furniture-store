import { OrdersTable } from '@widgets/admin/orders-table/OrdersTable';
import {ProductsTable} from '@widgets/admin/product-table/ProductsTable';

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Control panel</h1>
      <div className='grid gap-10'>
        <OrdersTable />
        <ProductsTable />
      </div>
    </div>
  );
}
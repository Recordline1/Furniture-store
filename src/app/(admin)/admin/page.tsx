import { OrdersTable } from '@widgets/admin/orders-table/OrdersTable';
import {ProductsTable} from '@widgets/admin/product-table/ProductsTable';

export default function AdminDashboard() {
  return (
    <div className='sm:p-4' >
      <h1 className="text-2xl font-bold mb-6">Control panel</h1>
      <div className='grid gap-10'>
        <div className='overflow-x-auto'>
            <h2 className="text-2xl font-bold mb-6">Orders Table</h2>
            <OrdersTable />
        </div>
        <div className='overflow-x-auto'>
            <h2 className="text-2xl font-bold mb-6">Products Table</h2>
            <ProductsTable />
        </div>
      </div>
    </div>
  );
}
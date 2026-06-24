import { ProductsTable } from '@widgets/admin/product-table/ProductsTable';

export default function Products() {
  return (
    <div className='sm:p-4' >
      <h1 className="text-2xl font-bold mb-6">Products panel</h1>
      <ProductsTable />
    </div>
  );
}
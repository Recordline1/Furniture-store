import { supabase } from '@/shared/api/supabase';
import { ProductCard } from '@entities/product-card/ui/ProductCard';
import { CategoryFilter } from '@/features/catalog/ui/CategoryFilter';
import { Pagination } from '@features/catalog/ui/Pagination';

interface SearchParamsProps {
  category?: string;
  sort?: string;
  limit?: string;
  view?: string;
  page?: string;
}


export default async function CatalogPage({
  searchParams
}: {
  searchParams: Promise<SearchParamsProps>
}) {
  const { category, sort, limit, view, page } = await searchParams;

  const currentLimit = Number(limit ?? 16);
  const currentSort = sort ?? 'default';
  const currentView = view ?? 'grid';
  const currentPage = Number(page ?? 1);

  const from = (currentPage - 1) * currentLimit;
  const to = from + currentLimit - 1;

  let query = supabase.from('products_view').select('*', { count: 'exact' });

  if (category) {
    query = query.eq('category', category);
  }

  if (currentSort === 'low_high') {
    query = query.order('price', { ascending: true });
  } else if (currentSort === 'high_low') {
    query = query.order('price', { ascending: false });
  }

  query = query.range(from, to);

  const { data: products, count } = await query;

  const productsCount = products?.length ?? 0;
  const totalCount = count ?? productsCount;
  const totalPages = Math.ceil(totalCount / currentLimit);
  const categories = ['sofas', 'outdoor', 'tables', 'dining', 'storage'];

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Catalog</h1>

      <CategoryFilter
        categories={categories}
        productsCount={productsCount}
        totalCount={totalCount}
      />

      <div className={
        currentView === 'list'
          ? 'flex flex-col gap-6 max-w-4xl mx-auto'
          : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
      }>
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            view={currentView}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </main>
  );
}
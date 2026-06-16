import { ProductCard } from '@entities/product-card/ui/ProductCard';
import { FurnitureProduct } from '@/shared/types';


export const RelatedProducts = async ({ product }: { product: FurnitureProduct[] | null }) => {
    if (!product || product.length === 0) return null;

    return (
        <section className="mt-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Similar products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {product.map((item) => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>
        </section>
    )
}
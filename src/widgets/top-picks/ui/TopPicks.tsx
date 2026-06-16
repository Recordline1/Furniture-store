import { ProductCard } from "@/entities/product-card/ui/ProductCard";
import { getTopProducts } from "../api/getTopProducts";
import { Container } from "@/shared/Container";


export const TopPicks = async () => {
    const { data: products } = await getTopProducts(4);

    return (
        <section className="py-12 md:py-20">
            <Container>
                <h2 className="text-4xl text-center font-bold text-gray-900 mb-8">Top Picks</h2>
                <p className="text-gray-500 text-center mb-7">Find a bright ideal to suit your taste with our great selection of suspension, floor and table lights.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {products?.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </Container>
        </section>
    );
}

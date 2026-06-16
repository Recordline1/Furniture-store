import { getProducts } from "../api/getProducts"
import { Container } from "@/shared/Container";
import Image from "next/image";
import Link from "next/link";

export const ProductsShowcase = async () => {
    const { data: products } = await getProducts(2);
    const getLabelStyles = (variant: string) => {
        switch (variant) {
            case 'sale':
                return 'bg-red-500';
            case 'new':
                return 'bg-green-500';
            default:
                return '';
        }
    };
    return (
        <section className="py-12 md:py-20">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {products?.map((product) => (
                        <div key={product.id} className='py-4'>
                            <div className="flex flex-col gap-4 group relative flex flex-col transition-all">
                                <Link
                                    href={`/product/${product.slug}`}
                                    className="relative block  overflow-hidden rounded-lg bg-gray-100"
                                >
                                    <div className="aspect-square ">
                                        <Image
                                            src={product.image_url}
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        {product.label && (
                                            <div className={`absolute top-4 right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full text-white text-sm font-semibold shadow-md ${getLabelStyles(product.label.variant)}`}>
                                                {product.label.text}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>

                                    <Link href='/catalog' className="font-semibold text-gray-900 border-b border-gray-900 hover:opacity-70 transition-opacity w-max">
                                        View More
                                    </Link>

                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </Container >
        </section>
    )
}
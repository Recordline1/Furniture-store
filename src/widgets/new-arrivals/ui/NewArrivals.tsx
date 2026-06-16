import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/shared/Container';
import { getNewArrivals } from '../api/newArrivals';


export const NewArrivals = async () => {
    const { data: product } = await getNewArrivals('trenton-modular-sofa');
    
    if (!product) return null;

    return (
        <section className="w-full bg-yellow py-12 md:py-20">
            <Container>
                <div className="flex flex-col md:flex-row items-center justify-between md:gap-8">
                    
                    <div className="w-full md:basis-3/5 flex justify-center">
                        <div className="relative w-full max-w-[600px] aspect-square">
                            <Image
                                src={product.image_url}
                                alt={product.name}
                                fill
                                priority
                                className="object-contain" 
                                sizes="(max-width: 768px) 100vw, 590px"
                            />
                        </div>
                    </div>

                    <div className="w-full md:basis-2/5 flex flex-col items-center md:items-start text-center md:text-left">
                        <p className='font-semibold text-[20px] md:text-[24px] mb-2'>New Arrivals</p>
                        <h2 className="text-3xl md:text-[48px] font-bold text-gray-900 mb-8 leading-tight">
                            {product.name}
                        </h2>
                        <Link
                            href={`/product/${product.slug}`}
                            className="inline-block border border-black px-12 py-4 font-medium hover:bg-black hover:text-white transition-all duration-300"
                        >
                            Order Now
                        </Link>
                    </div>

                </div>
            </Container>
        </section>
    );
};
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/shared/Container';
import { supabase } from '@/shared/api/supabase';


export const HeroSection = async () => {

    const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', 'rocket-single-seater')
        .single();

    if (error || !product) {
        return (
            <div className='min-h-[300px] font-medium flex items-center justify-center'>
                <div className='text-2xl'> Product not Found</div>
            </div>
        )
    }

    return (
        <>
            <section className="bg-yellow py-12 md:py-20">
                <Container>
                    <div className="px-4 flex flex-col md:flex-row items-center justify-between">

                        <div className="basis-1/2 mb-10 md:mb-0">
                            <div className='max-w-[445px]'>
                                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                    {product.name}
                                </h1>
                                <Link
                                    href={`/product/rocket-single-seater`}
                                    className="inline-block border-b-2 border-black font-semibold hover:opacity-70 transition-opacity"
                                >
                                    Shop Now
                                </Link>
                            </div>
                        </div>


                        <div className="basis-1/2 flex justify-center md:justify-end">
                            <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
                                <Image
                                    src="/images/Rocket single seater 1.png"
                                    alt="Rocket single seater"
                                    fill
                                    priority
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, 450px"
                                />
                            </div>
                        </div>

                    </div>
                </Container>
            </section>
        </>
    );
};
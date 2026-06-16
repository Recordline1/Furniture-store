import { supabase } from '@/shared/api/supabase';
import { ProductDetails } from '@widgets/ProductDetails/ui/ProductDetails';
import { RelatedProducts } from '@widgets/product/ui/RelatedProducts';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';




export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;

  
  const { data: product } = await supabase
    .from('products')
    .select('name, image_url, category')
    .eq('slug', slug)
    .single();

  if (!product) {
    return { title: 'Product not found' };
  }

  return {
    title: `${product.name} | Your Store`, 
    description: `Buy ${product.name} in the ${product.category} category at the best price.`,
    openGraph: {
      title: product.name,
      description: `Stylish furniture for your home: ${product.name}`,
      images: [
        {
          url: product.image_url, 
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;

    const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();
        
    if (error || !product) {
        notFound();
    }
    const { data: relatedProducts } = await supabase
        .from('products')
        .select('*')
        .eq('category', product.category)
        .neq('id', product.id)
        .limit(4);

    return (
        <main className="container mx-auto px-4 py-12">
            <ProductDetails product={product} />
            <RelatedProducts product={relatedProducts} />
        </main>
    );
}
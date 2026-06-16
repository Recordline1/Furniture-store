import { supabase } from '@/shared/api/supabase';
import { BlogDetails } from '@widgets/blog-details/ui/BlogDetails';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';




export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params;


    const { data: post } = await supabase
        .from('posts')
        .select('title, image_url')
        .eq('slug', slug)
        .single();

    if (!post) {
        return { title: 'Post not found' };
    }

    return {
        title: `${post.title} | Your Store`,
        description: `Buy ${post.title} `,
        openGraph: {
            title: post.title,
            description: `Stylish furniture for your home: ${post.title}`,
            images: [
                {
                    url: post.image_url,
                    width: 800,
                    height: 600,
                    alt: post.title,
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
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !product) {
        notFound();
    }
    return (
        <main className="container mx-auto px-4 py-12">
            <BlogDetails post={product} />
        </main>
    );
}
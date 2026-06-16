import { PostCard } from '@entities/post-card/ui/PostCard';
import { Container } from '@/shared/Container';
import { getPosts } from '../api/getPosts';
import Link from 'next/link';


export const BlogSection = async () => {
    const { data: posts, error } = await getPosts();


    if (!posts || error) {
        return <p className="text-center py-10">Failed to load posts.</p>;
    }

    return (
        <section className="py-12 md:py-20">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-2">Our Blogs</h2>
                    <p className="text-gray-500">Find a bright ideal to suit your taste with our great selection</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} compact />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/blogs" className="border-b-2 border-black font-semibold">
                        View All Post
                    </Link>
                </div>
            </Container>
        </section>
    );
};
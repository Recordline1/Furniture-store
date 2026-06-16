import { Sidebar } from '@widgets/sidebar/ui/Sidebar';
import { supabase } from '@/shared/api/supabase';
import { PostCard } from '@/entities/post-card/ui/PostCard';
import { Container } from '@/shared/Container';



export default async function BlogPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;


  let query = supabase.from('posts').select('*');

  if (category) {
    query = query.eq('categories', category);
  }

  const { data: posts } = await query;

  return (
    <Container className="flex flex-col gap-8 md:flex-row md:items-start mt-7">
      <main className="w-full md:w-3/4 ">
        {posts?.map(post => <PostCard key={post.id} post={post} compact />)}
      </main>
      <Sidebar activeCategory={category} />
    </Container>
  );
}
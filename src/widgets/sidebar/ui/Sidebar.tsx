import Link from 'next/link';
import { supabase } from "@/shared/api/supabase";
import { formatDate } from '@shared/lib/formatDate';
import { CalendarDays } from 'lucide-react';
import Image from 'next/image';

interface SidebarProps {
  activeCategory?: string;
}

export const Sidebar = async ({ activeCategory }: SidebarProps) => {
  const { data: posts } = await supabase
    .from('posts')
    .select('categories');

  const categoriesCount = posts?.reduce((acc, post) => {
    const cat = post.categories;
    if (cat) acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) ?? {};

  const { data: recentPosts } = await supabase
    .from('posts')
    .select('id, title, created_at, image_url')
    .order('created_at', { ascending: false })
    .limit(5);

  const totalCount = Object.values(categoriesCount).reduce((sum, count) => sum + count, 0);

  return (
    <aside className="w-full md:w-1/4">

      <input type="search" placeholder="Search..." className="border border-gray-300 rounded-md p-2 w-full" />

      <h3 className="font-bold mt-6 mb-3">Categories</h3>
      <ul className="space-y-2">
        <li className="flex justify-between">
          <Link
            href="/blogs"
            className={`font-medium ${!activeCategory ? 'text-black underline' : 'text-gray-700 hover:text-black'}`}
          >
            All
          </Link>
          <span>{totalCount}</span>
        </li>
        {Object.entries(categoriesCount).map(([cat, count]) => (
          <li key={cat} className="flex justify-between">
            <Link
              href={`/blogs?category=${encodeURIComponent(cat)}`}
              className={`font-medium ${activeCategory === cat ? 'text-black underline' : 'text-gray-700 hover:text-black'}`}
            >
              {cat}
            </Link>
            <span>{count}</span>
          </li>
        ))}
      </ul>

      <h3 className="font-bold mt-8 mb-3">Recent Posts</h3>
      {recentPosts?.map(post => (
        <div key={post.id} className="flex gap-3 mt-4 items-start">
          <div className="relative shrink-0 aspect-square w-[106px] rounded-lg overflow-hidden">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          <div>
            <p className="text-sm mb-2 font-medium">{post.title}</p>
            <span className="flex items-center text-sm text-gray-500 gap-1">
              <CalendarDays width={18} />
              {formatDate(post.created_at)}
            </span>
          </div>
        </div>
      ))}
    </aside>
  );
};
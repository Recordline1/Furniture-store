import { Post } from '@/entities/post-card/model/interface';
import { formatDate } from '@shared/lib/formatDate';
import Image from 'next/image';
import { Tag } from 'lucide-react';



interface PostProps {
  post: Post;
}

export const BlogDetails = ({ post }: PostProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12">
      <div className="relative aspect-square w-full">
        <Image
          src={post.image_url}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain rounded-lg"
          priority
          style={{ maxWidth: '100%' }}
        />
      </div>

      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-2xl md:text-4xl font-bold">{post.title}</h1>
        <div className='flex gap-4 text-gray-500'>
          <p className='flex items-center gap-1'><Tag  width={15}/> {post.categories}</p>
          <p>{formatDate(post.created_at)}</p>
        </div>
        <p className="text-2xl text-gray-600">{post.content}</p>
      </div>
    </div>
  );
};
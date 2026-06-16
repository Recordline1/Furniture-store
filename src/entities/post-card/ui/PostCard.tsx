import { Post } from '../model/interface';
import { Clock } from 'lucide-react';
import { CalendarDays } from 'lucide-react';
import {formatDate} from '@shared/lib/formatDate';
import Image from 'next/image';
import Link from 'next/link';

interface PostCardProps {
    post: Post;
    compact?: boolean;
}

function excerptFromContent(content: string | undefined, length = 120) {
    if (!content) return '';
    const text = content.replace(/<[^>]+>/g, '');
    return text.length > length ? text.slice(0, length).trim() + '…' : text;
}

export const PostCard = ({ post, compact = false }: PostCardProps) => {
    const excerpt = excerptFromContent(post.content, compact ? 90 : 150);

    return (
        <div className={`flex flex-col gap-4 ${compact ? 'text-left' : ''}`}>

            <div className={`relative w-full overflow-hidden rounded-lg ${compact ? 'h-[180px] sm:h-[200px]' : 'h-[300px]'}`}>
                <Image
                    src={post.image_url}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes={compact ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 768px) 100vw, 33vw"}
                />
            </div>

            <h3 className={`text-lg font-medium ${compact ? 'text-left' : 'text-center'}`}>{post.title}</h3>

            {compact && excerpt ? (
                <p className="text-sm text-gray-600">{excerpt}</p>
            ) : null}

            <Link href={`/blog/${post.slug}`} className={`${compact ? 'text-left' : 'block text-center'} font-semibold border-b-2 border-black w-fit` }>
                Read More
            </Link>


            <div className={`flex ${compact ? 'justify-start' : 'justify-center'} gap-4 text-gray-500 text-sm`}>
                <span className="flex items-center gap-1"><Clock width={18} /> {post.read_time} min</span>
                <span className="flex items-center gap-1"><CalendarDays width={18} />{formatDate(post.created_at)}</span>
            </div>
        </div>
    )
}
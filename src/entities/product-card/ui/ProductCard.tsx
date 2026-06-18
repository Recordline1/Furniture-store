import { FurnitureProduct } from '@shared/types/index';
import { AddToCartButton } from '@features/cart/ui/AddToCartButton';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: FurnitureProduct;
  view?: string;
}

export const ProductCard = ({ product, view = 'grid' }: ProductCardProps) => {
  const getLabelStyles = (variant: string) => {
    switch (variant) {
      case 'new': return 'bg-brand';
      case 'sale': return 'bg-[#E97171]';
      default: return 'bg-transparent';
    }
  };
  const isSale = product.old_price && product.old_price > product.price;
  return (
    <div className="py-4">
      <div
        className={`group relative flex transition-all hover:shadow-lg rounded-xl bg-white p-3 sm:p-4 ${view === 'list'
            ? 'flex-col sm:flex-row gap-6 sm:items-center'
            : 'flex-col gap-4'
          }`}
      >

        <div className={`relative shrink-0 ${view === 'list' ? 'w-full sm:w-1/3 md:w-48' : 'w-full'}`}>

          {product.label && (
            <div className={`absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full text-white text-xs font-semibold shadow-sm ${getLabelStyles(product.label.variant)}`}>
              {product.label.text}
            </div>
          )}

          <Link href={`/product/${product.slug}`}>
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </Link>
        </div>

        <div className={`flex flex-col ${view === 'list' ? 'flex-1 gap-4' : 'gap-2'}`}>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-medium text-gray-900">
              <Link href={`/product/${product.slug}`} className="hover:underline">
                {product.name}
              </Link>
            </h3>

            <div className="flex items-center gap-3 mt-1">
              <p className="text-xl font-semibold text-gray-900">
                Rs. {product.price.toLocaleString()}
              </p>
              {isSale && (
                <p className="text-sm text-gray-500 line-through">
                  Rs. {product.old_price?.toLocaleString()}
                </p>
              )}
            </div>

            {view === 'list' && (
              <p className="hidden sm:block text-sm text-gray-500 mt-2 line-clamp-2">
                A highly versatile piece of furniture that brings both comfort and style to your interior space.
              </p>
            )}
          </div>

          <div className={view === 'list' ? 'mt-2 sm:w-fit' : 'mt-1'}>
            <AddToCartButton product={product} />
          </div>
        </div>

      </div>
    </div>
  );
};
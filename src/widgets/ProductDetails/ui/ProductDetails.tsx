import { FurnitureProduct } from '@/shared/types';
import { AddToCartButton } from '@/features/cart/ui/AddToCartButton';
import Image from 'next/image';

interface ProductDetailsProps {
  product: FurnitureProduct;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12">
      
      <div className="relative aspect-square w-full">
        <Image
          src={product. image_url}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain rounded-lg"
          priority 
        />
      </div>

  
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl md:text-4xl font-bold">{product.name}</h1>
        <p className="text-2xl text-gray-600">Rs. {product.price.toLocaleString()}</p>
        <p className="text-gray-500 leading-relaxed">
          {product.description || "Beautiful furniture for your interior. Crafted with care and designed to elevate your living space. Experience comfort and style with our exquisite collection."}
        </p>
        
        <div className="mt-6">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};
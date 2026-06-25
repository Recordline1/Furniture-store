"use client";

import { useState } from 'react';
import { FurnitureProduct as Product } from '@shared/types/index';
import { ProductModal } from '@widgets/admin/product-modal/ProductModal';
import { DeleteProductButton } from '@features/admin/products/ui/DeleteProductButton';
import { useProducts } from '@widgets/admin/product-table/api/useProducts';
import { Plus } from 'lucide-react';
import Image from 'next/image';

export const ProductsTable = () => {
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const { data: products, isLoading, error } = useProducts();

    return (

        <div className="overflow-x-auto">
            {isLoading && <div>Loading products...</div>}
            {error && <div>error: {error.message}</div>}

            <div className="flex justify-end mb-4">
                <button className='flex gap-3 items-center font-medium border p-3 rounded-xl bg-gray-200 hover:bg-gray-300 cursor-pointer' onClick={() => setIsEditing(true)}>
                <Plus size={15}/>
                Add product
                </button>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="border-b bg-gray-50">
                        <th className="p-3 text-left">Image</th>
                        <th className="p-3 text-left">Title</th>
                        <th className="p-3 text-left">Price</th>
                        <th className="p-3 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map(p => (
                        <tr key={p.id} className="border-b hover:bg-gray-50">
                            <td className=" p-3 w-16">
                                <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-gray-100">
                                    {p.image_url ? (
                                        <Image
                                            src={p.image_url}
                                            alt={p.name}
                                            fill
                                            className="object-cover"
                                            sizes="50px"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400 text-[10px]">No img</div>
                                    )}
                                </div></td>
                            <td className="p-3">{p.name}</td>
                            <td className="p-3">${p.price}</td>
                            <td className="p-3">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditingProduct(p)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Edit
                                    </button>
                                    <DeleteProductButton id={p.id} name={p.name} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ProductModal
                isOpen={!!editingProduct}
                onClose={() => setEditingProduct(null)}
                product={editingProduct}
            />
            <ProductModal
                isOpen={isEditing}
                onClose={() => setIsEditing(false)}
                product={null}
            />
        </div>
    );
};
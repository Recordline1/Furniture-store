// widgets/admin/ProductModal/ProductModal.tsx
'use client'

import { FurnitureProduct as Product } from '@shared/types/index';
import { ProductForm } from '@features/admin/products/ui/ProductForm';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    product?: Product | null;
}

export const ProductModal = ({ isOpen, onClose, product }: Props) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">
                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-bold">{product ? 'Редактировать товар' : 'Добавить товар'}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-black">Close</button>
                </div>

                <ProductForm
                    product={product}
                    onSuccess={() => {
                        onClose();
                    }}
                />
            </div>
        </div>
    );
};
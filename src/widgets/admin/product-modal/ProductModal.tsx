// widgets/admin/ProductModal/ProductModal.tsx
'use client'
import {useState,useEffect} from "react";
import { FurnitureProduct as Product } from '@shared/types/index';
import { ProductForm } from '@features/admin/products/ui/ProductForm';
import {createPortal} from "react-dom";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    product?: Product | null;
}

export const ProductModal = ({ isOpen, onClose, product }: Props) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);


    if (!isOpen || !mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl ">
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
        </div>,
        document.body
    );
};
'use client';

import { CloseIcon } from "@shared/icons/CloseIcon";
import { useState, useEffect } from "react";
import { useDebounceValue } from 'usehooks-ts';
import { searchProducts } from '@features/search/api/searchProducts';
import Link from 'next/link';
import Image from 'next/image';

interface SearchModalProps {
    isSearchOpen: boolean;
    onClose: () => void;
}

interface Product {
    slug: string;
    name: string;
    price: number;
    image_url: string;
}

export const SearchModal = ({ isSearchOpen, onClose }: SearchModalProps) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Product[]>([]);

    const [debouncedQuery] = useDebounceValue(query, 500);

    useEffect(() => {
        const fetchResults = async () => {
            if (debouncedQuery.length > 2) {
                const data = await searchProducts(debouncedQuery);
                setResults(data);
            } else {
                setResults([]);
            }
        };
        fetchResults();
    }, [debouncedQuery]);
    if (!isSearchOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-start bg-yellow/90 backdrop-blur-md pt-20 px-4 animate-in fade-in duration-200">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-gray-900 hover:bg-black/10 rounded-full"
            >
                <CloseIcon width={30} height={30} />
            </button>

            <div className="w-full max-w-2xl">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                    type="text"
                    placeholder="search ..."
                    className="w-full bg-transparent border-b-2 border-gray-900 pb-2 text-xl font-medium placeholder:text-gray-900/50 outline-none text-gray-900"
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') onClose();
                    }}
                />
                <div className="mt-8 space-y-4 max-w-2xl mx-auto">
                    {debouncedQuery && results.length === 0 && (
                        <p className="text-gray-900/60 mt-4">Nothing found</p>
                    )}
                    {results.map((product) => (
                        <Link
                            href={`/product/${product.slug}`}
                            key={product.slug}
                            className="block flex gap-4 p-4 bg-white/50 rounded-xl hover:bg-white transition"
                            onClick={onClose}
                        >
                            <div className="relative shrink-0 w-20 h-20">
                                <Image
                                    className="object-cover"
                                    fill
                                    src={product.image_url}
                                    alt={product.name}>
                                </Image>
                            </div>

                            <p className="font-bold">{product.name}</p>
                            <p className="text-sm text-gray-600">${product.price}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>)
}
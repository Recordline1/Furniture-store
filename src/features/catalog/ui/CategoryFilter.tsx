'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { FilterIcon } from '@shared/icons/FilterIcon';
import { GridIcon } from '@shared/icons/GridIcon';
import { ListIcon } from '@shared/icons/ListIcon';
import { CloseIcon } from '@shared/icons/CloseIcon';

interface CategoryFilterProps {
    categories: string[];
    productsCount: number;
    totalCount: number;
}


export const CategoryFilter = ({ categories, productsCount, totalCount }: CategoryFilterProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentCategory = searchParams?.get('category');
    const currentLimit = Number(searchParams?.get('limit') ?? 16);
    const currentSort = searchParams?.get('sort') ?? 'default';
    const currentViewMode = searchParams?.get('view') ?? 'grid';

    const [showDesktopCategories, setShowDesktopCategories] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileMenuOpen]);

    const updateSearchParams = (paramsFn: (params: URLSearchParams) => void) => {
        const params = new URLSearchParams(searchParams?.toString() || '');
        paramsFn(params);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleFilter = (category: string | null) => {
        updateSearchParams((params) => {
            if (category) {
                params.set('category', category);
            } else {
                params.delete('category');
            }
            params.set('page', '1');
        });
    };

    const handleShowCount = (limit: number) => {
        updateSearchParams((params) => {
            params.set('limit', String(limit));
            params.set('page', '1');
        });
    };

    const handleSort = (sort: string) => {
        updateSearchParams((params) => {
            if (sort === 'default') {
                params.delete('sort');
            } else {
                params.set('sort', sort);
            }
            params.set('page', '1');
        });
    };

    const handleViewMode = (mode: 'grid' | 'list') => {
        updateSearchParams((params) => {
            if (mode === 'grid') {
                params.delete('view');
            } else {
                params.set('view', mode);
            }
        });
    };

    return (
        <div className="space-y-4 mb-8 relative z-50">
            <div className="rounded-3xl border border-gray-200 bg-white px-4 py-4 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row-reverse sm:items-center xl:justify-between">

                    <div className="flex items-center justify-between xl:justify-start gap-3 w-full xl:w-auto">

                        <button
                            onClick={() => setShowDesktopCategories((prev) => !prev)}
                            className="hidden xl:inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-300 cursor-pointer"
                        >
                            <FilterIcon />
                            Filter
                        </button>

                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="xl:hidden inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800 cursor-pointer"
                        >
                            <FilterIcon />
                            Filter & Sort
                        </button>

                        <div className="hidden sm:inline-flex items-center rounded-full border border-gray-200 bg-gray-50 p-1">
                            <button
                                type="button"
                                onClick={() => handleViewMode('grid')}
                                className={`inline-flex h-9 w-9 xl:h-10 xl:w-10 items-center justify-center rounded-full transition cursor-pointer ${currentViewMode === 'grid' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:bg-white'}`}
                                aria-label="Grid view"
                            >
                                <GridIcon />
                            </button>
                            <button
                                type="button"
                                onClick={() => handleViewMode('list')}
                                className={`inline-flex h-9 w-9 xl:h-10 xl:w-10 items-center justify-center rounded-full transition cursor-pointer ${currentViewMode === 'list' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:bg-white'}`}
                                aria-label="List view"
                            >
                                <ListIcon />
                            </button>
                        </div>
                    </div>

                    <div className="hidden sm:block text-center shrink-0 text-sm text-gray-500 xl:text-base">
                        Showing 1–{productsCount} of {totalCount} results
                    </div>

                    <div className="hidden xl:flex items-center justify-center gap-3">
                        <label className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-700">
                            <span>Show</span>
                            <select
                                value={currentLimit}
                                onChange={(event) => handleShowCount(Number(event.target.value))}
                                className="bg-transparent outline-none font-medium"
                            >
                                {[16, 32, 48].map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </label>
                        <label className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-700">
                            <span>Sort by</span>
                            <select
                                value={currentSort}
                                onChange={(event) => handleSort(event.target.value)}
                                className="bg-transparent outline-none font-medium"
                            >
                                <option value="default">Default</option>
                                <option value="low_high">Price low to high</option>
                                <option value="high_low">Price high to low</option>
                            </select>
                        </label>
                    </div>
                </div>
            </div>

            {showDesktopCategories && (
                <div className="hidden xl:block rounded-3xl border border-gray-200 bg-white px-4 py-4 shadow-sm animate-fade-in">
                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            type="button"
                            onClick={() => handleFilter(null)}
                            className={`rounded-full px-5 py-2 text-sm font-medium transition ${!currentCategory ? 'bg-gray-900 text-white' : 'border border-gray-200 text-gray-700 hover:border-gray-300'}`}
                        >
                            All
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => handleFilter(cat)}
                                className={`rounded-full px-5 py-2 text-sm font-medium transition ${currentCategory === cat ? 'bg-gray-900 text-white' : 'border border-gray-200 text-gray-700 hover:border-gray-300'}`}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            )}


            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 xl:hidden">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl flex flex-col animate-slide-in-right">

                        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                            <h2 className="text-xl font-bold text-gray-900">Filters & Sort</h2>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 transition"
                            >
                                <CloseIcon width={25} height={25} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">

                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Categories</h3>

                               <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => handleFilter(null)}
                                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${!currentCategory ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                    >
                                        All
                                    </button>
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => handleFilter(cat)}
                                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${currentCategory === cat ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                        >
                                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                        </button>
                                    ))}
                                   
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Sort By</h3>
                                <div className="space-y-2">
                                    {[
                                        { value: 'default', label: 'Default' },
                                        { value: 'low_high', label: 'Price: Low to High' },
                                        { value: 'high_low', label: 'Price: High to Low' },
                                    ].map((option) => (
                                        <label key={option.value} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="sort"
                                                value={option.value}
                                                checked={currentSort === option.value}
                                                onChange={() => handleSort(option.value)}
                                                className="w-4 h-4 text-gray-900 focus:ring-gray-900"
                                            />
                                            <span className="text-gray-700 text-sm font-medium">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Show Items</h3>
                                <select
                                    value={currentLimit}
                                    onChange={(event) => handleShowCount(Number(event.target.value))}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none focus:border-gray-400"
                                >
                                    <option value={16}>16 per page</option>
                                    <option value={32}>32 per page</option>
                                    <option value={48}>48 per page</option>
                                </select>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 p-6 bg-white">
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full rounded-full bg-gray-900 px-4 py-4 text-center text-sm font-bold text-white shadow-md transition hover:bg-gray-800"
                            >
                                Show {totalCount} Results
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
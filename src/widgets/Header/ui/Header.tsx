'use client';
import { useState, useEffect } from 'react';
import { ShoppingCart } from '@shared/icons/ShoppingCart';
import { SearchIcon } from '@shared/icons/SearchIcon';
import { AccountIcon } from '@shared/icons/AccountIcon';
import { MenuIcon } from '@shared/icons/MenuIcon';
import { CloseIcon } from '@shared/icons/CloseIcon';
import { useCartStore } from '@/entities/cart/model/useCartStore';
import { Container } from '@/shared/Container';
import { Logo } from '@shared/icons/Logo';
import Link from 'next/link';
import { supabase } from '@/shared/api/supabase';
import { SearchModal } from '@features/search/ui/SearchModal';


export const Header = ({ user }: { user: any }) => {

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(user);


    useEffect(() => {
        setCurrentUser(user);
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
                setCurrentUser(null);
            } else if (session) {
                setCurrentUser(session.user);
            }
        });

        return () => subscription.unsubscribe();
    }, [user]);

    useEffect(() => {
        if (isMenuOpen || isSearchOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen, isSearchOpen])

    const items = useCartStore((state) => state.items);

    const navigationLinks = [
        { href: '/', label: 'Home' },
        { href: '/catalog', label: 'Catalog' },
        { href: '/blogs', label: 'Blogs' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <>
            <header className=" sticky top-0 z-100 w-full border-b border-gray-200 bg-yellow/70 backdrop-blur-md">
                <Container className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
                        <Logo width={32} height={32} />
                    </Link>

                    <nav className="hidden lg:flex items-center gap-6">
                        {navigationLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium hover:text-gray-600"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link href={currentUser ? '/profile' : '/auth'} >
                            {currentUser ? <p className="text-sm font-medium ">Hello {user.email}</p> : <AccountIcon />}
                        </Link>

                        <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-sm font-medium hover:text-gray-600 cursor-pointer">
                            <SearchIcon />
                        </button>
                        <Link href="/cart" className="relative flex items-center text-sm font-medium">
                            <ShoppingCart width={24} height={24} />
                            {items.length > 0 && (
                                <span className="flex h-4 w-4 absolute -top-2 -right-2 items-center justify-center rounded-full bg-gray-900 text-[10px] text-white">
                                    {items.length}
                                </span>
                            )}
                        </Link>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 cursor-pointer"
                        >
                            {isMenuOpen ? (
                                <CloseIcon width={24} height={24} />
                            ) : (
                                <MenuIcon width={24} height={24} />
                            )}
                        </button>
                    </div>
                </Container>

            </header>
            {isMenuOpen && (
                <div className="fixed inset-0 z-100 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsMenuOpen(false)}
                    />

                    <div className='absolute text-center right-0 top-0 h-full w-[85%] max-w-sm bg-yellow shadow-2xl animate-slide-in-right'>
                        <div className="flex flex-col h-full">
                            <div className="p-4 flex justify-end">
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="rounded-full p-2 text-gray-900 hover:bg-black/10 transition cursor-pointer"
                                >
                                    <CloseIcon width={25} height={25} />
                                </button>
                            </div>

                            <nav className="px-6 py-4 flex flex-col gap-6">
                                {navigationLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="text-lg font-medium text-gray-900 hover:text-gray-600 transition"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            )}
            <SearchModal isSearchOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
};




import { createClient } from '@/shared/api/server';
import Link from 'next/link';
import { LayoutDashboard } from 'lucide-react';
import { LogoutButton } from "@/features/logout-button/ui/LogoutButton";
import { PackageIcon, UserIcon, MapPinIcon } from 'lucide-react';

export default async function ProfilePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return <p>Redirecting...</p>;

    const [profileResult, ordersResult] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
    ]);

    const profile = profileResult.data;
    const orders = ordersResult.data || [];

    const avatarLetter = profile?.full_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase();

    return (
        <main className="container mx-auto px-4 py-12 bg-gray-50 min-h-[80vh]">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">My account</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                <aside className="col-span-1">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-4 flex flex-col items-center">
                        <div className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4">
                            {avatarLetter}
                        </div>
                        <h2 className="text-xl font-semibold text-center">{profile?.full_name || 'No name'}</h2>
                        <p className="text-sm text-gray-500 text-center mb-6">{user.email}</p>

                        <div className="w-full border-t border-gray-100 pt-4">
                            <LogoutButton />
                        </div>
                        {profile?.role === 'admin' && (
                            <div className="w-full border-t border-gray-100 mt-4 pt-4">
                                <Link
                                    href="/admin"
                                    className="flex items-center gap-3 w-full p-3 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                                >
                                    <LayoutDashboard size={18} />
                                    Admin Panel
                                </Link>
                            </div>
                        )}
                    </div>
                </aside>

                <div className="col-span-1 lg:col-span-3 flex flex-col gap-6">

                    <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <UserIcon className="text-gray-400" size={24} />
                            Personal data
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <p className="text-sm text-gray-500 mb-1">Full name</p>
                                <p className="font-medium text-gray-900">{profile?.full_name || 'Not specified'}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <p className="text-sm text-gray-500 mb-1">Email</p>
                                <p className="font-medium text-gray-900">{user.email}</p>
                            </div>
                        </div>
                    </section>
                    {profile?.role === 'admin' && (
                        <section className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-3xl shadow-lg text-white mb-6">
                            <h3 className="text-lg font-semibold mb-4 opacity-90">Quick Sales Stats</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-white/10 p-4 rounded-2xl">
                                    <p className="text-xs opacity-75 uppercase">Total Revenue</p>
                                    <p className="text-2xl font-bold">$12,450</p>
                                </div>
                                <div className="bg-white/10 p-4 rounded-2xl">
                                    <p className="text-xs opacity-75 uppercase">New Orders</p>
                                    <p className="text-2xl font-bold">18</p>
                                </div>
                            </div>
                        </section>
                    )}

                    <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <PackageIcon className="text-gray-400" size={24} />
                            Order history
                        </h3>

                        {orders.length > 0 ? (
                            <div className="flex flex-col gap-4">
                                {orders.map(order => (
                                    <div key={order.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 border border-gray-100 rounded-2xl hover:shadow-md transition-shadow bg-gray-50">
                                        <div className="mb-2 sm:mb-0">
                                            <p className="font-semibold text-gray-900">Order #{order.id.split('-')[0]}</p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(order.created_at).toLocaleDateString('ru-RU')}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                                {order.status}
                                            </span>
                                            <p className="font-bold text-lg">${order.total}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                    <PackageIcon className="text-gray-400" size={32} />
                                </div>
                                <h4 className="text-lg font-medium text-gray-900 mb-1">You don't have any orders yet.</h4>
                                <p className="text-gray-500">Once you complete your purchase, it will appear here.</p>
                            </div>
                        )}
                    </section>
                </div>

            </div>
        </main>
    );
}
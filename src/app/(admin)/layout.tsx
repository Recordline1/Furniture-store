import { createClient } from "@/shared/api/server";
import { Container } from "@/shared/Container";
import { Header } from "@/widgets/Header/ui/Header";
import Link from "next/link";




export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <>
            <Header user={user} />
            <Container className="container flex flex-col min-h-screen ">

                <div className=" md:flex min-h-screen">
                    <aside className=" border-b md:border-r bg-gray-50 p-3 bg-gray-200 ">
                        <nav>
                            <ul className="flex md:flex-col gap-2 overflow-x-auto scrollbar-hidden ">
                                <li className="group relative border-b-2 border-transparent hover:border-yellow-500 transition-colors duration-300">
                                    <Link href="/admin/" className="block p-2 rounded hover:bg-gray-200 transition-colors duration-300">ALL</Link>
                                </li>
                                <li className="group relative border-b-2 border-transparent hover:border-yellow-500 transition-colors duration-300">
                                    <Link href="/admin/products" className="block p-2 rounded hover:bg-gray-200 transition-colors duration-300">Products</Link>
                                </li>
                                <li className="group relative border-b-2 border-transparent hover:border-yellow-500 transition-colors duration-300">
                                    <Link href="/admin/orders" className="block p-2 rounded hover:bg-gray-200 transition-colors duration-300">Orders</Link>
                                </li>
                                <li className="group relative border-b-2 border-transparent hover:border-yellow-500 transition-colors duration-300">
                                    <Link href="/admin/analytics" className="block p-2 rounded hover:bg-gray-200 transition-colors duration-300">Analytics</Link>
                                </li>
                            </ul>
                        </nav>
                    </aside>

                    <main className="flex-1">
                        {children}
                    </main>
                </div>
            </Container>
        </>
    );
}
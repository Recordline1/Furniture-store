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
                    <aside className="md:w-64 border-b md:border-r bg-gray-50 p-3 bg-gray-200">
                        <nav>
                            <ul className="flex md:flex-col gap-2 overflow-x-auto scrollbar-hidden">
                                <li className="group relative overflow-hidden after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-yellow-500 after:transition-transform after:duration-300 hover:after:scale-x-100">
                                    <Link href="/admin/" className="block p-2 rounded transition-colors duration-300 hover:bg-gray-200">ALL</Link>
                                </li>
                                <li className="group relative overflow-hidden after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-yellow-500 after:transition-transform after:duration-300 hover:after:scale-x-100">
                                    <Link href="/admin/products" className="block p-2 rounded transition-colors duration-300 hover:bg-gray-200">Products</Link>
                                </li>
                                <li className="group relative overflow-hidden after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-yellow-500 after:transition-transform after:duration-300 hover:after:scale-x-100">
                                    <Link href="/admin/orders" className="block p-2 rounded transition-colors duration-300 hover:bg-gray-200">Orders</Link>
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
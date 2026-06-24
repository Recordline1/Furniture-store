import { createClient } from "@/shared/api/server";
import { Header } from "@/widgets/Header/ui/Header";
import { Footer } from "@widgets/footer/ui/Footer";



export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    return (

        <main className="flex-1">
            <Header user={user} />
            {children}
            <Footer />
        </main>

    );
}
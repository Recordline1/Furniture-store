import Image from "next/image";
import { Container } from "@/shared/Container";
export const OurInstagram = () => {
    return (
        <section className="relative py-16 md:py-24 overflow-hidden">
            <Image 
                src="/bg-instagram-section.jpg" 
                alt="Instagram background" 
                fill 
            
                className="object-cover" 
            />
            
            
            <Container>
                <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Our Instagram
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg mb-8">
                        Follow our store on Instagram
                    </p>
                    <a
                        href="https://instagram.com"
                       className="px-8 py-3 font-medium rounded-xl text-white transition-transform duration-300 hover:scale-105 shadow-md
             bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5]"
                    >
                        Follow Us
                    </a>
                </div>
            </Container>
        </section>
    );
}
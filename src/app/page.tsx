import { HeroSection } from "@/widgets/HeroSection";
import { ProductsShowcase } from "@widgets/product-showcase/ui/ProductShowcase";
import { TopPicks } from '@widgets/top-picks/ui/TopPicks';
import { NewArrivals } from '@widgets/new-arrivals/ui/NewArrivals';
import { BlogSection } from '@widgets/blog-Section/ui/BlogSection';
import { OurInstagram } from '@widgets/our-Instagram';


export default async function Home() {


  return (
    <>
      <HeroSection />
      <ProductsShowcase />
      <TopPicks />
      <NewArrivals />
      <BlogSection />
      <OurInstagram />
    </>
  );
}

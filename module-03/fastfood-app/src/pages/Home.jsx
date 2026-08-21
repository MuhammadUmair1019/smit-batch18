import { products } from "../data/products";
import HeroSection from "../components/home/HeroSection";
import CategoryExplorer from "../components/home/CategoryExplorer";
import BestSellers from "../components/home/BestSellers";
import DealsSection from "../components/home/DealsSection";
import WhyChooseUs from "../components/home/WhyChooseUs";
import PromoBanner from "../components/home/PromoBanner";

export default function Home() {
    // Pick top 3 best sellers (highest rated)
    const bestSellers = [...products]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);

    return (
        <div className="space-y-20 pb-20 overflow-hidden">
            <HeroSection />
            <CategoryExplorer />
            <BestSellers products={bestSellers} />
            <DealsSection />
            <WhyChooseUs />
            <PromoBanner />
        </div>
    );
}
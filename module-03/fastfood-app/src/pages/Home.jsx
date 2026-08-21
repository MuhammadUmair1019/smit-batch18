import { useRestaurant } from "../contextapi/RestaurantContext";
import HeroSection from "../components/home/HeroSection";
import CategoryExplorer from "../components/home/CategoryExplorer";
import BestSellers from "../components/home/BestSellers";
import DealsSection from "../components/home/DealsSection";
import WhyChooseUs from "../components/home/WhyChooseUs";
import PromoBanner from "../components/home/PromoBanner";

export default function Home() {
    const { menuItems } = useRestaurant();

    // Pick top 3 best sellers (highest rated)
    const bestSellers = [...menuItems]
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
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
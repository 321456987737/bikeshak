import HeroSection from "@/components/homepage/herosection";
import BrandsStrip from "@/components/homepage/BrandsStrip";
import FeaturedInventory from "@/components/homepage/FeaturedInventory";
import MotorcycleAccessories from "@/components/homepage/MotorcycleAccessories";
import LocationSection from "@/components/homepage/location";
import FAQSection from "@/components/homepage/FAQSection";
import ReviewsSection from "@/components/homepage/ReviewsSection";
import StatsSection from "@/components/homepage/StatsSection";
export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f7f5] text-[#181818]">
      <HeroSection />          
      <BrandsStrip />          
      <FeaturedInventory />
      <MotorcycleAccessories/>


      
      <StatsSection />         
      <ReviewsSection />      
      <LocationSection />       
      <FAQSection />           
    </main>
  );
}
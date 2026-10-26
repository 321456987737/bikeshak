import Footer from "@/components/site/Footer";
import Header from "@/components/site/Header";
import CarStartup from "@/components/startinganimation";
import { BUSINESS_NAME, SHOWROOM_LOCATION } from "@/lib/business";
export const metadata = {
  title: `${BUSINESS_NAME} | Motorcycle Dealership`,
  description: `Explore motorcycle inventory and contact ${BUSINESS_NAME} in ${SHOWROOM_LOCATION}.`,
};

export default function mainlayout({ children }) {
  return (
    <div className="min-h-full flex flex-col">
        <CarStartup
          variant="drive"
          brand={BUSINESS_NAME}
          duration={2200}
        />
      <Header />
        {children}
        <Footer/>
    </div>
    
  );
}

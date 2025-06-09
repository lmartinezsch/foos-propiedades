import Header from "@/components/header";
import SearchSection from "@/components/search-section";
//import FeaturedProperties from "@/components/featured-properties";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <SearchSection />
      {/* <FeaturedProperties /> */}
      <Footer />
      <WhatsappButton />
    </main>
  );
}

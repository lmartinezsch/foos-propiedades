import SearchResults from "@/components/search-results";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";

export default function SearchPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <SearchResults />
      <Footer />
      <WhatsappButton />
    </main>
  );
}

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HomeFilter from "./home-filter";

export default function SearchSection() {
  return (
    <section className="relative w-full">
      <div className="absolute inset-0">
        {/* Mobile Background */}
        <div
          className="absolute inset-0 bg-cover bg-bottom bg-no-repeat sm:hidden"
          style={{
            backgroundImage: "url('/bg-home.jpg')",
            filter: "brightness(0.7)",
          }}
        />

        {/* Tablet Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden sm:block lg:hidden"
          style={{
            backgroundImage: "url('/bg-home.jpg?height=1200&width=960')",
            filter: "brightness(0.7)",
          }}
        />

        {/* Desktop Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden lg:block"
          style={{
            backgroundImage: "url('/bg-home.jpg?height=1920&width=10800')",
            filter: "brightness(0.7)",
          }}
        />
      </div>
      <div className="relative container mx-auto px-4 py-16 md:py-24 lg:py-32 lg:min-h-screen">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Encontrá tu próxima propiedad
          </h1>
          <p className="text-lg md:text-xl text-white">
            Miles de propiedades te están esperando
          </p>
        </div>

        <div
          className="rounded-lg shadow-lg p-4 md:p-6 max-w-[980px] mx-auto"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
        >
          <Tabs defaultValue="alquiler" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="alquiler">Alquiler</TabsTrigger>
              <TabsTrigger value="venta">Venta</TabsTrigger>
              <TabsTrigger value="temporal">Temporal</TabsTrigger>
            </TabsList>
            <HomeFilter tabsContentValue="alquiler" />
            <HomeFilter tabsContentValue="venta" />
            <HomeFilter tabsContentValue="temporal" />
          </Tabs>
        </div>
      </div>
    </section>
  );
}

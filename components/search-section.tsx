import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export default function SearchSection() {
  return (
    <section className="relative w-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder.svg?height=600&width=1200')",
          filter: "brightness(0.7)",
        }}
      />
      <div className="relative container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Encontrá tu próxima propiedad
          </h1>
          <p className="text-lg md:text-xl text-white">
            Miles de propiedades te están esperando
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 max-w-[980px] mx-auto">
          <Tabs defaultValue="alquiler" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="alquiler">Alquiler</TabsTrigger>
              <TabsTrigger value="venta">Venta</TabsTrigger>
              <TabsTrigger value="temporal">Temporal</TabsTrigger>
            </TabsList>
            <TabsContent value="alquiler" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                <div className="md:col-span-4">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Tipo de propiedad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casa">Casa</SelectItem>
                      <SelectItem value="departamento">Departamento</SelectItem>
                      <SelectItem value="ph">PH</SelectItem>
                      <SelectItem value="terreno">Terreno</SelectItem>
                      <SelectItem value="local">Local</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-6">
                  <Input placeholder="Ubicación, dirección o calle" />
                </div>

                <div className="md:col-span-2">
                  <Button className="w-full">
                    <Search className="h-4 w-4 mr-2" />
                    Buscar
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="venta" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de propiedad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casa">Casa</SelectItem>
                      <SelectItem value="departamento">Departamento</SelectItem>
                      <SelectItem value="ph">PH</SelectItem>
                      <SelectItem value="terreno">Terreno</SelectItem>
                      <SelectItem value="local">Local</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-6">
                  <Input placeholder="Ubicación, dirección o calle" />
                </div>

                <div className="md:col-span-2">
                  <Button className="w-full">
                    <Search className="h-4 w-4 mr-2" />
                    Buscar
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="temporal" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de propiedad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casa">Casa</SelectItem>
                      <SelectItem value="departamento">Departamento</SelectItem>
                      <SelectItem value="cabaña">Cabaña</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-6">
                  <Input placeholder="Ubicación, dirección o calle" />
                </div>

                <div className="md:col-span-2">
                  <Button className="w-full">
                    <Search className="h-4 w-4 mr-2" />
                    Buscar
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

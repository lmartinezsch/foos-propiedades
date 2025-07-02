import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export default function HomeFilter({
  tabsContentValue,
}: {
  tabsContentValue: string;
}) {
  return (
    <TabsContent value={tabsContentValue} className="space-y-4">
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
          <Button className="w-full h-full cursor-pointer">
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </div>
      </div>
    </TabsContent>
  );
}

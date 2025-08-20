import { getSheetData } from "../../libs/getSheetData";

export interface IProperty {
  id: number;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  area: number;
  type: string;
  operation: string;
  image: string;
  features: string[];
  description: string;
}

export const getProperties = async (): Promise<IProperty[]> => {
  const sheetData = await getSheetData();
  const data = sheetData.data;
  data?.shift();

  const response: IProperty[] = mapProperties(data || []);

  return response;
};

const mapProperties = (data: []) => {
  const properties: IProperty[] = data.map((row, index) => ({
    id: index,
    operation: row[0],
    type: row[1],
    title: row[2],
    price: row[3],
    location: row[5],
    bedrooms: parseInt(row[6], 10),
    bathrooms: parseInt(row[7], 10),
    parking: parseInt(row[8], 10),
    area: parseInt(row[9], 10),
    description: row[10],
    features: [], //row[11].split(",").map((feature) => feature.trim()),
    image: "", // Aquí puedes manejar las imágenes según tu lógica
    highlight: row[11],
  }));
  return properties;
};

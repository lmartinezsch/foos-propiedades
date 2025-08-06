import { type NextRequest, NextResponse } from "next/server";

interface Property {
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

const mockProperties: Property[] = [
  {
    id: 1,
    title: "Departamento 2 ambientes en Palermo",
    price: "$85.000",
    location: "Palermo, CABA",
    bedrooms: 1,
    bathrooms: 1,
    parking: 0,
    area: 45,
    type: "Departamento",
    operation: "Alquiler",
    image: "/placeholder.svg?height=300&width=400",
    features: ["Balcón", "Luminoso", "Amoblado"],
    description: "Hermoso departamento en el corazón de Palermo",
  },
  {
    id: 2,
    title: "Casa 3 dormitorios con jardín",
    price: "$120.000",
    location: "Villa Urquiza, CABA",
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    area: 120,
    type: "Casa",
    operation: "Alquiler",
    image: "/placeholder.svg?height=300&width=400",
    features: ["Jardín", "Parrilla", "Cochera"],
    description: "Casa familiar con amplio jardín y parrilla",
  },
  {
    id: 3,
    title: "PH 2 dormitorios reciclado",
    price: "$95.000",
    location: "San Telmo, CABA",
    bedrooms: 2,
    bathrooms: 1,
    parking: 0,
    area: 75,
    type: "PH",
    operation: "Alquiler",
    image: "/placeholder.svg?height=300&width=400",
    features: ["Reciclado", "Terraza", "Luminoso"],
    description: "PH completamente reciclado con terraza propia",
  },
  {
    id: 4,
    title: "Departamento con vista al río",
    price: "$180.000",
    location: "Puerto Madero, CABA",
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    area: 90,
    type: "Departamento",
    operation: "Alquiler",
    image: "/placeholder.svg?height=300&width=400",
    features: ["Vista al río", "Amenities", "Cochera"],
    description: "Moderno departamento con vista panorámica",
  },
  {
    id: 5,
    title: "Casa quinta con pileta",
    price: "$150.000",
    location: "Pilar, Buenos Aires",
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    area: 200,
    type: "Casa",
    operation: "Alquiler",
    image: "/placeholder.svg?height=300&width=400",
    features: ["Pileta", "Quincho", "Parque"],
    description: "Amplia casa quinta ideal para familias",
  },
  {
    id: 6,
    title: "Loft moderno en Barracas",
    price: "$75.000",
    location: "Barracas, CABA",
    bedrooms: 1,
    bathrooms: 1,
    parking: 0,
    area: 55,
    type: "Loft",
    operation: "Alquiler",
    image: "/placeholder.svg?height=300&width=400",
    features: ["Moderno", "Loft", "Céntrico"],
    description: "Loft de diseño en zona en desarrollo",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = Number.parseInt(searchParams.get("page") || "1");
  const limit = Number.parseInt(searchParams.get("limit") || "6");
  const operation = searchParams.get("operation");
  const propertyType = searchParams.get("propertyType");
  const location = searchParams.get("location");
  const bedrooms = searchParams.get("bedrooms");
  const bathrooms = searchParams.get("bathrooms");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  // Filter properties
  const filteredProperties = mockProperties.filter((property) => {
    if (
      operation &&
      property.operation.toLowerCase() !== operation.toLowerCase()
    )
      return false;
    if (
      propertyType &&
      property.type.toLowerCase() !== propertyType.toLowerCase()
    )
      return false;
    if (
      location &&
      !property.location.toLowerCase().includes(location.toLowerCase())
    )
      return false;
    if (bedrooms && property.bedrooms < Number.parseInt(bedrooms)) return false;
    if (bathrooms && property.bathrooms < Number.parseInt(bathrooms))
      return false;
    return true;
  });

  // Duplicate for more results
  const allProperties = [
    ...filteredProperties,
    ...filteredProperties,
    ...filteredProperties,
  ];

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProperties = allProperties.slice(startIndex, endIndex);

  return NextResponse.json({
    properties: paginatedProperties,
    total: allProperties.length,
    page: page,
    totalPages: Math.ceil(allProperties.length / limit),
  });
}

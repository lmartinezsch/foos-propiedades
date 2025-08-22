import { type NextRequest, NextResponse } from "next/server";
import { getProperties, IProperty } from "./getProperties";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = Number.parseInt(searchParams.get("page") || "1");
  const limit = Number.parseInt(searchParams.get("limit") || "6");
  const operation = searchParams.get("operation");
  const propertyType = searchParams.get("propertyType");
  const location = searchParams.get("location");
  const bedrooms = searchParams.get("bedrooms");
  const bathrooms = searchParams.get("bathrooms");
  // const minPrice = searchParams.get("minPrice");
  // const maxPrice = searchParams.get("maxPrice");
  const properties = await getProperties();

  // Filter properties
  const filteredProperties = properties.filter((property: IProperty) => {
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

"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  MapPin,
  Bed,
  Bath,
  Car,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProperties, IProperty } from "../app/api/properties/getProperties";

interface SearchFilters {
  operation: string;
  propertyType: string;
  location: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
  minArea: string;
  maxArea: string;
}

interface ApiResponse {
  properties: IProperty[];
  total: number;
  page: number;
  totalPages: number;
}

export default function SearchResults() {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("relevancia");

  const [filters, setFilters] = useState<SearchFilters>({
    operation: "",
    propertyType: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    minArea: "",
    maxArea: "",
  });

  const inputStyles =
    "h-10 px-3 text-sm font-normal bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  // Mock API call with improved filtering and sorting
  const fetchProperties = async (
    page = 1,
    searchFilters: SearchFilters = filters,
    sortOrder = sortBy
  ) => {
    setLoading(true);

    const properties = await getProperties();

    // Filter mock data based on all filters
    const filteredProperties = properties.filter((property: IProperty) => {
      // Operation filter
      if (
        searchFilters.operation &&
        searchFilters.operation !== "todos" &&
        property.operation.toLowerCase() !==
          searchFilters.operation.toLowerCase()
      )
        return false;

      // Property type filter
      if (
        searchFilters.propertyType &&
        searchFilters.propertyType !== "todos" &&
        property.type.toLowerCase() !== searchFilters.propertyType.toLowerCase()
      )
        return false;

      // Location filter
      if (
        searchFilters.location &&
        !property.location
          .toLowerCase()
          .includes(searchFilters.location.toLowerCase()) &&
        !property.title
          .toLowerCase()
          .includes(searchFilters.location.toLowerCase())
      )
        return false;

      // Bedrooms filter
      if (searchFilters.bedrooms && searchFilters.bedrooms !== "cualquiera") {
        const minBedrooms = Number.parseInt(searchFilters.bedrooms);
        if (property.bedrooms < minBedrooms) return false;
      }

      // Bathrooms filter
      if (searchFilters.bathrooms && searchFilters.bathrooms !== "cualquiera") {
        const minBathrooms = Number.parseInt(searchFilters.bathrooms);
        if (property.bathrooms < minBathrooms) return false;
      }

      // Price filters
      if (searchFilters.minPrice) {
        const minPrice = Number.parseInt(
          searchFilters.minPrice.replace(/\D/g, "")
        );
        if (property.priceValue < minPrice) return false;
      }

      if (searchFilters.maxPrice) {
        const maxPrice = Number.parseInt(
          searchFilters.maxPrice.replace(/\D/g, "")
        );
        if (property.priceValue > maxPrice) return false;
      }

      return true;
    });

    // Sort properties
    const sortedProperties = [...filteredProperties].sort((a, b) => {
      switch (sortOrder) {
        case "precio-menor":
          return a.priceValue - b.priceValue;
        case "precio-mayor":
          return b.priceValue - a.priceValue;
        case "fecha":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        default: // relevancia
          return a.id - b.id;
      }
    });

    // Duplicate for pagination simulation
    //const allProperties = [...sortedProperties, ...sortedProperties];
    const allProperties = sortedProperties;
    const itemsPerPage = 6;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProperties = allProperties.slice(startIndex, endIndex);

    const response: ApiResponse = {
      properties: paginatedProperties,
      total: allProperties.length,
      page: page,
      totalPages: Math.ceil(allProperties.length / itemsPerPage),
    };

    setProperties(response.properties);
    setTotal(response.total);
    setCurrentPage(response.page);
    setTotalPages(response.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties(1, filters, sortBy);
  }, []);

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchProperties(1, filters, sortBy);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    fetchProperties(currentPage, filters, value);
  };

  const handlePageChange = (page: number) => {
    fetchProperties(page, filters, sortBy);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Main Search */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-3">
                <Select
                  value={filters.operation}
                  onValueChange={(value) =>
                    handleFilterChange("operation", value)
                  }
                >
                  <SelectTrigger className={inputStyles}>
                    <SelectValue placeholder="Operación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="alquiler">Alquiler</SelectItem>
                    <SelectItem value="venta">Venta</SelectItem>
                    <SelectItem value="temporal">Temporal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-3">
                <Select
                  value={filters.propertyType}
                  onValueChange={(value) =>
                    handleFilterChange("propertyType", value)
                  }
                >
                  <SelectTrigger className={inputStyles}>
                    <SelectValue placeholder="Tipo de propiedad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="departamento">Departamento</SelectItem>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="ph">PH</SelectItem>
                    <SelectItem value="loft">Loft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-4">
                <Input
                  placeholder="Ubicación, dirección o calle"
                  className={inputStyles}
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                />
              </div>

              <div className="md:col-span-2">
                <Button onClick={handleSearch} className="w-full h-10">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar
                </Button>
              </div>
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:w-auto"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Precio mínimo
                  </label>
                  <Input
                    placeholder="$ Mínimo"
                    className={inputStyles}
                    value={filters.minPrice}
                    onChange={(e) =>
                      handleFilterChange("minPrice", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Precio máximo
                  </label>
                  <Input
                    placeholder="$ Máximo"
                    className={inputStyles}
                    value={filters.maxPrice}
                    onChange={(e) =>
                      handleFilterChange("maxPrice", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Dormitorios
                  </label>
                  <Select
                    value={filters.bedrooms}
                    onValueChange={(value) =>
                      handleFilterChange("bedrooms", value)
                    }
                  >
                    <SelectTrigger className={inputStyles}>
                      <SelectValue placeholder="Cualquiera" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cualquiera">Cualquiera</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Baños
                  </label>
                  <Select
                    value={filters.bathrooms}
                    onValueChange={(value) =>
                      handleFilterChange("bathrooms", value)
                    }
                  >
                    <SelectTrigger className={inputStyles}>
                      <SelectValue placeholder="Cualquiera" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cualquiera">Cualquiera</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-6">
        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {loading ? "Buscando..." : `${total} propiedades encontradas`}
          </h1>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevancia">Más relevantes</SelectItem>
              <SelectItem value="precio-menor">Menor precio</SelectItem>
              <SelectItem value="precio-mayor">Mayor precio</SelectItem>
              <SelectItem value="fecha">Más recientes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Card
                key={property.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Badge className="absolute top-2 left-2 bg-foos-yellow">
                    {property.operation}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg line-clamp-2">
                      {property.title}
                    </h3>
                  </div>
                  <p className="text-2xl font-bold text-foos-yellow mb-2">
                    {property.price}
                  </p>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    {property.bedrooms > 0 && (
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        <span>{property.bedrooms}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{property.bathrooms}</span>
                    </div>
                    {property.parking > 0 && (
                      <div className="flex items-center">
                        <Car className="h-4 w-4 mr-1" />
                        <span>{property.parking}</span>
                      </div>
                    )}
                    <span>{property.area}m²</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {property.features.slice(0, 3).map((feature, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {property.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>

            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => handlePageChange(page)}
                    className="w-10"
                  >
                    {page}
                  </Button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <span key={page} className="px-2">
                    ...
                  </span>
                );
              }
              return null;
            })}

            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

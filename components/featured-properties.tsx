import Image from "next/image"
import Link from "next/link"

export default function FeaturedProperties() {
  const properties = [
    {
      id: 1,
      title: "Casa en Barrio Cerrado",
      location: "Canning, Buenos Aires",
      price: "$250.000",
      image: "/placeholder.svg?height=400&width=600",
      type: "Venta",
      features: "3 Dormitorios • 2 Baños • 180m²",
    },
    {
      id: 2,
      title: "Departamento con vista al río",
      location: "Puerto Madero, CABA",
      price: "$180.000",
      image: "/placeholder.svg?height=400&width=600",
      type: "Venta",
      features: "2 Dormitorios • 2 Baños • 120m²",
    },
    {
      id: 3,
      title: "PH reciclado a nuevo",
      location: "Palermo, CABA",
      price: "$95.000",
      image: "/placeholder.svg?height=400&width=600",
      type: "Alquiler",
      features: "2 Dormitorios • 1 Baño • 85m²",
    },
    {
      id: 4,
      title: "Casa con jardín",
      location: "Pilar, Buenos Aires",
      price: "$220.000",
      image: "/placeholder.svg?height=400&width=600",
      type: "Venta",
      features: "4 Dormitorios • 3 Baños • 250m²",
    },
    {
      id: 5,
      title: "Departamento a estrenar",
      location: "Belgrano, CABA",
      price: "$150.000",
      image: "/placeholder.svg?height=400&width=600",
      type: "Venta",
      features: "2 Dormitorios • 1 Baño • 75m²",
    },
    {
      id: 6,
      title: "Casa quinta con pileta",
      location: "Ezeiza, Buenos Aires",
      price: "$180.000",
      image: "/placeholder.svg?height=400&width=600",
      type: "Venta",
      features: "3 Dormitorios • 2 Baños • 300m²",
    },
    {
      id: 7,
      title: "Loft moderno",
      location: "San Telmo, CABA",
      price: "$85.000",
      image: "/placeholder.svg?height=400&width=600",
      type: "Alquiler",
      features: "1 Dormitorio • 1 Baño • 60m²",
    },
    {
      id: 8,
      title: "Chalet en country",
      location: "Nordelta, Buenos Aires",
      price: "$350.000",
      image: "/placeholder.svg?height=400&width=600",
      type: "Venta",
      features: "5 Dormitorios • 4 Baños • 400m²",
    },
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Propiedades Destacadas</h2>
          <p className="text-gray-600">Descubrí las mejores opciones disponibles</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <Link href="#" key={property.id} className="group">
              <div className="relative h-64 overflow-hidden rounded-lg">
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="absolute top-3 left-3">
                    <span className="inline-block bg-white text-black text-xs font-semibold px-2 py-1 rounded">
                      {property.type}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">{property.title}</h3>
                    <p className="text-white/80 text-sm mb-1">{property.location}</p>
                    <p className="text-white font-bold">{property.price}</p>
                    <p className="text-white/70 text-xs mt-1">{property.features}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Nosotros</h3>
            <p className="text-gray-300 mb-4">
              Somos una inmobiliaria con más de 20 años de experiencia en el mercado. Nos especializamos en la compra,
              venta y alquiler de propiedades en toda la zona.
            </p>
            <p className="text-gray-300">
              Nuestro objetivo es brindar un servicio personalizado y de calidad, asesorando a nuestros clientes en cada
              paso del proceso.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-gray-400" />
                <span className="text-gray-300">Av. Corrientes 1234, CABA, Argentina</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-300">(011) 4567-8900</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-400" />
                <Link href="mailto:info@inmobiliaria.com" className="text-gray-300 hover:text-white">
                  info@inmobiliaria.com
                </Link>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Horarios de atención</h4>
              <p className="text-gray-300">Lunes a Viernes: 9:00 a 18:00</p>
              <p className="text-gray-300">Sábados: 9:00 a 13:00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Inmobiliaria. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

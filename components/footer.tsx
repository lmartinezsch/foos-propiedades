import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foos-blue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Nosotros</h3>
            <p className="text-gray-300 mb-4">
              Somos una inmobiliaria joven y moderna que busca dar respuesta a
              los desafíos del siglo XXI en nuestro rubro. <br />
              <br />
              Podemos ayudarte si necesitas comprar, vender o alquilar una
              propiedad. <br />
              Tambien podemos asesorarte en cuanto a posibilidades de inversión,
              créditos y toda otra herramienta disponible como los desarrollos
              inmobiliarios, las tasaciones y mucho mas.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-gray-400" />
                <span className="text-gray-300">
                  Boulevard Buenos Aires Nº 1543, Luis Guillon, Buenos Aires.
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-300">(11) 5935-9185</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-400" />
                <Link
                  href="mailto:foosjuan@gmail.com"
                  className="text-gray-300 hover:text-white"
                >
                  juanfoospropiedades@gmail.com
                </Link>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">
                Horarios de atención
              </h4>
              <p className="text-gray-300">
                Lunes a Viernes: 10:00 a 13:00 y de 16:00 a 18:00
              </p>
              <p className="text-gray-300">Sábados: 10:00 a 13:00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} Juan Foos Propieades. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

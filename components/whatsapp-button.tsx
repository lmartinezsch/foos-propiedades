import { MessageCircle } from "lucide-react"

export default function WhatsappButton() {
  return (
    <a
      href="https://wa.me/5491123456789"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  )
}

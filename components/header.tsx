import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-foos-blue">
      <div className="container max-w-screen-lg mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="md:flex-1">
          <Link
            href="/"
            className="flex items-center md:justify-start justify-center"
          >
            <Image
              src="/juan-foos-logo.jpg?height=40&width=150"
              alt="Logo"
              width={150}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
        </div>
        <nav className="hidden md:flex gap-6 flex-1 justify-end text-white">
          <Link href="#" className="text-sm font-medium hover:text-foos-yellow">
            Quienes somos
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-foos-yellow">
            Tasaciones
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-foos-yellow">
            Propiedades
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-foos-yellow">
            Contacto
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6 text-white" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/placeholder.svg?height=40&width=150"
                    alt="Logo"
                    width={150}
                    height={40}
                    className="h-10 w-auto"
                  />
                </Link>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </SheetClose>
              </div>
              <nav className="flex flex-col p-4">
                <div className="py-4 border-b">
                  <Link href="#" className="block py-2 text-base font-medium">
                    Quienes somos
                  </Link>
                </div>
                <div className="py-4 border-b">
                  <Link href="#" className="block py-2 text-base font-medium">
                    Tasaciones
                  </Link>
                </div>
                <div className="py-4 border-b">
                  <Link href="#" className="block py-2 text-base font-medium">
                    Propiedades
                  </Link>
                </div>
                <div className="py-4">
                  <Link href="#" className="block py-2 text-base font-medium">
                    Contacto
                  </Link>
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

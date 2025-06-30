"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
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
          <nav className="hidden md:flex gap-6 flex-1 justify-end">
            <Link
              href="#"
              className="text-sm font-medium hover:text-foos-yellow"
            >
              Quienes somos
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-foos-yellow"
            >
              Tasaciones
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-foos-yellow"
            >
              Propiedades
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-foos-yellow"
            >
              Contacto
            </Link>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden relative z-[60] text-white hover:text-gray-200"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </header>

      {/* Full Screen Mobile Menu */}
      <div
        className={`fixed inset-0 bg-[#112230] z-[55] transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="absolute top-6 right-6">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-gray-300 h-12 w-12"
            onClick={closeMenu}
          >
            <X className="h-8 w-8" />
            <span className="sr-only">Cerrar menú</span>
          </Button>
        </div>
        <div className="flex flex-col justify-center items-start h-full px-8">
          <nav className="space-y-8">
            <Link
              href="#"
              className="block text-4xl font-bold text-white hover:text-gray-300 transition-colors duration-200"
              onClick={closeMenu}
            >
              Quienes somos
            </Link>
            <Link
              href="#"
              className="block text-4xl font-bold text-white hover:text-gray-300 transition-colors duration-200"
              onClick={closeMenu}
            >
              Tasaciones
            </Link>
            <Link
              href="#"
              className="block text-4xl font-bold text-white hover:text-gray-300 transition-colors duration-200"
              onClick={closeMenu}
            >
              Propiedades
            </Link>
            <Link
              href="#"
              className="block text-4xl font-bold text-white hover:text-gray-300 transition-colors duration-200"
              onClick={closeMenu}
            >
              Contacto
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

import Link from "next/link";
import React from "react";
import ThemeSwitcher from "../molecules/theme-switcher";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Sección de la izquierda: logo y navegación */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-foreground font-bold text-lg">
            MiLogo
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link href="/" className="text-foreground hover:text-primary">
              Inicio
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary">
              Sobre mí
            </Link>
            <Link
              href="/contact"
              className="text-foreground hover:text-primary"
            >
              Contacto
            </Link>
          </div>
        </div>

        {/* Sección de la derecha: botón de cambio de tema */}
        <div>
          {/* Este botón cambiará de dark a light (la funcionalidad se implementará en otro componente) */}
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface HeaderProps {
  onOpenModal?: () => void;
}

const navLinks = [
  { label: "О студии", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Преимущества", href: "#advantages" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "Контакты", href: "#contacts" },
];

const Header = ({ onOpenModal }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong py-2 shadow-[0_4px_30px_hsl(var(--neon-purple)/0.15)]"
          : "glass py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 group"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full scale-150 group-hover:scale-200 transition-transform" />
            <Icon name="Rocket" size={28} className="text-primary relative animate-pulse-neon" />
          </div>
          <span className="text-lg font-bold neon-text text-primary hidden sm:block" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Web Galactics
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => smoothScroll(e, link.href)}
              className="relative px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary group-hover:w-3/4 transition-all duration-300 rounded-full neon-glow" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button onClick={onOpenModal} className="neon-button text-white border-0 text-sm gap-2">
            <Icon name="Send" size={16} />
            Оставить заявку
          </Button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-50"
        >
          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-[hsl(var(--space-dark)/0.85)] backdrop-blur-md animate-menu-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-x-0 top-0 h-full cosmic-gradient border-b border-primary/25 shadow-[0_10px_60px_hsl(var(--neon-purple)/0.25)] overflow-y-auto animate-menu-slide-down">
            <div className="absolute top-0 right-0 w-56 h-56 bg-primary/10 rounded-full blur-[90px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-secondary/10 rounded-full blur-[90px] pointer-events-none" />

            <div className="relative z-10 px-6 pt-24 pb-10 flex flex-col min-h-full">
              <div
                className="flex items-center gap-2 pb-5 animate-menu-item"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full scale-150" />
                  <Icon name="Rocket" size={26} className="text-primary relative animate-pulse-neon" />
                </div>
                <span
                  className="text-xl font-bold neon-text text-primary"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  Web Galactics
                </span>
              </div>

              <div className="h-px bg-gradient-to-r from-primary/40 via-secondary/20 to-transparent" />

              <nav className="flex flex-col py-3">
                {navLinks.map((link, i) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => smoothScroll(e, link.href)}
                    className="group flex items-center justify-between py-3.5 text-lg text-foreground/85 hover:text-primary transition-colors border-b border-border/30 animate-menu-item"
                    style={{ animationDelay: `${0.15 + i * 0.05}s` }}
                  >
                    <span className="group-hover:neon-text transition-all">{link.label}</span>
                    <Icon
                      name="ChevronRight"
                      size={18}
                      className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
                    />
                  </a>
                ))}
              </nav>

              <Button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenModal?.();
                }}
                className="neon-button text-white border-0 gap-2 py-6 text-base mt-4 animate-menu-item"
                style={{ animationDelay: `${0.15 + navLinks.length * 0.05}s` }}
              >
                <Icon name="Send" size={18} />
                Оставить заявку
              </Button>

              <div
                className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-6 animate-menu-item"
                style={{ animationDelay: `${0.2 + navLinks.length * 0.05}s` }}
              >
                <Icon name="Sparkles" size={14} className="text-primary/60" />
                Создаём сайты, которые выводят бизнес на орбиту
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
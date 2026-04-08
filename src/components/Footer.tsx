import Icon from "@/components/ui/icon";

const navLinks = [
  { label: "О студии", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Преимущества", href: "#advantages" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "Контакты", href: "#contacts" },
];

const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  if (href === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
};

const Footer = () => {
  return (
    <footer className="relative glass-strong">
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
            <a
              href="#"
              onClick={(e) => smoothScroll(e, "#")}
              className="flex items-center gap-2 mb-4 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full scale-150" />
                <Icon name="Rocket" size={24} className="text-primary relative animate-pulse-neon" />
              </div>
              <span
                className="text-lg font-bold neon-text text-primary"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Web Galactics
              </span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Космическая студия веб-разработки. Создаём цифровые вселенные для вашего бизнеса с 2016 года.
            </p>
            <div className="flex gap-3">
              {[
                { icon: "Send", label: "Telegram" },
                { icon: "Users", label: "VK" },
                { icon: "Github", label: "GitHub" },
              ].map((s) => (
                <button
                  key={s.label}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:neon-border hover:scale-110 transition-all"
                  title={s.label}
                >
                  <Icon name={s.icon} size={16} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4
              className="font-semibold mb-4 text-sm"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Навигация
            </h4>
            <div className="space-y-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => smoothScroll(e, link.href)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <span className="w-1 h-1 rounded-full bg-primary group-hover:w-2 transition-all" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4
              className="font-semibold mb-4 text-sm"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Контакты
            </h4>
            <div className="space-y-4">
              {[
                { icon: "Phone", value: "+7 (999) 123-45-67", href: "tel:+79991234567" },
                { icon: "Mail", value: "info@web-galactics.ru", href: "mailto:info@web-galactics.ru" },
                { icon: "MapPin", value: "г. Москва, ул. Космическая, д. 42" },
                { icon: "Clock", value: "Пн-Пт: 10:00 - 20:00" },
              ].map((item) => (
                <div key={item.value} className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    item.icon === "Clock" ? "bg-secondary/10" : "bg-primary/10"
                  }`}>
                    <Icon
                      name={item.icon}
                      size={16}
                      className={item.icon === "Clock" ? "text-secondary" : "text-primary"}
                    />
                  </div>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-primary/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2024 Web Galactics. Все права защищены.
          </p>
          <div className="flex gap-6">
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Политика конфиденциальности
            </button>
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Условия использования
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

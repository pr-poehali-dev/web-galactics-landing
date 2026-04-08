import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface ServicesProps {
  onOpenModal?: () => void;
}

const services = [
  {
    icon: "Globe",
    title: "Разработка сайтов",
    desc: "Создаём современные веб-сайты любой сложности — от лендингов до крупных порталов",
    image: "https://cdn.poehali.dev/projects/b117055f-ea17-414e-9dd0-0279e76de211/files/ca4c9cb8-3cbf-4364-84a7-dfc8e35bd2fc.jpg",
    details: {
      text: "Разрабатываем сайты под ключ: от прототипа до запуска. Используем современные фреймворки React, Next.js и Vue для создания быстрых и отзывчивых интерфейсов. Каждый проект проходит тестирование на всех устройствах.",
      features: ["Лендинги и промо-сайты", "Корпоративные порталы", "Многостраничные каталоги", "Интеграция с CRM и API"],
      timeline: "от 2 недель",
      price: "от 30 000 ₽",
    },
  },
  {
    icon: "Palette",
    title: "UI/UX Дизайн",
    desc: "Проектируем уникальные интерфейсы, которые покоряют пользователей с первого взгляда",
    image: "https://cdn.poehali.dev/projects/b117055f-ea17-414e-9dd0-0279e76de211/files/44d3e959-19bb-4622-aa3d-6501bf732b35.jpg",
    details: {
      text: "Создаём дизайн, который продаёт. Проводим UX-исследования, строим прототипы и разрабатываем дизайн-системы. Каждый пиксель продуман для максимальной конверсии и удобства пользователя.",
      features: ["UX-исследования и аналитика", "Прототипирование в Figma", "Дизайн-системы", "Анимации и микровзаимодействия"],
      timeline: "от 1 недели",
      price: "от 20 000 ₽",
    },
  },
  {
    icon: "Smartphone",
    title: "Мобильная разработка",
    desc: "Адаптивные и нативные мобильные приложения для iOS и Android",
    image: "https://cdn.poehali.dev/projects/b117055f-ea17-414e-9dd0-0279e76de211/files/b6efddb8-de31-4aaa-8607-42c0f87098e2.jpg",
    details: {
      text: "Разрабатываем кроссплатформенные и нативные мобильные приложения. React Native и Flutter позволяют нам создавать приложения одновременно для iOS и Android без потери качества.",
      features: ["Нативные приложения iOS/Android", "Кроссплатформенная разработка", "Push-уведомления", "Публикация в App Store и Google Play"],
      timeline: "от 4 недель",
      price: "от 150 000 ₽",
    },
  },
  {
    icon: "TrendingUp",
    title: "SEO Продвижение",
    desc: "Выводим ваш сайт в топ поисковых систем и увеличиваем органический трафик",
    image: "https://cdn.poehali.dev/projects/b117055f-ea17-414e-9dd0-0279e76de211/files/6176c088-636e-4699-87a3-5cacc772fd6e.jpg",
    details: {
      text: "Комплексное SEO-продвижение: технический аудит, оптимизация контента, наращивание ссылочной массы. Работаем с Яндекс и Google, используем только белые методы продвижения.",
      features: ["Технический SEO-аудит", "Оптимизация контента", "Семантическое ядро", "Ежемесячная отчётность"],
      timeline: "от 1 месяца",
      price: "от 20 000 ₽/мес",
    },
  },
  {
    icon: "Headphones",
    title: "Техническая поддержка",
    desc: "Круглосуточная поддержка и обслуживание ваших цифровых проектов",
    image: "https://cdn.poehali.dev/projects/b117055f-ea17-414e-9dd0-0279e76de211/files/307d46ff-dffc-4bc0-ab24-e397bfd8edb9.jpg",
    details: {
      text: "Берём ваш проект на полное обслуживание. Мониторинг доступности, резервное копирование, обновления безопасности и оперативное исправление багов — всё включено.",
      features: ["Мониторинг 24/7", "Резервное копирование", "Обновления и патчи безопасности", "Оперативное исправление багов"],
      timeline: "постоянно",
      price: "от 15 000 ₽/мес",
    },
  },
  {
    icon: "ShoppingCart",
    title: "Интернет-магазины",
    desc: "Разработка e-commerce решений с интеграцией платёжных систем",
    image: "https://cdn.poehali.dev/projects/b117055f-ea17-414e-9dd0-0279e76de211/files/2ee9a629-c2bf-4cce-a0e0-3065519596dd.jpg",
    details: {
      text: "Создаём интернет-магазины с удобной корзиной, безопасной оплатой и автоматизацией заказов. Интегрируем с 1С, складскими системами и службами доставки.",
      features: ["Каталог с фильтрами и поиском", "Онлайн-оплата (ЮKassa, Stripe)", "Интеграция с 1С и CRM", "Автоматизация доставки (СДЭК, Boxberry)"],
      timeline: "от 4 недель",
      price: "от 150 000 ₽",
    },
  },
];

const Services = ({ onOpenModal }: ServicesProps) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggle = (index: number) => {
    setExpandedId((prev) => (prev === index ? null : index));
  };

  return (
    <section id="services" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute top-20 right-0 w-[350px] h-[350px] bg-cyan-500/6 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 left-0 w-[300px] h-[300px] bg-purple-600/6 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border-cyan text-sm mb-6">
            <Icon name="Sparkles" size={16} className="text-secondary" />
            Что мы делаем
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold neon-text-cyan text-secondary mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Наши услуги
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Полный спектр услуг для создания вашего цифрового присутствия
          </p>
          <div className="w-24 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-secondary to-primary neon-glow-cyan" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const isExpanded = expandedId === index;
            const isPrimary = index % 2 === 0;

            return (
              <div
                key={service.title}
                className={`glass rounded-2xl overflow-hidden group transition-all duration-500 animate-slide-up ${
                  isExpanded
                    ? (isPrimary ? "neon-border" : "neon-border-cyan")
                    : "hover:scale-[1.03] hover:neon-border"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  <div className={`absolute bottom-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-md ${
                    isPrimary
                      ? "bg-primary/20 shadow-[0_0_15px_hsl(var(--neon-purple)/0.3)]"
                      : "bg-secondary/20 shadow-[0_0_15px_hsl(var(--neon-cyan)/0.3)]"
                  }`}>
                    <Icon
                      name={service.icon}
                      size={22}
                      className={isPrimary ? "text-primary" : "text-secondary"}
                    />
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <h3
                    className={`text-xl font-bold mb-3 transition-all ${
                      isPrimary
                        ? "group-hover:neon-text group-hover:text-primary"
                        : "group-hover:neon-text-cyan group-hover:text-secondary"
                    }`}
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.desc}</p>

                  <div
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{
                      maxHeight: isExpanded ? "500px" : "0px",
                      opacity: isExpanded ? 1 : 0,
                    }}
                  >
                    <div className={`h-px mb-4 ${
                      isPrimary
                        ? "bg-gradient-to-r from-primary/30 via-primary/10 to-transparent"
                        : "bg-gradient-to-r from-secondary/30 via-secondary/10 to-transparent"
                    }`} />

                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {service.details.text}
                    </p>

                    <div className="space-y-2 mb-5">
                      {service.details.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2.5 text-sm">
                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            isPrimary ? "bg-primary shadow-[0_0_6px_hsl(var(--neon-purple)/0.6)]" : "bg-secondary shadow-[0_0_6px_hsl(var(--neon-cyan)/0.6)]"
                          }`} />
                          <span className="text-muted-foreground">{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <div className={`flex-1 rounded-lg p-3 text-center ${
                        isPrimary ? "bg-primary/5 border border-primary/15" : "bg-secondary/5 border border-secondary/15"
                      }`}>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Сроки</div>
                        <div className={`text-sm font-semibold ${isPrimary ? "text-primary" : "text-secondary"}`}>
                          {service.details.timeline}
                        </div>
                      </div>
                      <div className={`flex-1 rounded-lg p-3 text-center ${
                        isPrimary ? "bg-primary/5 border border-primary/15" : "bg-secondary/5 border border-secondary/15"
                      }`}>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Цена</div>
                        <div className={`text-sm font-semibold ${isPrimary ? "text-primary" : "text-secondary"}`}>
                          {service.details.price}
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={onOpenModal}
                      className="w-full neon-button text-white border-0 gap-2 mt-5"
                    >
                      <Icon name="Send" size={16} />
                      Заказать
                    </Button>
                  </div>

                  <button
                    onClick={() => toggle(index)}
                    className={`flex items-center gap-2 text-sm mt-4 transition-all duration-300 ${
                      isPrimary ? "text-primary hover:neon-text" : "text-secondary hover:neon-text-cyan"
                    }`}
                  >
                    {isExpanded ? "Свернуть" : "Подробнее"}
                    <Icon
                      name={isExpanded ? "ChevronUp" : "ArrowRight"}
                      size={16}
                      className={isExpanded ? "" : "group-hover:translate-x-1 transition-transform"}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12 animate-slide-up" style={{ animationDelay: "0.6s" }}>
          <p className="text-muted-foreground mb-4">Не нашли нужную услугу?</p>
          <a
            href="#contacts"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contacts")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass neon-border hover:neon-glow transition-all duration-300 text-sm"
          >
            <Icon name="MessageCircle" size={16} className="text-primary" />
            Обсудить проект
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
import Icon from "@/components/ui/icon";

const services = [
  {
    icon: "Globe",
    title: "Разработка сайтов",
    desc: "Создаём современные веб-сайты любой сложности — от лендингов до крупных порталов",
    image: "https://cdn.poehali.dev/projects/b117055f-ea17-414e-9dd0-0279e76de211/files/ca4c9cb8-3cbf-4364-84a7-dfc8e35bd2fc.jpg",
  },
  {
    icon: "Palette",
    title: "UI/UX Дизайн",
    desc: "Проектируем уникальные интерфейсы, которые покоряют пользователей с первого взгляда",
    image: "https://cdn.poehali.dev/projects/b117055f-ea17-414e-9dd0-0279e76de211/files/44d3e959-19bb-4622-aa3d-6501bf732b35.jpg",
  },
  {
    icon: "Smartphone",
    title: "Мобильная разработка",
    desc: "Адаптивные и нативные мобильные приложения для iOS и Android",
    gradient: "from-purple-700 via-indigo-600 to-cyan-600",
  },
  {
    icon: "TrendingUp",
    title: "SEO Продвижение",
    desc: "Выводим ваш сайт в топ поисковых систем и увеличиваем органический трафик",
    gradient: "from-cyan-600 via-blue-600 to-purple-700",
  },
  {
    icon: "Headphones",
    title: "Техническая поддержка",
    desc: "Круглосуточная поддержка и обслуживание ваших цифровых проектов",
    gradient: "from-purple-700 via-pink-600 to-rose-600",
  },
  {
    icon: "ShoppingCart",
    title: "Интернет-магазины",
    desc: "Разработка e-commerce решений с интеграцией платёжных систем",
    gradient: "from-blue-700 via-indigo-600 to-purple-700",
  },
];

const Services = () => {
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
          {services.map((service, index) => (
            <div
              key={service.title}
              className="glass rounded-2xl overflow-hidden group hover:scale-[1.03] hover:neon-border transition-all duration-500 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${service.gradient} relative`}>
                    <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-white/10 blur-xl" />
                    <div className="absolute bottom-1/3 right-1/4 w-12 h-12 rounded-full bg-white/5 blur-lg" />
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-white/40 animate-twinkle"
                        style={{
                          top: `${20 + Math.random() * 60}%`,
                          left: `${10 + Math.random() * 80}%`,
                          animationDelay: `${i * 0.4}s`,
                        }}
                      />
                    ))}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                <div className={`absolute bottom-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-md ${
                  index % 2 === 0
                    ? "bg-primary/20 shadow-[0_0_15px_hsl(var(--neon-purple)/0.3)]"
                    : "bg-secondary/20 shadow-[0_0_15px_hsl(var(--neon-cyan)/0.3)]"
                }`}>
                  <Icon
                    name={service.icon}
                    size={22}
                    className={index % 2 === 0 ? "text-primary" : "text-secondary"}
                  />
                </div>
              </div>

              <div className="p-6 md:p-8">
                <h3
                  className={`text-xl font-bold mb-3 transition-all ${
                    index % 2 === 0
                      ? "group-hover:neon-text group-hover:text-primary"
                      : "group-hover:neon-text-cyan group-hover:text-secondary"
                  }`}
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.desc}</p>
                <div className="flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Подробнее
                  <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
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

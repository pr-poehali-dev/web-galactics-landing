import Icon from "@/components/ui/icon";

const advantages = [
  { icon: "Zap", title: "Скорость", desc: "Запускаем проекты в 2 раза быстрее средних сроков по рынку", color: "primary" },
  { icon: "Shield", title: "Надёжность", desc: "Гарантия стабильной работы и защита от кибератак", color: "secondary" },
  { icon: "Users", title: "Индивидуальный подход", desc: "Каждый проект уникален — мы не используем шаблонных решений", color: "primary" },
  { icon: "Code", title: "Чистый код", desc: "Используем лучшие практики и современные технологии разработки", color: "secondary" },
  { icon: "Headphones", title: "Поддержка 24/7", desc: "Всегда на связи — помогаем решать вопросы в любое время", color: "primary" },
  { icon: "Rocket", title: "Масштабирование", desc: "Создаём решения, которые растут вместе с вашим бизнесом", color: "secondary" },
];

const Advantages = () => {
  return (
    <section id="advantages" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute top-20 left-0 w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-0 w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border-cyan text-sm mb-6">
            <Icon name="Award" size={16} className="text-secondary" />
            Наши преимущества
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Почему{" "}
            <span className="neon-text text-primary">выбирают</span>{" "}
            <span className="neon-text-cyan text-secondary">нас</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            6 причин доверить ваш проект команде Web Galactics
          </p>
          <div className="w-24 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-secondary to-primary neon-glow" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((adv, index) => (
            <div
              key={adv.title}
              className="glass rounded-2xl p-7 md:p-8 group hover:-translate-y-2 hover:neon-border transition-all duration-500 relative animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 rounded-2xl bg-primary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full ${
                adv.color === "primary" ? "bg-primary/5" : "bg-secondary/5"
              } blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 ${
                  adv.color === "primary"
                    ? "bg-primary/10 group-hover:bg-primary/20"
                    : "bg-secondary/10 group-hover:bg-secondary/20"
                }`}>
                  <Icon
                    name={adv.icon}
                    size={26}
                    className={`${
                      adv.color === "primary" ? "text-primary" : "text-secondary"
                    } group-hover:scale-110 group-hover:animate-pulse-neon transition-transform`}
                  />
                </div>

                <h3
                  className={`text-xl font-bold mb-3 transition-all ${
                    adv.color === "primary"
                      ? "group-hover:neon-text group-hover:text-primary"
                      : "group-hover:neon-text-cyan group-hover:text-secondary"
                  }`}
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {adv.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{adv.desc}</p>

                <div className={`mt-5 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full ${
                  adv.color === "primary"
                    ? "bg-gradient-to-r from-primary to-transparent"
                    : "bg-gradient-to-r from-secondary to-transparent"
                }`} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center mt-16 gap-4">
          <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-primary/30" />
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse-neon" />
          <div className="h-px w-12 bg-gradient-to-r from-primary/30 to-secondary/30" />
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse-neon" style={{ animationDelay: "1s" }} />
          <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-secondary/30" />
        </div>
      </div>
    </section>
  );
};

export default Advantages;

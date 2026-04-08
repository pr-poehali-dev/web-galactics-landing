import Icon from "@/components/ui/icon";

const stats = [
  { value: "150+", label: "проектов", icon: "Folder", color: "primary" },
  { value: "8+", label: "лет опыта", icon: "Calendar", color: "secondary" },
  { value: "50+", label: "довольных клиентов", icon: "Users", color: "primary" },
  { value: "24/7", label: "поддержка", icon: "Headphones", color: "secondary" },
];

const features = [
  { icon: "Zap", text: "Быстрый запуск — от идеи до релиза за 2 недели" },
  { icon: "Shield", text: "Гарантия качества и защита от кибератак" },
  { icon: "Target", text: "Индивидуальный подход к каждому проекту" },
];

const About = () => {
  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-600/7 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-cyan-500/7 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border text-sm mb-6">
            <Icon name="Info" size={16} className="text-primary" />
            О нас
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold neon-text text-primary mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            О студии
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-primary to-secondary neon-glow" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="glass rounded-2xl p-8 md:p-10 relative animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px]" />
            <h3 className="text-xl md:text-2xl font-semibold mb-6" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Мы создаём цифровые вселенные{" "}
              <span className="neon-text-cyan text-secondary">для вашего бизнеса</span>
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Web Galactics — команда космических разработчиков, которая уже более 8 лет создаёт
              цифровые вселенные для бизнеса любого масштаба. Мы не просто делаем сайты — мы
              запускаем ваш бизнес в космос.
            </p>
            <div className="space-y-4">
              {features.map((f) => (
                <div key={f.icon} className="flex items-start gap-3 group hover:translate-x-1 transition-transform">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon name={f.icon} size={18} className="text-primary" />
                  </div>
                  <span className="text-muted-foreground pt-2">{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px]">
              <div className="absolute inset-[15%] rounded-full bg-gradient-to-br from-purple-700 via-purple-500 to-indigo-800 shadow-[inset_0_-20px_40px_rgba(0,0,0,0.4)]">
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div className="absolute top-[30%] left-0 right-0 h-[3px] bg-purple-400/20 rotate-[-5deg]" />
                  <div className="absolute top-[50%] left-0 right-0 h-[2px] bg-purple-300/15 rotate-[3deg]" />
                  <div className="absolute top-[70%] left-0 right-0 h-[2px] bg-purple-400/10 rotate-[-2deg]" />
                </div>
                <div className="absolute top-[15%] left-[20%] w-[30%] h-[20%] bg-white/10 rounded-full blur-[15px]" />
              </div>

              <div
                className="absolute inset-[5%] rounded-full border border-primary/20"
                style={{ transform: "rotateX(75deg)" }}
              />
              <div
                className="absolute inset-0 rounded-full border border-secondary/15"
                style={{ transform: "rotateX(75deg)" }}
              />

              <div className="absolute inset-[-5%] rounded-full border-2 border-primary/10 animate-pulse-neon neon-glow" />

              <div className="absolute top-[5%] right-[10%] w-4 h-4 rounded-full bg-cyan-400 animate-float" style={{ animationDelay: "0s" }} />
              <div className="absolute bottom-[10%] left-[5%] w-3 h-3 rounded-full bg-pink-400 animate-float" style={{ animationDelay: "2s" }} />

              {[
                { top: "0%", left: "50%" },
                { top: "60%", right: "0%" },
                { bottom: "5%", left: "30%" },
                { top: "30%", left: "0%" },
                { top: "80%", right: "15%" },
              ].map((pos, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-white animate-twinkle"
                  style={{ ...pos, animationDelay: `${i * 0.5}s` } as React.CSSProperties}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-xl p-6 text-center hover:neon-border transition-all duration-300 group"
            >
              <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                stat.color === "primary" ? "bg-primary/10" : "bg-secondary/10"
              } group-hover:scale-110 transition-transform`}>
                <Icon
                  name={stat.icon}
                  size={22}
                  className={stat.color === "primary" ? "text-primary" : "text-secondary"}
                />
              </div>
              <div
                className={`text-3xl md:text-4xl font-bold mb-1 ${
                  stat.color === "primary" ? "neon-text text-primary" : "neon-text-cyan text-secondary"
                }`}
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

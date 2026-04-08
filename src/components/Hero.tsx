import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface HeroProps {
  onOpenModal?: () => void;
}

const Hero = ({ onOpenModal }: HeroProps) => {
  const stars = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 3 + 1,
        delay: `${Math.random() * 4}s`,
        duration: `${Math.random() * 3 + 2}s`,
        opacity: Math.random() * 0.7 + 0.3,
      })),
    []
  );

  const planets = [
    { top: "10%", left: "8%", size: 60, gradient: "from-purple-600 to-purple-900", delay: "0s", duration: "7s" },
    { top: "20%", right: "12%", size: 40, gradient: "from-cyan-400 to-cyan-700", delay: "1s", duration: "5s" },
    { top: "60%", left: "5%", size: 30, gradient: "from-pink-500 to-pink-800", delay: "2s", duration: "8s" },
    { top: "70%", right: "8%", size: 50, gradient: "from-indigo-500 to-indigo-800", delay: "0.5s", duration: "6s" },
    { top: "40%", left: "85%", size: 25, gradient: "from-yellow-400 to-amber-700", delay: "3s", duration: "9s" },
    { top: "85%", left: "20%", size: 35, gradient: "from-rose-400 to-rose-700", delay: "1.5s", duration: "7s" },
    { top: "15%", left: "50%", size: 20, gradient: "from-emerald-400 to-emerald-700", delay: "2.5s", duration: "6s" },
  ];

  const stats = [
    { value: "150+", label: "проектов", icon: "Folder", color: "primary" },
    { value: "8", label: "лет опыта", icon: "Calendar", color: "secondary" },
    { value: "50+", label: "клиентов", icon: "Users", color: "primary" },
    { value: "99%", label: "довольных", icon: "ThumbsUp", color: "secondary" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url(https://cdn.poehali.dev/projects/b117055f-ea17-414e-9dd0-0279e76de211/files/e67a5a69-0592-4c8f-bec1-986f1b4c8304.jpg)" }}
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      <div className="absolute inset-0 z-[2] cosmic-gradient opacity-60" />

      <div className="absolute inset-0 z-[3]">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
              animationDuration: star.duration,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 z-[4] pointer-events-none">
        {planets.map((planet, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-gradient-to-br ${planet.gradient} animate-float opacity-40 blur-[1px]`}
            style={{
              top: planet.top,
              left: planet.left ?? undefined,
              right: (planet as Record<string, unknown>).right as string | undefined,
              width: planet.size,
              height: planet.size,
              animationDelay: planet.delay,
              animationDuration: planet.duration,
            }}
          />
        ))}
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] bg-cyan-500/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-12 flex flex-col items-center text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border text-sm mb-8 animate-slide-up"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Принимаем заказы на 2026 год
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-slide-up"
          style={{ animationDelay: "0.2s", fontFamily: "'Orbitron', sans-serif" }}
        >
          Создаём сайты
          <br />
          <span className="neon-text text-primary">из другой галактики</span>
        </h1>

        <p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          <span className="text-foreground font-medium">Web Galactics</span> — космическая студия
          веб-разработки. Превращаем ваши идеи в цифровые шедевры с wow-эффектом
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 mb-6 animate-slide-up"
          style={{ animationDelay: "0.5s" }}
        >
          <a href="#calculator">
            <Button className="neon-button text-white border-0 text-lg px-8 py-6 gap-2">
              <Icon name="Calculator" size={20} />
              Рассчитать стоимость
            </Button>
          </a>
          <a href="#portfolio">
            <Button variant="outline" className="neon-border-cyan text-secondary border text-lg px-8 py-6 gap-2 hover:bg-secondary/10">
              <Icon name="Eye" size={20} />
              Смотреть портфолио
            </Button>
          </a>
        </div>

        <button
          onClick={onOpenModal}
          className="text-muted-foreground hover:text-foreground text-sm transition-colors mb-16 animate-slide-up"
          style={{ animationDelay: "0.6s" }}
        >
          Или оставить заявку и мы перезвоним →
        </button>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl animate-slide-up"
          style={{ animationDelay: "0.7s" }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-xl p-4 text-center hover:neon-border transition-all duration-300 group"
            >
              <Icon
                name={stat.icon}
                size={20}
                className={`mx-auto mb-2 ${stat.color === "primary" ? "text-primary" : "text-secondary"} group-hover:scale-110 transition-transform`}
              />
              <div
                className={`text-2xl md:text-3xl font-bold ${
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

        <div className="mt-12 animate-float">
          <Icon name="ChevronDown" size={24} className="text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const categories = ["Все", "Лендинги", "Интернет-магазины", "Корпоративные", "Мобильные"];

const projects = [
  { id: 1, name: "Stellar Commerce", category: "Интернет-магазины", desc: "Интернет-магазин электроники с AR-просмотром товаров", likes: 47, gradient: "from-purple-700 via-indigo-600 to-blue-700" },
  { id: 2, name: "NebulaCRM", category: "Корпоративные", desc: "CRM-система для управления космическими грузоперевозками", likes: 32, gradient: "from-cyan-600 via-teal-600 to-emerald-700" },
  { id: 3, name: "Orbit Landing", category: "Лендинги", desc: "Промо-лендинг для стартапа в сфере космического туризма", likes: 58, gradient: "from-pink-600 via-rose-600 to-purple-700" },
  { id: 4, name: "Galaxy Fitness", category: "Лендинги", desc: "Лендинг для сети фитнес-центров с онлайн-записью", likes: 41, gradient: "from-amber-600 via-orange-600 to-red-700" },
  { id: 5, name: "AstroBank", category: "Корпоративные", desc: "Корпоративный портал для финтех-компании", likes: 29, gradient: "from-blue-700 via-indigo-600 to-purple-700" },
  { id: 6, name: "SpaceFood", category: "Мобильные", desc: "Мобильное приложение для доставки космической еды", likes: 63, gradient: "from-emerald-600 via-cyan-600 to-blue-700" },
];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("Все");
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());

  const filtered = activeFilter === "Все" ? projects : projects.filter((p) => p.category === activeFilter);

  const toggleLike = (id: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section id="portfolio" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute top-20 right-0 w-[350px] h-[350px] bg-purple-600/6 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 left-0 w-[300px] h-[300px] bg-cyan-500/6 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border text-sm mb-6">
            <Icon name="FolderOpen" size={16} className="text-primary" />
            Наши работы
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold neon-text text-primary mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Портфолио
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Каждый проект — это уникальная вселенная, созданная с любовью и вниманием к деталям
          </p>
          <div className="w-24 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-primary to-secondary neon-glow" />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-sm transition-all duration-300 ${
                activeFilter === cat
                  ? "neon-button text-white"
                  : "glass text-muted-foreground hover:text-foreground hover:neon-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground">Проекты в этой категории скоро появятся</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, index) => (
              <div
                key={project.id}
                className="glass rounded-2xl overflow-hidden group hover:scale-[1.03] hover:neon-border transition-all duration-500 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`relative h-52 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                  <div
                    className="absolute w-20 h-20 rounded-full bg-white/10 blur-xl animate-float"
                    style={{
                      top: "20%",
                      left: "30%",
                      animationDelay: `${index * 0.3}s`,
                    }}
                  />
                  <div className="absolute bottom-1/4 right-1/4 w-10 h-10 rounded-full bg-cyan-300/15 blur-lg" />
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-white/50 animate-twinkle"
                      style={{
                        top: `${15 + Math.random() * 70}%`,
                        left: `${10 + Math.random() * 80}%`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    />
                  ))}

                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass-strong text-xs">
                    {project.category}
                  </div>

                  <button
                    onClick={() => toggleLike(project.id)}
                    className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-strong text-xs transition-all hover:scale-110"
                  >
                    <Icon
                      name="Heart"
                      size={14}
                      className={likedIds.has(project.id) ? "text-pink-500 fill-pink-500" : "text-muted-foreground"}
                    />
                    <span>{project.likes + (likedIds.has(project.id) ? 1 : 0)}</span>
                  </button>
                </div>

                <div className="p-6">
                  <h3
                    className={`text-lg font-bold mb-2 transition-all ${
                      index % 2 === 0
                        ? "group-hover:neon-text group-hover:text-primary"
                        : "group-hover:neon-text-cyan group-hover:text-secondary"
                    }`}
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {project.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{project.desc}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-primary hover:bg-primary/10 p-0"
                  >
                    Подробнее
                    <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12 animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <a
            href="#contacts"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contacts")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Button className="neon-button text-white border-0 gap-2">
              <Icon name="MessageCircle" size={18} />
              Обсудить проект
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

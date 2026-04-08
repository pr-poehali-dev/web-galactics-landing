import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface CalculatorProps {
  onOpenModal?: () => void;
}

const siteTypes = [
  { id: "landing", label: "Лендинг", desc: "Одностраничный сайт", price: 30000, icon: "FileText" },
  { id: "corporate", label: "Корпоративный сайт", desc: "Многостраничный сайт", price: 80000, icon: "Building2" },
  { id: "shop", label: "Интернет-магазин", desc: "E-commerce решение", price: 150000, icon: "ShoppingCart" },
  { id: "webapp", label: "Веб-приложение", desc: "Сложный сервис", price: 250000, icon: "AppWindow" },
  { id: "mobile", label: "Мобильное приложение", desc: "iOS / Android", price: 300000, icon: "Smartphone" },
];

const features = [
  { id: "responsive", label: "Адаптивный дизайн", price: 15000, icon: "Monitor" },
  { id: "cms", label: "CMS система", price: 25000, icon: "Settings" },
  { id: "cabinet", label: "Личный кабинет", price: 40000, icon: "User" },
  { id: "payment", label: "Онлайн-оплата", price: 30000, icon: "CreditCard" },
  { id: "seo", label: "SEO оптимизация", price: 20000, icon: "Search" },
  { id: "multilang", label: "Мультиязычность", price: 35000, icon: "Languages" },
  { id: "chatbot", label: "Чат-бот", price: 25000, icon: "MessageSquare" },
  { id: "analytics", label: "Аналитика и метрики", price: 15000, icon: "BarChart3" },
];

const deadlines = [
  { id: "standard", label: "Стандартные", days: "30-45 дней", multiplier: 1, icon: "Clock" },
  { id: "fast", label: "Ускоренные", days: "15-20 дней", multiplier: 1.5, icon: "Zap" },
  { id: "express", label: "Экспресс", days: "7-10 дней", multiplier: 2, icon: "Rocket" },
];

const STORAGE_KEY = "webgalactics-calculator";

const formatPrice = (n: number) => n.toLocaleString("ru-RU");

const Calculator = ({ onOpenModal }: CalculatorProps) => {
  const [selectedType, setSelectedType] = useState("landing");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedDeadline, setSelectedDeadline] = useState("standard");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.type) setSelectedType(data.type);
        if (data.features) setSelectedFeatures(data.features);
        if (data.deadline) setSelectedDeadline(data.deadline);
      }
    } catch (e) { console.debug("load error", e); }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ type: selectedType, features: selectedFeatures, deadline: selectedDeadline })
      );
    } catch (e) { console.debug("save error", e); }
  }, [selectedType, selectedFeatures, selectedDeadline, isLoaded]);

  const toggleFeature = useCallback((id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }, []);

  const basePrice = siteTypes.find((t) => t.id === selectedType)?.price ?? 0;
  const featuresPrice = features
    .filter((f) => selectedFeatures.includes(f.id))
    .reduce((sum, f) => sum + f.price, 0);
  const deadlineMultiplier = deadlines.find((d) => d.id === selectedDeadline)?.multiplier ?? 1;
  const totalPrice = Math.round((basePrice + featuresPrice) * deadlineMultiplier);

  return (
    <section id="calculator" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute top-20 right-0 w-[350px] h-[350px] bg-cyan-500/6 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 left-0 w-[300px] h-[300px] bg-purple-600/6 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border-cyan text-sm mb-6">
            <Icon name="Calculator" size={16} className="text-secondary" />
            Узнайте стоимость
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="neon-text-cyan text-secondary">Калькулятор</span>{" "}
            стоимости
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Рассчитайте примерную стоимость вашего проекта за пару минут
          </p>
          <div className="w-24 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-secondary to-primary neon-glow-cyan" />
        </div>

        <div className="glass-strong rounded-3xl p-6 md:p-10 max-w-5xl mx-auto relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 rounded-full blur-[60px]" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-600/5 rounded-full blur-[60px]" />

          <div className="relative z-10 space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary" style={{ fontFamily: "'Orbitron', sans-serif" }}>1</div>
                <h3 className="text-lg font-semibold" style={{ fontFamily: "'Orbitron', sans-serif" }}>Тип сайта</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {siteTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-4 rounded-xl text-left transition-all duration-300 ${
                      selectedType === type.id
                        ? "neon-border bg-primary/10"
                        : "border border-border/50 glass hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon
                        name={type.icon}
                        size={20}
                        className={selectedType === type.id ? "text-primary" : "text-muted-foreground"}
                      />
                      <div>
                        <div className="font-medium text-sm">{type.label}</div>
                        <div className="text-xs text-muted-foreground">{type.desc}</div>
                        <div className={`text-xs mt-1 ${selectedType === type.id ? "text-primary" : "text-muted-foreground/70"}`}>
                          от {formatPrice(type.price)} ₽
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-sm font-bold text-secondary" style={{ fontFamily: "'Orbitron', sans-serif" }}>2</div>
                <h3 className="text-lg font-semibold" style={{ fontFamily: "'Orbitron', sans-serif" }}>Функциональность</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feat) => {
                  const active = selectedFeatures.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`p-4 rounded-xl text-left transition-all duration-300 flex items-center gap-3 ${
                        active
                          ? "neon-border-cyan bg-secondary/10"
                          : "border border-border/50 glass hover:border-secondary/30"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded shrink-0 flex items-center justify-center transition-all ${
                        active ? "bg-secondary" : "border border-muted-foreground/30"
                      }`}>
                        {active && <Icon name="Check" size={14} className="text-background" />}
                      </div>
                      <Icon
                        name={feat.icon}
                        size={18}
                        className={active ? "text-secondary" : "text-muted-foreground"}
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium">{feat.label}</span>
                      </div>
                      <span className={`text-xs whitespace-nowrap ${active ? "text-secondary" : "text-muted-foreground/70"}`}>
                        +{formatPrice(feat.price)} ₽
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary" style={{ fontFamily: "'Orbitron', sans-serif" }}>3</div>
                <h3 className="text-lg font-semibold" style={{ fontFamily: "'Orbitron', sans-serif" }}>Сроки выполнения</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {deadlines.map((dl) => (
                  <button
                    key={dl.id}
                    onClick={() => setSelectedDeadline(dl.id)}
                    className={`p-4 rounded-xl text-center transition-all duration-300 ${
                      selectedDeadline === dl.id
                        ? "neon-border bg-primary/10"
                        : "border border-border/50 glass hover:border-primary/30"
                    }`}
                  >
                    <Icon
                      name={dl.icon}
                      size={22}
                      className={`mx-auto mb-2 ${selectedDeadline === dl.id ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <div className="font-medium text-sm">{dl.label}</div>
                    <div className="text-xs text-muted-foreground">{dl.days}</div>
                    {dl.multiplier > 1 && (
                      <div className="inline-block mt-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                        ×{dl.multiplier}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-border/30 pt-8">
              <div className="text-center mb-6">
                <div className="text-sm text-muted-foreground mb-2">Ориентировочная стоимость</div>
                <div
                  className="text-4xl md:text-5xl font-bold neon-text-cyan text-secondary animate-pulse-neon"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {formatPrice(totalPrice)} ₽
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span>База: {formatPrice(basePrice)} ₽</span>
                  {featuresPrice > 0 && <span>+ Доп: {formatPrice(featuresPrice)} ₽</span>}
                  {deadlineMultiplier > 1 && <span>× Срочность: {deadlineMultiplier}</span>}
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <Button onClick={onOpenModal} className="neon-button text-white border-0 text-lg px-10 py-6 gap-2">
                  <Icon name="Send" size={18} />
                  Оставить заявку
                </Button>
                <span className="text-xs text-muted-foreground">
                  Рассчитаем точную стоимость за 30 минут
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground/60">
          <Icon name="Info" size={14} />
          Цены указаны ориентировочно. Точная стоимость зависит от деталей проекта.
        </div>
      </div>
    </section>
  );
};

export default Calculator;
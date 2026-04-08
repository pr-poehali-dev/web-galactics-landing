import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";

const reviews = [
  {
    id: 1,
    name: "Александр Петров",
    company: "CEO, TechStart",
    text: "Web Galactics создали для нас потрясающий корпоративный портал. Сроки соблюдены, качество выше ожиданий!",
    rating: 5,
    gradient: "from-purple-600 to-indigo-600",
  },
  {
    id: 2,
    name: "Мария Иванова",
    company: "Маркетолог, FoodBox",
    text: "Наш интернет-магазин стал генерировать на 200% больше заявок после редизайна. Спасибо команде!",
    rating: 5,
    gradient: "from-cyan-500 to-teal-600",
  },
  {
    id: 3,
    name: "Дмитрий Козлов",
    company: "Основатель, GymPro",
    text: "Лендинг получился просто космический! Конверсия выросла в 3 раза. Рекомендую!",
    rating: 5,
    gradient: "from-pink-500 to-rose-600",
  },
  {
    id: 4,
    name: "Елена Смирнова",
    company: "Директор, BeautySpace",
    text: "Профессиональная команда, которая слышит клиента. Наш сайт стал визитной карточкой бизнеса.",
    rating: 4,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    id: 5,
    name: "Олег Новиков",
    company: "CTO, DataFlow",
    text: "Отличная техническая экспертиза. Сложный проект был реализован безупречно и в срок.",
    rating: 5,
    gradient: "from-emerald-500 to-green-600",
  },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("");

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  const getVisible = useCallback(() => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }, []);

  useEffect(() => {
    setVisibleCount(getVisible());
    const onResize = () => setVisibleCount(getVisible());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [getVisible]);

  const maxIndex = Math.max(0, reviews.length - visibleCount);

  useEffect(() => {
    if (currentIndex > maxIndex) setCurrentIndex(maxIndex);
  }, [maxIndex, currentIndex]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, maxIndex]);

  const goNext = () => setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const goPrev = () => setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

  return (
    <section id="reviews" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute top-20 left-0 w-[350px] h-[350px] bg-purple-600/6 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-0 w-[300px] h-[300px] bg-cyan-500/6 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border text-sm mb-6">
            <Icon name="MessageCircle" size={16} className="text-primary" />
            Что говорят клиенты
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="neon-text text-primary">Отзывы</span>{" "}
            <span className="neon-text-cyan text-secondary">клиентов</span>
          </h2>
          <div className="w-24 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-primary to-secondary neon-glow" />
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-20 w-10 h-10 rounded-full glass neon-border flex items-center justify-center hover:neon-glow hover:scale-110 transition-all"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>

          <button
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-20 w-10 h-10 rounded-full glass neon-border flex items-center justify-center hover:neon-glow hover:scale-110 transition-all"
          >
            <Icon name="ChevronRight" size={20} />
          </button>

          <div className="overflow-hidden mx-8 md:mx-12">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
            >
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <div className="glass rounded-2xl p-6 md:p-8 h-full relative group hover:neon-border transition-all duration-300">
                    <div className={`absolute top-4 right-4 opacity-[0.07] ${
                      index % 2 === 0 ? "text-primary" : "text-secondary"
                    }`}>
                      <Icon name="Quote" size={48} />
                    </div>

                    <div className="flex items-center gap-4 mb-5">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${review.gradient} flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
                        {getInitials(review.name)}
                      </div>
                      <div>
                        <div className="font-bold text-sm">{review.name}</div>
                        <div className="text-xs text-muted-foreground">{review.company}</div>
                      </div>
                    </div>

                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={16}
                          className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"}
                        />
                      ))}
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-sm">
                      &laquo;{review.text}&raquo;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-8 h-2 bg-primary neon-glow"
                  : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          {[
            { icon: "ShieldCheck", text: "100% реальные отзывы" },
            { icon: "Award", text: "Рейтинг 4.9/5" },
            { icon: "ThumbsUp", text: "98% рекомендуют" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name={item.icon} size={16} className="text-primary/60" />
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";
import funcUrls from "../../backend/func2url.json";

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  consent?: string;
}

const contactInfo = [
  { icon: "Phone", label: "Телефон", value: "+7 (999) 123-45-67", href: "tel:+79991234567" },
  { icon: "Mail", label: "Email", value: "info@web-galactics.ru", href: "mailto:info@web-galactics.ru" },
  { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Космическая, д. 42" },
  { icon: "Clock", label: "Часы работы", value: "Пн-Пт: 10:00 - 20:00" },
];

const ContactForm = () => {
  const [form, setForm] = useState<FormData>({ name: "", phone: "", email: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Введите имя";
    if (!form.phone.trim()) errs.phone = "Введите телефон";
    else if (!/^\+?[0-9\s\-()]{10,18}$/.test(form.phone.trim())) errs.phone = "Неверный формат телефона";
    if (!form.email.trim()) errs.email = "Введите email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = "Неверный формат email";
    if (!form.message.trim()) errs.message = "Введите сообщение";
    if (!consent) errs.consent = "Необходимо дать согласие";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(funcUrls["send-contact"], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "contact-form" }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
      setForm({ name: "", phone: "", email: "", message: "" });
      setConsent(false);
      setErrors({});
    } catch {
      toast.error("Произошла ошибка. Попробуйте ещё раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <section id="contacts" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute top-20 right-0 w-[350px] h-[350px] bg-purple-600/6 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 left-0 w-[300px] h-[300px] bg-cyan-500/6 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border text-sm mb-6">
            <Icon name="Mail" size={16} className="text-primary" />
            Контакты
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="neon-text text-primary">Связаться</span>{" "}
            <span className="neon-text-cyan text-secondary">с нами</span>
          </h2>
          <div className="w-24 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-primary to-secondary neon-glow" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="glass rounded-2xl p-8 relative animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px]" />
            <h3
              className="text-xl font-bold mb-6 relative z-10"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Контактная информация
            </h3>

            <div className="space-y-5 relative z-10">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon name={item.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-sm hover:text-primary transition-colors">{item.value}</a>
                    ) : (
                      <span className="text-sm">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="my-6 h-px bg-gradient-to-r from-primary/20 via-secondary/20 to-transparent" />

            <div className="relative z-10">
              <div className="text-xs text-muted-foreground mb-3">Мы в соцсетях</div>
              <div className="flex gap-3">
                {[
                  { icon: "Send", label: "Telegram" },
                  { icon: "Users", label: "VK" },
                ].map((s) => (
                  <button
                    key={s.label}
                    className="w-11 h-11 rounded-xl glass flex items-center justify-center hover:neon-border hover:scale-110 transition-all"
                    title={s.label}
                  >
                    <Icon name={s.icon} size={18} className="text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground relative z-10">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Отвечаем в течение 30 минут
            </div>
          </div>

          <div className="glass rounded-2xl neon-border p-8 relative animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-[60px]" />
            <h3
              className="text-xl font-bold mb-6 relative z-10"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Оставить заявку
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div>
                <Input
                  placeholder="Ваше имя"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className={`bg-muted/30 border-border/50 focus:border-primary/50 ${errors.name ? "border-destructive/60" : ""}`}
                />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>

              <div>
                <Input
                  type="tel"
                  placeholder="Телефон"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className={`bg-muted/30 border-border/50 focus:border-primary/50 ${errors.phone ? "border-destructive/60" : ""}`}
                />
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={`bg-muted/30 border-border/50 focus:border-primary/50 ${errors.email ? "border-destructive/60" : ""}`}
                />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>

              <div>
                <Textarea
                  placeholder="Сообщение"
                  rows={4}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className={`bg-muted/30 border-border/50 focus:border-primary/50 resize-none ${errors.message ? "border-destructive/60" : ""}`}
                />
                {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
              </div>

              <div>
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consent"
                    checked={consent}
                    onCheckedChange={(v) => {
                      setConsent(v === true);
                      if (errors.consent) setErrors((prev) => ({ ...prev, consent: undefined }));
                    }}
                    className="mt-1"
                  />
                  <label htmlFor="consent" className="text-xs text-muted-foreground cursor-pointer leading-relaxed">
                    Я согласен с обработкой персональных данных
                  </label>
                </div>
                {errors.consent && <p className="text-xs text-destructive mt-1">{errors.consent}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full neon-button text-white border-0 gap-2 py-6"
              >
                {isSubmitting ? (
                  <Icon name="Loader2" size={18} className="animate-spin" />
                ) : (
                  <Icon name="Send" size={18} />
                )}
                {isSubmitting ? "Отправка..." : "Отправить заявку"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
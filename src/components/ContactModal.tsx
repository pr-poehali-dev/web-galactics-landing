import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";
import funcUrls from "../../backend/func2url.json";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceName?: string;
}

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

const ContactModal = ({ open, onOpenChange, serviceName }: ContactModalProps) => {
  const [form, setForm] = useState<FormData>({ name: "", phone: "", email: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open && serviceName) {
      setForm((prev) => ({
        ...prev,
        message: prev.message || `Интересует услуга: ${serviceName}`,
      }));
    }
  }, [open, serviceName]);

  const resetForm = () => {
    setForm({ name: "", phone: "", email: "", message: "" });
    setConsent(false);
    setErrors({});
  };

  const handleClose = (val: boolean) => {
    if (!val) resetForm();
    onOpenChange(val);
  };

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
        body: JSON.stringify({ ...form, source: serviceName ? `Заказ: ${serviceName}` : "modal" }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
      resetForm();
      onOpenChange(false);
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
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="glass-strong sm:max-w-[520px] max-h-[90vh] overflow-y-auto border border-primary/20 neon-border">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px]" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-[60px]" />

        <DialogHeader className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
              <Icon name="Rocket" size={20} className="text-primary" />
            </div>
            <div>
              <DialogTitle
                className="text-lg font-bold"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                <span className="neon-text text-primary">Оставить</span>{" "}
                <span className="neon-text-cyan text-secondary">заявку</span>
              </DialogTitle>
            </div>
          </div>
          <DialogDescription className="text-sm text-muted-foreground">
            Заполните форму и мы свяжемся с вами в течение 30 минут
          </DialogDescription>
          {serviceName && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary mt-2 w-fit">
              <Icon name="Sparkles" size={12} />
              {serviceName}
            </div>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10 mt-4">
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
              rows={3}
              value={form.message}
              onChange={(e) => updateField("message", e.target.value)}
              className={`bg-muted/30 border-border/50 focus:border-primary/50 resize-none ${errors.message ? "border-destructive/60" : ""}`}
            />
            {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
          </div>

          <div>
            <div className="flex items-start gap-3">
              <Checkbox
                id="modal-consent"
                checked={consent}
                onCheckedChange={(v) => {
                  setConsent(v === true);
                  if (errors.consent) setErrors((prev) => ({ ...prev, consent: undefined }));
                }}
                className="mt-1"
              />
              <label htmlFor="modal-consent" className="text-xs text-muted-foreground cursor-pointer leading-relaxed">
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

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Icon name="ShieldCheck" size={14} className="text-primary/60" />
            Данные защищены и не передаются третьим лицам
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
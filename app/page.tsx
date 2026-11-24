
"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, type Variants } from "framer-motion";
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  MessageCircle,
  Music2,
} from "lucide-react";

/* =========================================================
   CONFIG — edit everything here
========================================================= */

// 2 weeks from 24 Nov 2026, Maputo time (UTC+2)
const LAUNCH_DATE = new Date("2026-12-08T08:00:00+02:00");

// Accent colours taken from the logo. Used very sparingly.
const ACCENT = ["#F2B03D", "#4FB3E8", "#E8532B", "#F5D547"];

const NAV = [
  { label: "Catálogo", href: "#catalogo" },
  { label: "Fundador", href: "#fundador" },
  { label: "Lista de espera", href: "#lista" },
];

const GALLERY = Array.from({ length: 30 }, (_, index) => {
  const number = index + 1;

  const extension =
    number <= 13 ? "png" :
    number <= 27 ? "jpg" :
    "jpeg";

  return {
    src: `/${number}.${extension}`,
    name: `Peça ${String(number).padStart(2, "0")}`,
    tag: "Colecção",
  };
});

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/vieg_yuro_oficial/",
    icon: InstagramIcon,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@YOUR_TIKTOK",
    icon: Music2,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/YOUR_NUMBER",
    icon: MessageCircle,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

const reveal = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: EASE },
} as const;

/* =========================================================
   SHARED PIECES
========================================================= */

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function Logo({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-black/10 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo.png"
        alt="Logótipo Vieg Yuro"
        fill
        sizes={`${size}px`}
        className="object-cover"
        priority
      />
    </span>
  );
}

function AccentStripe({ className = "h-1" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex w-full ${className}`}>
      {ACCENT.map((c) => (
        <span key={c} className="flex-1" style={{ backgroundColor: c }} />
      ))}
    </div>
  );
}

function AccentDots() {
  return (
    <span aria-hidden="true" className="inline-flex gap-1">
      {ACCENT.map((c) => (
        <span
          key={c}
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: c }}
        />
      ))}
    </span>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function Page() {
  return (
    <main className="overflow-x-clip bg-[#f7f7f5] text-[#111111] selection:bg-black selection:text-white">
      <Header />
      <Hero />
      <Catalog />
      <Founder />
      <Waitlist />
      <Footer />
    </main>
  );
}

/* =========================================================
   HEADER
========================================================= */

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-3 pt-3 sm:px-6 sm:pt-4">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex h-16 items-center justify-between rounded-2xl border border-black/[0.07] bg-white/90 px-3 shadow-[0_4px_30px_rgba(0,0,0,0.045)] backdrop-blur-2xl sm:px-4"
        >
          <a href="#" aria-label="Vieg Yuro — início" className="group flex items-center gap-3">
            <motion.span
              whileHover={{ rotate: 12, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Logo size={42} />
            </motion.span>

            <span className="leading-none">
              <span className="block text-lg font-black uppercase tracking-[-0.06em]">
                Vieg Yuro
              </span>
              <span className="mt-1 hidden text-[7px] font-bold uppercase tracking-[0.32em] text-black/40 sm:block">
                Angola · Moçambique · Mundo
              </span>
            </span>
          </a>

          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-8 md:flex"
          >
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="group relative py-3 text-[10px] font-bold uppercase tracking-[0.17em] text-black/45 transition-colors hover:text-black"
              >
                {n.label}
                <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <a
            href="#lista"
            className="rounded-xl bg-black px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.17em] text-white transition-transform active:scale-95"
          >
            Quero acesso
          </a>
        </motion.div>
      </div>
    </header>
  );
}

/* =========================================================
   HERO
========================================================= */

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between pt-28 sm:pt-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full opacity-[0.12] blur-[90px] sm:h-[28rem] sm:w-[28rem]"
        style={{
          background: `conic-gradient(${ACCENT.join(",")}, ${ACCENT[0]})`,
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-5 text-center"
      >
        <motion.div variants={item}>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-full bg-white p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
          >
            <Logo size={132} className="sm:!h-40 sm:!w-40" />
          </motion.div>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-black/55"
        >
          <AccentDots />
          Uma marca sem fronteiras
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-5 text-[19vw] font-black uppercase leading-[0.78] tracking-[-0.08em] sm:text-[13vw] lg:text-[10rem]"
        >
          Vieg
          <span className="text-black/20"> Yuro</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-lg text-sm font-medium leading-relaxed text-black/60 sm:text-base"
        >
          Nascida em Angola, a Vieg Yuro é uma marca de streetwear com presença
          em Luanda, Portugal, por toda a Europa e em Miami, nos Estados Unidos.
          Agora, trazemos a nossa identidade e visão para Moçambique.
        </motion.p>

        <motion.div variants={item}>
          <Countdown />
        </motion.div>

        <motion.div variants={item} className="w-full max-w-xl text-left">
          <WaitlistForm idSuffix="hero" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.9, ease: EASE }}
        className="mt-14 pb-10 sm:mt-20"
      >
        <Marquee images={GALLERY} />
      </motion.div>
    </section>
  );
}

function Marquee({ images }: { images: typeof GALLERY }) {
  const copies = [0, 1];

  return (
    <div className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="marquee-track">
        {copies.map((c) => (
          <ul
            key={c}
            aria-hidden={c === 1}
            className="flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4"
          >
            {images.map((img, i) => (
              <li
                key={img.src}
                className={`relative aspect-[3/4] w-[42vw] shrink-0 overflow-hidden rounded-2xl bg-[#e9e9e6] shadow-[0_12px_35px_rgba(0,0,0,0.10)] sm:w-[220px] lg:w-[260px] ${
                  i % 2 ? "mt-6 sm:mt-8" : ""
                }`}
              >
                <Image
                  src={img.src}
                  alt={c === 0 ? `${img.name} — ${img.tag}` : ""}
                  fill
                  sizes="(min-width:1024px) 260px, (min-width:640px) 220px, 42vw"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   COUNTDOWN
========================================================= */

function Countdown() {
  const [now, setNow] = React.useState<number | null>(null);

  React.useEffect(() => {
    setNow(Date.now());

    const id = window.setInterval(() => setNow(Date.now()), 1000);

    return () => window.clearInterval(id);
  }, []);

  const diff = now === null ? 0 : Math.max(0, LAUNCH_DATE.getTime() - now);

  const units = [
    { label: "dias", value: Math.floor(diff / 86400000) },
    { label: "horas", value: Math.floor((diff / 3600000) % 24) },
    { label: "min", value: Math.floor((diff / 60000) % 60) },
    { label: "seg", value: Math.floor((diff / 1000) % 60) },
  ];

  return (
    <div
      className="my-8 flex justify-center gap-5 sm:gap-8"
      role="timer"
      aria-label="Tempo até à abertura da loja"
    >
      {units.map((u) => (
        <div key={u.label} className="min-w-[3rem]">
          <div className="text-4xl font-black tabular-nums tracking-[-0.06em] sm:text-5xl">
            {now === null ? "--" : String(u.value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.25em] text-black/40">
            {u.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   WAITLIST FORM + SUCCESS SCREEN
========================================================= */

function WaitlistForm({ idSuffix }: { idSuffix: string }) {
  const [email, setEmail] = React.useState("");
  const [submittedEmail, setSubmittedEmail] = React.useState("");
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "done" | "error"
  >("idle");
  const [message, setMessage] = React.useState("");

  const id = `email-${idSuffix}`;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status === "loading") return;

    const cleanEmail = email.trim();

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
      setStatus("error");
      setMessage("Introduz um endereço de email válido.");
      return;
    }

    setStatus("loading");
    setMessage("");

    // Simulate a successful submission.
    // No API or database connection is required for this display.
    await new Promise((resolve) => setTimeout(resolve, 700));

    setSubmittedEmail(cleanEmail);
    setEmail("");
    setStatus("done");
  };

  const resetForm = () => {
    setStatus("idle");
    setSubmittedEmail("");
    setMessage("");
    setEmail("");
  };

  if (status === "done") {
    return (
      <motion.div
        role="status"
        aria-live="polite"
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: EASE }}
        className="relative w-full overflow-hidden rounded-3xl border border-black/[0.07] bg-white p-6 shadow-[0_15px_50px_rgba(0,0,0,0.07)] sm:p-8"
      >
        {/* Decorative accents */}
        <div className="absolute right-0 top-0 flex h-1 w-full">
          {ACCENT.map((color) => (
            <span
              key={color}
              className="flex-1"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <div className="flex flex-col items-center text-center">
          {/* Animated success icon */}
          <motion.div
            initial={{ scale: 0, rotate: -25 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 14,
              delay: 0.15,
            }}
            className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white shadow-[0_8px_25px_rgba(0,0,0,0.18)]"
          >
            <motion.span
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <Check size={30} strokeWidth={2.5} />
            </motion.span>

            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55, duration: 0.3 }}
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white"
              style={{ backgroundColor: ACCENT[0] }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-black" />
            </motion.span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="mb-3 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-black/40"
          >
            <AccentDots />
            Inscrição concluída
          </motion.p>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-3xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-4xl"
          >
            Estás na
            <span className="block text-black/25">lista!</span>
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-5 max-w-sm text-sm leading-relaxed text-black/55"
          >
            Obrigado pelo teu interesse na Vieg Yuro. A tua inscrição foi
            registada com sucesso. Estamos a preparar algo especial para
            Moçambique.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-6 w-full rounded-2xl border border-black/[0.07] bg-[#f7f7f5] p-4 text-left"
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/35">
              Email inscrito
            </p>
            <p className="mt-2 break-all text-sm font-bold text-black">
              {submittedEmail}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-[0.17em] text-black/35"
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ACCENT[0] }} />
            Angola
            <span className="text-black/15">/</span>
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ACCENT[1] }} />
            Moçambique
            <span className="text-black/15">/</span>
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ACCENT[2] }} />
            Mundo
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            type="button"
            onClick={resetForm}
            className="mt-7 text-[10px] font-bold uppercase tracking-[0.18em] text-black/45 underline decoration-black/20 underline-offset-4 transition-colors hover:text-black"
          >
            Inscrever outro email
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <label htmlFor={id} className="sr-only">
        Email
      </label>

      <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row">
        <input
          id={id}
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") {
              setStatus("idle");
              setMessage("");
            }
          }}
          placeholder="O teu endereço de email"
          autoComplete="email"
          aria-invalid={status === "error"}
          className={`block h-14 w-full min-w-0 flex-none rounded-2xl border bg-white px-5 text-base font-medium outline-none transition placeholder:text-sm placeholder:text-black/30 focus-visible:ring-2 focus-visible:ring-black/20 sm:h-14 sm:flex-1 sm:text-sm ${
            status === "error"
              ? "border-red-500 focus:border-red-500"
              : "border-black/10 focus:border-black"
          }`}
        />

        <motion.button
          whileTap={{ scale: 0.96 }}
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-14 w-full shrink-0 items-center justify-center gap-2 rounded-2xl bg-black px-7 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-opacity hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              A processar
            </>
          ) : (
            <>
              Entrar na lista
              <ArrowUpRight size={15} />
            </>
          )}
        </motion.button>
      </div>

      <p
        className={`mt-3 text-center text-xs sm:text-left ${
          status === "error"
            ? "font-semibold text-red-600"
            : "text-black/40"
        }`}
        role={status === "error" ? "alert" : undefined}
      >
        {status === "error"
          ? message
          : "Sem spam. Recebe novidades e acesso antecipado à chegada da marca."}
      </p>
    </form>
  );
}

/* =========================================================
   CATALOG (swipe / arrow carousel)
========================================================= */

function Catalog() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: trackRef });

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;

    if (!el) return;

    el.scrollBy({
      left: dir * Math.max(el.clientWidth * 0.7, 280),
      behavior: "smooth",
    });
  };

  return (
    <section id="catalogo" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
        <motion.div
          {...reveal}
          className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <h2 className="text-5xl font-black uppercase leading-[0.82] tracking-[-0.07em] sm:text-7xl lg:text-[5.5rem]">
            Primeiro
            <span className="block text-black/20">olhar</span>
          </h2>

          <div className="flex items-end justify-between gap-6 md:block">
            <p className="max-w-sm text-sm font-medium leading-relaxed text-black/55">
              Uma amostra da identidade Vieg Yuro. Descobre algumas das peças
              que fazem parte da nossa visão de streetwear.
            </p>

            <div className="mt-0 flex gap-2 md:mt-6">
              {([-1, 1] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => scrollBy(d)}
                  aria-label={d === 1 ? "Peça seguinte" : "Peça anterior"}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-black/60 transition-all hover:border-black hover:bg-black hover:text-white active:scale-90"
                >
                  {d === 1 ? (
                    <ChevronRight size={18} />
                  ) : (
                    <ChevronLeft size={18} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-5 pb-2 sm:gap-5 sm:px-8 lg:px-16"
      >
        {GALLERY.map((g, i) => (
          <motion.figure
            key={g.src}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 80px 0px 0px" }}
            transition={{
              duration: 0.8,
              delay: Math.min(i, 3) * 0.08,
              ease: EASE,
            }}
            className="group relative aspect-[3/4] w-[72vw] shrink-0 snap-start overflow-hidden rounded-3xl bg-[#e9e9e6] sm:w-[320px] lg:w-[360px]"
          >
            <Image
              src={g.src}
              alt={`${g.name} — ${g.tag}`}
              fill
              sizes="(min-width:1024px) 360px, (min-width:640px) 320px, 72vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
            />

            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/75 to-transparent p-5 text-white">
              <span className="text-base font-black uppercase tracking-[-0.03em]">
                {g.name}
              </span>

              <span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/75">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: ACCENT[i % ACCENT.length] }}
                />
                {g.tag}
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <div className="mx-auto mt-6 max-w-7xl px-5 sm:px-8 lg:px-16">
        <div className="h-[2px] w-full overflow-hidden rounded-full bg-black/10">
          <motion.div
            style={{ scaleX: scrollXProgress }}
            className="h-full origin-left bg-black"
          />
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FOUNDER
========================================================= */

function Founder() {
  return (
    <section
      id="fundador"
      className="scroll-mt-24 bg-white px-5 py-24 sm:px-8 lg:px-16"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        <motion.div
          {...reveal}
          className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl bg-[#e9e9e6] shadow-[0_12px_35px_rgba(0,0,0,0.10)] lg:max-w-none"
        >
          <Image
            src="/viegas.png"
            alt="Vanilson Viegas, fundador da Vieg Yuro"
            fill
            sizes="(min-width:1024px) 45vw, 100vw"
            className="object-cover"
          />
          <AccentStripe className="absolute inset-x-0 bottom-0 h-1.5" />
        </motion.div>

        <motion.div
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.15 }}
        >
          <p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-black/45">
            <AccentDots />
            Fundador
          </p>

          <h2 className="text-5xl font-black uppercase leading-[0.82] tracking-[-0.07em] sm:text-7xl">
            Vanilson
            <span className="block text-black/20">Viegas</span>
          </h2>

          <div className="mt-8 max-w-lg space-y-4 text-sm leading-relaxed text-black/60">
            <p>
              A Vieg Yuro nasceu em Angola, com uma identidade própria e uma
              visão de streetwear que ultrapassa fronteiras. A marca foi
              construindo a sua presença em Luanda, Portugal, na Europa e em
              Miami, nos Estados Unidos.
            </p>

            <p>
              Hoje, damos mais um passo nessa trajectória: expandimos para
              Moçambique, levando a nossa cultura, criatividade e forma de
              expressão a uma nova comunidade.
            </p>
          </div>

          <blockquote className="mt-8 border-l-2 border-black pl-5 text-lg font-bold leading-snug tracking-[-0.02em]">
            “Uma identidade. Várias culturas. Sem fronteiras.”
            <footer className="mt-3 text-[10px] font-bold uppercase tracking-[0.25em] text-black/40">
              Vanilson Viegas, fundador
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   WAITLIST (MAIN CTA)
========================================================= */

function Waitlist() {
  return (
    <section
      id="lista"
      className="scroll-mt-24 px-5 py-28 sm:px-8 lg:px-16"
    >
      <motion.div {...reveal} className="mx-auto max-w-3xl text-center">
        <div className="mb-8 flex justify-center">
          <Logo size={72} />
        </div>

        <h2 className="text-5xl font-black uppercase leading-[0.82] tracking-[-0.07em] sm:text-7xl">
          A Vieg Yuro
          <span className="block text-black/20">chega a Moçambique</span>
        </h2>

        <p className="mx-auto mt-8 max-w-md text-sm font-medium leading-relaxed text-black/55">
          De Luanda para o mundo e agora mais perto de ti. Inscreve-te na lista
          de espera para acompanhares a chegada da Vieg Yuro a Moçambique e
          receberes acesso antecipado à loja.
        </p>

        <div className="mx-auto mt-10 max-w-xl text-left">
          <WaitlistForm idSuffix="main" />
        </div>
      </motion.div>
    </section>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer() {
  const [year, setYear] = React.useState(2026);

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative bg-[#0d0d0f] text-white">
      <AccentStripe className="h-1" />

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Logo size={52} className="!ring-white/20" />
              <div className="text-2xl font-black uppercase tracking-[-0.05em]">
                Vieg Yuro
              </div>
            </div>

            <p className="mt-4 max-w-xs text-xs leading-5 text-white/45">
              Marca de streetwear angolana com presença internacional. Agora
              em expansão para Moçambique.
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">
              Explorar
            </p>

            <ul className="space-y-3">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white/55 transition-colors hover:text-white"
                  >
                    {l.label}
                    <ArrowUpRight className="h-3 w-3 text-white/20 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/70" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">
              Segue-nos
            </p>

            <div className="flex gap-2">
              {SOCIALS.map(({ label, href, icon: Icon }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-transparent hover:text-[#0d0d0f]"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      ACCENT[i % ACCENT.length])
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "")
                  }
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.07] pt-6 text-[9px] uppercase tracking-[0.1em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} Vieg Yuro. Todos os direitos reservados.</span>

          <a
            href="https://synctechx.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Desenvolvido pela SyncTechX"
            className="group inline-flex items-center gap-1.5 transition-colors hover:text-white/70"
          >
            Desenvolvido por{" "}
            <span className="font-black text-white/50 group-hover:text-white">
              SyncTechX
            </span>
            <ArrowUpRight className="h-2.5 w-2.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          <a
            href="#"
            aria-label="Voltar ao topo"
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            Topo <ArrowUp className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "@assets/Markaz_Rabithah_Logo_1_1777345170344.png";
import logoMark from "@assets/Logo_Markaz_Rabithah_2_1777345186295.png";
import logoOnCrimson from "@assets/Logo_Markaz_Rabithah_on_crimson_1777348637704.png";
import logoOnIvory from "@assets/Logo_Markaz_Rabithah_on_ivory_1777348637704.png";
import heroPortrait from "@/assets/hero-portrait.png";
import SiteNav from "@/components/SiteNav";
import { useReveal } from "@/hooks/use-reveal";

// ---- Scroll progress bar ----------------------------------------------------
const ScrollProgress = () => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const next = max > 0 ? (h.scrollTop / max) * 100 : 0;
      setPct(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-ivory/5 pointer-events-none"
    >
      <div
        className="h-full bg-gradient-to-r from-primary via-crimson-glow to-primary origin-left transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${pct / 100})` }}
      />
    </div>
  );
};

// ---- Animated count-up ------------------------------------------------------
const CountUp = ({
  value,
  className = "",
  duration = 1800,
}: {
  value: string;
  className?: string;
  duration?: number;
}) => {
  // Parse leading number; preserve any prefix/suffix (+, %, /, etc.)
  const match = value.match(/^([^\d.]*)([\d.]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseFloat(match[2]) : NaN;
  const suffix = match?.[3] ?? "";
  const animatable = match !== null && !Number.isNaN(target);

  const [display, setDisplay] = useState(animatable ? "0" : value);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!animatable || !ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const isInt = !value.includes(".");
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              const cur = target * eased;
              setDisplay(isInt ? String(Math.round(cur)) : cur.toFixed(1));
              if (t < 1) requestAnimationFrame(tick);
              else setDisplay(isInt ? String(Math.round(target)) : target.toFixed(1));
            };
            requestAnimationFrame(tick);
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animatable, target, value, duration]);

  return (
    <span ref={ref} className={className}>
      {animatable ? (
        <>
          {prefix}
          {display}
          {suffix}
        </>
      ) : (
        value
      )}
    </span>
  );
};

// ---- Small UI atoms ---------------------------------------------------------
const Eyebrow = ({
  num,
  children,
}: {
  num: string;
  children: React.ReactNode;
}) => (
  <div className="reveal flex items-center gap-3 mb-4 md:mb-6 text-[0.65rem] md:text-xs uppercase tracking-[0.35em] text-ivory/70 font-medium">
    <span className="text-primary">({num})</span>
    <span>{children}</span>
    <span className="h-px flex-1 bg-ivory/15 max-w-[120px]" />
  </div>
);

const CopyIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    aria-hidden="true"
  >
    <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ColorSwatch = ({
  name,
  hex,
  bg,
  textClass,
}: {
  name: string;
  hex: string;
  bg: string;
  textClass: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = hex;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      } finally {
        document.body.removeChild(ta);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy ${hex}`}
      className={`group relative p-2.5 md:p-4 h-16 md:h-24 flex flex-col justify-between text-left w-full cursor-pointer transition-transform active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary/60 ${textClass}`}
      style={{ backgroundColor: bg }}
    >
      <div className="flex items-center justify-between">
        <div className="text-[0.5rem] md:text-[0.6rem] uppercase tracking-wider opacity-70">
          Brand
        </div>
        <div className="opacity-50 group-hover:opacity-100 transition-opacity">
          {copied ? (
            <CheckIcon className="w-3 h-3 md:w-3.5 md:h-3.5" />
          ) : (
            <CopyIcon className="w-3 h-3 md:w-3.5 md:h-3.5" />
          )}
        </div>
      </div>
      <div>
        <div className="font-display font-bold text-xs md:text-base">{name}</div>
        <div className="text-[0.6rem] md:text-xs mt-0.5 md:mt-1 opacity-80 font-mono">
          {copied ? "Copied!" : hex}
        </div>
      </div>
    </button>
  );
};

const CloseIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
  </svg>
);

const Lightbox = ({
  open,
  onClose,
  title,
  caption,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  caption?: string;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-8 animate-in fade-in duration-200"
      style={{ background: "rgba(5, 12, 24, 0.92)", backdropFilter: "blur(16px)" }}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-3 right-3 md:top-5 md:right-5 z-10 w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full border border-ivory/15 bg-background/60 text-ivory hover:bg-primary hover:border-primary transition-colors"
      >
        <CloseIcon className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      {title && (
        <div className="absolute top-4 md:top-6 left-4 md:left-6 z-10 text-[0.55rem] md:text-[0.65rem] uppercase tracking-[0.3em] text-ivory/60">
          {title}
        </div>
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-auto"
      >
        {children}
      </div>

      {caption && (
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 text-[0.6rem] md:text-xs text-ivory/50 text-center px-4">
          {caption}
        </div>
      )}
    </div>
  );
};

const PlusMark = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M12 4v16M4 12h16" strokeLinecap="round" />
  </svg>
);

// ---- Main page --------------------------------------------------------------
type LightboxKey = null | "logo" | "typography";

const Index = () => {
  useReveal();
  const [lightbox, setLightbox] = useState<LightboxKey>(null);
  const location = useLocation();

  // Handle scroll-to-hash when arriving from other pages (e.g. /mockup -> /#tentang)
  useEffect(() => {
    const stateScrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo;
    const hash = stateScrollTo || (location.hash ? location.hash.slice(1) : "");
    if (!hash) return;
    // Wait for DOM to mount fully then scroll smoothly to the section.
    const t = window.setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(t);
  }, [location.hash, location.state]);

  const missions = [
    {
      n: "01",
      t: "Manhaj Azhary",
      ar: "منهج أزهري",
      d: "Mewarisi metodologi keilmuan Al-Azhar yang moderat (wasathiy), berimbang, dan bersanad — menjaga keaslian transmisi ilmu lebih dari seribu tahun.",
    },
    {
      n: "02",
      t: "Ilmu Alat",
      ar: "علم الآلة",
      d: "Membangun fondasi Nahwu, Sharaf, dan Balaghah sebagai kunci memahami turats dan kitab-kitab klasik secara mandiri.",
    },
    {
      n: "03",
      t: "Al-Qur'an",
      ar: "القرآن الكريم",
      d: "Menghafal, mentadabburi, dan menjaga hubungan santri dengan Kalamullah — sebagai sumber utama ilmu dan akhlak.",
    },
    {
      n: "04",
      t: "Akhlak",
      ar: "الأخلاق",
      d: "Membentuk adab luhur — cermin santri ideal yang tawadhu', berintegritas, dan siap menebar manfaat di tengah umat.",
    },
  ];

  const stats = [
    { v: "1000+", l: "Tahun warisan keilmuan Al-Azhar" },
    { v: "4", l: "Pilar tarbiyah utama" },
    { v: "24/7", l: "Pendampingan musyrif" },
  ];

  const program = [
    {
      t: "Tahsin & Tahfizh",
      d: "Penguatan bacaan dan target hafalan harian dengan metode talaqqi.",
    },
    {
      t: "Bahasa Arab Intensif",
      d: "Nahwu, Sharaf, Balaghah, Insya', dan Muhadatsah dengan kitab-kitab muktabar.",
    },
    {
      t: "Studi Turats",
      d: "Membaca langsung kitab kuning bidang Aqidah, Fiqh, dan Ushul.",
    },
    {
      t: "Tarbiyah Akhlak",
      d: "Halaqah adab, ta'lim, dan pembiasaan sunnah harian.",
    },
    {
      t: "Persiapan Imtihan",
      d: "Latihan ujian masuk Al-Azhar (Buuts Islamiyah & jalur reguler).",
    },
    {
      t: "Bimbingan Karir Ilmiah",
      d: "Konsultasi rumpun keilmuan dan jurusan di Al-Azhar.",
    },
  ];

  return (
    <main id="top" className="relative text-ivory overflow-x-hidden" style={{ backgroundColor: "hsl(var(--navy-deep))" }}>
      <ScrollProgress />

      {/* GLOBAL ELEGANT AMBIENT BACKGROUND ================================== */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% -10%, hsl(215 55% 19%) 0%, transparent 55%)," +
            "radial-gradient(ellipse 60% 50% at 110% 35%, hsl(0 55% 22% / 0.22) 0%, transparent 60%)," +
            "radial-gradient(ellipse 70% 50% at -10% 70%, hsl(40 50% 70% / 0.05) 0%, transparent 55%)," +
            "radial-gradient(ellipse 70% 60% at 50% 110%, hsl(215 60% 16%) 0%, transparent 55%)," +
            "linear-gradient(180deg, hsl(215 70% 11%) 0%, hsl(var(--navy-deep)) 50%, hsl(215 75% 9%) 100%)",
        }}
      />
      {/* slow drifting aurora blobs for depth */}
      <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full blur-3xl animate-aurora"
          style={{ background: "radial-gradient(circle, hsl(0 70% 32% / 0.18), transparent 60%)" }}
        />
        <div
          className="absolute -bottom-1/4 -right-1/4 w-[55vw] h-[55vw] rounded-full blur-3xl animate-aurora"
          style={{ background: "radial-gradient(circle, hsl(215 60% 30% / 0.22), transparent 60%)", animationDelay: "-7s" }}
        />
      </div>
      {/* edge vignette */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, hsl(215 80% 5% / 0.85) 100%)",
        }}
      />
      {/* subtle film grain via repeating noise SVG */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <SiteNav />

      {/* LOGO HERO (splash) ================================================ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-6 overflow-hidden">
        {/* Background portrait — sits behind the logo, anchored to bottom */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 top-0 flex items-end justify-center pointer-events-none"
        >
          <img
            src={heroPortrait}
            alt=""
            className="h-[88%] md:h-[95%] w-auto object-contain object-bottom opacity-10 md:opacity-[0.12] select-none animate-float-slow"
            style={{
              filter:
                "drop-shadow(0 30px 60px rgba(0,0,0,0.55)) drop-shadow(0 0 80px rgba(178,34,34,0.18))",
              maskImage:
                "linear-gradient(180deg, transparent 0%, #000 18%, #000 88%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(180deg, transparent 0%, #000 18%, #000 88%, transparent 100%)",
            }}
          />
        </div>
        {/* Subtle vignette over portrait so foreground content stays readable */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 35%, hsl(215 80% 7% / 0.55) 80%, hsl(215 80% 6% / 0.85) 100%)",
          }}
        />

        <div className="reveal relative w-[260px] md:w-full md:max-w-md mx-auto aspect-square flex items-center justify-center animate-float">
          {/* Aurora glow behind logo */}
          <div
            aria-hidden
            className="absolute inset-[20%] rounded-full blur-3xl animate-slow-pulse"
            style={{ background: "radial-gradient(circle, hsl(var(--crimson) / 0.45), transparent 65%)" }}
          />
          <img
            src={logoMark}
            alt="Markaz Rabithah"
            className="relative w-3/5 h-auto object-contain drop-shadow-[0_0_60px_rgba(178,34,34,0.4)]"
          />
        </div>

        {/* arabic name beneath */}
        <div className="relative mt-6 md:mt-8 text-center reveal" style={{ transitionDelay: "300ms" }}>
          <div className="font-arabic text-2xl md:text-4xl text-ivory/70 leading-none flex items-baseline justify-center gap-1" dir="rtl">
            <span>مركز الرابطة</span>
            <span aria-hidden className="inline-block w-[2px] h-6 md:h-8 bg-primary animate-caret-blink translate-y-1" />
          </div>
        </div>

        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 text-primary animate-slow-pulse">
          <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 animate-float" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* LOGO GRID CONSTRUCTION =========================================== */}
      <section className="relative md:min-h-screen flex items-center pt-12 pb-14 md:pt-32 md:pb-28 px-4 md:px-6">
        <div className="container-brand max-w-6xl mx-auto relative w-full">
          <Eyebrow num="00">Logo Grid System</Eyebrow>
          <h2 className="reveal font-display font-extrabold text-2xl md:text-6xl leading-[1.05] text-ivory max-w-3xl mb-6 md:mb-12">
            Konstruksi logo,{" "}
            <span className="text-primary text-shimmer">terukur presisi.</span>
          </h2>

          {/* Construction canvas */}
          <div className="reveal relative w-full max-w-3xl mx-auto aspect-square bg-background border border-ivory/10 overflow-hidden">
            {/* Vertical grid lines */}
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={`v-${i}`}
                  className="absolute top-0 bottom-0 w-px bg-ivory/15"
                  style={{ left: `${((i + 1) * 100) / 10}%` }}
                />
              ))}
            </div>
            {/* Horizontal grid lines */}
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={`h-${i}`}
                  className="absolute left-0 right-0 h-px bg-ivory/15"
                  style={{ top: `${((i + 1) * 100) / 10}%` }}
                />
              ))}
            </div>
            {/* Diagonal guide lines */}
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full"
              >
                <line x1="0" y1="0" x2="100" y2="100" stroke="rgba(244,238,228,0.12)" strokeWidth="0.15" />
                <line x1="100" y1="0" x2="0" y2="100" stroke="rgba(244,238,228,0.12)" strokeWidth="0.15" />
                <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(178,34,34,0.35)" strokeWidth="0.2" strokeDasharray="0.6,0.6" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(178,34,34,0.35)" strokeWidth="0.2" strokeDasharray="0.6,0.6" />
              </svg>
            </div>
            {/* Safe area circle */}
            <div aria-hidden className="absolute inset-[10%] rounded-full border border-ivory/10 pointer-events-none" />
            <div aria-hidden className="absolute inset-[20%] rounded-full border border-ivory/10 pointer-events-none" />

            {/* Logo at center */}
            <div className="absolute inset-[20%] flex items-center justify-center">
              <img
                src={logoMark}
                alt="Markaz Rabithah"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Anchor points on logo bounding box */}
            <div aria-hidden className="absolute inset-[20%] pointer-events-none">
              {[
                { top: "0%", left: "0%" },
                { top: "0%", left: "50%" },
                { top: "0%", left: "100%" },
                { top: "50%", left: "0%" },
                { top: "50%", left: "100%" },
                { top: "100%", left: "0%" },
                { top: "100%", left: "50%" },
                { top: "100%", left: "100%" },
              ].map((p, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-primary border border-ivory animate-anchor-pulse"
                  style={{
                    top: p.top,
                    left: p.left,
                    transform: "translate(-50%,-50%)",
                    animationDelay: `${i * 180}ms`,
                  }}
                />
              ))}
            </div>

            {/* Horizontal scan line drifting through the canvas */}
            <div
              aria-hidden
              className="absolute left-0 right-0 h-px pointer-events-none animate-scan-line"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(var(--crimson) / 0.85) 50%, transparent)",
                boxShadow: "0 0 12px hsl(var(--crimson) / 0.4)",
              }}
            />

            {/* Corner markers */}
            <div aria-hidden className="absolute top-2 left-2 md:top-3 md:left-3 text-primary">
              <PlusMark className="w-3 h-3 md:w-4 md:h-4" />
            </div>
            <div aria-hidden className="absolute top-2 right-2 md:top-3 md:right-3 text-primary">
              <PlusMark className="w-3 h-3 md:w-4 md:h-4" />
            </div>
            <div aria-hidden className="absolute bottom-2 left-2 md:bottom-3 md:left-3 text-primary">
              <PlusMark className="w-3 h-3 md:w-4 md:h-4" />
            </div>
            <div aria-hidden className="absolute bottom-2 right-2 md:bottom-3 md:right-3 text-primary">
              <PlusMark className="w-3 h-3 md:w-4 md:h-4" />
            </div>

            {/* Measurement labels */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[0.5rem] md:text-[0.6rem] uppercase tracking-[0.3em] text-ivory/50 font-medium">
              10 × 10 grid
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[0.5rem] md:text-[0.6rem] uppercase tracking-[0.3em] text-primary/80 font-medium">
              Markaz Rabithah
            </div>
          </div>

          {/* Caption */}
          <div className="reveal mt-5 md:mt-8 max-w-2xl mx-auto text-center">
            <p className="text-[0.7rem] md:text-sm text-ivory/60 leading-relaxed">
              Logo dibangun di atas grid <span className="text-ivory">10 × 10</span> dengan
              area aman <span className="text-ivory">20%</span> di setiap sisi —
              menjaga proporsi tetap konsisten di setiap aplikasi.
            </p>
          </div>

          <div className="reveal stagger mt-6 md:mt-10 grid grid-cols-3 gap-2 md:gap-5 max-w-md md:max-w-lg mx-auto">
            {stats.map((s) => (
              <div key={s.l} className="reveal text-center">
                <div className="font-display font-bold text-base md:text-2xl text-primary">
                  <CountUp value={s.v} />
                </div>
                <div className="text-[0.55rem] md:text-[0.65rem] uppercase tracking-wider text-ivory/55 mt-1 leading-snug">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TENTANG =========================================================== */}
      <section id="tentang" className="py-12 md:py-32 px-4 md:px-6">
        <div className="container-brand max-w-6xl mx-auto grid md:grid-cols-12 gap-6 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow num="01">Tentang Kami</Eyebrow>
            <h2 className="reveal font-display font-extrabold text-2xl md:text-5xl leading-[1.05] text-ivory mb-4 md:mb-6">
              Mediator yang menjaga rantai sanad tetap tersambung.
            </h2>
            <p className="reveal text-xs md:text-base text-ivory/65 leading-relaxed">
              Sebagai Mahad persiapan Al-Azhar, kami berdiri di antara semangat
              santri muda dan warisan keilmuan yang berusia lebih dari seribu
              tahun. Kurikulum kami dirancang adaptif namun tetap bersanad —
              menjawab kebutuhan zaman tanpa kehilangan akar tradisi.
            </p>
          </div>

          <div className="md:col-span-7 grid sm:grid-cols-2 gap-3 md:gap-8">
            {[
              {
                t: "Bersanad",
                d: "Kolaborasi erat dengan masyayikh dan ulama sanad untuk menjaga kemurnian manhaj.",
              },
              {
                t: "Adaptif",
                d: "Kurikulum disesuaikan dengan latar dan kecepatan setiap santri tanpa menurunkan standar.",
              },
              {
                t: "Komunitas",
                d: "Lingkungan santri yang saling menguatkan — halaqah, mudzakarah, dan ukhuwah aktif.",
              },
              {
                t: "Berorientasi Al-Azhar",
                d: "Fokus pada kesiapan akademik, bahasa, dan adab untuk diterima di Al-Azhar asy-Syarif.",
              },
            ].map((c, i) => (
              <div
                key={c.t}
                className="reveal lift shine border border-ivory/10 p-3 md:p-5 hover:border-primary/40 group"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start justify-between mb-2 md:mb-3">
                  <span className="text-primary text-[0.65rem] md:text-sm font-bold">
                    0{i + 1}
                  </span>
                  <PlusMark className="w-3 h-3 md:w-3.5 md:h-3.5 text-ivory/30 group-hover:text-primary group-hover:rotate-90 transition-all duration-500" />
                </div>
                <h3 className="font-display font-bold text-sm md:text-lg text-ivory mb-1 md:mb-1.5">
                  {c.t}
                </h3>
                <p className="text-[0.7rem] md:text-xs text-ivory/60 leading-relaxed">
                  {c.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILOSOFI ========================================================== */}
      <section id="filosofi" className="py-12 md:py-32 px-4 md:px-6 relative">
        <div
          aria-hidden
          className="absolute right-0 top-0 bottom-0 w-1/2 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(244,238,228,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 100%",
          }}
        />
        <div className="container-brand max-w-6xl mx-auto relative">
          <Eyebrow num="02">Filosofi Nama</Eyebrow>
          <h2 className="reveal font-display font-extrabold text-2xl md:text-6xl leading-[1.05] text-ivory max-w-3xl mb-8 md:mb-20">
            Dua kata,{" "}
            <span className="text-primary text-shimmer">satu arah gerak.</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 md:gap-20">
            <div className="reveal">
              <div className="flex items-baseline gap-3 md:gap-4 mb-3 md:mb-5">
                <span className="font-display font-extrabold text-primary text-4xl md:text-7xl leading-none">
                  01
                </span>
                <h3 className="font-display font-bold text-xl md:text-3xl text-ivory">
                  Markaz
                </h3>
              </div>
              <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.3em] text-primary/80 mb-3 md:mb-4">
                /مَرْكَز/ · Pusat
              </p>
              <p className="text-xs md:text-base text-ivory/70 leading-relaxed">
                Markaz adalah <span className="text-ivory">titik orbit</span> —
                tempat ilmu berkumpul sebelum ia menyebar. Ia memberi arah bagi
                setiap langkah santri: dari mana ia berangkat, ke mana ia
                menuju, dan dengan ilmu apa ia kembali.
              </p>
              <ul className="mt-4 md:mt-6 space-y-1.5 md:space-y-2 text-[0.7rem] md:text-sm text-ivory/55">
                <li className="flex gap-2"><span className="text-primary">·</span> Pusat pembelajaran ilmu alat</li>
                <li className="flex gap-2"><span className="text-primary">·</span> Pusat tahsin dan tahfizh</li>
                <li className="flex gap-2"><span className="text-primary">·</span> Pusat tarbiyah adab dan akhlak</li>
              </ul>
            </div>

            <div className="reveal" style={{ transitionDelay: "120ms" }}>
              <div className="flex items-baseline gap-3 md:gap-4 mb-3 md:mb-5">
                <span className="font-display font-extrabold text-primary text-4xl md:text-7xl leading-none">
                  02
                </span>
                <h3 className="font-display font-bold text-xl md:text-3xl text-ivory">
                  Rabithah
                </h3>
              </div>
              <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.3em] text-primary/80 mb-3 md:mb-4">
                /رَابِطَة/ · Ikatan
              </p>
              <p className="text-xs md:text-base text-ivory/70 leading-relaxed">
                Rabithah adalah{" "}
                <span className="text-ivory">tali yang mengikat tiga simpul</span>
                : santri, ulama, dan Al-Azhar asy-Syarif. Ia menjaga
                transmisi ilmu tetap bersambung — sanad tidak terputus, ruh
                tidak hilang.
              </p>
              <ul className="mt-4 md:mt-6 space-y-1.5 md:space-y-2 text-[0.7rem] md:text-sm text-ivory/55">
                <li className="flex gap-2"><span className="text-primary">·</span> Ikatan dengan masyayikh dan ulama sanad</li>
                <li className="flex gap-2"><span className="text-primary">·</span> Ikatan dengan tradisi keilmuan Al-Azhar</li>
                <li className="flex gap-2"><span className="text-primary">·</span> Ikatan persaudaraan antar santri</li>
              </ul>
            </div>
          </div>

          {/* arabic kaligrafi quote */}
          <div className="reveal mt-10 md:mt-24 border-y border-ivory/10 py-7 md:py-14 text-center">
            <p className="font-arabic text-3xl md:text-6xl text-ivory mb-3 md:mb-5 leading-[1.4]" dir="rtl">
              العِلْمُ نُورٌ، وَالسَّنَدُ حَبْلٌ لَا يَنْقَطِعُ
            </p>
            <p className="text-[0.7rem] md:text-sm text-ivory/55 italic">
              "Ilmu adalah cahaya, dan sanad adalah tali yang tidak putus."
            </p>
          </div>
        </div>
      </section>

      {/* PILAR MISI ======================================================== */}
      <section id="pilar" className="py-12 md:py-32 px-4 md:px-6">
        <div className="container-brand max-w-6xl mx-auto">
          <Eyebrow num="03">Pilar Misi</Eyebrow>
          <h2 className="reveal font-display font-extrabold text-2xl md:text-6xl leading-[1.05] text-ivory max-w-3xl mb-8 md:mb-16">
            Empat pondasi,{" "}
            <span className="text-primary text-shimmer">satu santri utuh.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ivory/10">
            {missions.map((m, i) => (
              <div
                key={m.t}
                className="reveal shine group relative bg-background p-4 md:p-7 transition-all duration-500 hover:bg-navy-light/40 hover:-translate-y-1"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start justify-between mb-3 md:mb-6">
                  <span className="font-display font-extrabold text-primary text-xl md:text-4xl">
                    {m.n}
                  </span>
                  <span className="font-arabic text-xl md:text-3xl text-ivory/55 group-hover:text-primary transition-colors leading-none" dir="rtl">
                    {m.ar}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base md:text-2xl text-ivory mb-1.5 md:mb-2.5">
                  {m.t}
                </h3>
                <p className="text-[0.7rem] md:text-sm text-ivory/65 leading-relaxed max-w-md">
                  {m.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAM =========================================================== */}
      <section id="program" className="py-12 md:py-32 px-4 md:px-6">
        <div className="container-brand max-w-6xl mx-auto">
          <Eyebrow num="04">Program Pembelajaran</Eyebrow>
          <h2 className="reveal font-display font-extrabold text-2xl md:text-6xl leading-[1.05] text-ivory max-w-3xl mb-8 md:mb-16">
            Persiapan menyeluruh, <span className="text-primary text-shimmer">terstruktur.</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {program.map((p, i) => (
              <div
                key={p.t}
                className="reveal lift shine border border-ivory/10 p-3 md:p-5 hover:border-primary/40 hover:bg-navy-light/30"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="text-primary text-[0.65rem] md:text-xs font-bold mb-1.5 md:mb-2">
                  0{i + 1}
                </div>
                <h3 className="font-display font-bold text-sm md:text-base text-ivory mb-1 md:mb-1.5">
                  {p.t}
                </h3>
                <p className="text-[0.7rem] md:text-xs text-ivory/60 leading-relaxed">
                  {p.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IDENTITAS VISUAL ================================================== */}
      <section id="identitas" className="py-12 md:py-32 px-4 md:px-6">
        <div className="container-brand max-w-6xl mx-auto">
          <Eyebrow num="05">Identitas Visual</Eyebrow>
          <h2 className="reveal font-display font-extrabold text-2xl md:text-6xl leading-[1.05] text-ivory max-w-3xl mb-6 md:mb-10">
            Bahasa visual <span className="text-primary text-shimmer">yang jujur.</span>
          </h2>

          {/* Download Assets CTA */}
          <div id="download" className="reveal mb-8 md:mb-14 scroll-mt-28">
            <a
              href="https://drive.google.com/drive/folders/1V5eahQZpSaXwpekZ7RcK6ZRRNwHjVw1V?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="shine group relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 p-4 md:p-6 bg-primary hover:bg-primary/90 border border-primary text-ivory transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_60px_-15px_rgba(178,34,34,0.7)]"
            >
              <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-ivory/15 group-hover:bg-ivory/25 transition-colors shrink-0">
                {/* pulsing ring around the icon */}
                <span aria-hidden className="absolute inset-0 rounded-full border border-ivory/40 animate-ping-ring" />
                <span aria-hidden className="absolute inset-0 rounded-full border border-ivory/30 animate-ping-ring" style={{ animationDelay: "-1.3s" }} />
                <svg viewBox="0 0 24 24" className="relative w-5 h-5 md:w-6 md:h-6 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.3em] text-ivory/75 mb-1">
                  Brand Asset Pack
                </div>
                <div className="font-display font-extrabold text-lg md:text-2xl leading-tight">
                  Download Aset Brand Lengkap
                </div>
                <div className="text-[0.7rem] md:text-sm text-ivory/80 mt-1 md:mt-1.5 leading-relaxed">
                  Logo (PNG, SVG), palet warna, font Sk Modernist & Qahwa Arabic — semua tersedia di Google Drive.
                </div>
              </div>
              <div className="flex items-center gap-2 text-[0.65rem] md:text-xs uppercase tracking-[0.25em] font-semibold border border-ivory/30 group-hover:border-ivory rounded-full px-4 py-2.5 md:px-5 md:py-3 shrink-0 self-stretch md:self-auto justify-center transition-colors">
                <span>Buka Drive</span>
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </a>
          </div>

          <div className="mb-8 md:mb-12">
            <button
              type="button"
              onClick={() => setLightbox("logo")}
              aria-label="Lihat logo dari dekat"
              className="reveal shine group relative w-full aspect-[16/9] bg-navy-light/40 border border-ivory/10 flex items-center justify-center p-8 md:p-16 cursor-zoom-in hover:border-primary/40 hover:bg-navy-light/55 transition-all overflow-hidden"
            >
              <img
                src={logo}
                alt="Logo on dark"
                className="max-w-[60%] md:max-w-[40%] h-auto transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute top-3 right-3 md:top-4 md:right-4 flex items-center gap-1.5 text-[0.55rem] md:text-[0.65rem] uppercase tracking-[0.25em] text-ivory/45 group-hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" strokeLinecap="round" />
                </svg>
                <span className="hidden md:inline">Klik untuk perbesar</span>
                <span className="md:hidden">Perbesar</span>
              </div>
            </button>
          </div>

          {/* color palette */}
          <div className="reveal mb-6 md:mb-10">
            <div className="flex items-center justify-between mb-3 md:mb-5">
              <div className="text-[0.6rem] md:text-xs uppercase tracking-[0.3em] text-ivory/60">
                Palet Warna
              </div>
              <div className="text-[0.55rem] md:text-[0.65rem] uppercase tracking-[0.25em] text-ivory/40">
                Klik untuk salin
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {[
                { name: "Deep Navy", hex: "#0A1D37", text: "text-ivory" },
                { name: "Crimson Tarbush", hex: "#B22222", text: "text-ivory" },
                { name: "Ivory", hex: "#F4EEE4", text: "text-navy-deep" },
              ].map((c) => (
                <ColorSwatch
                  key={c.name}
                  name={c.name}
                  hex={c.hex}
                  bg={c.hex}
                  textClass={c.text}
                />
              ))}
            </div>
          </div>

          {/* typography */}
          <button
            type="button"
            onClick={() => setLightbox("typography")}
            aria-label="Lihat tipografi dari dekat"
            className="reveal shine group block w-full text-left border border-ivory/10 p-3 md:p-6 cursor-zoom-in hover:border-primary/40 hover:bg-navy-light/30 transition-all"
          >
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <div className="text-[0.6rem] md:text-xs uppercase tracking-[0.3em] text-ivory/60">
                Tipografi
              </div>
              <div className="flex items-center gap-1.5 text-[0.55rem] md:text-[0.65rem] uppercase tracking-[0.25em] text-ivory/45 group-hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" strokeLinecap="round" />
                </svg>
                <span>Perbesar</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-start">
              <div>
                <div className="font-display font-extrabold text-2xl md:text-4xl text-primary leading-none">
                  Sk Modernist
                </div>
                <div className="mt-1.5 md:mt-2 text-[0.7rem] md:text-xs text-ivory/60">
                  Display & Body — geometris, ringkas, modern.
                </div>
              </div>
              <div className="text-xs md:text-base text-ivory/85 font-medium leading-relaxed">
                <div>Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll</div>
                <div>Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww</div>
                <div>Xx Yy Zz · 1234567890</div>
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* LIGHTBOX MODALS =================================================== */}
      <Lightbox
        open={lightbox === "logo"}
        onClose={() => setLightbox(null)}
        title="Logo · Tampilan Detail"
        caption="Tekan ESC atau klik area gelap untuk menutup"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ivory/10 border border-ivory/10">
          {[
            { bg: "hsl(var(--navy-deep))", label: "On Navy", src: logo, textOnLight: false },
            { bg: "#B22222", label: "On Crimson", src: logoOnCrimson, textOnLight: false },
            { bg: "#F4EEE4", label: "On Ivory", src: logoOnIvory, textOnLight: true },
          ].map((v) => (
            <div
              key={v.label}
              className="relative aspect-[4/3] md:aspect-square flex items-center justify-center p-6 md:p-10"
              style={{ backgroundColor: v.bg }}
            >
              <img src={v.src} alt={`Logo ${v.label}`} className="w-3/4 h-auto object-contain" />
              <div
                className="absolute bottom-3 left-3 md:bottom-4 md:left-4 text-[0.55rem] md:text-[0.65rem] uppercase tracking-[0.3em] font-medium opacity-70"
                style={{ color: v.textOnLight ? "hsl(var(--navy-deep))" : "rgb(244 238 228)" }}
              >
                {v.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ivory/10 border-x border-b border-ivory/10">
          <div className="relative bg-background flex items-center justify-center p-8 md:p-12 aspect-[4/3] md:aspect-[2/1]">
            <img src={logoMark} alt="Logo Mark" className="w-1/2 h-auto object-contain" />
            <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 text-[0.55rem] md:text-[0.65rem] uppercase tracking-[0.3em] text-ivory/60 font-medium">
              Mark · Navy
            </div>
          </div>
          <div className="relative flex items-center justify-center p-8 md:p-12 aspect-[4/3] md:aspect-[2/1]" style={{ backgroundColor: "#F4EEE4" }}>
            <img src={logoMark} alt="Logo Mark on Ivory" className="w-1/2 h-auto object-contain" />
            <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 text-[0.55rem] md:text-[0.65rem] uppercase tracking-[0.3em] font-medium opacity-70" style={{ color: "hsl(var(--navy-deep))" }}>
              Mark · Ivory
            </div>
          </div>
        </div>
      </Lightbox>

      <Lightbox
        open={lightbox === "typography"}
        onClose={() => setLightbox(null)}
        title="Tipografi · Tampilan Detail"
        caption="Tekan ESC atau klik area gelap untuk menutup"
      >
        <div className="bg-background border border-ivory/10 p-6 md:p-12">
          <div className="text-[0.6rem] md:text-xs uppercase tracking-[0.3em] text-primary mb-2 md:mb-3">
            Sk Modernist · Bold
          </div>
          <div className="font-display font-extrabold text-ivory text-5xl md:text-9xl leading-[0.95] tracking-tight mb-6 md:mb-10">
            Aa Bb Cc
          </div>
          <div className="font-display font-extrabold text-ivory text-3xl md:text-6xl leading-[1] mb-2 md:mb-3">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
          </div>
          <div className="font-display font-extrabold text-ivory/85 text-3xl md:text-6xl leading-[1] mb-2 md:mb-3">
            abcdefghijklmnopqrstuvwxyz
          </div>
          <div className="font-display font-extrabold text-primary text-3xl md:text-6xl leading-[1] mb-6 md:mb-10">
            0 1 2 3 4 5 6 7 8 9
          </div>

          <div className="border-t border-ivory/10 pt-5 md:pt-8 grid md:grid-cols-3 gap-5 md:gap-8">
            <div>
              <div className="text-[0.55rem] md:text-[0.65rem] uppercase tracking-[0.3em] text-ivory/50 mb-1.5 md:mb-2">
                Display
              </div>
              <div className="font-display font-extrabold text-ivory text-3xl md:text-5xl leading-tight">
                Bismillah
              </div>
            </div>
            <div>
              <div className="text-[0.55rem] md:text-[0.65rem] uppercase tracking-[0.3em] text-ivory/50 mb-1.5 md:mb-2">
                Subheading
              </div>
              <div className="font-display font-bold text-ivory text-xl md:text-2xl leading-snug">
                Markaz Rabithah
              </div>
            </div>
            <div>
              <div className="text-[0.55rem] md:text-[0.65rem] uppercase tracking-[0.3em] text-ivory/50 mb-1.5 md:mb-2">
                Body
              </div>
              <div className="text-ivory/80 text-sm md:text-base leading-relaxed">
                Kokoh ilmunya, terjaga hafalannya, luhur akhlaknya.
              </div>
            </div>
          </div>
        </div>
      </Lightbox>

      {/* CTA / KONTAK ====================================================== */}
      <section
        id="kontak"
        className="py-12 md:py-32 px-4 md:px-6 relative overflow-hidden"
      >
        <div className="container-brand max-w-4xl mx-auto text-center relative">
          <div className="reveal text-primary mb-4 md:mb-6 flex justify-center">
            <PlusMark className="w-5 h-5 md:w-7 md:h-7" />
          </div>
          <div className="reveal text-[0.6rem] md:text-xs uppercase tracking-[0.3em] text-ivory/50 mb-3 md:mb-5">
            Brand Identity by
          </div>
          <h2 className="reveal font-display font-extrabold text-2xl md:text-6xl leading-[1.05] text-ivory mb-4 md:mb-6">
            Butuh identitas visual <br />
            <span className="text-primary text-shimmer">untuk brand-mu?</span>
          </h2>
          <p className="reveal text-xs md:text-base text-ivory/65 max-w-xl mx-auto mb-6 md:mb-10 leading-relaxed">
            Brand guideline ini dirancang oleh <span className="text-ivory font-semibold">SYMP Studio</span> —
            studio desain yang membantu lembaga, sekolah, dan brand membangun
            identitas visual yang jujur dan tahan lama.
          </p>
          <div className="reveal flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <a
              href="https://wa.me/6281311506025"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 md:px-7 py-2.5 md:py-3.5 bg-primary hover:bg-primary/90 text-ivory text-[0.65rem] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.25em] font-semibold rounded-sm transition-colors"
            >
              Hubungi SYMP Studio
            </a>
            <a
              href="https://wa.me/6281311506025"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 md:px-7 py-2.5 md:py-3.5 border border-ivory/20 hover:border-primary hover:text-primary text-ivory/85 text-[0.65rem] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.25em] font-semibold rounded-sm transition-colors"
            >
              +62 813-1150-6025
            </a>
          </div>

          <div className="reveal mt-10 md:mt-16 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 text-left max-w-3xl mx-auto pt-6 md:pt-10">
            <div>
              <div className="text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.3em] text-ivory/50 mb-1.5 md:mb-2">Studio</div>
              <div className="text-xs md:text-sm text-ivory/85 font-medium">SYMP Studio</div>
            </div>
            <div>
              <div className="text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.3em] text-ivory/50 mb-1.5 md:mb-2">Layanan</div>
              <div className="text-xs md:text-sm text-ivory/85 font-medium">Brand Identity & Visual Design</div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.3em] text-ivory/50 mb-1.5 md:mb-2">WhatsApp</div>
              <a
                href="https://wa.me/6281311506025"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs md:text-sm text-ivory/85 font-medium hover:text-primary"
              >
                +62 813-1150-6025
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Index;

import { useEffect, useRef } from "react";
import logo from "@/assets/logo-markaz-rabithah.png";
import { useReveal } from "@/hooks/use-reveal";

// ---- Asterisk mark (signature element, like reference) ---------------------
const Asterisk = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor" aria-hidden="true">
    <g>
      {[0, 45, 90, 135].map((r) => (
        <rect key={r} x="44" y="8" width="12" height="84" rx="3" transform={`rotate(${r} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="10" />
    </g>
  </svg>
);

// ---- Plus mark (corner markers, like reference) -----------------------------
const PlusMark = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M12 4v16M4 12h16" />
  </svg>
);

// ---- Numbered eyebrow: (01)  Label ------------------------------------------
const Eyebrow = ({ num, children }: { num: string; children: React.ReactNode }) => (
  <div className="reveal flex items-center gap-3 mb-8 text-sm md:text-base font-semibold">
    <span className="text-primary">({num})</span>
    <span className="text-ivory">{children}</span>
  </div>
);

// ---- Side vertical label (like W. / Honors in reference) --------------------
const SideLabel = ({ top, letter, word }: { top: string; letter: string; word: string }) => (
  <div
    className="hidden lg:flex fixed right-0 z-40 flex-col items-center bg-ivory text-navy-deep select-none"
    style={{ top }}
  >
    <div className="px-3 py-2 text-lg font-black border-b border-navy-deep/20">{letter}</div>
    <div className="px-3 py-4 text-xs font-semibold tracking-wider" style={{ writingMode: "vertical-rl" }}>
      {word}
    </div>
  </div>
);

// ---- Main page --------------------------------------------------------------
const Index = () => {
  useReveal();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const y = window.scrollY;
      heroRef.current.style.opacity = `${Math.max(0, 1 - y / 700)}`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const missions = [
    { t: "Manhaj Azhary", d: "Mewarisi metodologi keilmuan Al-Azhar yang moderat, berimbang, dan bersanad." },
    { t: "Ilmu Alat", d: "Membangun fondasi Nahwu, Sharaf, dan Balaghah sebagai kunci memahami turats." },
    { t: "Al-Qur'an", d: "Menghafal, mentadabburi, dan menjaga hubungan santri dengan Kalamullah." },
    { t: "Akhlak", d: "Membentuk adab luhur — cermin santri ideal yang tawadhu' dan berintegritas." },
  ];

  return (
    <main className="relative overflow-x-hidden bg-background text-foreground">
      {/* Corner asterisk + plus (signature frame) */}
      <div className="fixed top-3 left-3 md:top-6 md:left-6 z-40 text-primary">
        <Asterisk className="w-4 h-4 md:w-6 md:h-6" />
      </div>
      <div className="fixed top-3 right-3 md:top-6 md:right-6 z-40 text-primary">
        <PlusMark className="w-4 h-4 md:w-6 md:h-6" />
      </div>
      <div className="fixed bottom-3 left-3 md:bottom-6 md:left-6 z-40 text-primary">
        <PlusMark className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <div className="fixed bottom-3 right-3 md:bottom-6 md:right-6 z-40 text-primary">
        <PlusMark className="w-4 h-4 md:w-5 md:h-5" />
      </div>

      {/* Side labels */}
      <SideLabel top="18%" letter="M." word="Manhaj" />
      <SideLabel top="48%" letter="R." word="Rabithah" />
      <SideLabel top="78%" letter="A." word="Azhary" />

      {/* HERO ================================================================ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
        <div ref={heroRef} className="relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-6 md:gap-10">
            <img
              src={logo}
              alt="Markaz Rabithah logo"
              className="w-20 md:w-28 h-auto"
            />
            <h1 className="heading-huge text-ivory text-5xl md:text-7xl">
              markaz<br />rabithah<sup className="text-primary text-2xl md:text-3xl align-top ml-1">®</sup>
            </h1>
          </div>
        </div>

        {/* scroll chevron */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-primary animate-slow-pulse">
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* WELCOME / INTRO ====================================================== */}
      <section className="py-24 md:py-40 px-6">
        <div className="container-brand max-w-5xl text-center">
          <Eyebrow num="2">Tentang kami</Eyebrow>

          <h2 className="reveal heading-huge text-ivory text-6xl md:text-8xl mb-12">
            Selamat datang<br />di Markaz kami!
          </h2>

          <p className="reveal heading-serif text-xl md:text-2xl text-ivory/90 max-w-2xl mx-auto leading-snug">
            Kami membimbing santri menggapai<br />gerbang Al-Azhar asy-Syarif.
          </p>
        </div>

        {/* Two-column prose with inset image */}
        <div className="container-brand mt-32 grid md:grid-cols-2 gap-12 md:gap-20 relative">
          {/* Visual block */}
          <div className="reveal relative">
            <div className="aspect-[4/5] bg-navy-light relative overflow-hidden">
              <div className="absolute inset-0 grid-lines opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center text-primary/40">
                <Asterisk className="w-40 h-40" />
              </div>
              <div className="absolute bottom-6 left-6 text-primary">
                <Asterisk className="w-10 h-10" />
              </div>
            </div>
            <p className="reveal absolute -bottom-8 left-6 right-0 heading-serif text-lg md:text-xl text-ivory max-w-xs leading-snug bg-background p-4">
              Kami percaya identitas harus <em className="text-primary not-italic">abadi</em> dan <em className="text-primary not-italic">bermakna</em>.
            </p>
          </div>

          {/* Text block */}
          <div className="reveal grid grid-cols-2 gap-6 text-sm text-muted-foreground leading-relaxed self-start">
            <p>
              Sebagai mediator Mahad persiapan Al-Azhar, kami memadukan tradisi keilmuan klasik dengan pendekatan modern yang accessible bagi santri Indonesia.
            </p>
            <p>
              Kami berkolaborasi erat dengan para masyayikh, ulama sanad, serta lembaga formal untuk menjaga kemurnian manhaj.
            </p>
            <p>
              Markaz Rabithah lahir dari kebutuhan akan jembatan yang kokoh — antara semangat santri muda dan warisan keilmuan yang berusia lebih dari seribu tahun.
            </p>
            <p>
              Setiap santri unik, dan setiap perjalanan ilmu menuntut strategi yang berbeda; karenanya kurikulum kami dirancang adaptif namun tetap bersanad.
            </p>
          </div>
        </div>

        {/* CTA line */}
        <div className="container-brand mt-32 reveal text-right">
          <div className="inline-flex items-start gap-3">
            <span className="text-primary font-semibold">(2a)</span>
            <span className="heading-serif text-xl md:text-3xl text-ivory max-w-md leading-tight">
              Itulah mengapa kami menawarkan empat pilar tarbiyah.{" "}
              <a href="#pilar" className="underline decoration-primary underline-offset-4 hover:text-primary transition-colors">
                Pelajari
              </a>
            </span>
            <PlusMark className="w-5 h-5 text-primary mt-2" />
          </div>
        </div>
      </section>

      {/* FILOSOFI ============================================================ */}
      <section id="filosofi" className="py-24 md:py-40 px-6 border-t border-border/30">
        <div className="container-brand">
          <Eyebrow num="03">Filosofi nama</Eyebrow>
          <h2 className="reveal heading-huge text-ivory text-5xl md:text-7xl mb-24 max-w-4xl">
            Dua kata,<br />satu arah gerak.
          </h2>

          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <div className="reveal">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="heading-huge text-primary text-6xl">01</span>
                <h3 className="heading-display text-3xl text-ivory">Markaz</h3>
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary/80 mb-4">/مَرْكَز/ · Pusat</p>
              <p className="text-muted-foreground leading-relaxed">
                Markaz adalah <span className="text-ivory">titik orbit</span> — tempat ilmu berkumpul sebelum ia menyebar. Ia memberi arah bagi setiap langkah santri: dari mana ia berangkat, ke mana ia menuju.
              </p>
            </div>

            <div className="reveal" style={{ transitionDelay: "120ms" }}>
              <div className="flex items-baseline gap-4 mb-6">
                <span className="heading-huge text-primary text-6xl">02</span>
                <h3 className="heading-display text-3xl text-ivory">Rabithah</h3>
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary/80 mb-4">/رَابِطَة/ · Ikatan</p>
              <p className="text-muted-foreground leading-relaxed">
                Rabithah adalah <span className="text-ivory">tali yang mengikat tiga simpul</span>: santri, ulama, dan Al-Azhar. Ia menjaga transmisi ilmu tetap bersambung tanpa terputus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PILAR MISI ========================================================== */}
      <section id="pilar" className="py-24 md:py-40 px-6 border-t border-border/30">
        <div className="container-brand">
          <Eyebrow num="04">Pilar misi</Eyebrow>
          <h2 className="reveal heading-huge text-ivory text-5xl md:text-7xl mb-20 max-w-4xl">
            Empat pondasi,<br />satu santri utuh.
          </h2>

          <div className="grid md:grid-cols-2 gap-px bg-border/40">
            {missions.map((m, i) => (
              <div
                key={m.t}
                className="reveal group relative bg-background p-10 md:p-14 transition-colors duration-700 hover:bg-navy-light/30"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start justify-between mb-10">
                  <span className="heading-huge text-primary text-5xl">{`0${i + 1}`}</span>
                  <Asterisk className="w-6 h-6 text-primary/60 group-hover:text-primary group-hover:rotate-45 transition-transform duration-700" />
                </div>
                <h3 className="heading-display text-3xl md:text-4xl text-ivory mb-4">{m.t}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-md">{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PALET WARNA ========================================================= */}
      <section id="warna" className="py-24 md:py-40 px-6 border-t border-border/30">
        <div className="container-brand">
          <Eyebrow num="05">Palet warna</Eyebrow>
          <h2 className="reveal heading-huge text-ivory text-5xl md:text-7xl mb-6 max-w-4xl">
            Warna yang<br />berbicara.
          </h2>
          <p className="reveal text-muted-foreground max-w-xl mb-20 leading-relaxed">
            Dua warna utama membawa ruh visual brand — kedalaman ilmu dan keberanian sanad.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Navy */}
            <div className="reveal">
              <div className="aspect-[4/5] bg-navy-deep relative overflow-hidden border border-border/30">
                <div className="absolute top-6 left-6 text-xs text-ivory/60">(01) Primary</div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="heading-display text-3xl md:text-4xl text-ivory">Deep Navy</div>
                  <div className="text-xs text-primary mt-2">#0A1D37</div>
                </div>
                <Asterisk className="absolute top-6 right-6 w-8 h-8 text-primary" />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 text-xs">
                <div><div className="text-muted-foreground mb-1">CMYK</div><div className="text-ivory font-semibold">96·80·40·55</div></div>
                <div><div className="text-muted-foreground mb-1">RGB</div><div className="text-ivory font-semibold">10·29·55</div></div>
                <div><div className="text-muted-foreground mb-1">PANTONE</div><div className="text-ivory font-semibold">539 C</div></div>
              </div>
            </div>

            {/* Crimson */}
            <div className="reveal" style={{ transitionDelay: "120ms" }}>
              <div className="aspect-[4/5] bg-gradient-crimson relative overflow-hidden">
                <div className="absolute top-6 left-6 text-xs text-ivory/80">(02) Accent</div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="heading-display text-3xl md:text-4xl text-ivory">Crimson Tarbush</div>
                  <div className="text-xs text-ivory/90 mt-2">#B22222</div>
                </div>
                <Asterisk className="absolute top-6 right-6 w-8 h-8 text-ivory" />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 text-xs">
                <div><div className="text-muted-foreground mb-1">CMYK</div><div className="text-ivory font-semibold">20·95·90·10</div></div>
                <div><div className="text-muted-foreground mb-1">RGB</div><div className="text-ivory font-semibold">178·34·34</div></div>
                <div><div className="text-muted-foreground mb-1">PANTONE</div><div className="text-ivory font-semibold">187 C</div></div>
              </div>
            </div>
          </div>

          {/* Support swatches */}
          <div className="reveal mt-16 grid grid-cols-4 border border-border/30">
            {[
              { name: "Ivory", hex: "#F4EEE4", bg: "bg-ivory", text: "text-navy-deep" },
              { name: "Navy Light", hex: "#1B3356", bg: "bg-navy-light", text: "text-ivory" },
              { name: "Muted", hex: "#2A3F5F", bg: "bg-muted", text: "text-ivory" },
              { name: "Gold", hex: "#D4B87A", bg: "bg-gold", text: "text-navy-deep" },
            ].map((c) => (
              <div key={c.name} className={`${c.bg} ${c.text} p-6 h-32 flex flex-col justify-between`}>
                <div className="text-[0.6rem] uppercase opacity-70">Support</div>
                <div>
                  <div className="font-bold text-sm">{c.name}</div>
                  <div className="text-xs mt-1 opacity-80">{c.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIPOGRAFI =========================================================== */}
      <section id="tipografi" className="py-24 md:py-40 px-6 border-t border-border/30">
        <div className="container-brand">
          <Eyebrow num="06">Tipografi</Eyebrow>
          <h2 className="reveal heading-huge text-ivory text-5xl md:text-7xl mb-20 max-w-4xl">
            Geometos —<br />fondasi terlihat.
          </h2>

          {/* Giant MR specimen */}
          <div className="reveal relative border border-border/30 p-10 md:p-16 mb-12 overflow-hidden">
            <div className="absolute top-4 left-4 text-xs text-primary">(specimen) 280pt</div>
            <div className="absolute top-4 right-4 text-xs text-muted-foreground">Geometos / Bold</div>
            <div className="heading-huge text-[24vw] md:text-[16rem] leading-none text-ivory text-center">
              M<span className="text-primary">R</span>
            </div>
          </div>

          {/* Alphabet */}
          <div className="reveal border border-border/30 p-10 md:p-14 mb-12">
            <div className="text-xs text-primary mb-6">(abecedarium) A–Z · 0–9</div>
            <div className="heading-display text-2xl md:text-4xl text-ivory tracking-tight leading-tight">
              ABCDEFGHIJKLM<br />NOPQRSTUVWXYZ
            </div>
            <div className="heading-display text-2xl md:text-4xl text-muted-foreground mt-8">
              0 1 2 3 4 5 6 7 8 9
            </div>
          </div>

          {/* Scale */}
          <div className="reveal space-y-8 border-t border-border/30 pt-12">
            {[
              { size: "72pt", label: "Display", cls: "text-4xl md:text-7xl text-ivory", text: "Markaz Rabithah" },
              { size: "48pt", label: "Title", cls: "text-3xl md:text-5xl text-ivory", text: "Bermanhaj Azhary" },
              { size: "24pt", label: "Subtitle", cls: "text-xl md:text-3xl text-primary", text: "Markaz Rabithah bermanhaj Azhary" },
              { size: "14pt", label: "Caption", cls: "text-sm md:text-base text-muted-foreground", text: "Markaz Rabithah bermanhaj Azhary" },
            ].map((r) => (
              <div key={r.size} className="grid grid-cols-12 gap-6 items-baseline border-b border-border/20 pb-6">
                <div className="col-span-3 md:col-span-2 text-xs text-muted-foreground">
                  <div className="text-primary">{r.size}</div>
                  <div>{r.label}</div>
                </div>
                <div className={`col-span-9 md:col-span-10 heading-display ${r.cls}`}>{r.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING ============================================================= */}
      <section className="py-32 md:py-48 px-6 border-t border-border/30 relative overflow-hidden">
        <div className="container-brand max-w-4xl text-center relative">
          <Asterisk className="w-12 h-12 text-primary mx-auto mb-10 reveal" />
          <p className="reveal heading-huge text-ivory text-4xl md:text-6xl leading-[1.05] mb-12">
            Ilmu yang diwariskan<br />
            akan <em className="text-primary not-italic">kami jaga</em>.
          </p>
          <div className="reveal text-sm text-muted-foreground">Markaz Rabithah · Brand Guideline 2026</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8 px-6">
        <div className="container-brand flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© 2026 Markaz Rabithah</span>
          <span>Brand Guideline · v01</span>
          <span>Kokoh · Terjaga · Luhur</span>
        </div>
      </footer>
    </main>
  );
};

export default Index;

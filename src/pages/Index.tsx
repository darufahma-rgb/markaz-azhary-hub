import { useEffect, useRef } from "react";
import logo from "@/assets/logo-markaz-rabithah.png";
import { useReveal } from "@/hooks/use-reveal";

// ---- Icon primitives (minimalist, stroke-based) -----------------------------
const IconBase = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" strokeLinejoin="miter" className="h-10 w-10">
    {children}
  </svg>
);

const IconManhaj = () => (
  <IconBase>
    <rect x="8" y="10" width="32" height="28" />
    <path d="M8 18h32M16 10v28M24 18v20" />
  </IconBase>
);
const IconIlmuAlat = () => (
  <IconBase>
    <path d="M24 6L6 16v16l18 10 18-10V16L24 6z" />
    <path d="M24 6v36M6 16l36 16M42 16L6 32" />
  </IconBase>
);
const IconQuran = () => (
  <IconBase>
    <path d="M10 10h20a8 8 0 0 1 8 8v24H18a8 8 0 0 1-8-8V10z" />
    <path d="M10 34a8 8 0 0 1 8-8h20" />
    <path d="M24 18v10" />
  </IconBase>
);
const IconAkhlak = () => (
  <IconBase>
    <circle cx="24" cy="24" r="16" />
    <path d="M14 24c4 6 16 6 20 0M18 20h0M30 20h0" />
  </IconBase>
);

// ---- Tarbush (fez) geometric icon ------------------------------------------
const TarbushMark = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="60" y="50" width="80" height="110" />
    <rect x="54" y="155" width="92" height="12" />
    <path d="M100 50v-16M100 34a8 8 0 0 1 0-16" />
    <path d="M70 70h60M70 90h60M70 110h60M70 130h60" strokeOpacity="0.35" />
  </svg>
);

// ---- Section wrapper --------------------------------------------------------
const Section = ({
  id,
  eyebrow,
  title,
  lead,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section id={id} className={`py-28 md:py-40 ${className}`}>
    <div className="container-brand">
      {eyebrow && <div className="reveal eyebrow mb-8">{eyebrow}</div>}
      {title && (
        <h2 className="reveal heading-serif text-4xl md:text-6xl text-ivory mb-6 max-w-3xl leading-[1.05]">
          {title}
        </h2>
      )}
      {lead && (
        <p className="reveal text-muted-foreground max-w-2xl text-base md:text-lg leading-relaxed mb-16">
          {lead}
        </p>
      )}
      {children}
    </div>
  </section>
);

// ---- Main page --------------------------------------------------------------
const Index = () => {
  useReveal();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const y = window.scrollY;
      heroRef.current.style.transform = `translateY(${y * 0.15}px)`;
      heroRef.current.style.opacity = `${Math.max(0, 1 - y / 700)}`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const missions = [
    { icon: <IconManhaj />, title: "Manhaj Azhary", desc: "Mewarisi metodologi keilmuan Al-Azhar yang moderat, berimbang, dan bersanad." },
    { icon: <IconIlmuAlat />, title: "Ilmu Alat", desc: "Membangun fondasi Nahwu, Sharaf, dan Balaghah sebagai kunci memahami turats." },
    { icon: <IconQuran />, title: "Al-Qur'an", desc: "Menghafal, mentadabburi, dan menjaga hubungan santri dengan Kalamullah." },
    { icon: <IconAkhlak />, title: "Akhlak", desc: "Membentuk adab luhur — cermin santri ideal yang tawadhu' dan berintegritas." },
  ];

  return (
    <main className="relative overflow-x-hidden bg-background text-foreground">
      {/* Top nav */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/60 border-b border-border/40">
        <div className="container-brand flex items-center justify-between h-16">
          <span className="heading-display text-[0.7rem] tracking-[0.4em] text-ivory">MARKAZ · RABITHAH</span>
          <nav className="hidden md:flex gap-10 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <a href="#filosofi" className="hover:text-primary transition-colors">Filosofi</a>
            <a href="#misi" className="hover:text-primary transition-colors">Misi</a>
            <a href="#warna" className="hover:text-primary transition-colors">Warna</a>
            <a href="#tipografi" className="hover:text-primary transition-colors">Tipografi</a>
          </nav>
          <span className="text-[0.65rem] tracking-[0.3em] text-muted-foreground hidden md:block">BRAND · GUIDELINE · 01</span>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero">
        <div className="absolute inset-0 grid-lines opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        {/* ambient crimson glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-crimson/10 blur-[120px] animate-slow-pulse" />

        <div ref={heroRef} className="relative z-10 flex flex-col items-center text-center px-6">
          <div className="reveal is-visible mb-12 relative">
            <div className="absolute inset-0 bg-crimson/20 blur-3xl rounded-full" />
            <img
              src={logo}
              alt="Logo Markaz Rabithah — kaligrafi kufi Rabithah membentuk Tarbush Azhar"
              className="relative w-72 md:w-96 h-auto drop-shadow-[0_20px_40px_rgba(178,34,34,0.3)]"
            />
          </div>

          <div className="reveal is-visible" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-12 bg-primary" />
              <span className="text-[0.65rem] uppercase tracking-[0.4em] text-primary">Identitas Visual · 2026</span>
              <span className="h-px w-12 bg-primary" />
            </div>

            <h1 className="heading-display text-4xl md:text-7xl text-ivory mb-8">
              MARKAZ RABITHAH
            </h1>

            <p className="heading-serif italic text-lg md:text-2xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Kokoh ilmunya, terjaga hafalannya,<br />luhur akhlaknya.
            </p>

            <div className="mt-20 flex flex-col items-center gap-3 text-muted-foreground">
              <span className="text-[0.6rem] uppercase tracking-[0.4em]">Gulir untuk menelusuri</span>
              <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* INTRO STATEMENT */}
      <section className="py-32 md:py-48 border-t border-border/40">
        <div className="container-brand max-w-4xl">
          <p className="reveal eyebrow mb-10">Prolog</p>
          <p className="reveal heading-serif text-2xl md:text-4xl text-ivory leading-[1.35]">
            Sebuah <em className="text-primary not-italic">mediator</em> yang menjembatani santri Indonesia menuju gerbang Al-Azhar asy-Syarif — tempat tradisi keilmuan Islam dijaga dengan sanad yang tak terputus selama seribu tahun lebih.
          </p>
          <div className="reveal mt-16 flex items-center gap-6">
            <div className="h-px flex-1 bg-gradient-line" />
            <span className="heading-display text-xs tracking-[0.4em] text-primary">٠١</span>
            <div className="h-px flex-1 bg-gradient-line" />
          </div>
        </div>
      </section>

      {/* FILOSOFI */}
      <Section
        id="filosofi"
        eyebrow="Bab 01 · Filosofi Nama"
        title="Dua kata, satu arah gerak."
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — meaning */}
          <div className="space-y-14">
            <div className="reveal">
              <div className="flex items-baseline gap-6 mb-6">
                <span className="heading-display text-5xl md:text-6xl text-primary">01</span>
                <h3 className="heading-display text-xl md:text-2xl text-ivory">MARKAZ</h3>
              </div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary/80 mb-4">/مَرْكَز/ · Pusat — Arah Gerak</p>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                Markaz adalah <span className="text-ivory">titik orbit</span> — tempat ilmu berkumpul sebelum ia menyebar. Ia bukan sekadar bangunan, melainkan <em className="text-primary not-italic">kiblat pembelajaran</em> yang memberi arah bagi setiap langkah santri: dari mana ia berangkat, ke mana ia menuju, dan mengapa ia berjalan.
              </p>
            </div>

            <div className="reveal">
              <div className="flex items-baseline gap-6 mb-6">
                <span className="heading-display text-5xl md:text-6xl text-primary">02</span>
                <h3 className="heading-display text-xl md:text-2xl text-ivory">RABITHAH</h3>
              </div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary/80 mb-4">/رَابِطَة/ · Ikatan Suci</p>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                Rabithah adalah <span className="text-ivory">tali yang mengikat tiga simpul</span>: santri, ulama, dan Al-Azhar. Ia menjaga agar transmisi ilmu tetap bersambung — dari guru ke murid, dari generasi ke generasi — tanpa terputus oleh zaman maupun jarak.
              </p>
            </div>
          </div>

          {/* Right — Tarbush visual */}
          <div className="reveal relative">
            <div className="sticky top-32">
              <div className="relative aspect-square bg-navy-deep border border-border/60 p-12 shadow-elegant overflow-hidden">
                <div className="absolute inset-0 grid-lines opacity-30" />
                <div className="absolute top-4 left-4 text-[0.6rem] tracking-[0.3em] text-muted-foreground">FIG · 01</div>
                <div className="absolute top-4 right-4 text-[0.6rem] tracking-[0.3em] text-primary">TARBUSH · AZHAR</div>

                <div className="relative h-full flex items-center justify-center text-primary">
                  <TarbushMark className="w-48 h-48 md:w-64 md:h-64" />
                </div>

                {/* annotation lines */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between text-[0.6rem] tracking-[0.3em] text-muted-foreground">
                  <span>— Mahkota ilmu</span>
                  <span>— Santri ideal</span>
                </div>
              </div>

              <p className="mt-8 text-sm text-muted-foreground leading-relaxed max-w-md">
                Bentuk Tarbush — simbol khas ulama Al-Azhar — menjadi <span className="text-ivory">mahkota visual</span> logo kami. Ia merepresentasikan santri ideal: tegak pendiriannya, kokoh keilmuannya, dan santun perangainya.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* PILAR MISI */}
      <Section
        id="misi"
        eyebrow="Bab 02 · Pilar Misi"
        title="Empat pondasi, satu santri utuh."
        lead="Setiap kurikulum, setiap halaqah, setiap interaksi di Markaz Rabithah bermuara pada empat pilar ini. Keempatnya saling menopang — jika satu goyah, yang lain pun tak tegak."
        className="bg-navy-deep/50"
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/60">
          {missions.map((m, i) => (
            <div
              key={m.title}
              className="reveal group relative bg-navy p-10 md:p-12 transition-colors duration-700 hover:bg-navy-light cursor-default"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="absolute top-6 right-6 heading-display text-[0.65rem] tracking-[0.3em] text-muted-foreground">
                0{i + 1}
              </div>
              <div className="text-primary mb-8 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[-3deg] origin-left">
                {m.icon}
              </div>
              <h3 className="heading-display text-base tracking-[0.15em] text-ivory mb-4">
                {m.title.toUpperCase()}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              <div className="absolute bottom-0 left-0 h-px w-0 bg-primary transition-all duration-700 group-hover:w-full" />
            </div>
          ))}
        </div>
      </Section>

      {/* PALET WARNA */}
      <Section
        id="warna"
        eyebrow="Bab 03 · Palet Warna"
        title="Warna yang berbicara."
        lead="Dua warna utama membawa ruh visual brand: Deep Navy yang menandakan kedalaman ilmu dan ketenangan, Crimson yang diambil dari Tarbush Azhar — lambang keberanian sanad."
      >
        <div className="grid md:grid-cols-2 gap-10">
          {/* Navy */}
          <div className="reveal group">
            <div className="aspect-[4/5] bg-navy-deep relative overflow-hidden border border-border/40 shadow-elegant">
              <div className="absolute inset-0 grid-lines opacity-30" />
              <div className="absolute top-6 left-6 text-[0.65rem] tracking-[0.3em] text-ivory/50">PRIMARY · 01</div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="text-[0.6rem] uppercase tracking-[0.4em] text-primary mb-2">Deep Navy Blue</div>
                <div className="heading-display text-xl md:text-2xl text-ivory">Azhary Depth</div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-6 text-xs">
              <div>
                <div className="text-muted-foreground uppercase tracking-[0.2em] mb-2">HEX</div>
                <div className="heading-display text-ivory text-base tracking-[0.15em]">#0A1D37</div>
              </div>
              <div>
                <div className="text-muted-foreground uppercase tracking-[0.2em] mb-2">CMYK</div>
                <div className="heading-display text-ivory text-base tracking-[0.15em]">96 · 80 · 40 · 55</div>
              </div>
              <div>
                <div className="text-muted-foreground uppercase tracking-[0.2em] mb-2">RGB</div>
                <div className="heading-display text-ivory text-base tracking-[0.15em]">10 · 29 · 55</div>
              </div>
              <div>
                <div className="text-muted-foreground uppercase tracking-[0.2em] mb-2">PANTONE</div>
                <div className="heading-display text-ivory text-base tracking-[0.15em]">539 C</div>
              </div>
            </div>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-sm">
              Melambangkan kedalaman, ketenangan malam saat para ulama menelaah kitab, dan kesungguhan yang tak bising.
            </p>
          </div>

          {/* Crimson */}
          <div className="reveal group" style={{ transitionDelay: "120ms" }}>
            <div className="aspect-[4/5] bg-gradient-crimson relative overflow-hidden shadow-crimson">
              <div className="absolute inset-0 grid-lines opacity-20" />
              <div className="absolute top-6 left-6 text-[0.65rem] tracking-[0.3em] text-ivory/70">ACCENT · 02</div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="text-[0.6rem] uppercase tracking-[0.4em] text-ivory/80 mb-2">Crimson Tarbush</div>
                <div className="heading-display text-xl md:text-2xl text-ivory">Sanad Red</div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-6 text-xs">
              <div>
                <div className="text-muted-foreground uppercase tracking-[0.2em] mb-2">HEX</div>
                <div className="heading-display text-ivory text-base tracking-[0.15em]">#B22222</div>
              </div>
              <div>
                <div className="text-muted-foreground uppercase tracking-[0.2em] mb-2">CMYK</div>
                <div className="heading-display text-ivory text-base tracking-[0.15em]">20 · 95 · 90 · 10</div>
              </div>
              <div>
                <div className="text-muted-foreground uppercase tracking-[0.2em] mb-2">RGB</div>
                <div className="heading-display text-ivory text-base tracking-[0.15em]">178 · 34 · 34</div>
              </div>
              <div>
                <div className="text-muted-foreground uppercase tracking-[0.2em] mb-2">PANTONE</div>
                <div className="heading-display text-ivory text-base tracking-[0.15em]">187 C</div>
              </div>
            </div>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-sm">
              Diambil dari warna Tarbush para ulama Azhar — keberanian menyampaikan kebenaran dan kehangatan ikatan santri-guru.
            </p>
          </div>
        </div>

        {/* Supporting neutrals strip */}
        <div className="reveal mt-16 border border-border/40">
          <div className="grid grid-cols-4">
            {[
              { name: "Ivory", hex: "#F4EEE4", bg: "bg-ivory", text: "text-navy-deep" },
              { name: "Navy Light", hex: "#1B3356", bg: "bg-navy-light", text: "text-ivory" },
              { name: "Muted", hex: "#2A3F5F", bg: "bg-muted", text: "text-ivory" },
              { name: "Gold Accent", hex: "#D4B87A", bg: "bg-gold", text: "text-navy-deep" },
            ].map((c) => (
              <div key={c.name} className={`${c.bg} ${c.text} p-6 aspect-square md:aspect-auto md:h-32 flex flex-col justify-between`}>
                <div className="text-[0.55rem] tracking-[0.3em] uppercase opacity-70">Support</div>
                <div>
                  <div className="heading-display text-[0.7rem] tracking-[0.2em]">{c.name.toUpperCase()}</div>
                  <div className="text-xs mt-1 opacity-80">{c.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* TIPOGRAFI */}
      <Section
        id="tipografi"
        eyebrow="Bab 04 · Tipografi"
        title="Geometos — fondasi yang terlihat."
        lead="Font display kami dipilih bukan karena keindahannya semata, melainkan karena bentuknya. Setiap huruf dibangun dari geometri murni — garis tegas, sudut presisi, proporsi terukur — menggemakan Ilmu Alat yang menjadi pondasi setiap santri."
        className="bg-navy-deep/40"
      >
        {/* Showcase huge letter */}
        <div className="reveal relative border border-border/40 bg-navy p-10 md:p-20 overflow-hidden mb-16">
          <div className="absolute inset-0 grid-lines opacity-20" />
          <div className="absolute top-6 left-6 text-[0.6rem] tracking-[0.3em] text-muted-foreground">SPECIMEN · GEOMETOS BOLD</div>
          <div className="absolute top-6 right-6 text-[0.6rem] tracking-[0.3em] text-primary">100 PT</div>

          <div className="relative heading-display text-[18vw] md:text-[14rem] leading-none text-ivory text-center">
            M<span className="text-primary">R</span>
          </div>

          <div className="relative mt-8 grid grid-cols-3 text-center text-[0.6rem] tracking-[0.3em] text-muted-foreground">
            <span>Geometric</span>
            <span>Bold · Clean</span>
            <span>Monumental</span>
          </div>
        </div>

        {/* Alphabet */}
        <div className="reveal border border-border/40 bg-navy p-10 md:p-16 mb-10">
          <div className="text-[0.6rem] tracking-[0.3em] text-primary mb-8">ABECEDARIUM · A–Z</div>
          <div className="heading-display text-xl md:text-3xl text-ivory tracking-[0.25em] leading-relaxed break-words">
            ABCDEFGHIJKLM<br />NOPQRSTUVWXYZ
          </div>
          <div className="mt-10 text-[0.6rem] tracking-[0.3em] text-primary mb-6">NUMERALS · 0–9</div>
          <div className="heading-display text-xl md:text-3xl text-muted-foreground tracking-[0.3em]">
            0 1 2 3 4 5 6 7 8 9
          </div>
        </div>

        {/* Size scale */}
        <div className="reveal space-y-10 border-t border-border/40 pt-16">
          <div className="grid grid-cols-12 gap-6 items-baseline border-b border-border/30 pb-8">
            <div className="col-span-2 text-[0.6rem] tracking-[0.3em] text-muted-foreground">72 PT · DISPLAY</div>
            <div className="col-span-10 heading-display text-3xl md:text-6xl text-ivory tracking-[0.1em]">
              MARKAZ RABITHAH
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6 items-baseline border-b border-border/30 pb-8">
            <div className="col-span-2 text-[0.6rem] tracking-[0.3em] text-muted-foreground">48 PT · TITLE</div>
            <div className="col-span-10 heading-display text-2xl md:text-4xl text-ivory tracking-[0.12em]">
              BERMANHAJ AZHARY
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6 items-baseline border-b border-border/30 pb-8">
            <div className="col-span-2 text-[0.6rem] tracking-[0.3em] text-muted-foreground">24 PT · SUBTITLE</div>
            <div className="col-span-10 heading-display text-lg md:text-2xl text-primary tracking-[0.18em]">
              MARKAZ RABITHAH BERMANHAJ AZHARY
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6 items-baseline">
            <div className="col-span-2 text-[0.6rem] tracking-[0.3em] text-muted-foreground">14 PT · CAPTION</div>
            <div className="col-span-10 heading-display text-sm text-muted-foreground tracking-[0.25em]">
              MARKAZ RABITHAH BERMANHAJ AZHARY
            </div>
          </div>
        </div>

        {/* Pairing */}
        <div className="reveal mt-20 grid md:grid-cols-2 gap-10">
          <div className="border border-border/40 p-10 bg-navy">
            <div className="text-[0.6rem] tracking-[0.3em] text-primary mb-6">PRIMARY · DISPLAY</div>
            <div className="heading-display text-4xl text-ivory mb-4">Geometos</div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Untuk judul, logotype, dan elemen monumental. Bentuk geometrisnya mencerminkan fondasi Ilmu Alat — presisi, struktur, dan kekokohan.
            </p>
          </div>
          <div className="border border-border/40 p-10 bg-navy">
            <div className="text-[0.6rem] tracking-[0.3em] text-primary mb-6">SECONDARY · BODY</div>
            <div className="font-sans text-4xl text-ivory mb-4 font-light">Inter</div>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans">
              Untuk teks panjang, narasi, dan materi edukasi. Bersih, mudah dibaca, dan menjadi latar yang tenang bagi Geometos.
            </p>
          </div>
        </div>
      </Section>

      {/* CLOSING */}
      <section className="py-32 md:py-48 border-t border-border/40 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-crimson/10 blur-[120px]" />

        <div className="container-brand max-w-3xl text-center relative">
          <div className="reveal eyebrow justify-center mb-10 before:mx-auto">Epilog</div>
          <p className="reveal heading-serif text-3xl md:text-5xl text-ivory leading-[1.2] mb-12">
            “Setiap simbol, warna, dan huruf dalam identitas ini adalah <em className="text-primary not-italic">janji</em> — bahwa ilmu yang diwariskan akan kami jaga sebagaimana para ulama Azhar menjaganya.”
          </p>
          <div className="reveal flex items-center justify-center gap-4 text-[0.65rem] tracking-[0.4em] text-muted-foreground">
            <span className="h-px w-12 bg-primary" />
            <span>MARKAZ RABITHAH · 2026</span>
            <span className="h-px w-12 bg-primary" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-10">
        <div className="container-brand flex flex-col md:flex-row items-center justify-between gap-4 text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">
          <span>© 2026 Markaz Rabithah</span>
          <span>Brand Guideline · Version 01</span>
          <span>Kokoh · Terjaga · Luhur</span>
        </div>
      </footer>
    </main>
  );
};

export default Index;

import { useEffect, useState } from "react";
import logo from "@assets/Markaz_Rabithah_Logo_1_1777345170344.png";
import logoMark from "@assets/Logo_Markaz_Rabithah_2_1777345186295.png";
import { useReveal } from "@/hooks/use-reveal";

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

// ---- Nav --------------------------------------------------------------------
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#tentang", label: "Tentang" },
    { href: "#filosofi", label: "Filosofi" },
    { href: "#pilar", label: "Pilar Misi" },
    { href: "#identitas", label: "Identitas" },
    { href: "#kontak", label: "Kontak" },
  ];

  return (
    <header
      className={`fixed inset-x-0 z-50 px-3 md:px-6 transition-all duration-300 ${
        scrolled ? "top-3 md:top-4" : "top-4 md:top-6"
      }`}
    >
      <div
        className={`mx-auto max-w-5xl flex items-center justify-between gap-3 px-4 md:px-5 py-2.5 md:py-3 rounded-full border transition-all duration-300 ${
          scrolled
            ? "bg-background/85 backdrop-blur-xl border-ivory/15 shadow-elegant"
            : "bg-background/55 backdrop-blur-md border-ivory/10"
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5 shrink-0">
          <img
            src={logoMark}
            alt="Markaz Rabithah"
            className="w-7 h-7 md:w-8 md:h-8 object-contain"
          />
          <span className="font-display font-extrabold text-[0.8rem] md:text-sm tracking-tight text-ivory">
            Logo <span className="text-primary">Guideline</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[0.7rem] uppercase tracking-[0.2em] text-ivory/70 hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#kontak"
            className="text-[0.7rem] uppercase tracking-[0.2em] px-4 py-2 bg-primary text-ivory hover:bg-primary/90 rounded-full transition-colors font-semibold"
          >
            Daftar
          </a>
        </nav>

        <button
          aria-label="Menu"
          onClick={() => setOpen(!open)}
          className="md:hidden text-ivory p-1.5"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-2 mx-auto max-w-5xl bg-background/95 backdrop-blur-xl border border-ivory/15 rounded-2xl shadow-elegant overflow-hidden">
          <div className="px-5 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.2em] text-ivory/80 hover:text-primary"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#kontak"
              onClick={() => setOpen(false)}
              className="mt-1 text-sm text-center uppercase tracking-[0.2em] px-4 py-3 bg-primary text-ivory rounded-full font-semibold"
            >
              Daftar
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

// ---- Main page --------------------------------------------------------------
const Index = () => {
  useReveal();

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

      <Nav />

      {/* LOGO HERO (splash) ================================================ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-6 overflow-hidden">
        <div className="reveal relative w-[260px] md:w-full md:max-w-md mx-auto aspect-square flex items-center justify-center animate-float">
          <img
            src={logoMark}
            alt="Markaz Rabithah"
            className="relative w-3/5 h-auto object-contain drop-shadow-[0_0_60px_rgba(178,34,34,0.4)]"
          />
        </div>

        {/* arabic name beneath */}
        <div className="mt-6 md:mt-8 text-center">
          <div className="font-arabic text-2xl md:text-4xl text-ivory/70 leading-none" dir="rtl">
            مركز الرابطة
          </div>
        </div>

        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 text-primary animate-slow-pulse">
          <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* HERO ============================================================== */}
      <section className="relative md:min-h-screen flex items-center pt-12 pb-14 md:pt-32 md:pb-28 px-4 md:px-6">
        <div className="container-brand max-w-6xl mx-auto relative grid md:grid-cols-12 gap-8 md:gap-16 items-center">
          <div className="md:col-span-7">
            <h1 className="reveal font-display font-extrabold text-3xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-4 md:mb-6">
              <span className="block text-ivory">Kokoh ilmunya,</span>
              <span className="block text-ivory">terjaga hafalannya,</span>
              <span className="block text-primary">luhur akhlaknya.</span>
            </h1>

            <p className="reveal text-sm md:text-lg text-ivory/70 max-w-xl leading-relaxed mb-6 md:mb-10">
              Markaz Rabithah adalah jembatan santri menuju Al-Azhar
              asy-Syarif — memadukan tradisi keilmuan klasik bersanad dengan
              pendampingan modern yang adaptif untuk santri Indonesia.
            </p>
          </div>

          <div className="md:col-span-5 relative">
            <div className="reveal aspect-square max-w-[260px] md:max-w-md mx-auto relative">
              <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl" />
              <div className="absolute inset-3 md:inset-8 rounded-full border border-ivory/10" />
              <div className="absolute inset-7 md:inset-16 rounded-full border border-ivory/10" />
              <img
                src={logoMark}
                alt="Markaz Rabithah"
                className="absolute inset-0 m-auto w-3/5 h-auto"
              />
              <div className="absolute -top-2 -left-2 text-primary">
                <PlusMark className="w-3.5 h-3.5 md:w-5 md:h-5" />
              </div>
              <div className="absolute -bottom-2 -right-2 text-primary">
                <PlusMark className="w-3.5 h-3.5 md:w-5 md:h-5" />
              </div>
            </div>

            <div className="reveal mt-5 md:mt-8 grid grid-cols-3 gap-2 md:gap-5">
              {stats.map((s) => (
                <div key={s.l} className="text-center">
                  <div className="font-display font-bold text-base md:text-2xl text-primary">
                    {s.v}
                  </div>
                  <div className="text-[0.55rem] md:text-[0.65rem] uppercase tracking-wider text-ivory/55 mt-1 leading-snug">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
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
                className="reveal border border-ivory/10 p-4 md:p-8 hover:border-primary/40 transition-colors group"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start justify-between mb-3 md:mb-4">
                  <span className="text-primary text-[0.65rem] md:text-sm font-bold">
                    0{i + 1}
                  </span>
                  <PlusMark className="w-3.5 h-3.5 md:w-4 md:h-4 text-ivory/30 group-hover:text-primary group-hover:rotate-90 transition-all duration-500" />
                </div>
                <h3 className="font-display font-bold text-base md:text-xl text-ivory mb-1.5 md:mb-2">
                  {c.t}
                </h3>
                <p className="text-[0.7rem] md:text-sm text-ivory/60 leading-relaxed">
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
            <span className="text-primary">satu arah gerak.</span>
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
            <span className="text-primary">satu santri utuh.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ivory/10">
            {missions.map((m, i) => (
              <div
                key={m.t}
                className="reveal group relative bg-background p-5 md:p-12 transition-colors duration-500 hover:bg-navy-light/40"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start justify-between mb-5 md:mb-12">
                  <span className="font-display font-extrabold text-primary text-2xl md:text-5xl">
                    {m.n}
                  </span>
                  <span className="font-arabic text-2xl md:text-4xl text-ivory/55 group-hover:text-primary transition-colors leading-none" dir="rtl">
                    {m.ar}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg md:text-3xl text-ivory mb-2 md:mb-4">
                  {m.t}
                </h3>
                <p className="text-xs md:text-base text-ivory/65 leading-relaxed max-w-md">
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
            Persiapan menyeluruh, <span className="text-primary">terstruktur.</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {program.map((p, i) => (
              <div
                key={p.t}
                className="reveal border border-ivory/10 p-4 md:p-7 hover:border-primary/40 hover:bg-navy-light/30 transition-all"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="text-primary text-[0.65rem] md:text-xs font-bold mb-2 md:mb-3">
                  0{i + 1}
                </div>
                <h3 className="font-display font-bold text-sm md:text-lg text-ivory mb-1.5 md:mb-2">
                  {p.t}
                </h3>
                <p className="text-[0.7rem] md:text-sm text-ivory/60 leading-relaxed">
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
          <h2 className="reveal font-display font-extrabold text-2xl md:text-6xl leading-[1.05] text-ivory max-w-3xl mb-8 md:mb-16">
            Bahasa visual <span className="text-primary">yang jujur.</span>
          </h2>

          <div className="mb-8 md:mb-12">
            <div className="reveal aspect-[16/9] bg-navy-light/40 border border-ivory/10 flex items-center justify-center p-8 md:p-16">
              <img src={logo} alt="Logo on dark" className="max-w-[60%] md:max-w-[40%] h-auto" />
            </div>
          </div>

          {/* color palette */}
          <div className="reveal mb-6 md:mb-10">
            <div className="text-[0.6rem] md:text-xs uppercase tracking-[0.3em] text-ivory/60 mb-3 md:mb-5">
              Palet Warna
            </div>
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {[
                { name: "Deep Navy", hex: "#0A1D37", c: "#0A1D37", text: "text-ivory" },
                { name: "Crimson Tarbush", hex: "#B22222", c: "#B22222", text: "text-ivory" },
                { name: "Ivory", hex: "#F4EEE4", c: "#F4EEE4", text: "text-navy-deep" },
              ].map((c) => (
                <div
                  key={c.name}
                  className={`p-3 md:p-6 h-20 md:h-36 flex flex-col justify-between ${c.text}`}
                  style={{ backgroundColor: c.c }}
                >
                  <div className="text-[0.5rem] md:text-[0.6rem] uppercase tracking-wider opacity-70">
                    Brand
                  </div>
                  <div>
                    <div className="font-display font-bold text-xs md:text-base">{c.name}</div>
                    <div className="text-[0.6rem] md:text-xs mt-0.5 md:mt-1 opacity-80">{c.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* typography */}
          <div className="reveal border border-ivory/10 p-4 md:p-10">
            <div className="text-[0.6rem] md:text-xs uppercase tracking-[0.3em] text-ivory/60 mb-3 md:mb-5">
              Tipografi
            </div>
            <div className="grid md:grid-cols-2 gap-5 md:gap-12 items-start">
              <div>
                <div className="font-display font-extrabold text-3xl md:text-6xl text-primary leading-none">
                  Sk Modernist
                </div>
                <div className="mt-2 md:mt-3 text-[0.7rem] md:text-sm text-ivory/60">
                  Display & Body — geometris, ringkas, modern.
                </div>
              </div>
              <div className="text-sm md:text-lg text-ivory/85 font-medium leading-relaxed">
                <div>Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll</div>
                <div>Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww</div>
                <div>Xx Yy Zz · 1234567890</div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            <span className="text-primary">untuk brand-mu?</span>
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

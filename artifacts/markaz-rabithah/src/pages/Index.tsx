import { useEffect, useState } from "react";
import logo from "@/assets/logo-markaz-rabithah.png";
import logoMark from "@assets/Markaz_Rabithah_Logo_1_1777342798764.png";
import { useReveal } from "@/hooks/use-reveal";

// ---- Small UI atoms ---------------------------------------------------------
const Eyebrow = ({
  num,
  children,
}: {
  num: string;
  children: React.ReactNode;
}) => (
  <div className="reveal flex items-center gap-3 mb-6 text-[0.7rem] md:text-xs uppercase tracking-[0.35em] text-ivory/70 font-medium">
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-ivory/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-brand max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <img
            src={logoMark}
            alt="Markaz Rabithah"
            className="w-8 h-8 md:w-9 md:h-9 object-contain"
          />
          <span className="font-display font-extrabold text-sm md:text-base tracking-tight text-ivory">
            Markaz <span className="text-primary">Rabithah</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-[0.2em] text-ivory/70 hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#kontak"
            className="text-xs uppercase tracking-[0.2em] px-4 py-2 bg-primary text-ivory hover:bg-primary/90 rounded-sm transition-colors font-semibold"
          >
            Daftar
          </a>
        </nav>

        <button
          aria-label="Menu"
          onClick={() => setOpen(!open)}
          className="md:hidden text-ivory p-2"
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
        <div className="md:hidden border-t border-ivory/10 bg-background/95 backdrop-blur-md">
          <div className="px-6 py-5 flex flex-col gap-4">
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
              className="mt-2 text-sm text-center uppercase tracking-[0.2em] px-4 py-3 bg-primary text-ivory rounded-sm font-semibold"
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
    <main id="top" className="relative bg-background text-ivory overflow-x-hidden">
      <Nav />

      {/* HERO ============================================================== */}
      <section className="relative min-h-screen flex items-center pt-28 pb-20 md:pt-32 md:pb-28 px-4 md:px-6">
        {/* decorative background */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(244,238,228,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,238,228,0.4) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full opacity-25 blur-3xl"
          style={{ backgroundColor: "hsl(var(--primary))" }}
        />

        <div className="container-brand max-w-6xl mx-auto relative grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-7">
            <div className="reveal flex items-center gap-3 mb-6 text-[0.7rem] md:text-xs uppercase tracking-[0.35em] text-ivory/70">
              <span className="w-8 h-px bg-primary" />
              Mahad Persiapan Al-Azhar
            </div>

            <h1 className="reveal font-display font-extrabold text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-6">
              <span className="block text-ivory">Kokoh ilmunya,</span>
              <span className="block text-ivory">terjaga hafalannya,</span>
              <span className="block text-primary">luhur akhlaknya.</span>
            </h1>

            <p className="reveal text-base md:text-lg text-ivory/70 max-w-xl leading-relaxed mb-10">
              Markaz Rabithah adalah jembatan santri menuju Al-Azhar
              asy-Syarif — memadukan tradisi keilmuan klasik bersanad dengan
              pendampingan modern yang adaptif untuk santri Indonesia.
            </p>

            <div className="reveal flex flex-wrap items-center gap-4">
              <a
                href="#kontak"
                className="inline-flex items-center gap-2 px-6 md:px-7 py-3 md:py-3.5 bg-primary hover:bg-primary/90 text-ivory text-xs md:text-sm uppercase tracking-[0.25em] font-semibold rounded-sm transition-colors"
              >
                Daftar Santri
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#filosofi"
                className="inline-flex items-center gap-2 px-6 md:px-7 py-3 md:py-3.5 border border-ivory/20 hover:border-primary hover:text-primary text-ivory/85 text-xs md:text-sm uppercase tracking-[0.25em] font-semibold rounded-sm transition-colors"
              >
                Pelajari filosofi
              </a>
            </div>
          </div>

          <div className="md:col-span-5 relative">
            <div className="reveal aspect-square max-w-md mx-auto relative">
              <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl" />
              <div className="absolute inset-4 md:inset-8 rounded-full border border-ivory/10" />
              <div className="absolute inset-10 md:inset-16 rounded-full border border-ivory/10" />
              <img
                src={logoMark}
                alt="Markaz Rabithah"
                className="absolute inset-0 m-auto w-3/5 h-auto"
              />
              <div className="absolute -top-2 -left-2 text-primary">
                <PlusMark className="w-5 h-5" />
              </div>
              <div className="absolute -bottom-2 -right-2 text-primary">
                <PlusMark className="w-5 h-5" />
              </div>
            </div>

            <div className="reveal mt-8 grid grid-cols-3 gap-3 md:gap-5">
              {stats.map((s) => (
                <div key={s.l} className="text-center">
                  <div className="font-display font-bold text-xl md:text-2xl text-primary">
                    {s.v}
                  </div>
                  <div className="text-[0.6rem] md:text-[0.65rem] uppercase tracking-wider text-ivory/55 mt-1 leading-snug">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-primary animate-slow-pulse">
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* TENTANG =========================================================== */}
      <section id="tentang" className="py-20 md:py-32 px-4 md:px-6 border-t border-ivory/10">
        <div className="container-brand max-w-6xl mx-auto grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow num="01">Tentang Kami</Eyebrow>
            <h2 className="reveal font-display font-extrabold text-3xl md:text-5xl leading-[1.05] text-ivory mb-6">
              Mediator yang menjaga rantai sanad tetap tersambung.
            </h2>
            <p className="reveal text-sm md:text-base text-ivory/65 leading-relaxed">
              Sebagai Mahad persiapan Al-Azhar, kami berdiri di antara semangat
              santri muda dan warisan keilmuan yang berusia lebih dari seribu
              tahun. Kurikulum kami dirancang adaptif namun tetap bersanad —
              menjawab kebutuhan zaman tanpa kehilangan akar tradisi.
            </p>
          </div>

          <div className="md:col-span-7 grid sm:grid-cols-2 gap-6 md:gap-8">
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
                className="reveal border border-ivory/10 p-6 md:p-8 hover:border-primary/40 transition-colors group"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-primary text-xs md:text-sm font-bold">
                    0{i + 1}
                  </span>
                  <PlusMark className="w-4 h-4 text-ivory/30 group-hover:text-primary group-hover:rotate-90 transition-all duration-500" />
                </div>
                <h3 className="font-display font-bold text-lg md:text-xl text-ivory mb-2">
                  {c.t}
                </h3>
                <p className="text-xs md:text-sm text-ivory/60 leading-relaxed">
                  {c.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILOSOFI ========================================================== */}
      <section id="filosofi" className="py-20 md:py-32 px-4 md:px-6 border-t border-ivory/10 relative">
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
          <h2 className="reveal font-display font-extrabold text-3xl md:text-6xl leading-[1.05] text-ivory max-w-3xl mb-16 md:mb-20">
            Dua kata,{" "}
            <span className="text-primary">satu arah gerak.</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-10 md:gap-20">
            <div className="reveal">
              <div className="flex items-baseline gap-4 mb-5">
                <span className="font-display font-extrabold text-primary text-5xl md:text-7xl leading-none">
                  01
                </span>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-ivory">
                  Markaz
                </h3>
              </div>
              <p className="text-[0.7rem] md:text-xs uppercase tracking-[0.3em] text-primary/80 mb-4">
                /مَرْكَز/ · Pusat
              </p>
              <p className="text-sm md:text-base text-ivory/70 leading-relaxed">
                Markaz adalah <span className="text-ivory">titik orbit</span> —
                tempat ilmu berkumpul sebelum ia menyebar. Ia memberi arah bagi
                setiap langkah santri: dari mana ia berangkat, ke mana ia
                menuju, dan dengan ilmu apa ia kembali.
              </p>
              <ul className="mt-6 space-y-2 text-xs md:text-sm text-ivory/55">
                <li className="flex gap-2"><span className="text-primary">·</span> Pusat pembelajaran ilmu alat</li>
                <li className="flex gap-2"><span className="text-primary">·</span> Pusat tahsin dan tahfizh</li>
                <li className="flex gap-2"><span className="text-primary">·</span> Pusat tarbiyah adab dan akhlak</li>
              </ul>
            </div>

            <div className="reveal" style={{ transitionDelay: "120ms" }}>
              <div className="flex items-baseline gap-4 mb-5">
                <span className="font-display font-extrabold text-primary text-5xl md:text-7xl leading-none">
                  02
                </span>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-ivory">
                  Rabithah
                </h3>
              </div>
              <p className="text-[0.7rem] md:text-xs uppercase tracking-[0.3em] text-primary/80 mb-4">
                /رَابِطَة/ · Ikatan
              </p>
              <p className="text-sm md:text-base text-ivory/70 leading-relaxed">
                Rabithah adalah{" "}
                <span className="text-ivory">tali yang mengikat tiga simpul</span>
                : santri, ulama, dan Al-Azhar asy-Syarif. Ia menjaga
                transmisi ilmu tetap bersambung — sanad tidak terputus, ruh
                tidak hilang.
              </p>
              <ul className="mt-6 space-y-2 text-xs md:text-sm text-ivory/55">
                <li className="flex gap-2"><span className="text-primary">·</span> Ikatan dengan masyayikh dan ulama sanad</li>
                <li className="flex gap-2"><span className="text-primary">·</span> Ikatan dengan tradisi keilmuan Al-Azhar</li>
                <li className="flex gap-2"><span className="text-primary">·</span> Ikatan persaudaraan antar santri</li>
              </ul>
            </div>
          </div>

          {/* arabic kaligrafi quote */}
          <div className="reveal mt-16 md:mt-24 border-y border-ivory/10 py-10 md:py-14 text-center">
            <p className="font-serif text-2xl md:text-4xl text-ivory mb-4 leading-relaxed" dir="rtl">
              العِلْمُ نُورٌ، وَالسَّنَدُ حَبْلٌ لَا يَنْقَطِعُ
            </p>
            <p className="text-xs md:text-sm text-ivory/55 italic">
              "Ilmu adalah cahaya, dan sanad adalah tali yang tidak putus."
            </p>
          </div>
        </div>
      </section>

      {/* PILAR MISI ======================================================== */}
      <section id="pilar" className="py-20 md:py-32 px-4 md:px-6 border-t border-ivory/10">
        <div className="container-brand max-w-6xl mx-auto">
          <Eyebrow num="03">Pilar Misi</Eyebrow>
          <h2 className="reveal font-display font-extrabold text-3xl md:text-6xl leading-[1.05] text-ivory max-w-3xl mb-12 md:mb-16">
            Empat pondasi,{" "}
            <span className="text-primary">satu santri utuh.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ivory/10">
            {missions.map((m, i) => (
              <div
                key={m.t}
                className="reveal group relative bg-background p-7 md:p-12 transition-colors duration-500 hover:bg-navy-light/40"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start justify-between mb-8 md:mb-12">
                  <span className="font-display font-extrabold text-primary text-3xl md:text-5xl">
                    {m.n}
                  </span>
                  <span className="font-serif text-xl md:text-2xl text-ivory/50 group-hover:text-primary transition-colors" dir="rtl">
                    {m.ar}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl md:text-3xl text-ivory mb-3 md:mb-4">
                  {m.t}
                </h3>
                <p className="text-sm md:text-base text-ivory/65 leading-relaxed max-w-md">
                  {m.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAM =========================================================== */}
      <section id="program" className="py-20 md:py-32 px-4 md:px-6 border-t border-ivory/10">
        <div className="container-brand max-w-6xl mx-auto">
          <Eyebrow num="04">Program Pembelajaran</Eyebrow>
          <h2 className="reveal font-display font-extrabold text-3xl md:text-6xl leading-[1.05] text-ivory max-w-3xl mb-12 md:mb-16">
            Persiapan menyeluruh, <span className="text-primary">terstruktur.</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {program.map((p, i) => (
              <div
                key={p.t}
                className="reveal border border-ivory/10 p-6 md:p-7 hover:border-primary/40 hover:bg-navy-light/30 transition-all"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="text-primary text-xs font-bold mb-3">
                  0{i + 1}
                </div>
                <h3 className="font-display font-bold text-base md:text-lg text-ivory mb-2">
                  {p.t}
                </h3>
                <p className="text-xs md:text-sm text-ivory/60 leading-relaxed">
                  {p.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IDENTITAS VISUAL ================================================== */}
      <section id="identitas" className="py-20 md:py-32 px-4 md:px-6 border-t border-ivory/10">
        <div className="container-brand max-w-6xl mx-auto">
          <Eyebrow num="05">Identitas Visual</Eyebrow>
          <h2 className="reveal font-display font-extrabold text-3xl md:text-6xl leading-[1.05] text-ivory max-w-3xl mb-12 md:mb-16">
            Bahasa visual <span className="text-primary">yang jujur.</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6 md:gap-10 mb-12">
            <div className="reveal aspect-[4/3] bg-navy-light/40 border border-ivory/10 flex items-center justify-center p-10">
              <img src={logo} alt="Logo on dark" className="max-w-[80%] h-auto" />
            </div>
            <div className="reveal aspect-[4/3] bg-ivory flex items-center justify-center p-10">
              <img src={logo} alt="Logo on light" className="max-w-[80%] h-auto" />
            </div>
          </div>

          {/* color palette */}
          <div className="reveal mb-10">
            <div className="text-[0.65rem] md:text-xs uppercase tracking-[0.3em] text-ivory/60 mb-5">
              Palet Warna
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[
                { name: "Deep Navy", hex: "#0A1D37", c: "#0A1D37", text: "text-ivory" },
                { name: "Crimson Tarbush", hex: "#B22222", c: "#B22222", text: "text-ivory" },
                { name: "Gold", hex: "#D4B87A", c: "#D4B87A", text: "text-navy-deep" },
                { name: "Ivory", hex: "#F4EEE4", c: "#F4EEE4", text: "text-navy-deep" },
              ].map((c) => (
                <div
                  key={c.name}
                  className={`p-5 md:p-6 h-28 md:h-36 flex flex-col justify-between ${c.text}`}
                  style={{ backgroundColor: c.c }}
                >
                  <div className="text-[0.55rem] md:text-[0.6rem] uppercase tracking-wider opacity-70">
                    Brand
                  </div>
                  <div>
                    <div className="font-display font-bold text-sm md:text-base">{c.name}</div>
                    <div className="text-[0.65rem] md:text-xs mt-1 opacity-80">{c.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* typography */}
          <div className="reveal border border-ivory/10 p-6 md:p-10">
            <div className="text-[0.65rem] md:text-xs uppercase tracking-[0.3em] text-ivory/60 mb-5">
              Tipografi
            </div>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
              <div>
                <div className="font-display font-extrabold text-5xl md:text-7xl text-primary leading-none">
                  Inter
                </div>
                <div className="mt-3 text-xs md:text-sm text-ivory/60">
                  Display & Body — geometris, ringkas, modern.
                </div>
              </div>
              <div className="text-base md:text-lg text-ivory/85 font-medium leading-relaxed">
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
        className="py-20 md:py-32 px-4 md:px-6 border-t border-ivory/10 relative overflow-hidden"
      >
        <div
          aria-hidden
          className="absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: "hsl(var(--primary))" }}
        />
        <div className="container-brand max-w-4xl mx-auto text-center relative">
          <div className="reveal text-primary mb-6 flex justify-center">
            <PlusMark className="w-7 h-7" />
          </div>
          <h2 className="reveal font-display font-extrabold text-3xl md:text-6xl leading-[1.05] text-ivory mb-6">
            Mulai perjalanan ilmumu <br />
            <span className="text-primary">bersama kami.</span>
          </h2>
          <p className="reveal text-sm md:text-base text-ivory/65 max-w-xl mx-auto mb-10 leading-relaxed">
            Pendaftaran santri Markaz Rabithah dibuka setiap angkatan.
            Hubungi kami untuk konsultasi program, jadwal, dan persiapan
            dokumen.
          </p>
          <div className="reveal flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/6280000000000"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary hover:bg-primary/90 text-ivory text-xs md:text-sm uppercase tracking-[0.25em] font-semibold rounded-sm transition-colors"
            >
              Hubungi via WhatsApp
            </a>
            <a
              href="mailto:info@markazrabithah.id"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-ivory/20 hover:border-primary hover:text-primary text-ivory/85 text-xs md:text-sm uppercase tracking-[0.25em] font-semibold rounded-sm transition-colors"
            >
              info@markazrabithah.id
            </a>
          </div>

          <div className="reveal mt-16 grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 text-left max-w-3xl mx-auto pt-10 border-t border-ivory/10">
            <div>
              <div className="text-[0.65rem] uppercase tracking-[0.3em] text-ivory/50 mb-2">Lokasi</div>
              <div className="text-sm text-ivory/85 font-medium">Indonesia</div>
            </div>
            <div>
              <div className="text-[0.65rem] uppercase tracking-[0.3em] text-ivory/50 mb-2">Pendaftaran</div>
              <div className="text-sm text-ivory/85 font-medium">Setiap angkatan</div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="text-[0.65rem] uppercase tracking-[0.3em] text-ivory/50 mb-2">Sosial</div>
              <div className="flex gap-4 text-sm text-ivory/85 font-medium">
                <a href="#" className="hover:text-primary">Instagram</a>
                <a href="#" className="hover:text-primary">YouTube</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER ============================================================ */}
      <footer className="border-t border-ivory/10 py-8 px-4 md:px-6">
        <div className="container-brand max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[0.65rem] md:text-xs text-ivory/50">
          <div className="flex items-center gap-3">
            <img src={logoMark} alt="" className="w-5 h-5 object-contain" />
            <span>© 2026 Markaz Rabithah · Mahad Persiapan Al-Azhar</span>
          </div>
          <div className="flex gap-5">
            <a href="#filosofi" className="hover:text-primary">Filosofi</a>
            <a href="#pilar" className="hover:text-primary">Pilar Misi</a>
            <a href="#kontak" className="hover:text-primary">Kontak</a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;

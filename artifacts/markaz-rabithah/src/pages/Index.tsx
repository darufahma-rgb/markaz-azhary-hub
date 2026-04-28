import logo from "@/assets/logo-markaz-rabithah.png";
import logoMark from "@assets/Markaz_Rabithah_Logo_1_1777342798764.png";
import { useReveal } from "@/hooks/use-reveal";

// ---- Section header ---------------------------------------------------------
const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="reveal flex items-center gap-4 md:gap-6 my-8 md:my-12">
    <div className="h-px flex-1 bg-ivory/15" />
    <div className="text-[0.65rem] md:text-xs uppercase tracking-[0.4em] text-ivory/70 font-medium">
      {children}
    </div>
    <div className="h-px flex-1 bg-ivory/15" />
  </div>
);

// ---- Letter-meaning row (LETTER b / HOME / LOVE in reference) ---------------
const MeaningRow = ({
  letter,
  title,
  desc,
}: {
  letter: string;
  title: string;
  desc: string;
}) => (
  <div className="reveal flex gap-4 md:gap-5 items-start">
    <div className="shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-md border border-ivory/20 flex items-center justify-center text-primary">
      <span className="font-display text-base md:text-lg font-bold tracking-wide">
        {letter}
      </span>
    </div>
    <div className="pt-1">
      <div className="text-[0.7rem] md:text-xs uppercase tracking-[0.25em] text-ivory font-semibold mb-1.5">
        {title}
      </div>
      <p className="text-[0.7rem] md:text-xs text-ivory/55 leading-relaxed max-w-xs">
        {desc}
      </p>
    </div>
  </div>
);

// ---- Color swatch -----------------------------------------------------------
const Swatch = ({ color, hex }: { color: string; hex: string }) => (
  <div className="reveal flex flex-col items-center gap-3">
    <div
      className="w-20 h-20 md:w-24 md:h-24 rounded-md shadow-lg"
      style={{ backgroundColor: color }}
    />
    <div className="text-[0.65rem] md:text-xs text-ivory/80 font-medium tracking-wider">
      {hex}
    </div>
  </div>
);

// ---- App icon variant -------------------------------------------------------
const AppIcon = ({
  bg,
  rounded,
}: {
  bg: string;
  rounded: string;
}) => (
  <div
    className={`reveal w-20 h-20 md:w-24 md:h-24 ${rounded} flex items-center justify-center shadow-xl`}
    style={{ backgroundColor: bg }}
  >
    <img
      src={logo}
      alt="Markaz Rabithah app icon"
      className="w-12 h-12 md:w-14 md:h-14 object-contain"
    />
  </div>
);

// ---- Main page --------------------------------------------------------------
const Index = () => {
  useReveal();

  return (
    <main className="relative bg-background text-ivory min-h-screen py-10 md:py-16 px-4 md:px-8">
      <div className="mx-auto w-full max-w-3xl border border-ivory/10 rounded-md md:rounded-lg p-6 md:p-12 bg-background">
        {/* LOGO IDENTITY ===================================================== */}
        <SectionHeader>Logo Identity</SectionHeader>

        <div className="reveal flex flex-col items-center text-center pt-4 pb-10 md:pb-16">
          <img
            src={logo}
            alt="Markaz Rabithah logo"
            className="w-44 md:w-56 h-auto mb-6"
          />
          <div className="text-[0.7rem] md:text-xs uppercase tracking-[0.4em] text-ivory/60 mb-3">
            Mahad Persiapan
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-[1.05] tracking-tight">
            <span className="block text-ivory">Markaz</span>
            <span className="block text-primary">Rabithah</span>
          </h1>
          <p className="mt-4 text-xs md:text-sm text-ivory/55 max-w-md leading-relaxed">
            Mediator Mahad persiapan Al-Azhar — kokoh ilmunya, terjaga
            hafalannya, luhur akhlaknya.
          </p>
        </div>

        {/* LOGO VARIANTS ===================================================== */}
        <div className="reveal grid grid-cols-2 gap-4 md:gap-6 mb-8">
          <div className="aspect-square rounded-md border border-ivory/10 bg-navy-light/30 flex items-center justify-center p-6">
            <img src={logo} alt="Logo on dark" className="max-w-[70%] h-auto" />
          </div>
          <div className="aspect-square rounded-md bg-ivory flex items-center justify-center p-6">
            <img
              src={logo}
              alt="Logo on light"
              className="max-w-[70%] h-auto"
            />
          </div>
        </div>

        {/* LOGO MARK & GRID ================================================== */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 mt-12 md:mt-16">
          <div>
            <div className="reveal text-center text-[0.65rem] md:text-xs uppercase tracking-[0.4em] text-ivory/70 font-medium mb-6">
              Logo Mark
            </div>
            <div className="space-y-5 md:space-y-6">
              <MeaningRow
                letter="م"
                title="Markaz"
                desc="Pusat ilmu — titik orbit yang memberi arah bagi langkah santri."
              />
              <MeaningRow
                letter="R"
                title="Rabithah"
                desc="Tali yang mengikat santri, ulama, dan Al-Azhar tanpa terputus."
              />
              <MeaningRow
                letter="A"
                title="Azhary"
                desc="Mewarisi manhaj Al-Azhar yang moderat, berimbang, dan bersanad."
              />
            </div>
          </div>

          <div>
            <div className="reveal text-center text-[0.65rem] md:text-xs uppercase tracking-[0.4em] text-ivory/70 font-medium mb-6">
              Logo Grid System
            </div>
            <div className="reveal aspect-square rounded-md border border-ivory/15 relative overflow-hidden flex items-center justify-center">
              {/* grid lines */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(244,238,228,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,238,228,0.18) 1px, transparent 1px)",
                  backgroundSize: "12.5% 12.5%",
                }}
              />
              {/* diagonal guides */}
              <div className="absolute inset-0 opacity-20">
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="w-full h-full"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="100"
                    y2="100"
                    stroke="hsl(var(--primary))"
                    strokeWidth="0.3"
                  />
                  <line
                    x1="100"
                    y1="0"
                    x2="0"
                    y2="100"
                    stroke="hsl(var(--primary))"
                    strokeWidth="0.3"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="0.3"
                  />
                </svg>
              </div>
              <img
                src={logoMark}
                alt="Logo on grid"
                className="relative z-10 w-3/5 h-auto"
              />
            </div>
          </div>
        </div>

        {/* LOGO TYPO ========================================================= */}
        <SectionHeader>Logo Typo</SectionHeader>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start mt-2">
          <div>
            <div
              className="reveal text-5xl md:text-7xl font-extrabold lowercase text-primary leading-none tracking-tight"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              inter
            </div>
            <div className="reveal mt-6">
              <div className="font-display font-bold text-base md:text-lg text-ivory mb-2">
                Markaz Rabithah
              </div>
              <p className="text-[0.7rem] md:text-xs text-ivory/55 leading-relaxed max-w-sm">
                Markaz Rabithah adalah Mahad persiapan Al-Azhar yang berfokus
                membangun fondasi ilmu alat, hafalan, dan adab santri.
              </p>
            </div>
          </div>

          <div className="reveal text-[0.85rem] md:text-base text-ivory/85 leading-relaxed font-medium">
            <div>Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll</div>
            <div>Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww</div>
            <div>Xx Yy Zz</div>
            <div className="mt-3">1 2 3 4 5 6 7 8 9 0</div>
            <div className="mt-1">{`( ! ? ) $ ( ) / ?`}</div>
          </div>
        </div>

        {/* APP ICON ========================================================== */}
        <SectionHeader>App Icon</SectionHeader>

        <div className="flex justify-center items-center gap-6 md:gap-10 py-4">
          <AppIcon bg="hsl(var(--primary))" rounded="rounded-lg" />
          <AppIcon bg="hsl(var(--background))" rounded="rounded-2xl" />
          <AppIcon bg="#F4EEE4" rounded="rounded-full" />
        </div>

        {/* COLOR PALETTE ===================================================== */}
        <SectionHeader>Color Palette</SectionHeader>

        <div className="grid grid-cols-4 gap-3 md:gap-5 py-4">
          <Swatch color="#0A1D37" hex="#0A1D37" />
          <Swatch color="#B22222" hex="#B22222" />
          <Swatch color="#D4B87A" hex="#D4B87A" />
          <Swatch color="#F4EEE4" hex="#F4EEE4" />
        </div>

        {/* Footer ============================================================ */}
        <div className="reveal mt-12 md:mt-16 pt-6 border-t border-ivory/10 text-center text-[0.65rem] md:text-xs text-ivory/50 tracking-wider">
          design by{" "}
          <span className="text-ivory font-semibold">SYMP Studio</span>
        </div>
      </div>
    </main>
  );
};

export default Index;

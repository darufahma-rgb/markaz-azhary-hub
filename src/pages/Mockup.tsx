import React, { useState } from "react";
import SiteNav from "@/components/SiteNav";
import { useReveal } from "@/hooks/use-reveal";

// ---- helpers ---------------------------------------------------------------
type Cat = "Print" | "Apparel" | "Digital" | "Environmental";

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.22em] text-ivory/60 px-2.5 py-1 rounded-full border border-ivory/15 bg-background/40 backdrop-blur-sm">
    <span className="w-1 h-1 rounded-full bg-primary" />
    {children}
  </span>
);

const SectionHeader = ({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) => (
  <div className="reveal mb-10 md:mb-14 text-center">
    <p className="text-[0.65rem] uppercase tracking-[0.32em] text-primary mb-3">
      {eyebrow}
    </p>
    <h2 className="font-display font-extrabold text-3xl md:text-5xl text-ivory">
      {title}
    </h2>
    {desc && (
      <p className="mt-4 text-sm md:text-base text-ivory/65 max-w-2xl mx-auto leading-relaxed">
        {desc}
      </p>
    )}
  </div>
);

// ---- Card frame around each mockup ----------------------------------------
const MockCard = ({
  cat,
  title,
  subtitle,
  children,
  bg = "navy",
  className = "",
}: {
  cat: Cat;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  bg?: "navy" | "ivory" | "gradient";
  className?: string;
}) => {
  const bgCls =
    bg === "ivory"
      ? "bg-[hsl(var(--ivory))]"
      : bg === "gradient"
      ? "bg-gradient-to-br from-[hsl(215_60%_18%)] via-[hsl(var(--navy))] to-[hsl(var(--navy-deep))]"
      : "bg-[hsl(var(--navy-deep))]";
  return (
    <div
      className={`reveal group relative rounded-2xl overflow-hidden border border-ivory/10 bg-card/40 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:-translate-y-1 hover:shadow-crimson ${className}`}
    >
      <div
        className={`relative aspect-[4/3] overflow-hidden ${bgCls} flex items-center justify-center`}
      >
        {/* Subtle vignette + grid overlay for "studio" look */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--ivory) / 0.6) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--ivory) / 0.6) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              bg === "ivory"
                ? "radial-gradient(ellipse at center, transparent 35%, hsl(40 30% 80% / 0.35) 100%)"
                : "radial-gradient(ellipse at center, transparent 40%, hsl(215 80% 4% / 0.6) 100%)",
          }}
        />
        <div className="relative w-full h-full flex items-center justify-center p-6 md:p-10">
          {children}
        </div>
      </div>
      <div className="px-5 py-4 flex items-start justify-between gap-3 border-t border-ivory/10">
        <div>
          <p className="text-[0.6rem] uppercase tracking-[0.25em] text-primary mb-0.5">
            {cat}
          </p>
          <h3 className="font-display font-extrabold text-lg text-ivory leading-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-ivory/55 mt-0.5">{subtitle}</p>
          )}
        </div>
        <span className="text-[0.6rem] uppercase tracking-[0.22em] text-ivory/40 mt-1">
          ⋯
        </span>
      </div>
    </div>
  );
};

// ---- Individual mockups ----------------------------------------------------

const BusinessCardMock = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Back card (front of business card on dark) */}
    <div
      className="absolute w-[68%] aspect-[1.72/1] rounded-md shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] -rotate-6 -translate-x-[18%] translate-y-[6%] bg-[hsl(var(--navy-deep))] border border-ivory/10 overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center p-5">
        <img src="/Markaz_Rabithah_Logo_1_1777345170344.png" alt="logo" className="w-[70%] object-contain" />
      </div>
      <div className="absolute top-2.5 right-3 text-[0.45rem] uppercase tracking-[0.3em] text-ivory/30">
        مَرْكَزُ الرَّابِطَة
      </div>
    </div>
    {/* Front card (light back of business card) */}
    <div className="absolute w-[68%] aspect-[1.72/1] rounded-md shadow-[0_25px_50px_-15px_rgba(0,0,0,0.55)] rotate-3 translate-x-[18%] -translate-y-[8%] bg-[hsl(var(--ivory))] overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[hsl(var(--crimson))]" />
      <div className="absolute inset-0 pl-5 pr-4 py-4 flex flex-col justify-between">
        <div className="flex items-center gap-2">
          <img src="/Logo_Markaz_Rabithah_2_1777345186295.png" alt="" className="w-7 h-7 object-contain" />
          <div className="leading-tight">
            <p className="font-display font-extrabold text-[0.55rem] text-[hsl(var(--navy-deep))] tracking-tight">
              MARKAZ RABITHAH
            </p>
            <p className="text-[0.35rem] uppercase tracking-[0.28em] text-[hsl(var(--crimson))]">
              منهج · أزهري · بسند
            </p>
          </div>
        </div>
        <div>
          <p className="font-display font-bold text-[0.65rem] text-[hsl(var(--navy-deep))]">
            Ahmad Fulan, Lc.
          </p>
          <p className="text-[0.45rem] uppercase tracking-[0.18em] text-[hsl(var(--navy-deep))]/60">
            Mudir Ma'had
          </p>
          <div className="mt-1.5 text-[0.42rem] text-[hsl(var(--navy-deep))]/70 space-y-0.5">
            <p>+62 812 3456 7890</p>
            <p>info@markazrabithah.id</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const LetterheadMock = () => (
  <div className="relative w-[78%] h-full mx-auto bg-[hsl(var(--ivory))] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.55)] rounded-sm overflow-hidden flex flex-col">
    {/* top strip */}
    <div className="relative h-12 bg-[hsl(var(--navy-deep))] flex items-center px-4 justify-between">
      <img src="/Logo_Markaz_Rabithah_2_1777345186295.png" alt="" className="w-7 h-7 object-contain" />
      <div className="text-right">
        <p className="font-display font-extrabold text-[0.55rem] tracking-tight text-ivory">
          MARKAZ RABITHAH
        </p>
        <p className="text-[0.35rem] uppercase tracking-[0.3em] text-primary">
          Risalah Resmi
        </p>
      </div>
    </div>
    {/* body */}
    <div className="flex-1 px-5 pt-4 pb-3 text-[hsl(var(--navy-deep))]">
      <p className="text-[0.45rem] uppercase tracking-[0.2em] text-[hsl(var(--crimson))]">
        Nomor · 014/MR/IV/2026
      </p>
      <p className="font-display font-bold text-[0.7rem] mt-2">
        بسم الله الرحمن الرحيم
      </p>
      <div className="mt-2 space-y-[3px]">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="h-[3px] rounded-full bg-[hsl(var(--navy-deep))]/15"
            style={{ width: `${88 - (i % 3) * 11}%` }}
          />
        ))}
      </div>
      <div className="mt-3 ml-auto w-fit text-right">
        <p className="text-[0.4rem] text-[hsl(var(--navy-deep))]/60">
          Bandung, 28 April 2026
        </p>
        <div className="mt-1.5 h-3 w-12 ml-auto bg-[hsl(var(--crimson))]/30 rounded-sm" />
      </div>
    </div>
    {/* bottom rule */}
    <div className="h-1 bg-gradient-to-r from-[hsl(var(--crimson))] via-[hsl(var(--crimson))] to-[hsl(var(--navy-deep))]" />
  </div>
);

const TShirtMock = () => (
  <div className="relative w-[88%] aspect-[1.05/1] flex items-center justify-center">
    <svg
      viewBox="0 0 240 220"
      className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
    >
      <defs>
        <linearGradient id="teeGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(215 75% 14%)" />
          <stop offset="100%" stopColor="hsl(215 80% 7%)" />
        </linearGradient>
      </defs>
      {/* T-shirt silhouette */}
      <path
        d="M40 30 L80 12 Q120 32 160 12 L200 30 L228 60 L196 92 L188 84 L188 200 Q120 212 52 200 L52 84 L44 92 L12 60 Z"
        fill="url(#teeGrad)"
        stroke="hsl(215 30% 30%)"
        strokeWidth="0.7"
      />
      {/* Collar */}
      <path
        d="M100 18 Q120 32 140 18 Q132 30 120 30 Q108 30 100 18 Z"
        fill="hsl(215 80% 5%)"
      />
      {/* fold shading */}
      <path d="M70 60 Q90 200 60 198" fill="none" stroke="hsl(40 30% 94% / 0.05)" strokeWidth="3" />
      <path d="M170 60 Q150 200 180 198" fill="none" stroke="hsl(40 30% 94% / 0.05)" strokeWidth="3" />
    </svg>
    {/* Logo printed on chest */}
    <img
      src="/Markaz_Rabithah_Logo_1_1777345170344.png"
      alt=""
      className="absolute w-[34%] top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain opacity-95 mix-blend-screen"
    />
  </div>
);

const ToteBagMock = () => (
  <div className="relative w-[80%] aspect-[1/1.05] flex items-center justify-center">
    <svg
      viewBox="0 0 200 220"
      className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
    >
      {/* handles */}
      <path
        d="M55 50 Q55 8 100 8 Q145 8 145 50"
        fill="none"
        stroke="hsl(40 35% 92%)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* bag body */}
      <rect
        x="20"
        y="46"
        width="160"
        height="160"
        rx="3"
        fill="hsl(40 30% 92%)"
        stroke="hsl(40 25% 75%)"
        strokeWidth="0.6"
      />
      {/* canvas weave shading */}
      <rect x="20" y="46" width="160" height="160" rx="3" fill="url(#weave)" opacity="0.22" />
      <defs>
        <pattern id="weave" width="3" height="3" patternUnits="userSpaceOnUse">
          <rect width="3" height="3" fill="hsl(40 25% 70%)" />
          <rect width="1.5" height="1.5" fill="hsl(40 35% 96%)" />
        </pattern>
      </defs>
      {/* shadow */}
      <ellipse cx="100" cy="216" rx="80" ry="3" fill="black" opacity="0.25" />
    </svg>
    <img
      src="/Logo_Markaz_Rabithah_on_ivory_1777348637704.png"
      alt=""
      className="absolute w-[44%] top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain mix-blend-multiply"
    />
  </div>
);

const MugMock = () => (
  <div className="relative w-[80%] aspect-[1.2/1] flex items-center justify-center">
    <svg
      viewBox="0 0 240 200"
      className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)]"
    >
      <defs>
        <linearGradient id="mugBody" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="hsl(40 35% 90%)" />
          <stop offset="50%" stopColor="hsl(40 35% 96%)" />
          <stop offset="100%" stopColor="hsl(40 25% 80%)" />
        </linearGradient>
      </defs>
      {/* handle */}
      <path
        d="M178 60 Q220 60 220 100 Q220 140 178 140"
        fill="none"
        stroke="hsl(40 35% 92%)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M178 78 Q204 78 204 100 Q204 122 178 122"
        fill="none"
        stroke="hsl(40 25% 80%)"
        strokeWidth="3"
      />
      {/* body */}
      <rect x="40" y="40" width="148" height="130" rx="6" fill="url(#mugBody)" />
      {/* rim */}
      <ellipse cx="114" cy="42" rx="74" ry="6" fill="hsl(40 25% 70%)" />
      <ellipse cx="114" cy="42" rx="68" ry="3" fill="hsl(215 75% 9%)" />
      {/* base shadow */}
      <ellipse cx="114" cy="170" rx="74" ry="4" fill="hsl(40 25% 60%)" opacity="0.7" />
      <ellipse cx="114" cy="186" rx="80" ry="4" fill="black" opacity="0.25" />
    </svg>
    {/* logo wrapped */}
    <img
      src="/Logo_Markaz_Rabithah_on_ivory_1777348637704.png"
      alt=""
      className="absolute w-[34%] left-[30%] top-1/2 -translate-y-1/2 object-contain mix-blend-multiply"
    />
  </div>
);

const InstagramPostMock = () => (
  <div
    className="relative w-[78%] aspect-square rounded-sm shadow-[0_25px_50px_-10px_rgba(0,0,0,0.55)] overflow-hidden bg-[hsl(var(--navy-deep))] flex flex-col items-center justify-center"
  >
    {/* glow */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(circle at 50% 35%, hsl(0 70% 35% / 0.55), transparent 65%)",
      }}
    />
    {/* arabic accent */}
    <div className="absolute top-4 left-4 text-[0.55rem] uppercase tracking-[0.32em] text-ivory/40">
      @markaz.rabithah
    </div>
    <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-primary animate-slow-pulse" />
    {/* decorative arch */}
    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full opacity-[0.07]">
      <path d="M100 20 Q40 40 40 120 L40 200 L160 200 L160 120 Q160 40 100 20 Z" fill="none" stroke="hsl(40 35% 95%)" strokeWidth="0.8" />
    </svg>
    <img src="/Markaz_Rabithah_Logo_1_1777345170344.png" alt="" className="relative w-[55%] object-contain" />
    <div className="relative mt-3 text-center">
      <p className="font-display font-extrabold text-[0.7rem] uppercase tracking-[0.32em] text-ivory">
        Ngaji · Sanad · Tadabbur
      </p>
      <p className="text-[0.45rem] uppercase tracking-[0.4em] text-primary mt-1">
        Kajian Ahad · 19.30 WIB
      </p>
    </div>
    <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`h-1 rounded-full ${i === 0 ? "w-4 bg-primary" : "w-1 bg-ivory/30"}`}
        />
      ))}
    </div>
  </div>
);

const PhoneSplashMock = () => (
  <div className="relative w-[42%] h-full flex items-center justify-center">
    {/* phone frame */}
    <div className="relative w-full aspect-[9/19] rounded-[18px] bg-black p-[5px] shadow-[0_30px_50px_-15px_rgba(0,0,0,0.65)]">
      <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-[hsl(var(--navy-deep))]">
        {/* notch */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-3 rounded-full bg-black z-10" />
        {/* radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, hsl(0 70% 38% / 0.5), transparent 65%)",
          }}
        />
        {/* logo */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-3">
          <img src="/Logo_Markaz_Rabithah_2_1777345186295.png" alt="" className="w-[55%] object-contain" />
          <p className="font-display font-extrabold text-[0.55rem] tracking-[0.18em] text-ivory mt-3">
            MARKAZ RABITHAH
          </p>
          <p className="text-[0.4rem] uppercase tracking-[0.3em] text-primary mt-1">
            منهج أزهري بسند
          </p>
        </div>
        {/* loader bar */}
        <div className="absolute bottom-5 inset-x-6 h-0.5 rounded-full bg-ivory/15 overflow-hidden">
          <div className="h-full w-1/2 bg-primary animate-aurora" />
        </div>
      </div>
    </div>
  </div>
);

const SignageMock = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* wall background */}
    <div
      className="absolute inset-2 rounded-md"
      style={{
        background:
          "linear-gradient(180deg, hsl(40 15% 72%) 0%, hsl(40 12% 58%) 100%)",
      }}
    />
    <div
      aria-hidden
      className="absolute inset-2 rounded-md opacity-30 mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      }}
    />
    {/* acrylic plaque */}
    <div className="relative w-[68%] aspect-[1.6/1] rounded-md bg-[hsl(var(--navy-deep))] shadow-[0_20px_30px_-10px_rgba(0,0,0,0.6),inset_0_1px_0_hsl(40_30%_94%/0.12)] overflow-hidden flex items-center justify-center">
      {/* spec highlight */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background:
            "linear-gradient(135deg, hsl(40 30% 94% / 0.3) 0%, transparent 30%, transparent 70%, hsl(40 30% 94% / 0.18) 100%)",
        }}
      />
      <img src="/Markaz_Rabithah_Logo_1_1777345170344.png" alt="" className="relative w-[68%] object-contain" />
      {/* mounting screws */}
      <span className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-ivory/40" />
      <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-ivory/40" />
      <span className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-ivory/40" />
      <span className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-ivory/40" />
    </div>
  </div>
);

const NotebookMock = () => (
  <div className="relative w-[60%] aspect-[3/4] rounded-sm shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] bg-[hsl(var(--crimson))] overflow-hidden">
    {/* binding */}
    <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/30" />
    <div className="absolute left-3 top-0 bottom-0 w-px bg-black/40" />
    {/* embossed effect via filter */}
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
      <img
        src="/Logo_Markaz_Rabithah_2_1777345186295.png"
        alt=""
        className="w-[40%] object-contain opacity-95"
        style={{
          filter:
            "drop-shadow(0 1px 0 hsl(0 70% 28%)) drop-shadow(0 -1px 0 hsl(0 70% 60% / 0.45))",
        }}
      />
      <div className="mt-5 h-px w-12 bg-ivory/40" />
      <p className="mt-3 font-display font-extrabold text-[0.6rem] uppercase tracking-[0.34em] text-ivory">
        Markaz Rabithah
      </p>
      <p className="text-[0.45rem] uppercase tracking-[0.32em] text-ivory/70 mt-1">
        Catatan Santri
      </p>
    </div>
    {/* corner shine */}
    <div
      className="absolute inset-0 pointer-events-none opacity-30"
      style={{
        background:
          "linear-gradient(135deg, hsl(40 30% 94% / 0.18) 0%, transparent 35%)",
      }}
    />
  </div>
);

const BannerMock = () => (
  <div className="relative w-[92%] aspect-[3.4/1] rounded-sm bg-[hsl(var(--navy-deep))] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)]">
    {/* aurora background */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at 75% 50%, hsl(0 70% 35% / 0.45), transparent 60%)",
      }}
    />
    {/* arabesque arches as accent */}
    <svg viewBox="0 0 400 120" className="absolute inset-0 w-full h-full opacity-[0.08]">
      <path
        d="M0 100 Q40 40 80 100 Q120 40 160 100 Q200 40 240 100 Q280 40 320 100 Q360 40 400 100"
        fill="none"
        stroke="hsl(40 35% 95%)"
        strokeWidth="1"
      />
    </svg>
    {/* content */}
    <div className="relative h-full flex items-center justify-between px-6">
      <img src="/Markaz_Rabithah_Logo_1_1777345170344.png" alt="" className="h-[78%] object-contain" />
      <div className="text-right">
        <p className="font-display font-extrabold text-sm md:text-base text-ivory">
          Daurah Akbar 1447 H
        </p>
        <p className="text-[0.55rem] uppercase tracking-[0.32em] text-primary">
          Ramadhan · Bandung
        </p>
      </div>
    </div>
    {/* bottom stripe */}
    <div className="absolute bottom-0 inset-x-0 h-1 bg-[hsl(var(--crimson))]" />
  </div>
);

const StampMock = () => (
  <div className="relative w-[55%] aspect-square flex items-center justify-center">
    <div className="absolute inset-0 rounded-full border-2 border-[hsl(var(--crimson))] opacity-90" />
    <div className="absolute inset-2 rounded-full border border-[hsl(var(--crimson))]/70" />
    <div className="absolute inset-0 flex items-center justify-center text-[hsl(var(--crimson))]">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <path
            id="stampTop"
            d="M 50 50 m -38 0 a 38 38 0 0 1 76 0"
            fill="none"
          />
          <path
            id="stampBot"
            d="M 50 50 m -38 0 a 38 38 0 0 0 76 0"
            fill="none"
          />
        </defs>
        <text fill="currentColor" fontSize="8" letterSpacing="3" fontFamily="Sk Modernist, sans-serif" fontWeight="800">
          <textPath href="#stampTop" startOffset="50%" textAnchor="middle">
            MARKAZ · RABITHAH · OFFICIAL
          </textPath>
        </text>
        <text fill="currentColor" fontSize="6" letterSpacing="4" fontFamily="Sk Modernist, sans-serif" fontWeight="700">
          <textPath href="#stampBot" startOffset="50%" textAnchor="middle">
            EST · 1446H · BANDUNG
          </textPath>
        </text>
      </svg>
    </div>
    <img src="/Logo_Markaz_Rabithah_2_1777345186295.png" alt="" className="relative w-[38%] object-contain opacity-90" style={{ filter: "drop-shadow(0 0 0 hsl(var(--crimson)))" }} />
    {/* stamp ink texture overlay */}
    <div
      aria-hidden
      className="absolute inset-0 rounded-full mix-blend-screen opacity-30"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      }}
    />
  </div>
);

// ---- Page ------------------------------------------------------------------

type Item = {
  title: string;
  subtitle: string;
  cat: Cat;
  bg: "navy" | "ivory" | "gradient";
  span?: string;
  render: () => React.ReactElement;
};

const items: Item[] = [
  {
    title: "Kartu Nama",
    subtitle: "Front · back, 90 × 55 mm",
    cat: "Print",
    bg: "gradient",
    span: "md:col-span-2",
    render: () => <BusinessCardMock />,
  },
  {
    title: "Cap Stempel Resmi",
    subtitle: "Tinta crimson, ø 45 mm",
    cat: "Print",
    bg: "ivory",
    render: () => <StampMock />,
  },
  {
    title: "Kop Surat Resmi",
    subtitle: "Risalah A4 · 210 × 297 mm",
    cat: "Print",
    bg: "gradient",
    render: () => <LetterheadMock />,
  },
  {
    title: "Kaos Santri",
    subtitle: "Cotton combed 30s · navy",
    cat: "Apparel",
    bg: "gradient",
    render: () => <TShirtMock />,
  },
  {
    title: "Tote Bag Kanvas",
    subtitle: "Canvas 12oz · 38 × 40 cm",
    cat: "Apparel",
    bg: "navy",
    render: () => <ToteBagMock />,
  },
  {
    title: "Mug Keramik",
    subtitle: "Sublimasi 11oz · doff",
    cat: "Apparel",
    bg: "navy",
    render: () => <MugMock />,
  },
  {
    title: "Buku Catatan Santri",
    subtitle: "Hard cover · A5 · 120 hal",
    cat: "Print",
    bg: "navy",
    render: () => <NotebookMock />,
  },
  {
    title: "Konten Instagram",
    subtitle: "Square post · 1080 × 1080",
    cat: "Digital",
    bg: "gradient",
    render: () => <InstagramPostMock />,
  },
  {
    title: "Splash Screen Mobile",
    subtitle: "iOS · 1170 × 2532",
    cat: "Digital",
    bg: "gradient",
    render: () => <PhoneSplashMock />,
  },
  {
    title: "Plang Akrilik Kantor",
    subtitle: "Acrylic 8mm · spacer alumunium",
    cat: "Environmental",
    bg: "ivory",
    render: () => <SignageMock />,
  },
  {
    title: "Banner Acara",
    subtitle: "Flexi 280 × 100 cm",
    cat: "Environmental",
    bg: "gradient",
    span: "md:col-span-2",
    render: () => <BannerMock />,
  },
];

const cats: ("Semua" | Cat)[] = [
  "Semua",
  "Print",
  "Apparel",
  "Digital",
  "Environmental",
];

const Mockup = () => {
  useReveal();
  const [filter, setFilter] = useState<"Semua" | Cat>("Semua");

  const visible =
    filter === "Semua" ? items : items.filter((i) => i.cat === filter);

  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Ambient backdrop */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% -10%, hsl(0 70% 25% / 0.25), transparent 55%), radial-gradient(ellipse at 80% 110%, hsl(215 60% 18% / 0.6), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <SiteNav />

      {/* Hero */}
      <section className="relative pt-40 md:pt-48 pb-12 md:pb-16 px-4 md:px-6">
        <div className="container-brand text-center">
          <div className="reveal flex justify-center mb-6">
            <Tag>Brand Application</Tag>
          </div>
          <h1 className="reveal font-display font-extrabold text-4xl md:text-6xl lg:text-7xl text-ivory leading-[1.05] tracking-tight">
            Mockup{" "}
            <span className="bg-gradient-to-r from-[hsl(var(--crimson))] via-[hsl(var(--crimson-glow))] to-[hsl(var(--crimson))] bg-clip-text text-transparent">
              Identitas
            </span>
          </h1>
          <p className="reveal mt-5 max-w-2xl mx-auto text-sm md:text-base text-ivory/65 leading-relaxed">
            Aplikasi nyata logo Markaz Rabithah di berbagai medium —
            dari kartu nama, perlengkapan santri, sampai signage kantor.
            Setiap penerapan menjaga proporsi, ruang aman, dan palet warna
            sesuai panduan brand.
          </p>

          {/* Filter chips */}
          <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-2">
            {cats.map((c) => {
              const active = filter === c;
              return (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`text-[0.65rem] uppercase tracking-[0.22em] px-4 py-2 rounded-full border transition-all duration-300 ${
                    active
                      ? "bg-primary text-ivory border-primary shadow-crimson"
                      : "bg-background/40 text-ivory/65 border-ivory/15 hover:border-primary/50 hover:text-ivory"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mockup grid */}
      <section className="relative px-4 md:px-6 pb-20 md:pb-28">
        <div className="container-brand">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {visible.map((it) => (
              <MockCard
                key={it.title}
                cat={it.cat}
                title={it.title}
                subtitle={it.subtitle}
                bg={it.bg}
                className={it.span || ""}
              >
                {it.render()}
              </MockCard>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="text-center text-ivory/55 py-20 text-sm">
              Belum ada mockup di kategori ini.
            </p>
          )}
        </div>
      </section>

      {/* Footer rules / disclaimer */}
      <section className="relative px-4 md:px-6 pb-24 md:pb-32">
        <div className="container-brand">
          <div className="reveal relative rounded-2xl border border-ivory/10 bg-card/40 backdrop-blur-sm p-6 md:p-10 overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0 opacity-25 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 100% 0%, hsl(0 70% 35% / 0.45), transparent 60%)",
              }}
            />
            <div className="relative grid md:grid-cols-3 gap-6 md:gap-10">
              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.3em] text-primary mb-2">
                  Aturan Aplikasi
                </p>
                <p className="text-sm text-ivory/70 leading-relaxed">
                  Selalu jaga ruang aman minimum sebesar tinggi huruf "M" pada
                  logo, di seluruh sisi.
                </p>
              </div>
              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.3em] text-primary mb-2">
                  Palet Resmi
                </p>
                <p className="text-sm text-ivory/70 leading-relaxed">
                  Gunakan Navy{" "}
                  <code className="text-ivory">#0A1D37</code>, Crimson{" "}
                  <code className="text-ivory">#B22222</code>, dan Ivory{" "}
                  <code className="text-ivory">#F4EFE6</code> sebagai dasar.
                </p>
              </div>
              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.3em] text-primary mb-2">
                  Larangan
                </p>
                <p className="text-sm text-ivory/70 leading-relaxed">
                  Jangan stretch, miringkan, atau ubah warna logo. Hindari
                  background ramai yang mengganggu legibility.
                </p>
              </div>
            </div>
            <div className="relative mt-8 pt-6 border-t border-ivory/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="text-xs text-ivory/55">
                Mockup di atas bersifat ilustratif untuk panduan penerapan
                brand.
              </p>
              <a
                href="/#download"
                className="shine inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.22em] px-4 py-2.5 bg-primary text-ivory hover:bg-primary/90 rounded-full font-semibold w-fit transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Download Aset Brand
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* unused asset reference to keep tree-shaking honest */}
      <span className="hidden">
        <img src="/Logo_Markaz_Rabithah_on_crimson_1777348637704.png" alt="" />
      </span>
    </main>
  );
};

export default Mockup;

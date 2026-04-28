import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        display: ["'Sk Modernist'", "Inter", "system-ui", "sans-serif"],
        sans: ["'Sk Modernist'", "Inter", "system-ui", "sans-serif"],
        serif: ["'Sk Modernist'", "Inter", "system-ui", "sans-serif"],
        arabic: ["'Qahwa Arabic'", "'Amiri'", "'Scheherazade New'", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        navy: {
          DEFAULT: "hsl(var(--navy))",
          deep: "hsl(var(--navy-deep))",
          light: "hsl(var(--navy-light))",
        },
        crimson: {
          DEFAULT: "hsl(var(--crimson))",
          glow: "hsl(var(--crimson-glow))",
        },
        ivory: "hsl(var(--ivory))",
        gold: "hsl(var(--gold))",
      },
      backgroundImage: {
        "gradient-hero": "var(--gradient-hero)",
        "gradient-crimson": "var(--gradient-crimson)",
        "gradient-line": "var(--gradient-line)",
      },
      boxShadow: {
        elegant: "var(--shadow-elegant)",
        crimson: "var(--shadow-crimson)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "fade-up": { "0%": { opacity: "0", transform: "translateY(30px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "slow-pulse": { "0%,100%": { opacity: "0.6" }, "50%": { opacity: "1" } },
        "shimmer": { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        "float": {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "float-slow": {
          "0%,100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(0.5deg)" },
        },
        "aurora": {
          "0%,100%": { transform: "translate(0%, 0%) scale(1)", opacity: "0.55" },
          "33%": { transform: "translate(8%, -6%) scale(1.08)", opacity: "0.75" },
          "66%": { transform: "translate(-6%, 5%) scale(0.95)", opacity: "0.6" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "draw-line": {
          "0%": { strokeDashoffset: "200" },
          "100%": { strokeDashoffset: "0" },
        },
        "shine-sweep": {
          "0%": { transform: "translateX(-120%) skewX(-20deg)" },
          "100%": { transform: "translateX(220%) skewX(-20deg)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "ping-ring": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
        "anchor-pulse": {
          "0%,100%": { transform: "translate(-50%,-50%) scale(1)", opacity: "1" },
          "50%": { transform: "translate(-50%,-50%) scale(1.4)", opacity: "0.7" },
        },
        "scan-line": {
          "0%,100%": { top: "0%", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "50%": { top: "100%", opacity: "0.9" },
        },
        "caret-blink": {
          "0%,49%": { opacity: "1" },
          "50%,100%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 1s cubic-bezier(0.22,1,0.36,1) both",
        "slow-pulse": "slow-pulse 4s ease-in-out infinite",
        "shimmer": "shimmer 6s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        "aurora": "aurora 14s ease-in-out infinite",
        "spin-slow": "spin-slow 40s linear infinite",
        "draw-line": "draw-line 1.4s cubic-bezier(0.65,0,0.35,1) forwards",
        "shine-sweep": "shine-sweep 1.1s ease-out",
        "marquee": "marquee 38s linear infinite",
        "ping-ring": "ping-ring 2.6s cubic-bezier(0,0,0.2,1) infinite",
        "anchor-pulse": "anchor-pulse 2.4s ease-in-out infinite",
        "scan-line": "scan-line 6s ease-in-out infinite",
        "caret-blink": "caret-blink 1.1s steps(1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

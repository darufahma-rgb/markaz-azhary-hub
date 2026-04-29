# Markaz Rabithah Logo Guide

## Overview

Microsite landing page untuk panduan identitas brand Markaz Rabithah (Azhary Modern) oleh SYMP Studio. Berisi filosofi, pilar misi, palet warna, tipografi, dan aplikasi brand.

**Frontend-only** — tidak ada backend, database, autentikasi, atau API server.

## Stack

- **Framework**: React 19 + Vite 7
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS v3 + tailwindcss-animate
- **Routing**: react-router-dom v7
- **UI components**: Radix UI primitives + shadcn/ui (di `src/components/ui`)
- **Icons**: lucide-react, react-icons
- **Animasi**: framer-motion
- **Form/validasi**: react-hook-form + zod (tersedia, belum tentu dipakai aktif)
- **State server**: @tanstack/react-query (tersedia, belum tentu dipakai aktif)
- **Package manager**: npm
- **Node**: 24

## Struktur

```
index.html              # entry HTML, load /src/main.tsx
src/
  main.tsx              # bootstrap React
  App.tsx               # router + provider (QueryClient, Tooltip, Toaster)
  index.css, App.css    # global styles
  pages/
    Index.tsx           # halaman utama (landing)
    Mockup.tsx          # halaman /mockup
    NotFound.tsx        # 404
  components/
    SiteNav.tsx, NavLink.tsx
    ui/                 # komponen shadcn/ui
  hooks/, lib/, assets/, test/
public/                 # favicon, opengraph, dll
```

## Perintah

- `npm run dev` — jalankan dev server (Vite) di port dari env `PORT` (default 5173, di Replit pakai 5000)
- `npm run build` — build production ke folder `dist/`
- `npm run serve` — preview hasil build
- `npm run typecheck` — cek TypeScript tanpa emit

## Workflow Replit

- **Start application**: `PORT=5000 npm run dev` — jalan di port 5000, di-expose via port 80.

## Deployment

- Target: `autoscale` (lihat `.replit`).
- Build: `npm run build` → output statis di `dist/`.
- Karena frontend-only, sebenarnya cocok juga untuk static hosting.

## Catatan

- Vite di-konfigurasi `allowedHosts: true` supaya bisa di-preview lewat iframe Replit.
- `BASE_PATH` bisa di-set via env untuk deploy ke sub-path.

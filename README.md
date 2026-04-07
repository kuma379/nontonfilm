# NontonFilm

Website streaming anime, film, dan series Indonesia.

## Stack
- **Frontend**: React + Vite + TailwindCSS + TanStack Query + Axios
- **Backend**: Node.js + Express + Axios
- **Deploy**: Vercel

## Cara Deploy ke Vercel

1. Fork/clone repo ini ke GitHub kamu
2. Buka [vercel.com](https://vercel.com) → Import Project
3. Pilih repo ini → Deploy
4. Vercel otomatis akan detect konfigurasi dari `vercel.json`

## Endpoints API

| Endpoint | Deskripsi |
|----------|-----------|
| `GET /api/home` | Beranda (top 10, terbaru, ongoing) |
| `GET /api/search?q=` | Cari konten |
| `GET /api/anime/:slug` | Detail anime |
| `GET /api/episode/:slug` | Episode + server streaming |
| `GET /api/film/:slug` | Detail film |
| `GET /api/series/:slug` | Detail series |
| `GET /api/genres` | Semua genre |
| `GET /api/genre/:genre` | Konten per genre |
| `GET /api/schedule?day=senin` | Jadwal per hari |
| `GET /api/ongoing` | Anime ongoing |
| `GET /api/completed` | Anime completed |
| `GET /api/populer` | Anime populer |
| `GET /api/catalog` | Katalog lanjutan |
| `GET /api/server` | Server streaming |

## Dev Local

```bash
# Backend
cd api && npm install && node index.js

# Frontend (di terminal lain)
cd client && npm install && npm run dev
```

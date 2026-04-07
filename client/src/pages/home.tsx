import { useGetHome, useGetPopular, useGetLatest } from '../api/hooks';
import { Link } from "wouter";
import { Play, Star, TrendingUp, Clock, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContentCard from "@/components/ContentCard";

export default function Home() {
  const { data: homeData, isLoading } = useGetHome();
  const { data: popularData } = useGetPopular();
  const { data: latestData } = useGetLatest();

  const data = (homeData as any)?.data;
  const popular = (popularData as any)?.data || [];
  const latest = (latestData as any)?.data || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="min-h-screen w-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground font-medium tracking-wide text-sm">Memuat NontonFilm...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="container mx-auto px-4 pt-8 pb-20 space-y-12">
        {data?.top10_anime?.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" /> Top 10 Trending
              </h2>
              <Link href="/popular" className="text-xs text-primary hover:underline flex items-center gap-1">
                Lihat Semua <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4">
              {data.top10_anime.slice(0, 10).map((anime: any, idx: number) => (
                <Link key={anime.id} href={`/anime/${anime.id}`} className="group relative overflow-hidden rounded-lg bg-card transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/20 block aspect-[2/3]">
                  <img src={anime.image} alt={anime.title} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/200x300/0a0a1a/06b6d4?text=No+Image"; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
                  <div className="absolute top-2 left-2">
                    <div className="bg-primary text-primary-foreground text-xs font-black px-2 py-1 rounded shadow-lg">#{idx + 1}</div>
                  </div>
                  {anime.rating && anime.rating !== "0" && (
                    <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-black/70 backdrop-blur-sm rounded px-1.5 py-0.5">
                      <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-[10px] font-bold text-white">{anime.rating}</span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="font-bold text-xs line-clamp-2 leading-tight text-white">{anime.title}</h3>
                    <div className="flex items-center gap-1 mt-1.5 text-[10px] text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Play className="w-3 h-3 fill-current" /> Tonton
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {(data?.latest?.length > 0 || latest.length > 0) && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" /> Rilis Terbaru
              </h2>
              <Link href="/catalog" className="text-xs text-primary hover:underline flex items-center gap-1">
                Lihat Semua <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {(data?.latest || latest).slice(0, 12).map((item: any) => (
                <ContentCard key={item.id} id={item.id} title={item.title} image={item.image} type={item.type} rating={item.rating} episode={item.episode} />
              ))}
            </div>
          </section>
        )}

        {(data?.ongoing?.length > 0) && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold">Ongoing</h2>
              <Link href="/ongoing" className="text-xs text-primary hover:underline flex items-center gap-1">
                Lihat Semua <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {data.ongoing.slice(0, 12).map((item: any) => (
                <ContentCard key={item.id} id={item.id} title={item.title} image={item.image} type={item.type} rating={item.rating} episode={item.episode} />
              ))}
            </div>
          </section>
        )}

        {popular.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" /> Populer
              </h2>
              <Link href="/popular" className="text-xs text-primary hover:underline flex items-center gap-1">
                Lihat Semua <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {popular.slice(0, 12).map((item: any) => (
                <ContentCard key={item.id} id={item.id} title={item.title} image={item.image} type={item.type} rating={item.rating} episode={item.episode} />
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-border/40 bg-card/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <span className="font-black text-lg text-primary">Nonton</span>
          <span className="font-black text-lg text-foreground">Film</span>
          <p className="text-xs text-muted-foreground mt-2">Streaming anime, film, series favorit kamu</p>
        </div>
      </footer>
    </div>
  );
}

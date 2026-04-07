import { useGetSeriesDetail } from '../api/hooks';
import { useParams, Link } from "wouter";
import Navbar from "@/components/Navbar";
import { Star, Play, ArrowLeft, Info } from "lucide-react";

export default function SeriesDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error } = useGetSeriesDetail(slug!);
  const detail = (data as any)?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="flex justify-center items-center py-40">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">
          <Info className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>Konten tidak ditemukan</p>
          <Link href="/" className="inline-block mt-4 text-primary hover:underline text-sm">Kembali ke beranda</Link>
        </div>
      </div>
    );
  }

  const episodes: any[] = detail.episodes || detail.episode_list || [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      {detail.image && (
        <div className="relative h-[250px] overflow-hidden">
          <img src={detail.image} alt={detail.title} className="w-full h-full object-cover blur-sm scale-110 opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        </div>
      )}
      <main className="container mx-auto px-4 -mt-16 relative z-10 pb-16">
        <Link href="/series" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Series
        </Link>
        <div className="flex flex-col md:flex-row gap-6">
          <img src={detail.image} alt={detail.title} className="w-40 h-60 object-cover rounded-xl shadow-2xl border border-border shrink-0" />
          <div className="space-y-3">
            <h1 className="text-2xl font-black">{detail.title}</h1>
            <div className="flex flex-wrap gap-2">
              {detail.rating && detail.rating !== "0" && (
                <span className="flex items-center gap-1 px-2 py-1 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-xs font-bold text-yellow-400">
                  <Star className="w-3 h-3 fill-yellow-400" /> {detail.rating}
                </span>
              )}
              {detail.type && <span className="px-2 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs font-bold text-primary">{detail.type}</span>}
              {detail.status && <span className="px-2 py-1 bg-secondary border border-border rounded-full text-xs font-medium text-muted-foreground">{detail.status}</span>}
            </div>
            {detail.synopsis && <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">{detail.synopsis}</p>}
          </div>
        </div>
        {episodes.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-4">Daftar Episode</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {episodes.map((ep: any) => (
                <Link key={ep.slug || ep.id} href={`/episode/${ep.slug || ep.id}`} className="flex items-center gap-2 px-3 py-2 bg-card rounded-lg border border-border hover:border-primary/50 hover:text-primary text-sm font-medium transition-all group">
                  <Play className="w-3.5 h-3.5 shrink-0 group-hover:fill-current" />
                  <span className="truncate">{ep.title || `Episode ${ep.episode}`}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

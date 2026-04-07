import { useGetFilmDetail, useGetStreamingServer } from '../api/hooks';
import { useParams, Link } from "wouter";
import Navbar from "@/components/Navbar";
import { Star, ArrowLeft, Play, Info } from "lucide-react";
import { useState } from "react";

export default function FilmDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error } = useGetFilmDetail(slug!);
  const detail = (data as any)?.data;

  const servers: any[] = detail?.servers || [];
  const [activeServer, setActiveServer] = useState(0);
  const server = servers[activeServer];

  const { data: serverData } = useGetStreamingServer(
    { post: server?.post, nume: server?.nume, type: server?.type },
    { query: { enabled: !!server?.post } }
  );
  const iframeUrl = (serverData as any)?.data?.url || (serverData as any)?.url || "";

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
          <p>Film tidak ditemukan</p>
          <Link href="/" className="inline-block mt-4 text-primary hover:underline text-sm">Kembali ke beranda</Link>
        </div>
      </div>
    );
  }

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
        <Link href="/film" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Film
        </Link>
        <div className="flex flex-col md:flex-row gap-6 mb-8">
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
            </div>
            {detail.synopsis && <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">{detail.synopsis}</p>}
          </div>
        </div>

        <div className="aspect-video bg-black rounded-xl overflow-hidden mb-4">
          {iframeUrl ? (
            <iframe src={iframeUrl} className="w-full h-full" allowFullScreen allow="autoplay; fullscreen" title="Film Player" sandbox="allow-same-origin allow-scripts allow-forms allow-popups" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-3">
              <Play className="w-12 h-12 opacity-30" />
              <p className="text-sm">{servers.length > 0 ? "Pilih server di bawah" : "Sumber tidak tersedia"}</p>
            </div>
          )}
        </div>

        {servers.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">Pilih Server</p>
            <div className="flex flex-wrap gap-2">
              {servers.map((s: any, idx: number) => (
                <button key={idx} onClick={() => setActiveServer(idx)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${activeServer === idx ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent border border-border"}`}>
                  {s.title || `Server ${idx + 1}`}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

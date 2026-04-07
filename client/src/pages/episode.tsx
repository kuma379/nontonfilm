import { useGetEpisodeDetail, useGetStreamingServer } from '../api/hooks';
import { useParams, Link } from "wouter";
import Navbar from "@/components/Navbar";
import { ArrowLeft, ArrowRight, ChevronRight, Play } from "lucide-react";
import { useState } from "react";

export default function EpisodePage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading } = useGetEpisodeDetail(slug!);
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 py-6 pb-16">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-lg font-bold line-clamp-1">{detail?.title || slug}</h1>
        </div>

        <div className="relative bg-black rounded-xl overflow-hidden mb-4 aspect-video">
          {iframeUrl ? (
            <iframe
              src={iframeUrl}
              className="w-full h-full"
              allowFullScreen
              allow="autoplay; fullscreen"
              title="Video Player"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-3">
              <Play className="w-12 h-12 opacity-30" />
              <p className="text-sm">{servers.length > 0 ? "Pilih server di bawah" : "Server tidak tersedia"}</p>
            </div>
          )}
        </div>

        {servers.length > 0 && (
          <div className="mb-6">
            <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">Pilih Server</p>
            <div className="flex flex-wrap gap-2">
              {servers.map((s: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveServer(idx)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    activeServer === idx
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                      : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent border border-border"
                  }`}
                >
                  {s.title || `Server ${idx + 1}`}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          {detail?.prev ? (
            <Link href={`/episode/${detail.prev}`} className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg text-sm font-medium hover:bg-accent transition-colors">
              <ArrowLeft className="w-4 h-4" /> Episode Sebelumnya
            </Link>
          ) : <div />}

          {detail?.next ? (
            <Link href={`/episode/${detail.next}`} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              Episode Berikutnya <ArrowRight className="w-4 h-4" />
            </Link>
          ) : <div />}
        </div>
      </main>
    </div>
  );
}

import { useSearchContent } from '../api/hooks';
import { useLocation } from "wouter";
import { Search } from "lucide-react";
import ContentCard from "@/components/ContentCard";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";

export default function SearchPage() {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split("?")[1] || "");
  const q = params.get("q") || "";
  const [query, setQuery] = useState(q);
  const [, navigate] = useLocation();

  const { data, isLoading } = useSearchContent({ q: query }, { query: { enabled: !!query } });

  const results = (data as any)?.results || [];

  useEffect(() => {
    setQuery(q);
  }, [q]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-xl mb-8">
          <h1 className="text-2xl font-bold mb-4">Cari Konten</h1>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari anime, film, series..."
                className="w-full pl-9 pr-4 py-2.5 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <button type="submit" className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              Cari
            </button>
          </form>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!isLoading && q && results.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">Tidak ditemukan hasil untuk "{q}"</p>
            <p className="text-sm mt-2">Coba kata kunci lain</p>
          </div>
        )}

        {results.length > 0 && (
          <>
            <p className="text-sm text-muted-foreground mb-4">{results.length} hasil untuk "{q}"</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {results.map((item: any) => (
                <ContentCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  type={item.type}
                  rating={item.rating}
                  href={`/anime/${item.id}`}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

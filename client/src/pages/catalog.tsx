import { useGetCatalog } from '../api/hooks';
import { useState } from "react";
import Navbar from "@/components/Navbar";
import ContentCard from "@/components/ContentCard";
import { SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

const TYPES = ["", "TV", "Movie", "OVA", "ONA", "Special"];
const STATUSES = ["", "Currently Airing", "Finished Airing", "Not Yet Aired"];
const ORDERS = ["", "update", "popular", "latest"];

export default function CatalogPage() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetCatalog({ title: title || undefined, type: type || undefined, status: status || undefined, order: order || undefined, page });
  const items = (data as any)?.data || [];
  const totalPage = (data as any)?.total_page || 1;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <SlidersHorizontal className="w-6 h-6 text-primary" /> Katalog
        </h1>

        <div className="flex flex-wrap gap-3 mb-6 p-4 bg-card rounded-lg border border-border">
          <input
            type="text"
            placeholder="Cari judul..."
            value={title}
            onChange={(e) => { setTitle(e.target.value); setPage(1); }}
            className="flex-1 min-w-[160px] px-3 py-2 bg-secondary border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <select
            value={type}
            onChange={(e) => { setType(e.target.value); setPage(1); }}
            className="px-3 py-2 bg-secondary border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">Semua Tipe</option>
            {TYPES.filter(Boolean).map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            className="px-3 py-2 bg-secondary border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">Semua Status</option>
            {STATUSES.filter(Boolean).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={order}
            onChange={(e) => { setOrder(e.target.value); setPage(1); }}
            className="px-3 py-2 bg-secondary border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">Urutan Default</option>
            <option value="update">Terbaru</option>
            <option value="popular">Terpopuler</option>
          </select>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {items.map((item: any) => (
                <ContentCard key={item.id} id={item.id} title={item.title} image={item.image} type={item.type} rating={item.rating} episode={item.episode} />
              ))}
            </div>

            {totalPage > 1 && (
              <div className="flex items-center justify-center gap-3 mt-8">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex items-center gap-1 px-4 py-2 bg-secondary rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-accent transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <span className="text-sm text-muted-foreground">Halaman {page} / {totalPage}</span>
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={page >= totalPage}
                  className="flex items-center gap-1 px-4 py-2 bg-secondary rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-accent transition-colors"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

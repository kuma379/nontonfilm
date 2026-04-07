import { useGetByGenre } from '../api/hooks';
import { useParams } from "wouter";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import ContentCard from "@/components/ContentCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GenrePage() {
  const { genre } = useParams<{ genre: string }>();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetByGenre(genre!, { page });
  const items = (data as any)?.data || [];
  const totalPage = (data as any)?.total_page || 1;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 capitalize">{genre} Anime</h1>

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
          </>
        )}
      </main>
    </div>
  );
}

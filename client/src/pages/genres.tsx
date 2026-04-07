import { useGetGenres } from '../api/hooks';
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import { Tag } from "lucide-react";

export default function GenresPage() {
  const { data, isLoading } = useGetGenres();
  const genres = (data as any)?.data || [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Tag className="w-6 h-6 text-primary" /> Semua Genre
        </h1>

        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {genres.map((genre: any) => (
            <Link
              key={genre.slug}
              href={`/genre/${genre.slug}`}
              className="group flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-primary/50 hover:bg-card/80 transition-all"
            >
              <span className="font-medium text-sm group-hover:text-primary transition-colors">{genre.name}</span>
              <span className="text-xs text-muted-foreground">{genre.count}</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Search, Menu, X, Tv, Film, Clapperboard, Monitor, Calendar, Tag } from "lucide-react";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [, navigate] = useLocation();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center gap-4">
        <Link href="/" className="flex items-center space-x-1 shrink-0">
          <span className="font-black text-xl tracking-tight text-primary">Nonton</span>
          <span className="font-black text-xl tracking-tight text-foreground">Film</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 ml-4">
          <Link href="/anime" className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <Tv className="w-3.5 h-3.5" />Anime
          </Link>
          <Link href="/film" className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <Film className="w-3.5 h-3.5" />Film
          </Link>
          <Link href="/series" className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <Clapperboard className="w-3.5 h-3.5" />Series
          </Link>
          <Link href="/tvshow" className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <Monitor className="w-3.5 h-3.5" />TV Show
          </Link>
          <Link href="/schedule" className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <Calendar className="w-3.5 h-3.5" />Jadwal
          </Link>
          <Link href="/genres" className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <Tag className="w-3.5 h-3.5" />Genre
          </Link>
        </nav>

        <form onSubmit={handleSearch} className="flex-1 max-w-sm ml-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Cari anime, film, series..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-secondary border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
            />
          </div>
        </form>

        <button
          className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-3 space-y-1">
          {[
            { href: "/anime", icon: Tv, label: "Anime" },
            { href: "/film", icon: Film, label: "Film" },
            { href: "/series", icon: Clapperboard, label: "Series" },
            { href: "/tvshow", icon: Monitor, label: "TV Show" },
            { href: "/schedule", icon: Calendar, label: "Jadwal" },
            { href: "/genres", icon: Tag, label: "Genre" },
          ].map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
              <Icon className="w-4 h-4" />{label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

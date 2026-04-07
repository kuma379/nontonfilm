import { Link } from "wouter";
import { Play, Star } from "lucide-react";

interface ContentCardProps {
  id: string;
  title: string;
  image: string;
  type?: string;
  rating?: string;
  episode?: string;
  status?: string;
  href?: string;
}

export default function ContentCard({ id, title, image, type, rating, episode, href }: ContentCardProps) {
  const linkHref = href || `/anime/${id}`;
  return (
    <Link href={linkHref} className="group block relative rounded-lg overflow-hidden bg-card aspect-[2/3] cursor-pointer">
      <img
        src={image}
        alt={title}
        className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110"
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://via.placeholder.com/200x300/0a0a1a/06b6d4?text=No+Image";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

      {type && (
        <div className="absolute top-2 right-2">
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary/90 text-primary-foreground uppercase tracking-wider">
            {type}
          </span>
        </div>
      )}

      {rating && rating !== "0" && (
        <div className="absolute top-2 left-2 flex items-center gap-0.5 bg-black/70 backdrop-blur-sm rounded px-1.5 py-0.5">
          <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
          <span className="text-[10px] font-bold text-white">{rating}</span>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h3 className="font-semibold text-xs text-white line-clamp-2 leading-tight">{title}</h3>
        {episode && (
          <p className="text-[10px] text-primary mt-0.5 font-medium">{episode}</p>
        )}
        <div className="flex items-center gap-1 mt-2 text-[10px] text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Play className="w-3 h-3 fill-current" /> Tonton Sekarang
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="bg-primary/90 text-primary-foreground p-3 rounded-full transform scale-50 group-hover:scale-100 transition-transform duration-200">
          <Play className="w-5 h-5 fill-current" />
        </div>
      </div>
    </Link>
  );
}

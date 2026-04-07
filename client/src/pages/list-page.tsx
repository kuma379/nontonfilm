import { useGetOngoing, useGetCompleted, useGetPopular, useGetAnimeDonghua, useGetFilmList, useGetSeriesList, useGetTvShowList } from '../api/hooks';
import Navbar from "@/components/Navbar";
import ContentCard from "@/components/ContentCard";
import { TrendingUp, CheckCircle2, Clock, Tv, Film, Clapperboard, Monitor } from "lucide-react";

type ListType = "ongoing" | "completed" | "popular" | "anime" | "film" | "series" | "tvshow";

const config: Record<ListType, { title: string; icon: React.ElementType; hook: string }> = {
  ongoing: { title: "Anime Ongoing", icon: Clock, hook: "ongoing" },
  completed: { title: "Anime Completed", icon: CheckCircle2, hook: "completed" },
  popular: { title: "Anime Terpopuler", icon: TrendingUp, hook: "popular" },
  anime: { title: "Anime & Donghua", icon: Tv, hook: "anime" },
  film: { title: "Film", icon: Film, hook: "film" },
  series: { title: "Series", icon: Clapperboard, hook: "series" },
  tvshow: { title: "TV Show", icon: Monitor, hook: "tvshow" },
};

function useListData(type: ListType) {
  const ongoing = useGetOngoing({ query: { enabled: type === "ongoing" } });
  const completed = useGetCompleted({ query: { enabled: type === "completed" } });
  const popular = useGetPopular({ query: { enabled: type === "popular" } });
  const anime = useGetAnimeDonghua({ page: 1 }, { query: { enabled: type === "anime" } });
  const film = useGetFilmList({ page: 1 }, { query: { enabled: type === "film" } });
  const series = useGetSeriesList({ page: 1 }, { query: { enabled: type === "series" } });
  const tvshow = useGetTvShowList({ page: 1 }, { query: { enabled: type === "tvshow" } });

  const map = { ongoing, completed, popular, anime, film, series, tvshow };
  return map[type];
}

interface Props {
  type: ListType;
}

export default function ListPage({ type }: Props) {
  const { title, icon: Icon } = config[type];
  const { data, isLoading } = useListData(type);
  const items = (data as any)?.data || [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Icon className="w-6 h-6 text-primary" /> {title}
        </h1>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {items.map((item: any) => (
              <ContentCard key={item.id} id={item.id} title={item.title} image={item.image} type={item.type} rating={item.rating} episode={item.episode} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

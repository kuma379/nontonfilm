import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import SearchPage from "@/pages/search";
import GenresPage from "@/pages/genres";
import GenrePage from "@/pages/genre";
import SchedulePage from "@/pages/schedule";
import CatalogPage from "@/pages/catalog";
import AnimeDetailPage from "@/pages/anime-detail";
import EpisodePage from "@/pages/episode";
import SeriesDetailPage from "@/pages/series-detail";
import FilmDetailPage from "@/pages/film-detail";
import ListPage from "@/pages/list-page";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/search" component={SearchPage} />
      <Route path="/genres" component={GenresPage} />
      <Route path="/genre/:genre" component={GenrePage} />
      <Route path="/schedule" component={SchedulePage} />
      <Route path="/catalog" component={CatalogPage} />
      <Route path="/anime/:slug" component={AnimeDetailPage} />
      <Route path="/episode/:slug" component={EpisodePage} />
      <Route path="/series/:slug" component={SeriesDetailPage} />
      <Route path="/film/:slug" component={FilmDetailPage} />
      <Route path="/ongoing">{() => <ListPage type="ongoing" />}</Route>
      <Route path="/completed">{() => <ListPage type="completed" />}</Route>
      <Route path="/popular">{() => <ListPage type="popular" />}</Route>
      <Route path="/anime">{() => <ListPage type="anime" />}</Route>
      <Route path="/film">{() => <ListPage type="film" />}</Route>
      <Route path="/series">{() => <ListPage type="series" />}</Route>
      <Route path="/tvshow">{() => <ListPage type="tvshow" />}</Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <div className="dark">
            <Router />
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

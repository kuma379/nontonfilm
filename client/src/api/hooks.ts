import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const API_BASE = '/api';

function useApi(key: string[], url: string, enabled = true) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const res = await axios.get(url, { timeout: 15000 });
      return res.data;
    },
    enabled,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}

export function useGetHome() { return useApi(['home'], `${API_BASE}/home`); }
export function useSearchContent(params?: { q?: string }, opts?: any) {
  return useApi(['search', params?.q || ''], `${API_BASE}/search?q=${encodeURIComponent(params?.q || '')}`, opts?.query?.enabled !== false && !!params?.q);
}
export function useGetAnimeDonghua(params?: any, opts?: any) { return useApi(['animedonghua', String(params?.page || 1)], `${API_BASE}/animedonghua?page=${params?.page || 1}`, opts?.query?.enabled !== false); }
export function useGetFilmList(params?: any, opts?: any) { return useApi(['film-list', String(params?.page || 1)], `${API_BASE}/film?page=${params?.page || 1}`, opts?.query?.enabled !== false); }
export function useGetSeriesList(params?: any, opts?: any) { return useApi(['series-list', String(params?.page || 1)], `${API_BASE}/series?page=${params?.page || 1}`, opts?.query?.enabled !== false); }
export function useGetTvShowList(params?: any, opts?: any) { return useApi(['tvshow', String(params?.page || 1)], `${API_BASE}/tvshow?page=${params?.page || 1}`, opts?.query?.enabled !== false); }
export function useGetOthersList(params?: any, opts?: any) { return useApi(['others', String(params?.page || 1)], `${API_BASE}/others?page=${params?.page || 1}`, opts?.query?.enabled !== false); }
export function useGetGenres() { return useApi(['genres'], `${API_BASE}/genres`); }
export function useGetByGenre(genre: string, params?: any) { return useApi(['genre', genre, String(params?.page || 1)], `${API_BASE}/genre/${genre}?page=${params?.page || 1}`); }
export function useGetSchedule(params?: { day?: string }, opts?: any) { return useApi(['schedule', params?.day || ''], `${API_BASE}/schedule?day=${encodeURIComponent(params?.day || '')}`, opts?.query?.enabled !== false); }
export function useGetRecentUpdates() { return useApi(['update'], `${API_BASE}/update`); }
export function useGetLatest() { return useApi(['latest'], `${API_BASE}/latest`); }
export function useGetOngoing(opts?: any) { return useApi(['ongoing'], `${API_BASE}/ongoing`, opts?.query?.enabled !== false); }
export function useGetCompleted(opts?: any) { return useApi(['completed'], `${API_BASE}/completed`, opts?.query?.enabled !== false); }
export function useGetPopular(opts?: any) { return useApi(['popular'], `${API_BASE}/populer`, opts?.query?.enabled !== false); }
export function useGetAllAnime(params?: any) { return useApi(['all-anime', String(params?.page || 1)], `${API_BASE}/all-anime?page=${params?.page || 1}`); }
export function useGetCatalog(params?: any) {
  const p = new URLSearchParams();
  if (params?.title) p.set('title', params.title);
  if (params?.page) p.set('page', String(params.page));
  if (params?.order) p.set('order', params.order);
  if (params?.type) p.set('type', params.type);
  if (params?.status) p.set('status', params.status);
  return useApi(['catalog', p.toString()], `${API_BASE}/catalog?${p}`);
}
export function useGetAnimeDetail(slug: string) { return useApi(['anime', slug], `${API_BASE}/anime/${slug}`, !!slug); }
export function useGetEpisodeDetail(slug: string) { return useApi(['episode', slug], `${API_BASE}/episode/${slug}`, !!slug); }
export function useGetSeriesDetail(slug: string) { return useApi(['series', slug], `${API_BASE}/series/${slug}`, !!slug); }
export function useGetFilmDetail(slug: string) { return useApi(['film', slug], `${API_BASE}/film/${slug}`, !!slug); }
export function useGetStreamingServer(params?: any, opts?: any) {
  const p = new URLSearchParams();
  if (params?.post) p.set('post', params.post);
  if (params?.nume) p.set('nume', params.nume);
  if (params?.type) p.set('type', params.type);
  return useApi(['server', p.toString()], `${API_BASE}/server?${p}`, opts?.query?.enabled !== false && !!params?.post);
}

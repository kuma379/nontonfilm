const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const BASE_URL = 'https://www.sankavollerei.com/anime/winbu';

async function proxy(url, res) {
  try {
    const response = await axios.get(url, { timeout: 15000 });
    res.json(response.data);
  } catch (err) {
    const status = err.response?.status || 502;
    res.status(status).json({ error: 'Failed to fetch from upstream', detail: err.message });
  }
}

app.get('/api/home', (req, res) => proxy(`${BASE_URL}/home`, res));
app.get('/api/search', (req, res) => proxy(`${BASE_URL}/search?q=${encodeURIComponent(req.query.q || '')}`, res));
app.get('/api/animedonghua', (req, res) => proxy(`${BASE_URL}/animedonghua?page=${req.query.page || 1}`, res));
app.get('/api/film', (req, res) => proxy(`${BASE_URL}/film?page=${req.query.page || 1}`, res));
app.get('/api/series', (req, res) => proxy(`${BASE_URL}/series?page=${req.query.page || 1}`, res));
app.get('/api/tvshow', (req, res) => proxy(`${BASE_URL}/tvshow?page=${req.query.page || 1}`, res));
app.get('/api/others', (req, res) => proxy(`${BASE_URL}/others?page=${req.query.page || 1}`, res));
app.get('/api/genres', (req, res) => proxy(`${BASE_URL}/genres`, res));
app.get('/api/genre/:genre', (req, res) => proxy(`${BASE_URL}/genre/${req.params.genre}?page=${req.query.page || 1}`, res));
app.get('/api/schedule', (req, res) => proxy(`${BASE_URL}/schedule?day=${encodeURIComponent(req.query.day || '')}`, res));
app.get('/api/update', (req, res) => proxy(`${BASE_URL}/update`, res));
app.get('/api/latest', (req, res) => proxy(`${BASE_URL}/latest`, res));
app.get('/api/ongoing', (req, res) => proxy(`${BASE_URL}/ongoing`, res));
app.get('/api/completed', (req, res) => proxy(`${BASE_URL}/completed`, res));
app.get('/api/populer', (req, res) => proxy(`${BASE_URL}/populer`, res));
app.get('/api/all-anime', (req, res) => proxy(`${BASE_URL}/all-anime?page=${req.query.page || 1}`, res));
app.get('/api/all-anime-reverse', (req, res) => proxy(`${BASE_URL}/all-anime-reverse?page=${req.query.page || 1}`, res));
app.get('/api/catalog', (req, res) => {
  const p = new URLSearchParams();
  if (req.query.title) p.set('title', req.query.title);
  if (req.query.page) p.set('page', req.query.page);
  if (req.query.order) p.set('order', req.query.order);
  if (req.query.type) p.set('type', req.query.type);
  if (req.query.status) p.set('status', req.query.status);
  proxy(`${BASE_URL}/catalog?${p}`, res);
});
app.get('/api/list', (req, res) => {
  const p = new URLSearchParams();
  if (req.query.order) p.set('order', req.query.order);
  if (req.query.status) p.set('status', req.query.status);
  if (req.query.type) p.set('type', req.query.type);
  proxy(`${BASE_URL}/list?${p}`, res);
});
app.get('/api/anime/:slug', (req, res) => proxy(`${BASE_URL}/anime/${req.params.slug}`, res));
app.get('/api/episode/:slug', (req, res) => proxy(`${BASE_URL}/episode/${req.params.slug}`, res));
app.get('/api/series/:slug', (req, res) => proxy(`${BASE_URL}/series/${req.params.slug}`, res));
app.get('/api/film/:slug', (req, res) => proxy(`${BASE_URL}/film/${req.params.slug}`, res));
app.get('/api/server', (req, res) => {
  const p = new URLSearchParams();
  if (req.query.post) p.set('post', req.query.post);
  if (req.query.nume) p.set('nume', req.query.nume);
  if (req.query.type) p.set('type', req.query.type);
  proxy(`${BASE_URL}/server?${p}`, res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('NontonFilm API running on port', PORT));
module.exports = app;

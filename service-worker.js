const CACHE_NAME = 'platform';
const STATIC_ASSETS = [
	'/',
    '/dist/css/mdb.dark.min.css',
    '/dist/css/mdb.dark.min.css.map',
    '/dist/css/mdb.dark.rtl.min.css',
    '/dist/css/mdb.dark.rtl.min.css.map',
    '/dist/css/mdb.min.css',
    '/dist/css/mdb.min.css.map',
    '/dist/css/mdb.rtl.min.css',
    '/dist/css/mdb.rtl.min.css.map',
    '/dist/js/mdb.min.js',
    '/dist/js/mdb.min.js.map'
];

console.log(STATIC_ASSETS);

self.addEventListener('install', async e => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(STATIC_ASSETS);
  return self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', async e => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}
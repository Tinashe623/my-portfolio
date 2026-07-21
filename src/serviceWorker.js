const CACHE_NAME = 'portfolio-v4'
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/images/profile-pic.webp',
  '/Tinashe_Mundieta_CV.pdf',
]

// Installation: precache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS.map(url => 
        // Skip caching if 404 (e.g., if resume doesn't exist)
        fetch(url, { method: 'HEAD' }).then(res => res.ok ? url : null)
      )).then((results) => {
        // Filter out null results
        const validUrls = results.filter(Boolean)
        if (validUrls.length > 0) {
          return cache.addAll(validUrls)
        }
      }).catch((err) => {
        console.warn('Failed to precache some assets:', err)
      })
    }).then(() => {
      return self.skipWaiting()
    })
  )
})

// Activation: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => {
      return self.clients.claim()
    })
  )
})

// Fetch: Network-first for HTML, Cache-first for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Only handle same-origin requests
  if (!url.origin.includes(self.location.origin)) {
    return
  }

  // Navigation requests: Network first, fallback to cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful navigation responses
          const responseClone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone)
          })
          return response
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            return cached || caches.match('/index.html')
          })
        })
    )
    return
  }

  // Static assets: Cache first, network fallback, then stale-while-revalidate
  if (
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'image' ||
    request.destination === 'font'
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Fetch in background to update cache (stale-while-revalidate)
          fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, networkResponse.clone())
              })
            }
          }).catch(() => {})
          return cachedResponse
        }

        // Not in cache, fetch from network
        return fetch(request).then((response) => {
          // Cache successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response
          }
          const responseClone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone)
          })
          return response
        }).catch(() => {
          // For images, return empty response instead of error
          if (request.destination === 'image') {
            return new Response('', { status: 200, statusText: 'OK' })
          }
        })
      })
    )
  }
})

// Listen for messages (e.g., skipWaiting)
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting()
  }
})

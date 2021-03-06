/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { staticResourceCache, googleFontsCache, imageCache, warmStrategyCache } from 'workbox-recipes';
import { initializeApp } from 'firebase/app';
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';
import * as googleAnalytics from 'workbox-google-analytics';

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

googleAnalytics.initialize();
staticResourceCache();
googleFontsCache();


const workboxInitUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v10?access_token=${process.env.REACT_APP_MAPBOX_TOKEN as string}`
warmStrategyCache({
  urls: [workboxInitUrl],
  strategy: new StaleWhileRevalidate({
    cacheName: 'workbox-init',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  })
})

warmStrategyCache({
  urls: ["/v1/cats"],
  strategy: new StaleWhileRevalidate({
    cacheName: 'cats',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 604800 // 1 week
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  })
})

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }: { request: Request; url: URL }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false;
    }

    // If this is a URL that starts with /_, skip.
    if (url.pathname.startsWith('/_')) {
      return false;
    }

    // If this is a URL that starts with /api, skip.
    if (url.pathname.startsWith('/api')) {
      return false;
    }

    // If this looks like a URL for a resource, because it contains
    // a file extension, skip.
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }

    // Return true to signal that we want to use the handler.
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html'),
);

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith('.png'),
  // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  }),
);

// Cache sightings, but check the network first
registerRoute(
  new RegExp('/v1/sightings(.*)'),
  new NetworkFirst({
    cacheName: 'sightings',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 172800 // 2 days
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  })
)

// Cache cats using stale-while-revalidate
registerRoute(
  new RegExp('/v1/cats(.*)'),
  new StaleWhileRevalidate({
    cacheName: 'cats',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 604800 // 1 week
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  })
)

// Cache user profiles
registerRoute(
  new RegExp('/v1/users(.*)'),
  new StaleWhileRevalidate({
    cacheName: 'users',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 86400 // 1 day
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  })
)

// Cache sighting images from S3
// The images are immutable so we can use a cache first strategy
registerRoute(
  new RegExp('https://s3.ap-southeast-1.amazonaws.com/nuscats/sightings/.*\\.(png|jpg)'),
  new CacheFirst({
    cacheName: 'sighting-images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 172800 // 2 days
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  })
)

// Cache user profile images from S3
registerRoute(
  new RegExp('https://s3.ap-southeast-1.amazonaws.com/nuscats/users/.*\\.(png|jpg)'),
  new StaleWhileRevalidate({
    cacheName: 'profile-images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 86400 // 1 day
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  })
)

// Cache all other images
imageCache();

// Cache mapbox assets
registerRoute(
  new RegExp('https://(tiles.mapbox.com|api.mapbox.com)(.*)'),
  new StaleWhileRevalidate({
    cacheName: 'mapbox-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 604800 // 1 week
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  })
)

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyAEveDDjIrmcCAfDTZeR2NPfkNDcXnq_cU',
  authDomain: 'nuscats.firebaseapp.com',
  projectId: 'nuscats',
  storageBucket: 'nuscats.appspot.com',
  messagingSenderId: '645171323336',
  appId: '1:645171323336:web:774ddb245f9dab232760fd',
  measurementId: 'G-N2513MDLHS',
});

const messaging = getMessaging(firebaseApp);

onBackgroundMessage(messaging, (payload) => {
  console.log('[service-worker.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification?.title || 'NUS Cats';
  const notificationOptions = {
    body: payload.notification?.body,
    icon: payload.notification?.image || 'assets/icon/icon.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  console.log(event.notification);
  return event;
});

// self.addEventListener('push', (event) => {
//   const notificationText = event.data?.text();
//   const showNotification = self.registration.showNotification('NUS Cats', {
//     body: notificationText,
//     icon: 'assets/icon/icon.png',
//   });
//   // Make sure the toast notification is displayed, before exiting the function.
//   event.waitUntil(showNotification);
// });

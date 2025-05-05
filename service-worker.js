// service-worker.js
self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activated');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: '/icon.png', // Replace with your icon path
        badge: '/badge.png', // Replace with your badge path
        vibrate: [200, 100, 200],
        data: {
            url: data.url || '/',
        },
    };
    event.waitUntil(
        self.registration.showNotification(data.title || 'Trend Forge', options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});

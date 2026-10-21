const CACHE='quantro-v6';
const FILES=['./','index.html','style.css','icon.svg','quantro-icon.png','icon-192.png','icon-512.png','apple-touch-icon.png','manifest.webmanifest','install.mjs?v=4','app.mjs?v=6','audio.mjs?v=6','art.mjs','engine.mjs','math.mjs','curriculum.mjs','starter-content.mjs','topic-library.mjs','missions.mjs','storage.mjs'];
const urls=FILES.map(f=>new URL(f,self.registration.scope).href);
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(urls))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('quantro-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method==='GET'&&new URL(e.request.url).origin===self.location.origin)e.respondWith(fetch(e.request).catch(()=>caches.match(e.request).then(r=>r||(e.request.mode==='navigate'?caches.match(new URL('./',self.registration.scope)):null)).then(r=>r||new Response('Offline resource unavailable',{status:503}))));});



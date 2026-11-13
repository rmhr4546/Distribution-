const V='dist-v1',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'],X='https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(async c=>{await c.addAll(A);try{await c.add(X)}catch(x){}}).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET')return;const u=new URL(r.url);if(u.pathname.includes('/rest/v1/'))return;
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>{const n=fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>m||caches.match('index.html'));return m||n}))});

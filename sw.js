const VER="shangan-v10",C=VER,F=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>fetch(u,{cache:"no-store"}).then(r=>r.ok&&c.put(u,r)).catch(()=>{})))))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("message",e=>{if(e.data==="skip")self.skipWaiting()});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
 const nav=r.mode==="navigate"||/\/(index\.html)?$/.test(new URL(r.url).pathname);
 e.respondWith(fetch(nav?new Request(r.url,{cache:"no-store",credentials:r.credentials}):r,nav?{}:{cache:"no-cache"}).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(nav?"./index.html":r,cp))}return res})
  .catch(()=>caches.match(nav?"./index.html":r,{ignoreSearch:true}).then(m=>m||caches.match("./index.html"))))});

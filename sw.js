/**
 * ServiceWorker
 * @author Bruno Politi Romero
 */

// Instalação do Service Worker
self.addEventListener('install', (event) => {
    console.log("Instalando o ServiceWorker...", event)
    // Pré carregamento em cache
    event.waitUntil(
        //armazenar em cache:
        caches.open('static')
            .then((cache) => {
                console.log("Pré carregamento dos arquivos do app")
                cache.add('/etagas2/')
                cache.add('/etagas2/index.html')
                cache.add('/etagas2/style.css')
                cache.add('/etagas2/app.js')
                cache.add('/etagas2/img/flex.png')
                cache.add('/etagas2/img/calcflex.png')
                cache.add('/etagas2/img/etanol.png')
                cache.add('/etagas2/img/gasolina.png')
            })
    )
})

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
    console.log("Ativando o ServiceWorker...", event)
    return self.clients.claim() //garantir o serviço em todos os documentos do app
})

// Escutando requisições "buscando algo"
self.addEventListener('fetch', (event) => {
    // console.log("Buscando algo...", event)
    // armazener em cache(arquivos estático pré carregados) todas as requisições
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response
                } else {
                    return fetch(event.request)
                }
            })
    )
})
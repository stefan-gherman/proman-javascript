// install serviceWorker
self.addEventListener('install', function (event){
    console.log('Service Worker has been installed');
});

//activate serviceWorker
self.addEventListener('activate', function (event){
    console.log('Service Worker has been activated');
});


//fetch event
self.addEventListener('fetch', function(event){
   console.log('fetch event', event);
});
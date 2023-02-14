

if (navigator.serviceWorker){
	navigator.serviceWorker.register("./js/sw.js")
}

navigator.serviceWorker.ready.then(res=> console.log(res.active.postMessage("ServiceWorker Active")))
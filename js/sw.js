

let version = "version 2";
const archivos = [
			'../',
			'../index.html',
			'../page1.html',
			'../css/bootstrap.css',
			'../css/card.css',
			'../css/copyright.css',
			'../css/estilos.css',
			'../css/estilos2.css',
			'../css/fontresponsive.css',
			'../css/form.css',
			'../css/navbarconfig.css',
			'../css/normalize.css',
			'bootstrap.js',
			'codigo.js'];

/*Instalacion del Service Worker*/
self.addEventListener("install", e=>{
	console.log("Instalando Service Worker");
	caches.open(version).then(cache=>{
		cache.addAll(archivos).then(res=>{
			console.log("Informacion Cacheada con Exito");
		}).catch(e=>{
			console.log(e);
		})
	})	
})

/*Eliminamos Cache en caso de que haya informacion*/
self.addEventListener("activate", ()=>{
	caches.keys().then(key=>{
		return Promise.all(key.map(cache =>{
			if (cache !== version){
				console.log("Cache Antiguo Eliminado con Exito");
				return caches.delete(cache);
			}
		}))
	})
})


/*Muestra la informacion en Cache sin Internet*/
self.addEventListener("fetch", e =>{
	e.respondWith( async function(){
		const respuestaEnCache = await caches.match(e.request);
		if (respuestaEnCache){
			return respuestaEnCache
		}else{
			return e.request
		}
	})
}) 
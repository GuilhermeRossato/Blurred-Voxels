const Loader = (function() {
	let element, state, times;

	function setLocalVariables() {
		element = window.mainWrapper.children[1];
		state = "init";
		times = {init: performance.now()};
	}

	function setDescription(text) {
		element.innerHTML = text;
	}

	function callEverything() {
		// Best function name ever
		state = "init";

    	if(typeof(Worker) === "undefined") {
    		return this.onError("WebWorker is not supported by the browser.");
    	} else if (typeof(HTMLCanvasElement) === "undefined") {
    		return this.onError("Canvas Element is not supported by the browser.");
    	}
    	let rendererTest;
    	try {
			rendererTest = new THREE.WebGLRenderer();
			rendererTest.dispose();
			rendererTest = undefined;
		} catch (err) {
			return this.onError("WebGl is not supported by the browser.");
		}
		GUI.init();
		Application.init();
		let worldGenerator = new Worker("https://cdn.rawgit.com/GuilhermeRossato/VoxelWorldGeneration/40793138/Script/World/Generation/WorldWorker1.js");
		worldGenerator.onresponse = ev=>((ev.data[0]==="c")?this.onWorldLoad(ev.data.substr(1)):this.onError("World Generation has returned an unhandled event"));
		worldGenerator.postMessage(`c${(Math.random()*1000|0)},${(Math.random()*1000|0)},${(Math.random()*1000|0)}`);
		let imageLoader = new ImageLoader();
		imageLoader.on("error", this.onError.bind(this, "Image Loader has returned an unhandled event"));
		imageLoader.on("load", this.onImagesProgress.bind(this));
		imageLoader.on("done", this.onLoadImages.bind(this));
		imageLoader.loadImages(imageLoaderCache.map(i=>i.fileName));
	}

	return {
		onPageLoad: function() {
			setLocalVariables();
			setDescription("WAITING STUFF!");
			callEverything.call(this);
			this.onPageLoad = undefined;
		},
		onLoadImages: function() {
			this.onLoadImages = undefined;
			times.images = performance.now();
			checkDone();
		},
		onError: function(message, event) {
			window.mainWrapper.children[0].innerText = "Error";
			setDescription(message);
		},
		onWorldLoad: function(data) {
			let interpreted = decodeWorldMessage(data);
			let worldData = new WorldDataArray(chunkSize, chunkSize, chunkSize);
			data.decode(data.substr(interpreted.start+1));
		},
		onImageProgress: function() {

		},
		init: function() {

		}
	}
})();

window.addEventListener("load", Loader.onPageLoad.bind(Loader));
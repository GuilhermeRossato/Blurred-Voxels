/*
*	This is an event driven module to handle the application's loading states
*/
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

	function hideLoadingInterface() {
		setDescription("Done");
		window.mainWrapper.style.opacity = "0";
	}

	function callEverything() {
		// Best function name ever
		state = "init";

    	if(typeof(Worker) === "undefined") {
    		return this.onError("WebWorker is not supported by the browser");
    	} else if (typeof(HTMLCanvasElement) === "undefined") {
    		return this.onError("Canvas Element is not supported by the browser");
    	}
    	let rendererTest;
    	try {
			rendererTest = new THREE.WebGLRenderer();
			rendererTest.dispose();
			rendererTest = undefined;
		} catch (err) {
			return this.onError("WebGl is not supported by the browser");
		}
		if (!GUI.init())
			return this.onError("Threejs renderers failed to initialize");
		Application.init();
		let startPos = [(Math.random()*50|0), (Math.random()*50|0)];
		startPos = [39,27];
		console.log("Start position: ",startPos.join());
		let worldGenerator = new WorldGenerator(startPos[0], startPos[1]);
		worldGenerator.on("done", this.onWorldLoad.bind(this));
		worldGenerator.init();

		let imageLoader = new ImageLoader();
		imageLoader.on("error", this.onError.bind(this, "Image Loader has returned an unhandled event"));
		imageLoader.on("done", this.onLoadedImages.bind(this));
		imageLoader.loadImages(imageLoaderCache.map(i=>i.fileName));
		Application.images = imageLoader.getImages();
	}

	return {
		onPageLoad: function() {
			setLocalVariables();
			setDescription("Generating World...");
			callEverything.call(this);
			this.onPageLoad = undefined;
		},
		onLoadedImages: function() {
			this.onLoadedImages = undefined;
			times.images = performance.now()|0;
			Application.startMainLoop();
		},
		onError: function(message, event) {
			window.mainWrapper.children[0].innerText = "Error";
			setDescription(message);
		},
		onWorldLoad: function(chunks) {
			if (this.onLoadedImages !== undefined) {
				console.log("That's unusual, world returned before images!");
				console.log("App will run without them! :v");
				var moment = performance.now();
				this.onLoadedImages = ()=>{console.log("Images loaded after "+(performance.now()-moment)+"ms!")};
				Application.startMainLoop();
			}
			times.world = performance.now()|0;

			hideLoadingInterface();

			chunks.forEach(chunk => {
				Application.addChunk(chunk);
			});
		}
	}
})();

window.addEventListener("load", Loader.onPageLoad.bind(Loader));
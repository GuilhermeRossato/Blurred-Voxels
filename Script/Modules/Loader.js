/*
*	This is an event driven module to handle the application's loading states
*/
const Loader = (function() {
	let element, state, times;

	function setLocalVariables() {
		element = window.mainWrapper.children[1];
		state = "init";
		times = {
			init: performance.now()
		};
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

		if (typeof (Worker) === "undefined") {
			return this.onError("WebWorker is not supported by the browser");
		} else if (typeof (HTMLCanvasElement) === "undefined") {
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
		initWorldGen.call(this);
		initImageLoad.call(this);
	}

	function initWorldGen() {
		/*
		* Entire option menu was was made in a _rush_ and so was this function, it might be messy.
		*/
		let startConfig = {}
		  , parType = window.location.search.substr(6, 6)
		  , parSize = window.location.search.substr(17, 1);
		if (parSize == "")
			parSize = "1";
		if (parType == "")
			parType = "static";
		/* Decide World Gen Position */
		if (parType == "random")
			startConfig.position = [(Math.random() * 100 | 0), (Math.random() * 100 | 0)];
		else {
			if (parSize == "0") {
				startConfig.position = [2, 4];
			} else if (parSize == "1") {
				startConfig.position = [53, 91];
			} else if (parSize == "2") {
				startConfig.position = [12, 19];
			} else {
				startConfig.position = [39, 27];
			}
		}
		/* Decide World Size */
		if (parSize == "0") {
			startConfig.size = 2;
		} else if (parSize == "1") {
			startConfig.size = 8;
		} else if (parSize == "2") {
			startConfig.size = 18;
		} else if (parSize == "3") {
			startConfig.size = 50;
		} else {
			startConfig.size = 4;
		}
		/* Create World Generator */
		console.log("Start Position: "+startConfig.position.join(), "Size: "+startConfig.size);
		try {
			let worldGenerator = new WorldGenerator(startConfig);
			worldGenerator.on("done", this.onWorldLoad.bind(this));
			worldGenerator.init();
		} catch(err) {
			window.mainWrapper.children[0].innerText = "Error";
			if (err.name == "SecurityError") {
				var str = "Failed to Web Worker due to Cross Origin Conflict<br>";
				if (location.hostname == "") {
					str += "You must disable cross origin security to run this locally.<br>There are some tools to help you at the 'Tools' folder:<br>run.bat and run.sh, whichever your OS supports<br>Obs: They require Google Chrome";
				} else {
					str += "The error likely was caused because the webworker<br>is being stored in another repository<br>Sorry :) Thats on me<br>You'll have to copy it and put it locally.";
					str += "<br>Take a look at /Script/Classes/WorldGenerator.js";
				}
				setDescription(str);
			} else {
				setDescription("Unable to generate Web Worker, check console");
			}
			throw err;
		}
	}
	function initImageLoad() {
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
			times.images = performance.now() | 0;
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
				this.onLoadedImages = ()=>{
					console.log("Images loaded after " + (performance.now() - moment) + "ms!")
				}
				;
				Application.startMainLoop();
			}
			times.world = performance.now() | 0;

			hideLoadingInterface();

			chunks.forEach(chunk=>{
				Application.addChunk(chunk);
			}
			);
		}
	}
})();

window.addEventListener("load", Loader.onPageLoad.bind(Loader));

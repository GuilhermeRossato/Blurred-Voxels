const Application = (function() {
	let performancer = new Performancer();
	performancer.wrapper.style.zIndex = "11";
	let world;
	function firstFrame() {
		GUI.logger.log(`Loaded Page at ${(this.pageLoadTime|0)}ms and Images at ${(this.imageLoadTime|0)}ms`);
		lastTimeStamp = 0;
		leftOver = 0;
		GUI.render();
		world.init();
		world.addToScene(GUI.scene);
		GUI.renderers.forEach(render => render.domElement.style.display = "block");
		window.requestAnimationFrame(update);
	}
	let difference, timeStamp, lastTimeStamp = 0, leftOver = 0;
	function update() {
		timeStamp = performance.now();
		difference = timeStamp - lastTimeStamp + leftOver;
		lastTimeStamp = timeStamp;
		performancer.update(difference);
		if (difference > 256) difference = 128;
			while (difference >= 16) {
				difference -= 16;
				world.update();
			}
			leftOver = difference;
		GUI.render();
		window.requestAnimationFrame(update);
	}

	return {
		init: function() {
			this.pageLoadTime = performance.now();
			GUI.init();
			this.images = new ImageLoader();
			this.images.loadImages(imageLoaderCache.map(i=>i.fileName)).then(this.createWorld.bind(this));
		},
		createWorld: function() {
			this.imageLoadTime = performance.now();
			world = new WorldHandler(this.images.getImages());
			firstFrame.call(this);
		}

	}
}());

window.addEventListener("load", Application.init.bind(Application));
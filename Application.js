const Application = (function() {
	var performancer = new Performancer();
	performancer.wrapper.style.zIndex = "11";
	//performancer.wrapper.style.display = "none";
	var world, cinematic;
	function firstFrame() {
		lastTimeStamp = 0;
		leftOver = 0;
		world = new WorldHandler(this.images);
		world.init(GUI.camera, GUI.scenes);
		cinematic = new Cinematic();
		cinematic.init(world, GUI.camera, GUI.scenes);
		this.world = world;
		GUI.render();
		GUI.renderers.forEach(render=>render.domElement.style.display = "block");
		if (false)
			window.requestAnimationFrame(update);
		else
			window.requestAnimationFrame(fixedUpdate);
	}
	var difference, timeStamp, lastTimeStamp = 0, leftOver = 0;
	function fixedUpdate() {
		timeStamp = performance.now();
		difference = timeStamp - lastTimeStamp;
		performancer.update(difference);
		lastTimeStamp = timeStamp;
		
		difference = cinematic.periods.animation/360;
		cinematic.update(difference);
		world.update(difference);
		GUI.render();
		window.requestAnimationFrame(fixedUpdate);
	}
	function update() {
		timeStamp = performance.now();
		difference = timeStamp - lastTimeStamp;
		performancer.update(difference);
		lastTimeStamp = timeStamp;
		difference /= 16;
		cinematic.update(difference);
		world.update(difference);
		GUI.render();
		window.requestAnimationFrame(update);
	}

	return {
		init: function() {
			window.addEventListener("keydown", this.onKeyDown.bind(this));
		},
		startMainLoop: function() {
			firstFrame.call(this);
		},
		addChunk: function(chunk) {
			cinematic.onChunkAdded();
			return world.addChunk(chunk);
		},
		onKeyDown: function(event) {
			if (event.code === "KeyS")
				fixedUpdate();
			if (event.code === "KeyR")
				world.reset();
		}
	}
}());

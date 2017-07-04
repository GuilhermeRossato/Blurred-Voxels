const Application = (function() {
	var performancer = new Performancer();
	performancer.wrapper.style.zIndex = "11";
	var world, cinematic, options;
	function firstFrame() {
		lastTimeStamp = 0;
		leftOver = 0;
		options = new SidebarOptions(document.body,Application);
		world = new WorldHandler(this.images);
		world.init(GUI.camera, GUI.scenes, Application.sizeOption);
		cinematic = new Cinematic();
		cinematic.init(world, GUI.camera, GUI.scenes);
		this.world = world;
		GUI.render();
		GUI.renderers.forEach(render=>render.domElement.style.display = "block");
		if (true)
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
		difference = cinematic.periods.animation/720;
		cinematic.update(difference);
		world.update(difference);
		GUI.render();
		//if (!world.finishedLoading)
		//	window.requestAnimationFrame(fixedUpdate);
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
		switchCinematicSpeed: function() {
			if (cinematic.periods.animation === 720) {
				cinematic.periods.animation = 2048;
			} else if (cinematic.periods.animation === 2048) {
				cinematic.periods.animation = 5120;
			} else {
				cinematic.periods.animation = 720;
			}
			return cinematic.periods.animation;
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
				Application.beginStepDebug();
		},
		beginStepDebug: function() {
			if (cinematic.resetAngle)
				cinematic.resetAngle();
			fixedUpdate();
			this.hidePerformancer();
			this.hideOptions();
		},
		hidePerformancer: function() {
			performancer.wrapper.style.display = "none";
		},
		hideOptions: function() {
			options.realHide();
		}
	}
}());

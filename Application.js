const Application = (function() {
	var performancer = new Performancer();
	performancer.wrapper.style.zIndex = "11";
	//performancer.wrapper.style.display = "none";
	var world;
	function firstFrame() {
		GUI.logger.log(`Loaded Page at ${(this.pageLoadTime | 0)}ms and Images at ${(this.imageLoadTime | 0)}ms`);
		lastTimeStamp = 0;
		leftOver = 0;
		world.init(GUI.camera, GUI.scenes);
		GUI.render();
		GUI.renderers.forEach(render=>render.domElement.style.display = "block");
		if (true)
			window.requestAnimationFrame(update);
		else
			window.requestAnimationFrame(fixedUpdate);
	}
	var difference, timeStamp, lastTimeStamp = 0, leftOver = 0;
	function fixedUpdate() {
		world.update(world.animationPeriod/180);
		GUI.render();
		window.requestAnimationFrame(fixedUpdate);
	}
	function update() {
		timeStamp = performance.now();
		difference = timeStamp - lastTimeStamp;
		performancer.update(difference);
		world.update(difference/16);
		lastTimeStamp = timeStamp;
		GUI.render();
		window.requestAnimationFrame(update);
	}

	return {
		init: function() {
			window.addEventListener("keydown", this.onKeyDown.bind(this));
		},
		onKeyDown: function(event) {
			if (event.code === "KeyS")
				singleUpdate();
			if (event.code === "KeyR")
				world.reset();
		}
	}
}());

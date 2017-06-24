const GUI = (function() {
	return {
		blurLevels: 10,
		init: function() {
			return this.setupWorld();
		},
		onResize: function() {
			if (this.camera) {
				this.camera.aspect = window.innerWidth / window.innerHeight;
				this.camera.updateProjectionMatrix();
			}
			(this.renderers) && ((this.renderers.forEach(renderer=>renderer.setSize(window.innerWidth, window.innerHeight))) || this.render());
		},
		setupWorld: function() {
			let rendererConfig = {
				antialias: true,
				alpha: true,
				clearColor: getComputedStyle(document.body)["background-color"]
			}
			try {
				this.renderers = [];
				this.scenes = [];
				for (let i = 0; i < this.blurLevels; i++) {
					var t = (((i-3)%this.blurLevels) / this.blurLevels);
					let renderer = new THREE.WebGLRenderer(rendererConfig);
					//renderer.setClearColor(new THREE.Color(rendererConfig.clearColor), 1);
					renderer.domElement.style.position = "absolute";
					renderer.domElement.style.top = "0";
					renderer.domElement.style.display = "none";
					renderer.domElement.style.zIndex = (-i - 1).toString();
					renderer.domElement.style.backfaceVisibility = "hidden";
					renderer.domElement.style.perspective = "inherit";
					//let brightness = FastInterpolation.any(0, 0, 0.9, 0.91, 1, 1, 1-t);
					//renderer.domElement.style.filter = `brightness(${(((brightness * 1000) | 0)/10)}%)`;
					//let level = [1,0,0,0,0,0,0,0][i];
					level = Math.abs(FastInterpolation.any(0,0,1,5,t));
					renderer.domElement.style.filter = `blur(${level}px)`;
					//renderer.domElement.style.filter = `blur(${level}px) hue-rotate(${(360*(1-t)|0)}deg)`;
					//renderer.domElement.style.filter = `hue-rotate(${(360*(1-t)|0)}deg)`;
					console.log(renderer.domElement.style.filter);

					document.body.appendChild(renderer.domElement);
					this.renderers.push(renderer);
					this.scenes.push(new THREE.Scene());
				}
			} catch (err) {
				console.error(err);
				return false;
			}
			this.camera = new THREE.PerspectiveCamera(85,window.innerWidth / window.innerHeight,0.2,100);
			this.camera.position.set(0, 0, 4);
			addEventListener('resize', this.onResize.bind(this), false);
			this.onResize();
			this.setupLight();
			return true;
		},
		setupLight: function() {
			function addLight(name, position, intensity) {
				let light = new THREE.DirectionalLight(0xffffff,intensity);
				light.position.copy(position);
				light.name = name;
				return light;
			}
			let lights = [
			addLight("Top",		{ x: 0, y: 1, z: 0 },	2.935),
			addLight("Front",	{ x: 0, y: 0, z: -1 },	2.382),
			addLight("Back",	{ x: 0, y: 0, z: 1 },	2.3548),
			addLight("Left",	{ x: -1, y: 0, z: 0 },	1.7764),
			addLight("Right",	{ x: 1, y: 0, z: 0 },	1.7742),
			addLight("Bottom",	{ x: 0, y: -1, z: 0 },	1.5161)];
			this.scenes.forEach(scene => lights.forEach(light=>scene.children.push(light)));
			this.scenes.forEach(scene=>lights.forEach(light=>scene.children.push(light)));
		},
		render: function() {
			for (let i = 0; i < this.renderers.length; i++) {
				this.renderers[i].render(this.scenes[i], this.camera);
			}
		}
	}
})();

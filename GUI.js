const GUI = (function (){
	return {
		blurLevels: 4,
		init: function() {
			this.logger = new Logger(document.body);
			this.logger.fadeTime = 30;
			this.logger.domElement.style.width = "40vw";
			this.logger.domElement.style.minWidth = "410px";
			this.logger.domElement.style.marginLeft = "82px";
			this.logger.domElement.style.fontFamily = "Calibri";
			this.logger.colors.log = [0,0,0,0.4];
			if (!this.setupWorld()) return this.logger.error("Error: WebGL is not supported by the browser.");
			return true;
		},
		onResize: function() {
			if (this.camera) {
				this.camera.aspect = window.innerWidth / window.innerHeight;
				this.camera.updateProjectionMatrix();
			}
			(this.renderers) && (this.renderers.forEach(renderer=>renderer.setSize(window.innerWidth, window.innerHeight)));
		},
		setupWorld: function() {
			let rendererConfig = {
				antialias: false,
				alpha: true,
				clearColor: getComputedStyle(document.body)["background-color"]
			}
			try {
				this.renderers = [];
				this.scenes = [];
				for (let i = 0; i < this.blurLevels; i++) {
					let renderer = new THREE.WebGLRenderer(rendererConfig);
					//renderer.setClearColor(new THREE.Color(rendererConfig.clearColor), 1);
					renderer.domElement.style.position = "absolute";
					renderer.domElement.style.top = "0";
					renderer.domElement.style.display = "none";
					renderer.domElement.style.zIndex = (-i-1).toString();
					renderer.domElement.style.backfaceVisibility = "hidden";
					renderer.domElement.style.perspective = "inherit";
					renderer.domElement.style.filter = `blur(${i}px)`;
					document.body.appendChild(renderer.domElement);
					this.renderers.push(renderer);
					this.scenes.push(new THREE.Scene());
				}
			} catch (err) {
				return false;
			}
			this.camera = new THREE.PerspectiveCamera(85,window.innerWidth / window.innerHeight, 0.2, 100);
			this.camera.position.set(0,0,4);
			addEventListener('resize', this.onResize.bind(this), false);
			this.onResize();
			this.setupLight();
			return true;
		},
		setupLight: function() {
			function addLight(name, position, intensity) {
				let light = new THREE.DirectionalLight(0xffffff, intensity);
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
		},
		render: function() {
			for (let i = 0; i < this.blurLevels; i++) {
				//this.scene.children[6] && (this.scene.children[6].position.x = 2*(i-0.5));
				this.renderers[i].render(this.scenes[i], this.camera);
			}
		}
	}
})();
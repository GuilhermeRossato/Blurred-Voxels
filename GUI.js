const GUI = (function (){
	return {
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
				for (let i = 0; i < 2; i++) {
					let renderer = new THREE.WebGLRenderer(rendererConfig);
					//renderer.setClearColor(new THREE.Color(rendererConfig.clearColor), 1);
					renderer.domElement.style.position = "absolute";
					renderer.domElement.style.top = "0";
					renderer.domElement.style.display = "none";
					renderer.domElement.style.zIndex = (-i-1).toString();
					renderer.domElement.style.filter = `blur(${i*4.05}px)`;
					document.body.appendChild(renderer.domElement);
					this.renderers.push(renderer);
				}
			} catch (err) {
				return false;
			}
			this.camera = new THREE.PerspectiveCamera(85,window.innerWidth / window.innerHeight, 0.2, 100);
			addEventListener('resize', this.onResize.bind(this), false);
			this.onResize();
			this.scene = new THREE.Scene();
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
			let lights = [addLight("Top", { x: 0, y: 1, z: 0 }, 2.935),
			addLight("Front", { x: 0, y: 0, z: -1 }, 2.382),
			addLight("Back", { x: 0, y: 0, z: 1 }, 2.3548),
			addLight("Left", { x: -1, y: 0, z: 0 }, 1.7764),
			addLight("Right", { x: 1, y: 0, z: 0 }, 1.7742),
			addLight("Bottom", { x: 0, y: -1, z: 0 }, 1.5161)];
			lights.forEach(light=>this.scene.add(light));
		},
		render: function() {
			for (let i = 0; i < 2; i++) {
				this.scene.children[6] && (this.scene.children[6].position.x = 2*(i-0.5));
				this.renderers[i].render(this.scene, this.camera);
			}
		}
	}
})();
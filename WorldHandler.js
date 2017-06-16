function WorldHandler(imageList) {
	this.imageList = imageList;
	this.geometry = new THREE.BoxGeometry(1,1,1);
	this.ray = new THREE.Raycaster();
	this.middle = new THREE.Vector2(0,0);
	this.look = new THREE.Vector3(0,0);
}

WorldHandler.prototype = {
	constructor: WorldHandler,
	animationPeriod: 360,
	init: function(camera, scenes) {
		this.camera = camera;
		this.scenes = scenes;
		let noiser = new SimplexNoiseJ();
		let geometry = this.geometry;
		let material = this.createMaterial("dirt.png");
		let meshes = [];
		for (let x = -8; x < 8; x++) {
			for (let z = -8; z < 8; z++) {
				let mesh = new THREE.Mesh(geometry, material);
				noise = noiser.noise2D(x/30, z/30)+1
				mesh.position.set(x, noise*4|0, z);
				let nm = mesh.clone();
				nm.position.y--;
				meshes.push(mesh, nm);
			}
		}
		scenes.forEach((scene, i) => meshes.forEach(mesh => {
			let m = mesh.clone();
			if (i === 0 && m.position.x > 0 && m.position.z > 0)
				m.visible = true;
			else if (i === 1 && m.position.x < 0 && m.position.z > 0)
				m.visible = true;
			else if (i === 2 && m.position.x < 0 && m.position.z < 0)
				m.visible = true;
			else if (i === 3 && m.position.x > 0 && m.position.z < 0)
				m.visible = true;
			else
				m.visible = false;
			scene.add(m);
		}));
	},
	createMaterial: function(fileName) {
		let image = (this.imageList.filter(img => img.fileName === fileName))[0];
		if (!image)
			return false;
		let texture = new THREE.Texture();
		texture.magFilter = THREE.NearestFilter;
		texture.minFilter = THREE.LinearFilter;
		texture.image = image;
		texture.needsUpdate = true;
		//texture.anisotropy = 0; // Proven to be unnecessary at the time
		let material = new THREE.MeshLambertMaterial({
			map: texture,
			color: 0x555555
		});
		return material;
	}, update: function() {
		this.counter = (this.counter > 0)?(this.counter-1):this.animationPeriod;
		let t = this.counter/this.animationPeriod;
		let c = Math.cos(t*Math.PI*2), s = Math.sin(t*Math.PI*2);
		this.camera.position.set(c*13,12,s*13);
		this.camera.lookAt(new THREE.Vector3(c*6,5,s*6));
		this.ray.setFromCamera(new THREE.Vector2(0.0,0.0), this.camera);
		var intersects = this.ray.intersectObjects(this.scenes[0].children);
		if (intersects[0]) {
			this.look.copy(intersects[0].object.position);
		} else {
			this.look.copy(this.camera.position);
		}
		let minDist = 4;
		let maxDist = 25;
		let df = FastInterpolation.any(0, 0, maxDist, this.scenes.length);
		this.scenes[0].children.forEach((elem, i)=>{
			if (elem instanceof THREE.Mesh) {
				let d = (this.camera.position.distanceTo( elem.position ));
				(d < minDist) && (d = 0) || (d -= minDist);
				(d > maxDist) && (d = maxDist);
				let id = df.at(d)|0;
				(id < 0) && (id = 0) || (id >= this.scenes.length) && (id = this.scenes.length-1);
				for (let j = 0 ; j < this.scenes.length; j++) {
					this.scenes[j].children[i].visible = (id === j);
				}
			}
		});
		
	}
}
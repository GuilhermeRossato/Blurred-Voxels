function WorldHandler(imageList) {
	this.imageList = imageList;
	this.geometry = new THREE.BoxGeometry(1,1,1);
}

WorldHandler.prototype = {
	constructor: WorldHandler,
	init: function() {
		let geometry = this.geometry;
		let material = this.createMaterial("dirt.png");
		let mesh = new THREE.Mesh(geometry, material);
		mesh.name = "First Block";
		mesh.position.z = -3;
		this.meshes = [mesh];
	},
	addToScene: function(scene) {
		this.meshes.forEach(mesh => scene.add(mesh));
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
		this.counter = (this.counter > 0)?(this.counter-1):240;
		let t = this.counter/240;
		this.meshes[0].position.z = interpolation.add(0,-3).add(0.33,-3.4).add(0.66,-2.6).add(1,-3).at(t);
		this.meshes[0].rotation.y = interpolation.add(0, 0).add(1,Math.PI*2).at(t);
		this.meshes[0].rotation.z = interpolation.add(0,Math.PI/2).add(0.25, 0).add(0.75,Math.PI/2).add(1, 0).at(t);;
		//this.meshes[0].rotation.y = Math.random();
	}
}
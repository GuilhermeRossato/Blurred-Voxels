function WorldHandler(imageList) {
	this.imageList = imageList;
	this.geometry = new THREE.BoxGeometry(1,1,1);
	this.middle = new THREE.Vector2(0,0);
	this.look = new THREE.Vector3(0,0);
}

WorldHandler.prototype = {
	constructor: WorldHandler,
	animationPeriod: 360,
	init: function(camera, scenes) {
		this.state = "waiting";
		this.camera = camera;
		this.scenes = scenes;
		var geometry = this.geometry;
		var material = this.createMaterial("grass_green.png");
		this.loadingMesh = new THREE.Mesh(geometry, material);
		scenes[0].add(this.loadingMesh);

		var minDist = 4, maxDist = 26;
		this.df = FastInterpolation.any(minDist*minDist, 0, maxDist*maxDist, this.scenes.length);
		this.clampSquaredSize = function(d) {
			(d < minDist*minDist) && (d = minDist*minDist);
			(d > maxDist*maxDist) && (d = maxDist*maxDist);
			return d;
		}
	},
	createMaterial: function(fileName) {
		var image = (this.imageList.filter(img => img.fileName === fileName))[0];
		if (!image)
			return false;
		var texture = new THREE.Texture();
		texture.magFilter = THREE.NearestFilter;
		texture.minFilter = THREE.LinearFilter;
		texture.image = image;
		texture.needsUpdate = true;
		texture.anisotropy = 0; // Proven to be unnecessary at the time
		var material = new THREE.MeshLambertMaterial({
			map: texture,
			color: 0x555555,
			//opacity: 0.5,
			//transparent: true
		});
		return material;
	}, loadWorld: function(data) {
		if (this.state !== "loading")
			return console.warn("Unexpected World Load");
		let mesh = this.loadingMesh;
		mesh.parent.remove(mesh);
		this.loadingMesh = undefined;
		this.state = "loaded";
		this.addMeshesFromData(data, mesh);
	}, addMeshesFromData(data, mesh) {
		var x, y, z, i, j, jm;
		jm = this.scenes.length;
		i = data.getCount();
		for (y = 0; y < chunkSize; y++)
			for (z = 0; z < chunkSize; z++)
				for (x = 0; x < chunkSize; x++)
					if (data.get(x,y,z) > 0) {
						for (j = 0 ; j < jm; j++)
							scene.add(mesh.clone());
						if (!(i=i-1))
							break;
					}
	}, reset: function() {
		this.counter = undefined;
	}, update: function(frames) {
		frames /= 4;
		this.counter = (this.counter-frames > 0)?(this.counter-frames):this.animationPeriod;
		var t = this.counter/this.animationPeriod, c = Math.cos(t*Math.PI*2), s = Math.sin(t*Math.PI*2);

		if (this.state === "loading" && this.loadingMesh) {
			t = FastInterpolation.any(0,0,0.9,0.99,1,1).at(t);
			this.loadingMesh.rotation.y = t*Math.PI*2;
			return
		}

		this.camera.position.set(c*18,12,s*18);
		this.camera.lookAt(new THREE.Vector3(c*9,5,s*9));
		if (this.counter % 3 === 0) {
			//this.ray.setFromCamera(new THREE.Vector2(0.0,0.0), this.camera);
			//this.intersect = this.ray.intersectObjects(this.scenes[0].children)[0];
		}
		this.look = this.camera.position;
		var len = this.scenes[0].children.length;
		var elem;
		for (var i = 4 ; i < len; i++) {
			elem = this.scenes[0].children[i];
			if (elem instanceof THREE.Mesh) {
				var d = this.clampSquaredSize(this.look.distanceToSquared(elem.position));
				var id = this.df.at(d)|0;
				(id < 0) && (id = 0) || (id >= this.scenes.length) && (id = this.scenes.length-1);
				for (var j = 0 ; j < this.scenes.length; j++) {
					this.scenes[j].children[i].visible = (id === j);
				}
			}
		}
	}
}
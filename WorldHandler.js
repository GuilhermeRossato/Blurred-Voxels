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
		this.camera = camera;
		this.scenes = scenes;
		var noiser = new SimplexNoiseJ();
		var geometry = this.geometry;
		var material = this.createMaterial("grass_green.png");
		var meshes = [];
		var size = 8;
		for (var x = -size; x < size; x++) {
			for (var z = -size; z < size; z++) {
				var mesh = new THREE.Mesh(geometry, material);
				noise = noiser.noise2D(x/30, z/30)+1
				mesh.position.set(x, noise*5|0, z);
				var nm = mesh.clone();
				nm.position.y--;
				meshes.push(mesh, nm);
			}
		}
		scenes.forEach((scene, i) => meshes.forEach(mesh => {
			var m = mesh.clone();
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
	}, reset: function() {
		this.counter = undefined;
	}, update: function(frames) {
		this.counter = (this.counter-frames > 0)?(this.counter-frames):this.animationPeriod;
		var t = this.counter/this.animationPeriod, c = Math.cos(t*Math.PI*2), s = Math.sin(t*Math.PI*2);
		this.camera.position.set(c*13,12,s*13);
		this.camera.lookAt(new THREE.Vector3(c*6,5,s*6));
		if (this.counter % 3 === 0) {
			//this.ray.setFromCamera(new THREE.Vector2(0.0,0.0), this.camera);
			//this.intersect = this.ray.intersectObjects(this.scenes[0].children)[0];
		}
		this.look = this.camera.position;
		var len = this.scenes[0].children.length;
		var elem;
		for (var i = 0 ; i < len; i++) {
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
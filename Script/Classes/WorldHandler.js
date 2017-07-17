function WorldHandler(imageList) {
	StateMachine.call(this, {
		"loading-world": {},
		"waiting-world": {
			onEnter: function() {
				this.createLoadingMesh();
			},
			onExit: function() {
				this.destroyLoadingMesh();
			}
		},
		"creating-world": {
			onEnter: function() {

			}
		},
		"idle": {}
	});
	this.imageList = imageList;
	this.geometry = new THREE.BoxGeometry(1,1,1);
	this.blockList = [];
}

WorldHandler.prototype = {
	constructor: WorldHandler,
	addBlock: function(mesh, scene) {
		var block = {
			mesh: mesh,
			scene: scene
		};
		this.blockList.push(block);
		scene.add(mesh);
		return block;
	},
	removeBlock: function(block) {
		block.scene.remove(block.mesh);
		this.blockList = this.blockList.filter(b => b !== block);
	},
	switchBlock: function(block, targetScene) {
		if (block.scene === targetScene)
			return;
		block.scene.remove(block.mesh);
		block.scene = targetScene;
		block.scene.add(block.mesh);
	},
	removeBlockByIndex: function(index) {
		if (typeof index === "number" && !isNaN(index)) {
			this.removeBlock(this.blockList[index]);
		} else {
			console.error("Not a valid parameter:",index);
		}
	},
	createLoadingMesh: function() {
		var mesh = new THREE.Mesh(this.geometry,this.material);
		mesh.position.set(0, 1.5, 0);
		this.addBlock(mesh, this.scenes[0]);
	},
	destroyLoadingMesh: function() {
		this.removeBlockByIndex(0);
	},
	init: function(camera, scenes, sizeOption) {
		this.sizeOption = sizeOption;
		this.reset = true;
		this.camera = camera;
		this.scenes = scenes;
		this.material = this.createMaterial("planks_spruce.png");
		if (this.scenes.length != 10) {
			console.error("getIndex is not optimized to handle "+this.scenes.length+" scenes!");
		}
		/* Define the function that transforms distance into scene index */
		this.getIndex = function(d) {
			//return (FastInterpolation.any(0,0,60,this.scenes.length, Math.sqrt(d)))|0;
			if (d < 40)
				return 0;
			else if (d < 103)
				return 1;
			else if (d < 270)
				return 2;
			else if (d < 670)
				return 3;
			else if (d < 899)
				return 4;
			else if (d < 1295)
				return 5;
			else if (d < 1763)
				return 6;
			else if (d < 2303)
				return 7;
			else if (d < 2915)
				return 8;
			else
				return 9;
			//Generated using:   var maxValue = 10, maxDistance = 60, myStr = ""; for (var value = 0; value < maxValue; value++) myStr+=(value===0?"if":"else if")+" (d < "+(Math.pow(FastInterpolation.any(0,0,maxValue,maxDistance,value+0.99999),2)|0)+")\n\treturn "+value+";\n"; myStr;
		}
		this.state = "waiting-world";
	},
	createMaterial: function(fileName) {
		var image = (this.imageList.filter(img=>img.fileName === fileName))[0];
		if (!image)
			return;
		var texture = new THREE.Texture();
		texture.magFilter = THREE.NearestFilter;
		texture.minFilter = THREE.LinearFilter;
		texture.image = image;
		texture.needsUpdate = true;
		texture.anisotropy = 0;
		var material = new THREE.MeshLambertMaterial({
			map: texture,
			color: 0x282828 //opacity: 0.5,
			//transparent: true
		});
		return material;
	},
	addChunk: function(chunk) {
		if (!this.chunks)
			this.chunks = []
		this.chunks.push(chunk);
	},
	reset: function() {
		this.counter = undefined;
	},
	iterateLoading: function() {
		if (this.state !== "creating-world")
			return;
		this.fillerIndex = {
			chunk: 0,
			x: 0,
			y: 0,
			z: 0,
			count: this.chunks[0] ? this.chunks[0].count : 512
		}
		var offsetX, offsetY, offsetZ, chunk, j;
		var mesh = new THREE.Mesh(this.geometry,this.material);
		var scene = this.scenes[0];
		var extraOffset;
		if (this.sizeOption == "1")
			extraOffset = [1, 1];
		else
			extraOffset = [0.5, 0.5];
		var added;
		this.iterateLoading = (function() {
			added = 0;
			while ((this.fillerIndex.chunk < this.chunks.length) && (added < 50)) {
				chunk = this.chunks[this.fillerIndex.chunk];
				offsetX = (chunk.offset[0] - extraOffset[0]) * chunkSize;
				offsetY = (chunk.offset[1] - 1.1) * chunkSize;
				offsetZ = (chunk.offset[2] - extraOffset[1]) * chunkSize;
				if ((this.fillerIndex.count > 0) && (chunk.data.get(this.fillerIndex.x, this.fillerIndex.y, this.fillerIndex.z) > 0)) {
					if (this.fillerIndex.y != 2 || offsetY > -18) {
						this.fillerIndex.count--;
						added++;
						mesh = mesh.clone();
						mesh.position.set(offsetX + this.fillerIndex.x, offsetY + this.fillerIndex.y, offsetZ + this.fillerIndex.z);
						this.addBlock(mesh, scene);
					}
				}
				this.fillerIndex.x++;
				if (this.fillerIndex.x >= chunkSize) {
					this.fillerIndex.x = 0;
					this.fillerIndex.z++;
				}
				if (this.fillerIndex.z >= chunkSize) {
					this.fillerIndex.z = 0;
					this.fillerIndex.y++;
				}
				if (this.fillerIndex.y >= chunkSize || this.fillerIndex.count <= 0) {
					this.fillerIndex.y = 0;
					this.fillerIndex.chunk++;
					if (this.fillerIndex.chunk < this.chunks.length)
						this.fillerIndex.count = chunk.count + 50;
				}
			}
			return ( added < 3) ;
		}
		).bind(this);
	},
	startAddingBlocks: function() {
		this.state = "creating-world";
	},
	update: function(frames) {
		this.iterateLoading();
		var lx, ly, lz;
		lx = this.camera.position.x;
		ly = this.camera.position.y;
		lz = this.camera.position.z;
		var pos, ex, ey, ez, i, j, id;
		var len = this.blockList.length;
		var fixedTarget = (this.state === "waiting-world");
		var scene;
		for (i = 0; i < len; i++) {
			elem = this.blockList[i].mesh.position;
			if (fixedTarget) {
				/* As a rule of thumb, the scene of index 2 will be the one without blur */
				scene = ((this.scenes.length > 2)?this.scenes[2]:this.scenes[0]);
			} else {
				ex = elem.x;
				ey = elem.y;
				ez = elem.z;
				scene = this.scenes[this.getIndex((lx - ex) * (lx - ex) + (ly - ey) * (ly - ey) + (lz - ez) * (lz - ez))];
			}
			this.switchBlock(this.blockList[i], scene);
			//this.scenes[j].children[i].visible = (id === j);
		}
	}
}

function WorldGenerator(x, z, callback) {
	var origin = {
		x: x,
		z: z
	}
	var offsets = [];
	if (false) {
		offsets.push([0,0,0], [0,1,0]);
	} else {
		offsets.push([0,1,1], [0,1,-1], [0,1,0], [1,1,1], [1,1,-1], [1,1,0],[-1,1,1], [-1,1,-1], [-1,1,0]);
		offsets.push([0,0,1], [0,0,-1], [0,0,0], [1,0,1], [1,0,-1], [1,0,0],[-1,0,1], [-1,0,-1], [-1,0,0]);
	}
	offsets.last = function() { return offsets[offsets.length-1]; }
	this.events = {
		callback: callback
	};

	let ww = new Worker("https://rawgit.com/GuilhermeRossato/Voxel-World-Generation/master/Script/World/Generation/WorldWorker1.js");
	ww.chunks = [];
	ww.onmessage = (ev) => {
		if (offsets.length > 0) {
			var offset = offsets.pop();
			var worldData = new WorldDataArray(chunkSize, chunkSize, chunkSize);
			worldData.decode(ev.data.substr(ev.data.indexOf(",")+1));
			ww.chunks.push({data: worldData, offset: offset});
			if (offsets.length > 0) {
				var lastOffset = offsets.last();
				var relativeX = origin.x+lastOffset[0];
				var relativeZ = origin.z+lastOffset[2];
				ww.postMessage(`c${relativeX},${(lastOffset[1]|0)},${relativeZ}`);
			} else {
				this.events.done(ww.chunks);
			}
		} else {
			this.onError("World Generation has returned an unhandled event");
		}
	};

	this.init = function() {
		var lastOffset = offsets.last();
		var relativeX = origin.x+lastOffset[0];
		var relativeZ = origin.z+lastOffset[2];
		ww.postMessage(`c${relativeX},${lastOffset[1]},${relativeZ}`);
	}
}

WorldGenerator.prototype = {
	constructor: WorldGenerator,
	on: function(type, callback) {
		if (type === "done") {
			this.events.done = callback;
		} else {
			console.error("Unhandled Event");
		}
	}
}
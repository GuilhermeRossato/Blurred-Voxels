/*
*	A module that handles camera general movement
*	Not a generic module! It does very specific work.
*
*/

function Cinematic() {
	StateMachine.call(this, {
		state: "unitialized",
		transitions: [
			{
				last: "unitialized",
				next: "loading",
				event: function() {
				}
			}, {
				last: "loading",
				next: "loading-zoom",
			}, {
				last: "loading-zoom",
				next: "zoom-out-start",
				event: function() {
					//this.startedAt = performance.now();
				}
			}, {
				last: "zoom-out-start",
				next: "zoom-out-end",
				event: function() {
					this.world.startAddingBlocks();
				}
			}, {
				last: "zoom-out-end",
				next: "normal",
				event: function() {
				}
			}
		]
	});

}

Cinematic.prototype = {
	constructor: Cinematic,
	periods: {
		animation: 720,
		zoomOut: 40
	},
	init: function(world, camera, scenes) {
		this.world = world;
		this.camera = camera;
		this.scenes = scenes;
		this.state = "loading";
	},
	translations: {
		ease: function(t) {
			var ts = t*t;
			var tc = tc*t;
			return ((6 * tc * ts) + (-15 * ts * ts) + (10 * tc));
		},
		bounce: function(t) {
			return FastInterpolation.any(0, 0, 0.01, -0.03, 0.99, 1.03, 1, 1).at(t)/2;
		}
	},
	onChunkAdded: function() {
		if (this.state === "loading") {
			this.state = "loading-zoom";
		}
	},
	update: function(elapsed) {
		if (this.state === "unitialized")
			return;
		var counter, t, c, s, position, focus, distance;
		position = this.camera.position;
		focus = new THREE.Vector3(0, 0, 0);
		counter = 0;
		this.resetAngle = ()=>(counter = 0);
		mainCounter = 0;
		/* Update is a Lambda Function */
		let update = (function(elapsed) {
			mainCounter+=elapsed;
			if (this.state === "loading-zoom") {
				counter -= elapsed*4;
			} else {
				counter -= elapsed;
			}
			if (counter <= 0) {
				if (this.state === "loading-zoom") {
					this.startedAt = mainCounter;
					this.state = "zoom-out-start";
				}
				counter = this.periods.animation;
			}
			t = counter/this.periods.animation;
			if (this.state.substr(0,7) === "loading") {
				t = -this.translations.bounce(t);
			}
			c = Math.cos(t*Math.PI*2);
			s = Math.sin(t*Math.PI*2);
			if (this.state.substr(0,7) === "loading") {
				distance = 4;
				position.set(s*distance,0,c*distance);
				focus.set(0,0,0);
			} else if (this.state.substr(0,8) === "zoom-out") {
				var df = (mainCounter - this.startedAt)/this.periods.zoomOut;
				(df > 0.5) && (this.state !== "zoom-out-end") && (this.state = "zoom-out-end");
				(df > 1) && (df = 1) && (this.state = "normal");
				distance = FastInterpolation.any(0,4,1,22).at(df);
				position.x = s*distance;
				position.y = FastInterpolation.any(0,0,1,15).at(df);
				position.z = c*distance;
				distance = FastInterpolation.any(0,0,1,9).at(df);
				focus.x = s*distance;
				focus.y = FastInterpolation.any(0,0,1,4).at(df);
				focus.z = c*distance;
			} else if (this.state === "normal") {
				distance = 22;
				position.set(s*distance,15,c*distance);
				//focus.set(s*9,4,c*9);
				focus.x = s*9;
				focus.y = FastInterpolation.any(0,0,1,4).at(1);
				focus.z = c*9;
			}
			this.camera.lookAt(focus);
			return;
		}).bind(this);
		this.update = update;
		return update(elapsed);
	}
}
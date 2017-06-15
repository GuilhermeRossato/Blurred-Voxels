/*!
 *
 * Class to handle image loading and, when available, uses a saved 'data:image' reply as if it was a cached image.
 *
 * @name	ImageLoader
 * @type	Javascript Class
 * @author	Guilherme Rossato
 * @year	2017
 * @licence	The Unlicense:  http://unlicense.org/  (no warranties, free to do use / edit / share / sell / claim)
 *
 * Usage:
 * (new ImageLoader()).loadImage("hello.png")
 * Implements .on('load', ...), .on('error', ...), .on('done', ...), and the .getProgress method (a number between 0 and 1)
 */

function ImageLoader(done, error, load) {
	/* Public Methods Definition */
	this.getImages = () => imageList; // Return a list of all images, loaded or not.
	this.getProgress = () => progress; // Loading progress, between 0 and 1.
	this.reset = function() {
		imageList = [];
		imageCount = 0;
		loadedImages = 0;
		callbacks = {
			done: undefined, // Everything is done
			error: undefined, // Error in one element
			load: undefined	// One element
		}
	}

	this.loadImage = function(fileName) {
		imageCount++;
		if (typeof fileName === "string")
			imageList.push(initImage(fileName));
		else
			return console.error(`Expected fileName as string, got ${typeof(fileName)}`);
		return eventSetter;
	}

	this.loadImages = function(files) {
		imageCount += files.length;
		if (!files[0])
			return ((typeof files === "string")?this.loadImage(files):console.error(`Expected an array of files, got ${typeof(files)}`));
		else if (typeof files[0] === "string")
			imageList.push(...files.map(fileName=>initImage(fileName)));
		else if (files[0].fileName)
			imageList.push(...files.map(file=>initImage(file.fileName)));
		else if (files[0].filename)
			imageList.push(...files.map(file=>initImage(file.filename)));
		else if (files[0].src)
			imageList.push(...files.map(file=>initImage(file.src)));
		else
			return console.error("Unhandled file array format");
		return eventSetter;
	}

	/* Handler of different callback formats */
	let eventSetter = {
		on: function(type, callback) {
			let eventList = ["done", "load", "error"]
			let eventName = eventList[eventList.indexOf(type.toLowerCase())];
			if (!eventName)
				return console.error(`Unhandled event type: "${type}"`);
			callbacks[[eventName]] = callback;
			return this;
		},
		then: function(callback) {
			callbacks.done = callback;
			return this;
		}
	}

	/* Private Variables */
	let imageCount = 0,
		loadedImages = 0,
		imageList = 0,
		callbacks = {};

	/* Private Methods */
	function updateProgress() {
		progress = (imageCount === 0) ? 1 : (loadedImages) / imageCount;
	}

	function checkCacheByFilename(fileName) {
		if (imageLoaderCache && imageLoaderCache.filter)
			return imageLoaderCache.filter(cache=>cache.fileName === fileName)[0];
		else
			return false;
	}

	function initImage(fileName) {
		let image = new Image();
		image.fileName = fileName;
		image.onload = (ev)=>onImageLoad(ev);
		image.onerror = (ev)=>onImageError(ev);
		let cache = checkCacheByFilename(fileName);
		image.src = cache?cache.reply:fileName;
		return image;
	}

	/* Private Events Definition */
	function onImageLoad(ev) {
		if (imageList.indexOf(ev.target) !== -1) {
			loadedImages++;
			callbacks.load && callbacks.load(ev);
			updateProgress();
			progress >= 1 && callbacks.done && callbacks.done(ev);
		} else {
			console.warn(`Image Loader was not expecting the file "${ev.target.fileName}" to load and it was ignored.`);
		}
	}

	function onImageError(ev) {
		if (imageList.indexOf(ev.target)) {
			//loadedImages++;
			callbacks.error && callbacks.error(ev);
		}
	}

	/* Initialization */
	this.reset();

	callbacks = {
		done: done,
		error: error,
		load: load
	}
};

(typeof exports === "object") && (this.exports = ImageLoader);
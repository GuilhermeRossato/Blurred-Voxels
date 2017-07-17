function SidebarOptions(wrapper, configObject) {
	this.configObject = configObject;
	this.domElement = document.createElement("div");
	this.domElement.setAttribute("style", "transition: all 0.5s cubic-bezier(0.65, 0.05, 0.36, 1); position: fixed; left: 0; padding: 5px; margin: 0; background-color:rgba(128,128,128,0.4)");
	let h1 = document.createElement("h1");
	h1.setAttribute("style", "font-family: courier; text-align: center; text-size: 24px; padding: 5px; margin: 0; color:white");
	h1.appendChild(document.createTextNode("OPTIONS"));
	this.domElement.appendChild(h1);
	this.hrCount = 0;
	this.buttons = ["Static place", "Random place", undefined, "2 chunks", "8 chunks", "18 chunks", "50 chunks", undefined, "Debug Sequence", "Set effects to Colors", "Set slower rotation"].map(label=>{
		if (label) {
			let btn = document.createElement("input");
			btn.setAttribute("type", "button");
			btn.setAttribute("style", "display:block; width: 200px; height: 21px; font-family:courier; font-size:12px; font-weight:bold; padding: 2px; margin: 4px;");
			btn.setAttribute("value", label);
			return btn;
		} else {
			let div = document.createElement("hr");
			div.setAttribute("style", "margin:5px 16px; height: 1px;");
			this.hrCount++;
			return div;
		}
	}
	);
	this.buttons.forEach(btn=>this.domElement.appendChild(btn));
	this.buttons = this.buttons.filter(btn=>btn instanceof HTMLInputElement);
	this.buttons.forEach((btn,i)=>btn.addEventListener("click", this.onButtonPress.bind(this, i)))
	this.hide();
	wrapper.appendChild(this.domElement);
	this.domElement.addEventListener("touch", this.onMouseEnter.bind(this));
	this.domElement.addEventListener("mouseenter", this.onMouseEnter.bind(this));
	this.domElement.addEventListener("mouseleave", this.onMouseOut.bind(this));
	this.loadSelectedOptions();
}

SidebarOptions.prototype = {
	constructor: SidebarOptions,
	/*
	* There are far too many bad practices below.
	* I was in a rush.
	*/
	loadSelectedOptions: function() {
		let parPlace = window.location.search.substr(6, 6);
		if (parPlace === "random") {
			this.buttonSelect(1);
		} else {
			this.buttonSelect(0);
		}

		let i, parSize = window.location.search.substr(17, 1);
		for (i = 2; i < this.buttons.length; i++) {
			if (parSize === (i - 2).toString()) {
				this.buttonSelect(i);
				break;
			}
		}
		if (i === this.buttons.length)
			this.buttonSelect(3);
	},
	buttonSelect: function(btnIndex) {
		if (btnIndex === 0) {
			this.configObject.staticWorld = true;
			this.buttons[0].disabled = true;
			this.buttons[1].disabled = false;
		} else if (btnIndex === 1) {
			this.configObject.staticWorld = false;
			this.buttons[0].disabled = false;
			this.buttons[1].disabled = true;
		} else {
			this.buttons[btnIndex].disabled = true;
			this.configObject.sizeOption = btnIndex - 2;
		}
	},
	onButtonPress: function(btnIndex, event) {
		let parPlace = (!this.configObject.staticWorld) ? "random" : "static";
		let parSize = this.configObject.sizeOption.toString();
		if (btnIndex === 0)
			parPlace = "static";
		else if (btnIndex === 1)
			parPlace = "random";
		else if (btnIndex === 6)
			return GUI.onDebugSequencePress();
		else if (btnIndex === 7) {
			let effect = GUI.onSwitchEffectPress();
			if (effect === "hue")
				this.buttons[btnIndex].value = "Set effects to Darkness";
			else if (effect === "brightness")
				this.buttons[btnIndex].value = "Set effects to Blur";
			else
				this.buttons[btnIndex].value = "Set effects to Colors";
			return;
		} else if (btnIndex === 8) {
			let effect = GUI.onRotationSpeedSwitch();
			if (effect === 5120)
				this.buttons[btnIndex].value = "Set faster rotation";
			else if (effect === 2048)
				this.buttons[btnIndex].value = "Set slowest rotation";
			else
				this.buttons[btnIndex].value = "Set slow rotation";
			return;
		} else
			parSize = (btnIndex - 2).toString();
		window.location.href = "?type=" + parPlace + "&btn=" + parSize;
	},
	hide: function() {
		if (this.shown === false)
			return;
		this.shown = false;
		this.domElement.style.bottom = `-${(26 + (this.buttons.length) * (21 + 4))}px`;
	},
	show: function() {
		if (this.shown === true)
			return;
		this.shown = true;
		this.domElement.style.bottom = "0px";
	},
	onMouseEnter: function(event) {
		this.show();
	},
	onMouseOut: function(event) {
		this.hide();
	},
	realHide: function() {
		this.domElement.style.display = "none";
	},
	realShow: function() {
		this.domElement.style.display = "block";
	},
}

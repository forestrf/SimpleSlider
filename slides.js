function StartSlides(backgrounds, container, delayBackground) {
	var crel2=function(){var c=arguments,b=c[0],g=c.length,b="string"===typeof b?document.createElement(b):b;if(1===g)return b;var a=c[1],e=2;if(a instanceof Array)for(var d=a.length,f;d;)switch(typeof(f=a[--d])){case "string":case "number":b.setAttribute(a[--d],f);break;default:b[a[--d]]=f}else--e;for(;g>e;)a=c[e++],"object"!==typeof a&&"function"!==typeof a&&(a=document.createTextNode(a)),b.appendChild(a);return b};
	var C = crel2;
	
	var transparentClass = "transparent";

	// Make the div container for the background and style it.
	var fondoDiv = C("div", ["class", "background_widget_bg bg1"]);
	var fondoDiv2 = C("div", ["class", "background_widget_bg bg2"]);
	fondoDiv2.className += " transparent";

	C(container, fondoDiv);
	C(container, fondoDiv2);

	var next = 0;
	var transitionTime = 3000;

	function launch(){
		next = (next + 1) % backgrounds.length;
		setBackground(fondoDiv2, backgrounds[next]);

		interval();
	}

	// Interval to change backgrounds over time
	function interval() {
		if (fondoDiv2.className.indexOf(transparentClass) === -1) {
			fondoDiv2.className += " " + transparentClass;
			var nextDiv = fondoDiv2;
			var currentDiv = fondoDiv;
		} else {
			fondoDiv2.className = trim(fondoDiv2.className.split(transparentClass).join(""));
			var nextDiv = fondoDiv;
			var currentDiv = fondoDiv2;
		}
		
		next = (next + 1) % backgrounds.length;
		
		//Preload the next background
		setTimeout(function(){
			setBackground(nextDiv, backgrounds[next]);
		}, transitionTime);
		
		setTimeout(interval, +delayBackground + +transitionTime);
	}



	// Change the style of a div to make it a background with the options of the background variable
	function setBackground(div, background){
		div.style.backgroundImage = 'url("'+background+'")';
	}
	
	launch();
	
	
	function trim(str) {
		return str.replace(/^\s+|\s+$/g, ''); 
	}
}

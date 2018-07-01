// get the inputs
const inputs = document.querySelectorAll(".controls input");

function handleUpdate(){
	//dataset returns an object with any custom attributes

	//include 'OR' in case there is no sizing attr. If not done, would return undefined
	const suffix = this.dataset.sizing || "";
	// set style property with the css variable name, and then the value of input and the suffix
	document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

// listen for change on inputs
inputs.forEach(input => input.addEventListener("change", handleUpdate));
inputs.forEach(input => input.addEventListener("mousemove", handleUpdate));
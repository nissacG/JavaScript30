function playSound (e) {
	//data-key is a self-defined attribute which stores the keyCode
	const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
	const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
	if(!audio) return; //stops the function from running if key code is not in audio data-key

	key.classList.add("playing");
	audio.currentTime = 0; //resets the current time of the playing audio file
	audio.play();
}

function removeTransition (e) {
	if(e.propertyName !== "transform") return; //skip if it's not a transform
	this.classList.remove("playing"); //removes playing class from 'this' (current key)
}

window.addEventListener("keydown", playSound);

const keys = document.querySelectorAll(".key");
keys.forEach(key => key.addEventListener("transitionend", removeTransition));
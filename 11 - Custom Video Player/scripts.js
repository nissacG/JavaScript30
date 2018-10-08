// Get Elements

const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const playBtn = player.querySelector(".toggle");
const sliders = player.querySelectorAll(".player__slider");
const skipBtns = player.querySelectorAll("[data-skip]");

// Build

function togglePlay(){
	// Tenarary way of doing the same function	
	// const method = video.paused ? "play" : "paused";
	// video[method]();
	if(video.paused) {
		video.play();
	} else {
		video.pause();
	}
}

function updateBtn(){
	const icon = this.paused ? "►" : "❚ ❚";
	playBtn.textContent = icon;
}

function skip(){
	let curTime = video.currentTime;
	console.log(curTime);
}

function seeking(){
	console.log(`I'm seeeking`)
}

function playSpeed(){

}

// Add Event Listeners

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateBtn);
video.addEventListener("pause", updateBtn);

progress.addEventListener("click", seeking)

playBtn.addEventListener("click", togglePlay);

skipBtns.forEach(button => button.addEventListener("click", skip));
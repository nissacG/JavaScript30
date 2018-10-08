// Get Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const playBtn = player.querySelector('.toggle');
const sliders = player.querySelectorAll('.player__slider');
const skipBtns = player.querySelectorAll('[data-skip]');

// Build
function togglePlay(){
	// Tenarary way of doing the same function	
	// const method = video.paused ? 'play' : 'paused';
	// video[method]();
	video.paused ? video.play() : video.pause();
}

function updateBtn(){
	const icon = this.paused ? '►' : '❚ ❚';
	playBtn.textContent = icon;
}

function skip(){
	video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
	// console.log(this.value)
	// console.log(this.name)
	video[this.name] = this.value

}

function seekPropgress(){
	const percent = (video.currentTime / video.duration) * 100
	progressBar.style.flexBasis = `${percent}%`
}

function setProgress(e) {
	const progressPercent = (e.offsetX / progress.offsetWidth ) * video.duration
	video.currentTime = progressPercent
}


// Add Event Listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateBtn);
video.addEventListener('pause', updateBtn);
video.addEventListener('timeupdate', seekPropgress);

playBtn.addEventListener('click', togglePlay);

skipBtns.forEach(button => button.addEventListener('click', skip));

sliders.forEach(input => input.addEventListener('change', handleRangeUpdate));
sliders.forEach(input => input.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false
progress.addEventListener('click', setProgress)
progress.addEventListener('mousemove', (e) => mousedown && setProgress(e))
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)
const secondHand = document.querySelector(".second-hand");
const minuteHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");

function setDate(val){
	const now = new Date();
	const seconds = now.getSeconds();
	const minutes = now.getMinutes();
	const hour = now.getHours();
	const secondDegree = (seconds / 60) * 360;
	const minuteDegree = (minutes / 60) * 360;
	const hourDegree = (hour / 24) * 360;
	secondHand.style.transform = `rotate(${secondDegree + 90}deg)`;
	minuteHand.style.transform = `rotate(${minuteDegree + 90}deg)`;
	hourHand.style.transform = `rotate(${hourDegree + 90}deg)`;
}

setInterval(setDate, 1000);
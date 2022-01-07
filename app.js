document.addEventListener("DOMContentLoaded", () => {
	const squares = document.querySelectorAll(".grid div");
	const scoreDisplay = document.querySelector("span");
	const startButton = document.querySelector(".start");

	const width = 10;
	let currentIndex = 0; //First div
	let foodIndex = 0; //Food div
	let currentSnake = [2, 1, 0]; //2 -> head | 0 -> tail | body - 1
	let direction = 1;
	let score = 0;
	let speed = 0.9;
	let intervalTime = 0;
	let interval = 0;

	// start and restart game

	let startGame = () => {
		currentSnake.forEach((index) => squares[index].classList.remove("snake"));
		squares[foodIndex].classList.remove("food");
		clearInterval(interval);
		score = 0;
		randomFood();
		direction = 1;
		scoreDisplay.innerText = score;
		intervalTime = 1000;
		currentSnake = [2, 1, 0];
		currentIndex = 0;
		currentSnake.forEach((index) => squares[index].classList.add("snake"));
		interval = setInterval(moveOutcomes, intervalTime);
	};
	/* All outcomes
    1. Hitting the border, hitting self
    2. Eating the food
    */
	let moveOutcomes = () => {
		if (
			(currentSnake[0] + width >= width * width && direction === width) || //if snake hits bottom
			(currentSnake[0] % width === width - 1 && direction === 1) || //if snake hits right wall
			(currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
			(currentSnake[0] - width < 0 && direction === -width) || //if snake hits the top wall
			squares[currentSnake[0] + direction].classList.contains("snake") //if snake goes into itself
		) {
			alert("You lost the game!!! Please restart!");
			return clearInterval(interval);
		}

		const tail = currentSnake.pop(); //removes the last element of the array and gives the item
		squares[tail].classList.remove("snake"); //removes the class of the snake from the tail
		currentSnake.unshift(currentSnake[0] + direction); //gives the direction to the head of the array

		if (squares[currentSnake[0]].classList.contains("food")) {
			squares[currentSnake[0]].classList.remove("food");
			squares[tail].classList.add("snake");
			currentSnake.push(tail);
			randomFood();
			score++;

			if (score > 4 && score < 9) {
				speed = 0.7;
			} else if (score > 9) {
				speed = 0.5;
			}
			scoreDisplay.textContent = score;
			clearInterval(interval);
			intervalTime = intervalTime * speed;
			interval = setInterval(moveOutcomes, intervalTime);
		}
		squares[currentSnake[0]].classList.add("snake");
	};

	// generate new food once the food is eaten
	let randomFood = () => {
		do {
			foodIndex = Math.floor(Math.random() * squares.length);
		} while (squares[foodIndex].classList.contains("snake")); //no food in the snake place
		squares[foodIndex].classList.add("food");
	};

	// Functions to keycodes
	let control = (e) => {
		squares[currentIndex].classList.remove("snake");
		// right arrow
		if (e.keyCode === 39) {
			direction = 1;
		}
		// up arrow
		else if (e.keyCode === 38) {
			direction = -width;
		}
		// left arrow
		else if (e.keyCode === 37) {
			direction = -1;
		}
		// down arrow
		else if (e.keyCode === 40) {
			direction = +width;
		}
	};
	document.addEventListener("keyup", control);
	startButton.addEventListener("click", startGame);
});

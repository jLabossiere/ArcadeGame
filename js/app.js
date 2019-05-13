//game variable and audio file
const game = {
	highScore: 1,
	level: 1,
	lives: 3,
	speedMod: [1, 1.5, 2, 2.5, 2, 2.3, 2.7, 2.5, 2.7, 3]
};

class Enemy {
	constructor(row) {
		this.sprite = 'images/enemy-bug.png';
		allEnemies.push(this);
		this.x = 0;
		this.y = Enemy.startLocation(row);
		this.speed = Enemy.setSpeed();
	}
	update(dt) {
		//moves the enemy and checks for collision
		this.x += this.speed * dt;
		if (this.x > 515) {
			this.x = -100;
		}
		if (
			(player.y === this.y &&
				(player.x + 17 >= this.x + 1 && player.x + 17 <= this.x + 99)) ||
			(player.y === this.y &&
				(player.x + 84 >= this.x + 1 && player.x + 84 <= this.x + 99))
		) {
			collision();
		}
	}
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
	static setSpeed() {
		return (Math.random() * 100 + 125) * game.speedMod[game.level - 1];
	}
	//sets the y position for the eenmy based on row inuputed
	static startLocation(row) {
		switch (row) {
			case 1:
				return 70;
			case 2:
				return 150;
			case 3:
				return 230;
		}
	}
}

class Player {
	constructor() {
		this.sprite = 'images/char-boy.png';
		this.x = 202;
		this.y = 390;
		this.alive = true;
	}

	update(dt) {
		if (player.y === -10) {
			levelup();
		}
	}
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
	//plauer controls and prevents out of board movement
	handleInput(key) {
		if (player.alive === true) {
			switch (key) {
				case 'left':
					this.x -= 101;
					if (this.x < 0) {
						this.x += 101;
					}
					break;
				case 'up':
					this.y -= 80;
					if (this.y < -10) {
						this.y += 80;
					}
					break;
				case 'right':
					this.x += 101;
					if (this.x > 404) {
						this.x -= 101;
					}
					break;
				case 'down':
					this.y += 80;
					if (this.y > 394) {
						this.y -= 80;
					}
					break;
			}
		}
	}
}
// executes collision code
function collision() {
	if (player.alive === true) {
		const livesValue = document.querySelector('.lives-value');
		game.lives--;
		player.sprite = 'images/skele.png';
		player.alive = false;
		if (game.lives === 0) {
			gameReset();
		}
		setTimeout(() => {
			if (player.alive === false) {
				player.alive = true;
				player.sprite = 'images/char-boy.png';
				player.x = 202;
				player.y = 390;
				livesValue.textContent = game.lives;
			}
		}, 1500);
	}
}
//executes adjustments for next level upon success
function levelup() {
	player.x = 202;
	player.y = 390;
	const levelValue = document.querySelector('.level-value');
	let highScoreText = document.querySelector('.highscore-value');
	game.level++;
	levelValue.textContent = game.level;
	if (game.level > game.highScore && game.highScore !== 'WIN!') {
		game.highScore = game.level;
		highScoreText.textContent = game.highScore;
	}
	if (game.level === 5 || game.level === 8) {
		if (game.level === 5) {
			let enemy4 = new Enemy(1);
		}
		if (game.level === 8) {
			let enemy5 = new Enemy(2);
		}
	}
	//checks for and executes win state
	if (game.highScore === 11) {
		game.highScore = 'WIN!';
		highScoreText.textContent = 'WIN';
		alert('You have Won!!!');
		gameReset();
	}
	speedSet();
}
// sets enemy speed
function speedSet() {
	allEnemies.forEach(enemy => (enemy.speed = Enemy.setSpeed()));
}

/* resets level, lives and return number of enemies to the original value*/
function gameReset() {
	const levelValue = document.querySelector('.level-value');
	game.level = 1;
	levelValue.textContent = game.level;
	game.lives = 3;
	allEnemies = allEnemies.slice(0, 3);
	speedSet();
}

let allEnemies = [];
let player = new Player();
let enemy1 = new Enemy(1);
let enemy2 = new Enemy(2);
let enemy3 = new Enemy(3);

document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});

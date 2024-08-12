'use strict';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
//const instructions = document.getElementById('instruction');
//const button = document.getElementById('instr');
const height = 8;
const width = 16;

//console.log(instructions);

let treat_color = 'purple';
let body_color = 'black';
let danger_color = 'red';
let background_color = '#ddd';

let arr = Array.from({length: width}, () => Array.from({length: height}, () => 0));

let arr_x, arr_y, tile;

if (window.innerHeight * 2 > window.innerWidth) {
  tile = Math.floor(window.innerWidth / width);
} else {
  tile = Math.floor(window.innerHeight / height);
}

arr_x = tile * width;
arr_y = tile * height;	

ctx.fillStyle = background_color;
ctx.fillRect(0, 0, arr_x, arr_y);

let body_x, body_y, treat_x, treat_y;
let score, destroyed_reds, per_break;

body_x = x();
body_y = y();
arr[body_x][body_y] = 1;
placeTreat();

initialize();

function initialize() {
	window.addEventListener('resize', resizeCanvas, false);
	resizeCanvas();
	score = 0;
	destroyed_reds = 0;
	per_break = 8;
}

function resizeCanvas() {
    let fixedHeight = window.innerHeight * 0.60;
    let fixedWidth = window.innerWidth * 0.95;

	if (fixedHeight * 2 > fixedWidth) {
 		tile = Math.floor(fixedWidth / width);
	} else {
		tile = Math.floor(fixedHeight / height);
	}

	arr_x = tile * width
	arr_y = tile * height
	canvas.width = arr_x;
	canvas.height = arr_y;
	
	draw();
}

function draw () {
	ctx.fillStyle = background_color;
	ctx.fillRect(0, 0, arr_x, arr_y);
	ctx.fillStyle = body_color;
	ctx.fillRect(body_x*tile, body_y*tile, tile, tile);
	ctx.fillStyle = treat_color;
	ctx.fillRect(treat_x*tile, treat_y*tile, tile, tile);
	ctx.fillStyle = danger_color;
	for (let i = 0; i < width; i++) {
		for (let j = 0; j < height; j++) {
			if (arr[i][j] === -1) {
				ctx.fillRect(i*tile,j*tile,tile,tile);
			}
		}
	}
}

// instr.addEventListener('click', (e) => {
// 	if(canvas.style.display === 'none') {
// 		canvas.style.display = 'inline';
// 		instructions.style.display = 'none';
// 	} else {
// 		canvas.style.display = 'none';
// 		instructions.style.display = 'inline';
// 	}
// });

canvas.addEventListener('click', (e) => {

	//TODO fix the offset from the page vs the canvas and you've got the color done 
	//Also, might want to make helper functions for rgb to hex and vice versa

    let x_offset = window.innerWidth - arr_x;
    x_offset /= 2;

	console.log(e.x);
	console.log(e.y);
    var x = e.x;
    var y = e.y;
	console.log(canvas.getContext('2d').getImageData(x-x_offset, y, 1, 1).data);
});

document.addEventListener('keydown', event => {
	const charList = 'adesw';
	// movement keys only
	let x = body_x;
	let y = body_y;
	const key = event.key.toLowerCase();
	if (!(charList.includes(key)) && (key !== 'arrowup') && (key !== 'arrowdown') && (key !== 'arrowright') && (key !== 'arrowleft')) { return; }

    event.preventDefault();
	if (key === 'arrowleft' || key === 'a') {
		if (body_x === 0) {
			body_x = width-1;
		} else {
			body_x--;
		}
	} else if (key === 'arrowup' || key === 'w') {
		if (body_y === 0) {
			body_y = height-1;
		} else {
			body_y--;
		}
	} else if (key === 'arrowright' || key === 'd') {
		if (body_x === width-1) {
			body_x = 0;
		} else {
			body_x++;
		}
	} else if (key === 'arrowdown' || key === 's') {
		if (body_y === height-1) {
			body_y = 0;
		} else {
			body_y++;
		}
	} else if (key === 'e') {
		alert('Current points: ' + score  + '\n Destroyable red boxes: ' + (Math.floor(score/per_break-destroyed_reds)));
		return;
	}
	premove(x,y);
	movePlayer();
});

function premove(x, y) {
	ctx.fillStyle = background_color;
	if (arr[x][y] === 3) {
		arr[x][y] = -1;
		ctx.fillStyle = danger_color;
		score++;
	} else {
		arr[x][y] = 0;
	}
	ctx.fillRect(x*tile,y*tile,tile,tile);
}

function movePlayer() {
	arr[body_x][body_y]++;
	ctx.fillStyle = body_color;
	ctx.fillRect(body_x*tile,body_y*tile,tile,tile);
	if (arr[body_x][body_y] === 0) {
		red();
	} else if (arr[body_x][body_y] === 3) {
		placeTreat();
		document.getElementById("score").textContent="Current Score: " + (score+1) + ". Times you can run into a red box and not die: " + (Math.floor(score/per_break-destroyed_reds));
	}
}

function red() {
	if ((Math.floor(score/per_break) - destroyed_reds) <= 0) {
		end();
	} else {
		destroyed_reds++;
        document.getElementById("score").textContent="Current Score: " + score + ". Times you can run into a red box and not die: " + (Math.floor(score/per_break-destroyed_reds));
	}
}

function placeTreat () {
	do {
		treat_x = x();
		treat_y = y();
	} while (arr[treat_x][treat_y] !== 0);
	arr[treat_x][treat_y] = 2;
	ctx.fillStyle = treat_color;
	ctx.fillRect(treat_x*tile,treat_y*tile,tile,tile);
} 

function end() {
	alert('You lost!\nYour score was ' + score + '.');
	arr = arr.map(a => a.map(() => 0))
	score = 0;
	destroyed_reds = 0;
	body_x = x();
	body_y = y();
	placeTreat();
	draw();
}

function x () {
	return Math.floor(Math.random() * width);
}

function y () {
	return Math.floor(Math.random() * height);
}
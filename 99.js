'use strict';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const height = height;
const width = width;

let arr = Array.from({length: width}, () => Array.from({length: height}, () => 0));

let arr_x, arr_y, tile;

if (window.innerHeight * 2 > window.innerWidth) {
  tile = Math.floor(window.innerWidth / width);
} else {
  tile = Math.floor(window.innerHeight / height);
}

arr_x = tile * width;
arr_y = tile * height;

ctx.fillStyle = '#EEEEEE';
ctx.fillRect(0, 0, arr_x, arr_y);

let body_x, body_y, treat_x, treat_y;
let score, destroyed_reds;

body_x = x();
body_y = y();
console.log(body_x + ' ' + body_y);
arr[body_x][body_y] = 1;
placeTreat();

initialize();

function initialize() {
	window.addEventListener('resize', resizeCanvas, false);
	resizeCanvas();
	score = 0;
	destroyed_reds = 0;
}

function resizeCanvas() {
	if (window.innerHeight * 2 > window.innerWidth) {
 	 tile = Math.floor(window.innerWidth / width);
	} else {
	  tile = Math.floor(window.innerHeight / height);
	}

	arr_x = tile * width
	arr_y = tile * height

	canvas.width = arr_x;
	canvas.height = arr_y;
	
	draw();
}

function draw () {
	ctx.fillStyle = '#eee';
	ctx.fillRect(0, 0, arr_x, arr_y);
	ctx.fillStyle = 'black';
	ctx.fillRect(body_x*tile, body_y*tile, tile, tile);
	ctx.fillStyle = 'purple';
	ctx.fillRect(treat_x*tile, treat_y*tile, tile, tile);
	ctx.fillStyle = 'red';
	for (let i = 0; i < width; i++) {
		for (let j = 0; j < height; j++) {
			if (arr[i][j] === -1) {
				ctx.fillRect(i,j,tile,tile);
			}
		}
	}
}

document.addEventListener('keydown', event => {
	const charList = 'adesw';
	// movement keys only
	ctx.fillStyle = '#eee';
	if (arr[body_x][body_y] === 3) {
		ctx.fillStyle = 'red';
		score++;
	}
	ctx.fillRect(body_x*tile,body_y*tile,tile,tile);
	const key = event.key.toLowerCase();
	if (!(charList.includes(key)) && (key !== 'arrowup') && (key !== 'arrowdown') && (key !== 'arrowright') && (key !== 'arrowleft')) { return; }

	if (key === 'arrowleft' || key === 'a') {
		if (body_x === 0) {
			body_x = width;
		} else {
			body_x--;
		}
	} else if (key === 'arrowup' || key === 'w') {
		if (body_x === 0) {
			body_x = height;
		} else {
			body_x--;
		}
	} else if (key === 'arrowright' || key === 'd') {
		if (body_x === width) {
			body_x = 0;
		} else {
			body_x++;
		}
	} else if (key === 'arrowdown' || key === 's') {
		if (body_y === height) {
			body_y = 0;
		} else {
			body_y++;
		}
	} else if (key === 'e') {
		alert('Current points: ' /*+ /* fix me  + '\n Destroyable red boxes: ' + /* error here */);
		return;
	}
});

function placeTreat () {
	do {
		treat_x = x();
		treat_y = y();
	} while (arr[treat_x][treat_y] !== 0);
	arr[treat_x][treat_y] = 2;
} 

function x () {
	return Math.floor(Math.random() * width);
}

function y () {
	return Math.floor(Math.random() * height);
}
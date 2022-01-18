'use strict';

let arr = Array.from({length: 16}, () => Array.from({length: 8}, () => 0));

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let arr_x, arr_y, tile;

if (window.innerHeight * 2 > window.innerWidth) {
  tile = Math.floor(window.innerWidth / 16);
} else {
  tile = Math.floor(window.innerHeight / 8);
}

arr_x = tile * 16
arr_y = tile * 8

ctx.fillStyle = '#EEEEEE';
ctx.fillRect(0, 0, arr_x, arr_y);

let body_x, body_y, treat_x, treat_y;

body_x = x();
body_y = y();
console.log(body_x + ' ' + body_y);
arr[body_x][body_y] = 1;
placeTreat();

initialize();

function initialize() {
	window.addEventListener('resize', resizeCanvas, false);
	resizeCanvas();
}

function resizeCanvas() {
	if (window.innerHeight * 2 > window.innerWidth) {
 	 tile = Math.floor(window.innerWidth / 16);
	} else {
	  tile = Math.floor(window.innerHeight / 8);
	}

	arr_x = tile * 16
	arr_y = tile * 8

	canvas.width = arr_x;
	canvas.height = arr_y;
	
	draw();
}

function draw () {
	ctx.fillStyle = '#EEEEEE';
	ctx.fillRect(0, 0, arr_x, arr_y);
	ctx.fillStyle = black;
	ctx.fillRect(body_x, body_y, tile, tile);
	ctx.fillStyle = purple;
	ctx.fillRect(treat_x, treat_y, tile, tile);
	ctx.fillStyle = red;
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 16; j++) {
			if (arr[i][j] === -1) {
				ctx.fillRect(i,j,tile,tile);
			}
		}
	}
}

document.addEventListener('keydown', event => {
	const charList = 'adesw';
	// movement keys only
	const key = event.key.toLowerCase();
	if (!(charList.includes(key)) && (key !== 'arrowup') && (key !== 'arrowdown') && (key !== 'arrowright') && (key !== 'arrowleft')) { return; }

	if (key === 'arrowleft' || key === 'a') {

	} else if (key === 'arrowup' || key === 'w') {

	} else if (key === 'arrowright' || key === 'd') {

	} else if (key === 'arrowdown' || key === 's') {

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
	return Math.floor(Math.random() * 16);
}

function y () {
	return Math.floor(Math.random() * 8);
}
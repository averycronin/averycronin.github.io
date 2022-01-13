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
	
	ctx.fillStyle = '#EEEEEE';
	ctx.fillRect(0, 0, arr_x, arr_y);
}

let body, treat;



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

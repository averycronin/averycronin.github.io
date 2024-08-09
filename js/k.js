'use strict';

let input = [];

document.addEventListener('keydown', event => {
	const charList = 'ab';
	const key = event.key.toLowerCase();
	if (!(charList.includes(key)) && (key !== 'arrowup') && (key !== 'arrowdown') && (key !== 'arrowright') && (key !== 'arrowleft')) { return; }

    let keys = input.length;

    switch(keys) {
        case 0:
        case 1: key === 'arrowup' ? input.push(key) : input = []
        break;
        case 2: 
        case 3: key === 'arrowdown' ? input.push(key) : input = []
        break;
        case 4: 
        case 6: key === 'arrowleft' ? input.push(key) : input = []
        break;
        case 5: 
        case 7: key === 'arrowright' ? input.push(key) : input = []
        break;
        case 8: key === 'b' ? input.push(key) : input = []
        break;
        case 9: key === 'a' ? window.location.href = "https://averycronin.com/game" : input = []
        break;
        default: input = []
    }
});
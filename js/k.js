'use strict';

let input = [];

document.addEventListener('keydown', event => {
	const charList = 'ab';
	const key = event.key.toLowerCase();
	if (!(charList.includes(key)) && (key !== 'arrowup') && (key !== 'arrowdown') && (key !== 'arrowright') && (key !== 'arrowleft')) { return; }

    keys = input.length;

    switch(keys) {
        case 0:
        case 1: key === 'arrowup' ? keys.push(key) : keys = []
        break;
        case 2: 
        case 3: key === 'arrowdown' ? keys.push(key) : keys = []
        break;
        case 4: 
        case 6: key === 'arrowleft' ? keys.push(key) : keys = []
        break;
        case 5: 
        case 7: key === 'arrowright' ? keys.push(key) : keys = []
        break;
        case 8: key === 'b' ? keys.push(key) : keys = []
        break;
        case 9: key === 'a' ? window.location.href = "https://averycronin.com/game" : keys = []
        break;
        default: keys = []
    }
});
var last;

function markov(last, probs) {
	var next;
	if(last)
	return next;
}


var jump_probs = [0.5, 0.4 ,0.1];
function jump(last, probs) {
	var rand = Math.random();
	if(last <  probs_last[last]) {
		return last
	}
}

function walk(probs) {
	var rand = Math.random();
	if(last <  probs_last[last]) {
		return last
	}
}


/**
 * Do an up/hold/down walk
 */
function random_walk() {
	var rand = Math.random();
	if(rand < 0.33) {
		return -1;
	}
	else if(0.33 <= rand && rand < 0.66) {
		return 0;
	}
	else {
		return 1;
	}
}

/**
 * Do an up/down walk
 */
function random_walk2() {
	var rand = Math.random();
	if(rand < 0.5) {
		return -1;
	}
	else {
		return 1;
	}
}

/**
 * Do an up/down walk
 */
function rest() {
	var rand = Math.random();
	if(rand < 0.5) {
		return 0;
	}
	else {
		return 1;
	}
}

for(var i=0; i<10; i++) {
	// console.log(jump(last, jump_probs));
	console.log(random_walk());
}
exports.random_walk = random_walk;
exports.rest = rest;

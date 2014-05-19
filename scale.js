module.exports = {
	maj : [0,2,2,1,2,2,2],
	nmin : [0,2,1,2,2,1,2],
	hmin : [0,2,1,2,2,1,3],
	writeScale : writeScale,
	numberToLetter: numberToLetter
};

function cdf(a) {
	var ret = [], acc = 0, i;
	for(i = 0; i < a.length; i += 1) {
		ret.push(acc += a[i]);
	}
	return ret;
}

function getNote(scale, start, degree) {
	var semitones = Math.floor(degree/scale.length) * 12 + 
		cdf(scale)[degree % scale.length];
	return semitones;
}

function numberToLetter(num) {
	var map = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B' ];
	return map[num % 12];
	
}

function writeLinearScale(scale, start, len) {
	var i, ret = [];
	for(i = 0; i < len; i += 1) {
		ret.push(
			numberToLetter(getNote(scale, start, i))
		);
	}
	return ret;
}

function writeScale(scale, start) {
	// key is the starting note
	var rows = 5;
	var cols = 8;
	var degree = 0;
	var skip = 4
	var ret = [];
	for(x = 0; x < 8; x += 1) {
		var col = []; 
		ret.push(col);
		for(y = 0; y < 5; y += 1) {
			col.unshift(getNote(scale, start, y*skip+x))
		}
	}
	return ret;
}



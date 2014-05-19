module.exports = {
	maj : [0,2,2,1,2,2,2],
	nmin : [0,2,1,2,2,1,2],
	hmin : [0,2,1,2,2,1,3],
	chrom : [0,1,1,1,1,1,1,1,1,1,1,1],
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
	return start + semitones;
}

function numberToLetter(num) {
	var map = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B' ];
	return map[num % 12];
	
}

/**
 * Mostly for debugging algos, write out scale in a single array
 * of arbitrary length.
 * @param {Array} scale - array specifying the scale degrees as semitone intervals
 * @param {Number} start - the midi note number to start the scale
 * @param {Number} len - the total length of the scale to generate, repeats the scale
 */
function writeLinearScale(scale, start, len) {
	var i, ret = [];
	for(i = 0; i < len; i += 1) {
		ret.push(
			numberToLetter(getNote(scale, start, i))
		);
	}
	return ret;
}

function writeScale(scale, start, rows, cols, skip) {
	// key is the starting note
	var rows = rows || 5,
		cols = cols || 8,
		skip = skip || 3,
		ret = [];

	for(x = 0; x < cols; x += 1) {
		var col = []; 
		ret.push(col);
		for(y = 0; y < rows; y += 1) {
			col.unshift(getNote(scale, start, y*skip+x))
		}
	}
	return ret;
}



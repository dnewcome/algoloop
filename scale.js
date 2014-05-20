module.exports = {
	/**
	 * scale defintions - each item in the array is the interval between degrees
	 * expressed in semitones. Must span an entire octave and first scale degree is
	 * defined as zero interval.
	 */
	maj : [0,2,2,1,2,2,2],
	nmin : [0,2,1,2,2,1,2],
	hmin : [0,2,1,2,2,1,3],
	chrom : [0,1,1,1,1,1,1,1,1,1,1,1],
	writeScale : writeScale,
	numberToLetter: numberToLetter
};

/**
 * Generate cumulative distribution function from
 * scale interval definitions. Used to simplify
 * generation of scale data
 */
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

/**
 * Generate two-dimensional scale mapping aray.
 * @param {Array} scale - array specifying the scale degrees as semitone intervals
 * @param {Number} start - the midi note number to start the scale
 * @param {Number} rows - number of rows in map 
 * @param {Number} cols - number of columns in map 
 * @param {Number} skip - interval between rows in semitones 
 */
function writeScale(scale, start, rows, cols, skip) {
	var rows = rows || 5,
		cols = cols || 8,
		ret = [];
		if(skip !== 0){
			skip = skip || 3;
		}

	for(x = 0; x < cols; x += 1) {
		ret.push([]);
		for(y = 0; y < rows; y += 1) {
			// TODO: change shift calculation so we can have zero shift
			console.log('skipping: ' + (y*skip+x));
			ret[x].unshift(getNote(scale, start, y*skip+x))
		}
	}
	return ret;
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

/**
 * Debugging aid for visualizing generated scales with readable note names
 * instead of MIDI note numbers.
 */
function numberToLetter(num) {
	var map = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B' ];
	return map[num % 12];
	
}

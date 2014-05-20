var midi = require('midi');

/**
 * Use this to change the state of a cell
 */
function setCellColor(x, y, c, output) {
	var message = getMidiMessageForCell(x, y);
	message.push(c);
	output.sendMessage(message);
}

/**
 * run through array and set colors accordingly
 * uses standard array format, must be valid array
 */
function setCells(a) {
	var x, y;
	for(x = 0; x < a.length; x += 1) {
		for(y = 0; y < a[0].length; y += 1) {
			setCellColor(x, y, a[x][y]);	
		}
	}
}

/**
 * quick and dirty way of setting the color of root notes
 */
function setRootCells(a, root, output) {
	var x, y;
	for(x = 0; x < a.length; x += 1) {
		for(y = 0; y < a[0].length; y += 1) {
			if((a[x][y] - root) % 12 == 0){
				setCellColor(x, y, 3, output);	
			}
			else {
				setCellColor(x, y, 0, output);	
			}
		}
	}
}

/**
 * Use this to look up midi note for a cell 
 */
function getMidiMessageForCell(x, y) {
	var note = y + 53;
	var command = 0x90 + x;
	return [command, note];	
}

function getCoordinates(message) {
	var x = lookupColumn(message[0]);
	var y = lookupRow(message[1]);
	return [x, y];	
}

function lookupColumn(midiCommand) { 
	return midiCommand & 0x0F;
}

function lookupCommand(midiCommand) { 
	if((midiCommand & 0xF0) == 0x90) {
		return 'noteon';
	}
	else if((midiCommand & 0xF0) == 0x80) {
		return 'noteoff';
	}
	else {
		return midiCommand & 0xF0;	
	}
}

function lookupRow(midiNote) {
	return midiNote - 53;
}


// Sysex, timing, and active sensing messages are ignored
// by default. To enable these message types, pass false for
// the appropriate type in the function below.
// Order: (Sysex, Timing, Active Sensing)
// input.ignoreTypes(false, false, false);

// ... receive MIDI messages ...

// Close the port when done.
// input.closePort();
//
//
var a0 = [
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0]
];
var a1 = [
	[1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1]
];
var a1 = [
	[1, 1, 1, 1, 1],
	[0, 0, 0, 0, 0],
	[1, 1, 1, 1, 1],
	[0, 0, 0, 0, 0],
	[1, 1, 1, 1, 1],
	[0, 0, 0, 0, 0],
	[1, 1, 1, 1, 1],
	[0, 0, 0, 0, 0]
];

function rotateLeft(a) {
	a.push(a.shift());
	return a;
}
function rotateRight(a) {
	a.unshift(a.pop());
	return a;
}

module.exports.setRootCells = setRootCells;


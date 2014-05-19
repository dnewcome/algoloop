var midi = require('midi');

// Set up a new input.
var input = new midi.input();
var output = new midi.output();

// Count the available input ports.
var portcount = input.getPortCount();
var outportcount = output.getPortCount();
console.log('detected ' + input.getPortCount() + ' input ports');

// Get the name of a specified input port.
for(var i=0; i < portcount; i++) {
	var name = input.getPortName(i);
    console.log(i + ' ' + name);
}
for(var i=0; i < outportcount; i++) {
	var name = output.getPortName(i);
    console.log(i + ' ' + name);
}

/**
 * Use this to change the state of a cell
 */
function setCellColor(x, y, c) {
	var message = getMidiMessageForCell(x, y);
	message.push(c);
	output.sendMessage(message);
}

function setCells(a) {
	var x, y;
	for(x = 0; x < 8; x += 1) {
		for(y = 0; y < 5; y += 1) {
			setCellColor(x, y, a[x][y]);	
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

// var octave = 1;
// Configure a callback.
input.on('message', function(deltaTime, message) {
  console.log('m:' + message + ' d:' + deltaTime);
  // message[1] += octave*12;
  var coordinates = getCoordinates(message);
  console.log('coordinates: ' + coordinates);
  console.log('sending message:');
  var message = getMidiMessageForCell(coordinates[0], coordinates[1]);
  message.push(2);
  output.sendMessage(message);
});

// Open the first available input port.
input.openPort(2);
output.openPort(2);


// Sysex, timing, and active sensing messages are ignored
// by default. To enable these message types, pass false for
// the appropriate type in the function below.
// Order: (Sysex, Timing, Active Sensing)
input.ignoreTypes(false, false, false);

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

setInterval(function(){
	setCells(rotateLeft(a1))
}, 100);



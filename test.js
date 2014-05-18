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
	var note = y + 53;
	var command = 0x90 + x;
	var velocity = c;	
	output.sendMessage([note, command, velocity]);
}

/**
 * Use this to look up midi note for a cell 
 */
function getMidiMessageForCell(x, y) {
	
			
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
  console.log('column: ' + lookupColumn(message[0]));
  console.log('row: ' + lookupRow(message[1]));
  console.log('command: ' + lookupCommand(message[0]));
  console.log('sending message:');
  //output.sendMessage([0x90 + lookupColumn(message[0]), message[1], 2]);
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



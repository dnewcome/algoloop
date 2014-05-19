var midi = require('midi');
var scale = require('./scale.js');
var map = scale.writeScale(scale.maj, 0);
console.log(map);

var input = new midi.input();
input.openPort(2);

function lookupColumn(midiCommand) { 
	return midiCommand & 0x0F;
}

function lookupRow(midiNote) {
	return midiNote - 53;
}

input.on('message', function(deltaTime, message) {
	console.log(
		map[lookupColumn(message[0])][lookupRow(message[1])]
	);	
});

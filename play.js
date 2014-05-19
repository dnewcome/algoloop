var midi = require('midi'),
	apc20 = require('./apc20.js'),
	scale = require('./scale.js');

var map = scale.writeScale(scale.chrom, 48);
console.log(map);

var input = new midi.input();
var output = new midi.output();
input.openPort(2);
output.openVirtualPort("scale");

input.on('message', function(deltaTime, message) {
	var note = map[apc20.lookupColumn(message[0])][apc20.lookupRow(message[1])];
	var cmd = message[0] & 0xF0;
	console.log(scale.numberToLetter(note));	
	console.log([cmd, note, 0x7F]);
});

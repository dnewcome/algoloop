var midi = require('midi'),
	apc20 = require('./apc20.js'),
	scale = require('./scale.js'),
	lights = require('./test.js');

function PSlayer(input, output, lightout) {
	var map = scale.writeScale(scale.chrom, 48);
	lights.setRootCells(map, 48, lightout);
	// TODO: rename this, it means semitones now, not octave
	var octave = 0;
	var skip = 3;
	console.log(map);

	input.on('message', function(deltaTime, message) {
		// TODO: handle stuck notes when note is held during octave shift
		if(message[1] == 82 && (message[0] & 0xF0) == 0x90) {
			octave += 12;
		}
		else if(message[1] == 83 && (message[0] & 0xF0) == 0x90) {
			octave -= 12;
		}
		else if(message[1] == 84 && (message[0] & 0xF0) == 0x90) {
			octave += 1;
		}
		else if(message[1] == 85 && (message[0] & 0xF0) == 0x90) {
			octave -= 1;
		}
		else if(message[1] == 52 && message[0] == 0x90) {
			console.log('maj');
			// TODO: add skip value to all writeScale
			map = scale.writeScale(scale.maj, 48);
			lights.setRootCells(map, 48, lightout);
		}
		else if(message[1] == 52 && message[0] == 0x91) {
			console.log('nmin');
			// TODO: add skip value to all writeScale
			map = scale.writeScale(scale.nmin, 48);
			lights.setRootCells(map, 48, lightout);
		}
		else if(message[1] == 52 && message[0] == 0x92) {
			console.log('hmin');
			// TODO: add skip value to all writeScale
			map = scale.writeScale(scale.hmin, 48);
			lights.setRootCells(map, 48, lightout);
		}
		else if(message[1] == 52 && message[0] == 0x93) {
			console.log('chrom');
			// TODO: add skip value to all writeScale
			map = scale.writeScale(scale.chrom, 48);
			lights.setRootCells(map, 48, lightout);
		}
		else if(message[1] == 86 && message[0] == 0x90) {
			skip += 1;
			// skip = 8 - ((skip + 1) % 16);
			console.log('skip: ' + skip);
		
			// using mod 16 lets us do -8 .. 8 skip range. this turns out not to be that useful
			// map = scale.writeScale(scale.chrom, 48, null, null, 8-((skip + 1) % 16));
			map = scale.writeScale(scale.chrom, 48, null, null, (skip + 1) % 9);
			lights.setRootCells(map, 48, lightout);
		}
		else {
			console.log(message);
			var note = map[apc20.lookupColumn(message[0])][apc20.lookupRow(message[1])];
			note += octave;
			var cmd = message[0] & 0xF0;
			console.log(scale.numberToLetter(note));	
			output.sendMessage([cmd, note, 0x7F]);
		}
	});
}

module.exports = PSlayer;

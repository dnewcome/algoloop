var midi = require('midi'),
	input = new midi.input(),
	output = new midi.output(),
	lightout = new midi.output(),
	PSlayer = require('./pslayer.js');

var inportcount = input.getPortCount();
var outportcount = output.getPortCount();

// enumarate ports
if(process.argv.length < 3) {
	console.log('Usage - specify numeric port arg as first argument');
	console.log('input ports');
	for(var i=0; i < inportcount; i++) {
		var name = input.getPortName(i);
		console.log(i + ' ' + name);
	}
	console.log();
	console.log('output ports');
	for(var i=0; i < outportcount; i++) {
		var name = output.getPortName(i);
		console.log(i + ' ' + name);
	}
	input.closePort();
	output.closePort();
}

else {
	input.openPort(parseInt(process.argv[2], 10));
	lightout.openPort(parseInt(process.argv[2], 10));
	// send sysex to apc20 to enable "ableton" mode. This causes leds to remain on after button press
	lightout.sendMessage([0xF0, 0x47, 0x7F, 0x7B, 0x60, 0x00, 0x04, 0x41, 0x08, 0x02, 0x01, 0xF7]);
	output.openVirtualPort("scale");
	var slayer = new PSlayer(input, output, lightout);
}



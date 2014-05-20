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
	output.openVirtualPort("scale");
	var slayer = new PSlayer(input, output, lightout);
}



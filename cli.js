var midi = require('midi'),
	input = new midi.input(),
	output = new midi.output(),
	algo = require('./algo.js');
	scale = require('./scale.js');

var inportcount = input.getPortCount();
var outportcount = output.getPortCount();
var map = scale.writeScale(scale.maj, 48);
current = 48;

// enumarate ports
if(process.argv.length < 3) {
	enumerate();
}

else {
}

	// input.openPort(parseInt(process.argv[2], 10));
	// lightout.openPort(parseInt(process.argv[2], 10));
	output.openVirtualPort("algo");
		
	// var slayer = new PSlayer(input, output, lightout);
	setInterval(function() {
		current = current + algo.random_walk();
		if(algo.rest()) {
			console.log('channel 1 playing note: ' + current);
			output.sendMessage([0x90, current, 0x7F]);
		}
		else {
			console.log('channel 1 resting');
		}
	}, 1000);

	setInterval(function() {
		current = current + algo.random_walk();
		if(algo.rest()) {
			console.log('channel 2 playing note: ' + current);
			output.sendMessage([0x91, current, 0x7F]);
		}
		else {
			console.log('channel 2 resting');
		}
	}, 1000);

	setInterval(function() {
		current = current + algo.random_walk();
		if(algo.rest()) {
			console.log('channel 3 playing note: ' + current);
			output.sendMessage([0x92, 0x33, 0x7F]);
		}
		else {
			console.log('channel 3 resting');
		}
	}, 500);

	setInterval(function() {
		current = current + algo.random_walk();
		if(algo.rest()) {
			console.log('channel 4 playing note: ' + current);
			output.sendMessage([0x92, 0x30, 0x7F]);
		}
		else {
			console.log('channel 4 resting');
		}
	}, 250);


function enumerate() {
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


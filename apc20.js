function lookupColumn(midiCommand) { 
	return midiCommand & 0x0F;
}

function lookupRow(midiNote) {
	return midiNote - 53;
}

module.exports = {
	lookupColumn: lookupColumn,
	lookupRow: lookupRow
};

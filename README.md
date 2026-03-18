# Algoloop

Algorithmic MIDI music generator in Node.js. An experimental tool for generating melodies via random walks and playing scales on an Akai APC20 pad controller.

This is a legacy/reference project — kept for historical interest, not actively developed.

## What it does

There are two main modes:

**Algorithmic generation (`cli.js`)** — Opens a virtual MIDI output port named `algo` and runs four simultaneous loops at different tempos (1000ms, 1000ms, 500ms, 250ms). Each loop independently walks through MIDI note space using a random walk and probabilistically decides whether to play or rest on each tick. The output can be routed to any DAW or software synth that accepts MIDI input.

**Live performance layer (`pslayer.js`)** — Maps the APC20's 8×5 pad grid to a musical scale. Pressing pads plays notes, with the layout determined by the selected scale and a configurable interval skip between rows. Specific pads control:
- Octave shift up/down (±12 semitones)
- Chromatic shift up/down (±1 semitone)
- Scale selection (major, natural minor, harmonic minor, chromatic)
- Skip interval adjustment (changes the harmonic interval between rows)

Root notes are highlighted on the APC20's LEDs when the scale or skip value changes.

## Architecture

| File | Purpose |
|------|---------|
| `cli.js` | Entry point — MIDI port setup, algorithmic playback loops |
| `algo.js` | Random walk functions for note movement and rest decisions |
| `scale.js` | Scale definitions and 2D grid mapping from scale degrees to MIDI notes |
| `pslayer.js` | APC20 performance layer — routes pad input through scale map to MIDI output |
| `apc20.js` | APC20 MIDI message decoding (column/row lookup) |
| `test.js` | APC20 LED control — lights up root note cells on the grid |

### Scales

Scales are defined in `scale.js` as arrays of semitone intervals between degrees:

- `maj` — major
- `nmin` — natural minor
- `hmin` — harmonic minor
- `chrom` — chromatic

The `writeScale()` function generates a 2D array of MIDI note numbers suitable for mapping to a grid controller, with a configurable row interval (`skip`) that controls the voicing spread across the grid.

### Random walk

`algo.js` implements two walk functions:

- `random_walk()` — returns -1, 0, or +1 with equal probability (~33% each), allowing up, hold, or down movement
- `random_walk2()` — returns -1 or +1 with 50/50 probability (no hold)
- `rest()` — returns 0 or 1 with 50% probability, used to decide whether to play or skip a beat

There are also stub implementations of `markov()` and `jump()` that were never completed.

## Usage

```
npm install
npm start
```

Running without arguments prints available MIDI input and output ports. The program opens a virtual output port named `algo` — connect this to a DAW track or software synth to hear output.

## Dependencies

- [`midi`](https://www.npmjs.com/package/midi) — Node.js bindings for RtMidi (native MIDI I/O)

## Hardware

Designed around the **Akai APC20**, an 8-column × 5-row pad grid controller with per-pad LED feedback. The MIDI layout maps columns to channels (via the low nibble of the command byte) and rows to notes starting at MIDI note 53.

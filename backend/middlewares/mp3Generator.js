import { createRequire } from 'module';
// Create a require function to load CommonJS modules
const require = createRequire(import.meta.url);

import fs from 'fs';
const { WaveFile } = require('wavefile');
const Lame = require('node-lame').Lame;


// Function to generate a sine wave tone
function generateSineWave(frequency, duration, sampleRate) {
    const numSamples = duration * sampleRate;
    const samples = new Int16Array(numSamples);

    for (let i = 0; i < numSamples; i++) {
        const time = i / sampleRate;
        samples[i] = Math.sin(2 * Math.PI * frequency * time) * 32767;
    }

    return samples;
}

// Function to create a WAV file buffer
function createWavFileBuffer(samples, sampleRate) {
    const wav = new WaveFile();
    wav.fromScratch(1, sampleRate, '16', samples);
    return wav.toBuffer();
}

// Function to encode WAV to MP3
async function encodeWavToMp3(wavBuffer) {
    const encoder = new Lame({
        "output": "./audio-files/demo.mp3",
        "bitrate": 192
    }).setBuffer(wavBuffer);
    return await encoder.encode();
}


// Generate a random tone
async function generateRandomTone(filePath) {
    const frequency = Math.floor(Math.random() * 1000) + 200;
    const duration = 5; // 5 seconds
    const sampleRate = 44100; // Standard sample rate

    const samples = generateSineWave(frequency, duration, sampleRate);
    const wavBuffer = createWavFileBuffer(samples, sampleRate);
    console.log('Generated WAV buffer: ', wavBuffer);

    try {
        const mp3Buffer = await encodeWavToMp3(wavBuffer);
        fs.writeFileSync(filePath, mp3Buffer);
        console.log(`Generated MP3 file at: ${filePath}`);
    } catch (error) {
        console.error('Error encoding WAV to MP3:', error);
    }

}


export default generateRandomTone;
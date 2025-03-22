/* main.js
   Handles scrolling, dark mode toggle, white noise generation,
   frequency selection, volume control, MP3 looping, and media session integration.
*/

let audioCtx;
let noiseNode;
let gainNode;
let filterNode;
let playingNoise = false;
let selectedFrequency = 2900; // Default frequency: 2900 Hz

// Scroll from hero to white noise section
document.getElementById('scrollToContent').addEventListener('click', () => {
  document.getElementById('whiteNoiseSection').scrollIntoView({ behavior: 'smooth' });
});

/* -------------------------
   Dark Mode Toggle
------------------------- */
const darkModeCheckbox = document.getElementById('darkModeCheckbox');
darkModeCheckbox.addEventListener('change', () => {
  if (darkModeCheckbox.checked) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
});

/* -------------------------
   White Noise Setup
------------------------- */
// Frequency button logic
const freqButtons = document.querySelectorAll('.freq-button');
freqButtons.forEach(button => {
  // Mark the default (2900 Hz) as selected
  if (Number(button.dataset.freq) === selectedFrequency) {
    button.classList.add('selected');
  }
  button.addEventListener('click', function() {
    freqButtons.forEach(btn => btn.classList.remove('selected'));
    this.classList.add('selected');
    selectedFrequency = Number(this.dataset.freq);
    if (filterNode) {
      filterNode.frequency.value = selectedFrequency;
    }
  });
});

function startWhiteNoise() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // Create a ScriptProcessorNode for white noise generation
  noiseNode = audioCtx.createScriptProcessor(4096, 1, 1);
  noiseNode.onaudioprocess = function(e) {
    const output = e.outputBuffer.getChannelData(0);
    for (let i = 0; i < output.length; i++) {
      output[i] = Math.random() * 2 - 1; // Generate white noise
    }
  };

  // Create a lowpass filter with the selected frequency
  filterNode = audioCtx.createBiquadFilter();
  filterNode.type = 'lowpass';
  filterNode.frequency.value = selectedFrequency;

  // Create a gain node for volume control (default volume is 25%)
  gainNode = audioCtx.createGain();
  gainNode.gain.value = document.getElementById('noiseVolume').value / 100;

  // Connect the nodes: noise -> filter -> gain -> destination
  noiseNode.connect(filterNode);
  filterNode.connect(gainNode);
  gainNode.connect(audioCtx.destination);
}

function stopWhiteNoise() {
  if (noiseNode) noiseNode.disconnect();
  if (filterNode) filterNode.disconnect();
  if (gainNode) gainNode.disconnect();
  if (audioCtx) audioCtx.close();

  noiseNode = null;
  filterNode = null;
  gainNode = null;
  audioCtx = null;
}

// Toggle White Noise Button
document.getElementById('toggleWhiteNoise').addEventListener('click', function() {
  if (!playingNoise) {
    startWhiteNoise();
    this.textContent = 'Stop White Noise';
  } else {
    stopWhiteNoise();
    this.textContent = 'Start White Noise';
  }
  playingNoise = !playingNoise;
});

// White Noise Volume Slider
document.getElementById('noiseVolume').addEventListener('input', function() {
  document.getElementById('noiseVolumeValue').textContent = this.value + '%';
  if (gainNode) {
    gainNode.gain.value = this.value / 100;
  }
});

/* -------------------------
   MP3 Playback Setup
------------------------- */
const lullabyAudio = document.getElementById('lullabyAudio');
const loadMp3Button = document.getElementById('loadMp3Button');
const toggleMp3Button = document.getElementById('toggleMp3Button');

let mp3Loaded = false;
let mp3Playing = false;

loadMp3Button.addEventListener('click', async () => {
  const url = prompt('Enter MP3 URL (or leave blank if you have a default):');
  if (url) {
    lullabyAudio.src = url;
    mp3Loaded = true;
    toggleMp3Button.disabled = false;
    alert('MP3 loaded. Now you can play or pause it.');
  } else if (lullabyAudio.src) {
    mp3Loaded = true;
    toggleMp3Button.disabled = false;
    alert('Using the existing audio source.');
  } else {
    alert('No MP3 URL provided.');
  }
});

toggleMp3Button.addEventListener('click', () => {
  if (!mp3Loaded) return;
  if (!mp3Playing) {
    lullabyAudio.play();
    toggleMp3Button.textContent = 'Pause MP3';
  } else {
    lullabyAudio.pause();
    toggleMp3Button.textContent = 'Play MP3';
  }
  mp3Playing = !mp3Playing;
});

// MP3 Volume Slider
document.getElementById('mp3Volume').addEventListener('input', function() {
  document.getElementById('mp3VolumeValue').textContent = this.value + '%';
  lullabyAudio.volume = this.value / 100;
});

/* -------------------------
   Media Session API Integration
------------------------- */
if ('mediaSession' in navigator) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: 'Baby Sleep Sounds',
    artist: 'Sweet Dreams',
    album: 'White Noise Station',
    artwork: [
      { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' }
    ]
  });

  // Handle play action from lock screen/notification
  navigator.mediaSession.setActionHandler('play', () => {
    if (!playingNoise) {
      startWhiteNoise();
      document.getElementById('toggleWhiteNoise').textContent = 'Stop White Noise';
      playingNoise = true;
    }
  });

  // Handle pause action from lock screen/notification
  navigator.mediaSession.setActionHandler('pause', () => {
    if (playingNoise) {
      stopWhiteNoise();
      document.getElementById('toggleWhiteNoise').textContent = 'Start White Noise';
      playingNoise = false;
    }
  });

  // Additional action handlers (e.g., 'seekbackward', 'seekforward') can be added if desired.
}

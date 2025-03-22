# Baby Sleep PWA

**Baby Sleep PWA** is a Progressive Web App designed to help soothe your baby to sleep with calming sounds. It features gentle white noise (with preset frequency options and adjustable volume), optional looping MP3 lullabies, a dark mode toggle for nighttime comfort, and native media controls via the Media Session API. The app is fully responsive, so it looks just as nice on desktop as on mobile devices.

## Features

- **White Noise Generation:**  
  Generate soothing white noise with preset frequency options (default is 2900 Hz) and adjustable volume (default is 25%).

- **MP3 Playback:**  
  Optionally load and loop an MP3 lullaby or any calming track, with its own volume control.

- **Dark Mode Toggle:**  
  Manually switch to a darker theme for a more comfortable nighttime experience.

- **Media Session Integration:**  
  Leverages the Media Session API to provide native playback controls (play/pause, metadata, artwork) on the lock screen and in notifications.

- **Progressive Web App (PWA):**  
  Installable and offline-capable thanks to a service worker that caches essential assets.

## Folder Structure

```
baby-sleep-pwa/
├── index.html         # Main HTML file
├── css/
│   └── style.css      # App styles and responsive design
├── js/
│   └── main.js        # JavaScript functionality and media controls
├── manifest.json      # PWA manifest file for installability
├── sw.js              # Service worker for caching and offline support
└── icons/
    ├── icon-192.png   # App icon (192x192)
    └── icon-512.png   # App icon (512x512)
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, etc.)
- A local web server (e.g., [http-server](https://www.npmjs.com/package/http-server) or [serve](https://www.npmjs.com/package/serve))  
  (PWAs require HTTPS or localhost for full functionality.)

### Installation

1. **Clone the Repository:**

   ```sh
   git clone https://github.com/yourusername/baby-sleep-pwa.git
   cd baby-sleep-pwa
   ```

2. **Run a Local Server:**

   For example, using `serve`:

   ```sh
   npx serve .
   ```

3. **Open in Your Browser:**

   Navigate to the localhost URL provided (e.g., `http://localhost:5000`) to view the app.

## Usage

- **White Noise Controls:**  
  - **Frequency:** Tap one of the preset buttons to choose a white noise frequency (default is 2900 Hz).
  - **Volume:** Adjust the slider to set the noise level (default is 25%).
  - **Play/Pause:** Use the "Start White Noise" button to toggle playback.

- **MP3 Playback:**  
  - Load an MP3 file by clicking "Load MP3" and entering a URL.
  - Use the "Play MP3" button to start or pause the track.
  - Adjust the MP3 volume with its dedicated slider.

- **Dark Mode:**  
  Check the "Dim the Lights" toggle to switch to a darker, more comfortable theme for nighttime use.

- **Media Controls:**  
  On supported devices, native media controls will appear on the lock screen/notification area, allowing you to play or pause the audio using the device’s interface.

## Customization

- **Design:**  
  Modify the look and feel by editing `css/style.css`. Change colors, gradients, fonts, and spacing to suit your brand.

- **Audio Settings:**  
  Adjust the default white noise frequency or volume in `js/main.js` as needed.

- **Adding an MP3 File:**  
  If you have a local MP3 file, place it (e.g., in a `sounds` folder) and update both the `<audio>` element in `index.html` and the `sw.js` cache list accordingly.

## Offline Support

The service worker (`sw.js`) caches the essential assets (HTML, CSS, JS, icons, and optionally the MP3) so that the app continues to work offline or with a weak connection. When assets are updated, update the cache name in `sw.js` to force a refresh.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

Inspired by modern design trends and baby sleep apps, this project aims to provide a cozy and soothing experience for your little one. Special thanks to all the open-source contributors who helped make PWAs and modern web design possible.

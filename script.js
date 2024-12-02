const tracks = [
    {
        title: "Song Title 1",
        artist: "Artist 1",
        src: "C:\Users\HP\Desktop\playr\Audio\Song1.mp3"
    },
    {
        title: "Song Title 2",
        artist: "Artist 2",
        src: "audio/song2.mp3"
    },
    {
        title: "Song Title 3",
        artist: "Artist 3",
        src: "audio/song3.mp3"
    }
];

let currentTrackIndex = 0;

const audio = document.getElementById('audio');
const audioSource = document.getElementById('audio-source');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const playBtn = document.getElementById('play-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const volumeControl = document.getElementById('volume');
const progressControl = document.getElementById('progress');

// Load the track
function loadTrack(index) {
    const track = tracks[index];
    audioSource.src = track.src;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    audio.load();
}

// Play or pause the track
function togglePlay() {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "Pause";
    } else {
        audio.pause();
        playBtn.textContent = "Play";
    }
}

// Play the next track
function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    playBtn.textContent = "Pause";
}

// Play the previous track
function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    playBtn.textContent = "Pause";
}

// Set volume
volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
});

// Update progress bar as the track plays
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressControl.value = progress;
});

// Seek through the track when the progress bar is changed
progressControl.addEventListener('input', () => {
    const seekTime = (progressControl.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// Event listeners for buttons
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);

// Load the first track on page load
loadTrack(currentTrackIndex);
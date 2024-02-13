document.addEventListener("DOMContentLoaded", function() {
    const audioPlayer = document.getElementById("audioPlayer");
    const musicFolder = "music/";
    const numSongs = 22;
    let currentSong = getRandomSong();
    let isPlayingFast = false;
    let shuffledSongs = shuffleSongs();
    
    const backgroundsFolder = "assets/Backgrounds/";
    const numBackgrounds = 19; // Number of backgrounds available
    
    function getRandomBackground() {
        return Math.floor(Math.random() * numBackgrounds);
    }

    function getBackgroundPath() {
        const backgroundIndex = getRandomBackground();
        return backgroundsFolder + backgroundIndex + ".gif";
    }

    // Set initial background
    document.querySelector('.background').style.backgroundImage = `url('${getBackgroundPath()}')`;

    function getRandomSong() {
        return Math.floor(Math.random() * numSongs);
    }

    function shuffleSongs() {
        let songs = [];
        for (let i = 0; i < numSongs; i++) {
            songs.push(i);
        }
        return shuffle(songs);
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function playSong() {
        audioPlayer.src = musicFolder + shuffledSongs[currentSong] + ".mp3";
        audioPlayer.play();
    }

    function updateTimeLeft() {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const timeLeft = duration ? Math.ceil(duration - currentTime) : 0;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const formattedTimeLeft = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timeLeft').textContent = `Time Left: ${formattedTimeLeft}`;
    }

    playSong();
    setInterval(updateTimeLeft, 1000);

    document.addEventListener("keypress", function(event) {
        if (event.key === "s") {
            skipToNextSong();
        } else if (event.key === "p") {
            togglePlaybackSpeed();
        } else if (event.key === "q") {
            togglePlayback();
        }
    });

    // Function to handle skipping to the next song
    function skipToNextSong() {
        currentSong++;
        if (currentSong >= numSongs) {
            currentSong = 0;
            shuffledSongs = shuffleSongs(); 
        }
        playSong();
    }

    // Function to handle toggling playback speed
    function togglePlaybackSpeed() {
        if (isPlayingFast) {
            audioPlayer.playbackRate = 1;
            isPlayingFast = false;
        } else {
            audioPlayer.playbackRate = 20;
            isPlayingFast = true;
        }
    }

    // Function to handle toggling playback
    function togglePlayback() {
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    }

    // Add touch event listeners for mobile devices
    document.getElementById("skip").addEventListener("click", skipToNextSong);
    document.getElementById("play").addEventListener("click", togglePlaybackSpeed);
    document.getElementById("pause").addEventListener("click", togglePlayback);
});

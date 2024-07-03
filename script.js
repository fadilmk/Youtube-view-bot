let playerCount = 0;
const players = [];

function generateUrls() {
    const pageNumber = document.getElementById('pageNumber').value;
    const url = document.getElementById('url').value;
    const autoplay = document.getElementById('autoplay').checked ? 1 : 0;
    const mute = document.getElementById('mute').checked ? 1 : 0;
    const outputDiv = document.getElementById('output');

    // Clear previous output
    outputDiv.innerHTML = '';

    // Validate input
    if (pageNumber < 1 || !url) {
        alert('Please enter a valid number of pages and URL.');
        return;
    }

    // Check if the URL is a YouTube link
    const youtubeMatch = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (youtubeMatch) {
        const videoId = youtubeMatch[1];
        for (let i = 0; i < pageNumber; i++) {
            const iframeContainer = document.createElement('div');
            iframeContainer.className = 'iframe-container';

            const iframe = document.createElement('div');
            iframe.id = `player-${playerCount}`;

            iframeContainer.appendChild(iframe);
            outputDiv.appendChild(iframeContainer);

            players.push(new YT.Player(`player-${playerCount}`, {
                videoId: videoId,
                playerVars: {
                    autoplay: autoplay,
                    mute: mute
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            }));

            playerCount++;
        }
    } else {
        // For non-YouTube URLs, just create iframes normally
        for (let i = 0; i < pageNumber; i++) {
            const iframeContainer = document.createElement('div');
            iframeContainer.className = 'iframe-container';

            const iframe = document.createElement('iframe');
            iframe.src = url;

            iframeContainer.appendChild(iframe);
            outputDiv.appendChild(iframeContainer);
        }
    }
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        event.target.setPlaybackQuality('small'); // Set playback quality to 144p
    }
}

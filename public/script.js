function playAnimation(videoFile, lastFrameId) {
    const video = document.getElementById('animationVideo');
    const allLastFrames = document.querySelectorAll('[id^="lastFrame"]'); // Selects all last frame images
    allLastFrames.forEach(img => img.style.display = 'none'); // Hide all last frame images

    video.src = videoFile;
    video.setAttribute('data-last-video', videoFile);
    video.style.display = 'block'; // Show video
    document.querySelector('button').style.display = 'block'; // Show back button
    video.play();
    
    video.onended = function() {
        video.pause();
        video.style.display = 'none'; // Hide video
        document.getElementById('firstFrame').style.display = 'none';
        document.getElementById(lastFrameId).style.display = 'block'; // Show specific last frame image
    };
}

function reverseAnimation() {
    const video = document.getElementById('animationVideo');
    const allLastFrames = document.querySelectorAll('[id^="lastFrame"]');

    let lastVideo = video.getAttribute('data-last-video');
    let reversedVideo = lastVideo.replace('.mp4', '_reversed.mp4')

    video.style.display = 'block';
    video.src = reversedVideo;  // Path to the reversed video
    video.play();

    video.onended = function() {
        video.style.display = 'none';  // Hide video
        document.getElementById('firstFrame').style.display = 'block';  // Show the first frame image again
        document.querySelector('button').style.display = 'none';  // Hide back button
    };
}

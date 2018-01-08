var background = document.getElementById("background");
var hideCenter = document.getElementById("hideCenter");
var loading = document.getElementById("loading");
var splash = document.getElementById("splash");

background.addEventListener('loadedmetadata', function () {
    this.currentTime = 0;
    this.play();
}, false);

background.addEventListener("timeupdate", function () {

    if (this.currentTime >= 4.6) {
        this.pause();
        splash.classList.add("animated", "fadeOut");
    } else if (this.currentTime >= 1.0) {
        hideCenter.style.display = "block";
        loading.style.display = "block";
        loading.classList.add("animated", "fadeIn");
    }

});
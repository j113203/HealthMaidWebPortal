/**
 *  Perferences
 */
var perferences_language = "zh-HK";

/**
 *  Splash Screen
 */

(function (screen_splash) {
    var background = document.getElementById("background");
    var hideCenter = document.getElementById("hideCenter");
    var loading = document.getElementById("loading");
    var splash = document.getElementById("splash");
    var loading_value = document.getElementById("loading\.value");

    background.src = "video/intro.mp4";
    background.muted = true;
    background.addEventListener('loadedmetadata', function () {
        this.currentTime = 0;
        this.play();
    }, false);

    background.addEventListener("timeupdate", function () {

        loading_value.style.width = ((this.currentTime / 5) * 250) + "px";

        if (this.currentTime >= 4.6) {
            this.pause();
            splash.classList.add("animated", "fadeOut");
            setTimeout(function () {
                if (splash != null) {
                    document.body.removeChild(splash);
                    splash = null;
                    screen_Symptoms();
                }
            }, 1000);

        } else if (this.currentTime >= 1.0) {
            hideCenter.style.display = "block";
            loading.style.display = "block";
            loading.classList.add("animated", "fadeIn");
        }

    });
})();

/**
 *  Load Symptoms
 */
var screen_Symptoms = (function () {
    var screen_symptomsInput = document.getElementById("screen\.symptomsInput");
    var logo = document.getElementById("health\.maid");
    screen_symptomsInput.style.display = "block";
    screen_symptomsInput.classList.add("animated", "fadeIn");
    logo.style.display = "block";
    logo.classList.add("animated", "fadeIn");

    var screen_symptomsInput_human = document.getElementById("screen\.symptomsInput\.human");
    var screen_symptomsInput_human_onclick = function () {
        console.log("cliked");
    };
    screen_symptomsInput_human.addEventListener("click", screen_symptomsInput_human_onclick, false);

    var screen_symptomsInput_list = document.getElementById("screen\.symptomsInput\.list");
    

});


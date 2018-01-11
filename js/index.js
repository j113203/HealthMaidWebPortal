/**
 * This script most use on demonstration only
 * By j113203 (Wong Ka Wa)
 */


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
            loading.classList.add("fadeOut");
            setTimeout(function () {
                var loading_options = document.getElementById("loading\.options");
                loading_options.style.display = "block";
                loading_options.classList.add("animated", "fadeIn");

                var self_diagnosis = document.getElementById("loading\.options\.self\.diagnosis");
                self_diagnosis.addEventListener("click", function () {
                    document.body.removeChild(document.body.firstChild);
                    splash = null;
                    screen_Symptoms();
                }, false);
            }, 1000);
            // setTimeout(function () {
            //     if (splash != null) {
            //         document.body.removeChild(splash);
            //         splash = null;
            //         screen_Symptoms();
            //     }
            // }, 1000);

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
    var screen_symptomsEntered = document.getElementById("screen\.symptomsEntered");
    var logo = document.getElementById("health\.maid");
    screen_symptomsInput.style.display = "block";
    screen_symptomsEntered.style.display = "block";
    screen_symptomsInput.classList.add("animated", "fadeIn");
    logo.style.display = "block";
    logo.classList.add("animated", "fadeIn");

    var screen_symptomsInput_human = document.getElementById("screen\.symptomsInput\.human");
    var screen_symptomsInput_human_onclick = function (event) {
        screen_symptomsInput_list.style.display = "block";
        screen_symptomsInput_list.style.top = (event.offsetY) + "px";
        screen_symptomsInput_list.style.left = (event.offsetX) + "px";
    };
    screen_symptomsInput_human.addEventListener("click", screen_symptomsInput_human_onclick, false);

    var screen_symptomsInput_list = document.getElementById("screen\.symptomsInput\.list");
    var screen_symptomsInput_lists = document.getElementById("screen\.symptomsInput\.lists");
    var screen_symptomsInput_symptom = document.getElementById("screen\.symptomsInput\.symptom");

    var filter = function (key) {

        while (screen_symptomsInput_lists.firstChild) {
            screen_symptomsInput_lists.removeChild(screen_symptomsInput_lists.firstChild);
        }

        data.filter(function (i) {
            var index = Object.keys(i)[0];
            var e = i[index];
            if (~e.indexOf(key)) {
                return true;
            }
            return false;
        }).forEach(function (i) {

            var index = Object.keys(i)[0];
            var div = document.createElement("div");
            div.innerHTML = i[index];
            div.addEventListener("click", function (event) {

                addSymptoms(this.innerHTML, event);

            }, false);

            screen_symptomsInput_lists.appendChild(div);

        });
    };

    fetch("json/病徵_zh-HK.json").then(function (response) {
        return response.text();
    }).then(function (e) {
        e = JSON.parse(e);
        if (e.result) {
            data = e.result;
            data.forEach(function (i) {
                var index = Object.keys(i)[0];
                var div = document.createElement("div");
                div.innerHTML = i[index];
                div.addEventListener("click", function (event) {

                    addSymptoms(this.innerHTML, event);

                }, false);
                screen_symptomsInput_lists.appendChild(div);
            });
        }
    });

    screen_symptomsInput_symptom.addEventListener("input", function (event) {
        filter(this.value);
    });

    var top_left = 40;
    var top_right = 80;

    var addSymptoms = function (value, event) {
        var symptom_item = document.createElement("div");
        symptom_item.innerHTML = value;
        symptom_item.style.top = screen_symptomsInput_list.getBoundingClientRect().top + "px";
        symptom_item.style.left = (screen_symptomsInput_list.getBoundingClientRect().left + 100 + Math.round(Math.random() * 200)) + "px";
        screen_symptomsInput_list.style.display = "none";
        symptom_item.addEventListener("click", function () {
            screen_symptomsEntered.removeChild(this);
        });
        screen_symptomsEntered.appendChild(symptom_item);
    };

    var diagnosis = document.getElementById("screen\.symptomsEntered\.diagnosis");
    var scanning = document.getElementById("screen\.symptomsInput\.scanning");
    diagnosis.addEventListener("click", function () {

        diagnosis.style.display = "none";
        scanning.style.display = "block";

        var moveToTop = function () {
            if (start<780){
                scanning.style.top = start+"px";
                start += 1;
                requestAnimationFrame(moveToTop);
            }else{
                screen_symptomsInput.classList.add("fadeOut");
                screen_symptomsEntered.classList.add("fadeOut");
                setTimeout(function(){

                },1000);
            }
        };
        var start = 0;
        requestAnimationFrame(moveToTop);

    }, false);

});

/***
 * Result Page
 */
window.addEventListener('DOMContentLoaded', () => {

    // Confirm the script is running
    console.log('Window Loaded');

    // Set "Speed" text base on slider value

    function speedVal() {
        const speedCount = document.querySelector('#slider').value;
        const speedDest = document.querySelector('#speed');
        speedDest.innerHTML = speedCount;
    }
    document.addEventListener('input', speedVal);

    // Set Variables
    let score = 0;
    const pauseButton = document.querySelector("#pause");
    const gameContainer = document.querySelector(".game");

    // Function I found to randomize our dot sizings
    function random(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    // Generate our dot
    function createDot() {
        const length = random(10, document.querySelector(".game").offsetWidth - 100);
        const velocity = slider.value;
        const size = random(10, 100);
        const pxSpeed = 575 / velocity * 1000;
        const dotElement = document.createElement('div');
        dotElement.classList.add('dot', 'falling');
        dotElement.style.cssText = "width:" + size + "px; height:" + size + "px; left:" + length + "px; animation-duration:" + pxSpeed + "ms;";

        // Appending dot to game container
        document.querySelector(".game").append(dotElement);

        // Removes the dot element after keyframe animation is complete to prevent dots from building up in the dom
        var removeElement = function (event) {
            event.target.remove();
        };
        dotElement.addEventListener("webkitAnimationEnd", removeElement, false);
        dotElement.addEventListener("oAnimationEnd", removeElement, false);
        dotElement.addEventListener("msAnimationEnd", removeElement, false);
        dotElement.addEventListener("animationend", removeElement, false);


        // Once clicking on the dot element - add the score based on the values set here
        dotElement.addEventListener("click", function (e) {
            const scoreText = document.querySelector(".score");
            if (e.target.classList.contains('dot')) {
                if (e.target.offsetWidth > 10 && e.target.offsetWidth < 30) {
                    console.log("10 points!");
                    scoreText.innerHTML = score += 10;
                } else if (e.target.offsetWidth > 30 && e.target.offsetWidth < 50) {
                    console.log("7 points!");
                    scoreText.innerHTML = score += 7;
                } else if (e.target.offsetWidth > 50 && e.target.offsetWidth < 70) {
                    console.log("5 points!");
                    scoreText.innerHTML = score += 5;
                } else if (e.target.offsetWidth > 70 && e.target.offsetWidth < 100) {
                    console.log("1 point!");
                    scoreText.innerHTML = score += 1;
                }

            }

            // Add scale and fadeOut animation
            dotElement.classList.add('popped');
            dotElement.disabled = false;

            // Add a slight timeout to allow time for the fadeOut animation to take place - then remove it from the dom
            setTimeout(function () {
                dotElement.remove();
                dotElement.disabled = true;
            }, 200);
        });
    }
    var runGame;
    var i;

    // Once the Start button is clicked loop through the dots and add class falling to each dot per second
    document.querySelector("#start").addEventListener("click", function () {
        const dots = document.querySelectorAll(".dot");
        runGame = setInterval(function () {
            for (i = 0; i < 1; i++) {
                createDot();
            }
        }, 1000);

        // Remove paused styling from 
        gameContainer.classList.remove("inactive");
        
        // Add Start Button Transition Animation
        this.classList.remove("active");
        this.classList.add("transition-out");
        this.classList.remove("transition-in");
        pauseButton.classList.remove("transition-out");
        for (dot of dots) {
            dot.classList.add('falling');
        }
        setTimeout(function () {
            pauseButton.classList.add("active");
            pauseButton.classList.add("transition-in");
        }, 600);
    });

    // Pauses the game
    document.querySelector("#pause").addEventListener("click", function () {
        const dots = document.querySelectorAll(".dot");
        clearInterval(runGame);
        for (dot of dots) {
            dot.classList.remove('falling');
        }
        document.querySelector(".game").classList.add("inactive");
        this.classList.remove("active");
        this.classList.remove("transition-in");
        this.classList.add("transition-out");
        document.querySelector("#start").classList.remove("transition-out");
        setTimeout(function () {
            document.querySelector("#start").classList.add("active");
            document.querySelector("#start").classList.add("transition-in");
        }, 600);
    });

})
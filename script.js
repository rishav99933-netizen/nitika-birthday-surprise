
// ==========================================
// NITIKA BIRTHDAY SURPRISE WEBSITE
// COMPLETE & CORRECTED JAVASCRIPT
// ==========================================

(function () {
    "use strict";

    function initWebsite() {

        // ======================================
        // 1. BASIC SETTINGS
        // ======================================

        const NAME = "Nitika";
        const TOTAL_SCENES = 8;

        const $ = (id) => document.getElementById(id);

        let currentScene = 1;
        let poppedBalloons = 0;
        let toastTimer = null;
        let fireworksAnimation = null;
        let particles = [];

        const wishes = [
            "You make ordinary days feel special. ♡",
            "May every dream in your heart come true. ✨",
            "You deserve endless happiness. 🌷",
            "Keep shining, beautiful soul. 💗",
            "Here's to more beautiful memories. ❤️"
        ];

        // ======================================
        // 2. PERSONALISE NAME
        // ======================================

        ["treeName", "letterName", "finalName"].forEach((id) => {
            const element = $(id);
            if (element) element.textContent = NAME;
        });

        // ======================================
        // 3. TOAST MESSAGES
        // ======================================

        function showToast(message) {
            const toast = $("toast");
            if (!toast) return;

            toast.textContent = message;
            toast.classList.add("show");

            if (toastTimer !== null) {
                clearTimeout(toastTimer);
            }

            toastTimer = setTimeout(() => {
                toast.classList.remove("show");
                toastTimer = null;
            }, 3200);
        }

        // ======================================
        // 4. SCENE NAVIGATION
        // ======================================

        function showScene(number) {
            const target = $("scene" + number);

            if (!target || number < 1 || number > TOTAL_SCENES) {
                console.error("Scene not found:", number);
                return;
            }

            if (currentScene === 8 && number !== 8) {
                stopFireworks();
            }

            document.querySelectorAll(".scene").forEach((scene) => {
                scene.classList.remove("active");
            });

            target.classList.add("active");
            currentScene = number;

            const progressBar = $("progressBar");

            if (progressBar) {
                progressBar.style.width =
                    (number / TOTAL_SCENES * 100) + "%";
            }

            target.scrollTop = 0;
            window.scrollTo({ top: 0, behavior: "smooth" });

            if (number === 2) growTree();
            if (number === 4) createBalloons();
            if (number === 8) startFireworks();

            console.log("Now showing scene:", number);
        }

        // ======================================
        // 5. TREE FLOWERS
        // ======================================


        function growTree() {
            const tree = document.getElementById("treeBlooms");
            if (!tree) return;

            tree.innerHTML = "";

            const svgNS = "http://www.w3.org/2000/svg";

            const colors = [
                "#ff9cbe",
                "#ffd5e5",
                "#d9a7ff",
                "#fff0f5",
                "#ffb6c1",
                "#f7c96b",
                "#e8b4d8"
            ];

            // Tree canopy ke andar flower positions
            const flowers = [];

            for (let y = 85; y <= 310; y += 23) {
                for (let x = 115; x <= 485; x += 23) {
                    const dx = (x - 300) / 190;
                    const dy = (y - 195) / 125;

                    if (dx * dx + dy * dy <= 1) {
                        flowers.push({
                            x: x + (Math.random() - 0.5) * 10,
                            y: y + (Math.random() - 0.5) * 10
                        });
                    }
                }
            }

            flowers.forEach((pos, index) => {
                // Outer group sirf position control karega
                const wrapper = document.createElementNS(svgNS, "g");
                wrapper.setAttribute("transform", `translate(${pos.x}, ${pos.y})`);

                // Inner group sirf animation control karega
                const flower = document.createElementNS(svgNS, "g");
                flower.setAttribute("class", "bloom");
                flower.style.animationDelay = `${index * 0.025}s`;

                const color = colors[Math.floor(Math.random() * colors.length)];

                for (let i = 0; i < 5; i++) {
                    const angle = (i * 72 - 90) * Math.PI / 180;

                    const petal = document.createElementNS(svgNS, "circle");
                    petal.setAttribute("cx", Math.cos(angle) * 6);
                    petal.setAttribute("cy", Math.sin(angle) * 6);
                    petal.setAttribute("r", "5");
                    petal.setAttribute("fill", color);

                    flower.appendChild(petal);
                }

                const center = document.createElementNS(svgNS, "circle");
                center.setAttribute("r", "3");
                center.setAttribute("fill", "#ffe58a");

                flower.appendChild(center);
                wrapper.appendChild(flower);
                tree.appendChild(wrapper);
            });
        }


        // ======================================
        // 6. BACKGROUND STARS
        // ======================================

        function createStars() {
            const containers = document.querySelectorAll(
                ".stars, .intro-stars"
            );

            containers.forEach((container) => {
                if (container.children.length > 0) return;

                for (let i = 0; i < 55; i++) {
                    const star = document.createElement("i");
                    const size = 1 + Math.random() * 2.5;

                    star.style.position = "absolute";
                    star.style.left = (Math.random() * 100) + "%";
                    star.style.top = (Math.random() * 100) + "%";
                    star.style.width = size + "px";
                    star.style.height = size + "px";
                    star.style.background = "white";
                    star.style.borderRadius = "50%";
                    star.style.opacity = 0.3 + Math.random() * 0.7;
                    star.style.boxShadow = "0 0 8px white";
                    star.style.pointerEvents = "none";

                    star.style.animation =
                        "starTwinkle " +
                        (1.5 + Math.random() * 3) +
                        "s ease-in-out infinite alternate";

                    container.appendChild(star);
                }
            });
        }

        // ======================================
        // 7. BALLOON GAME
        // ======================================

        function createBalloons() {
            const field = $("balloonField");
            if (!field || field.children.length > 0) return;

            const colors = [
                "#ff8eae",
                "#ffc45c",
                "#71d7d1",
                "#a99aff",
                "#ff9c67"
            ];

            colors.forEach((color, index) => {
                const balloon = document.createElement("button");

                balloon.type = "button";
                balloon.className = "balloon";
                balloon.style.setProperty("--balloon", color);

                balloon.style.background =
                    "radial-gradient(circle at 30% 25%, #ffffffaa, " +
                    color + " 38%, " + color + ")";

                balloon.setAttribute(
                    "aria-label",
                    "Pop balloon " + (index + 1)
                );

                balloon.dataset.wishIndex = index;

                field.appendChild(balloon);
            });
        }

        function popBalloon(balloon) {
            if (balloon.disabled) return;

            balloon.disabled = true;
            balloon.classList.add("popped");

            const index = Number(balloon.dataset.wishIndex);
            poppedBalloons++;

            showToast(wishes[index]);

            const counter = $("popCount");

            if (counter) {
                counter.textContent =
                    poppedBalloons + " of 5 wishes discovered";
            }

            if (poppedBalloons === 5) {
                if (counter) {
                    counter.textContent =
                        "All your wishes are waiting for you ♡";
                }

                const nextButton = $("balloonNext");

                if (nextButton) {
                    nextButton.classList.remove("hidden");
                }

                showToast("You discovered all five wishes! 💗");
            }
        }

        // ======================================
        // 8. CAKE - BLOW CANDLES
        // ======================================

        function blowCandles() {
            const cakeScene = document.querySelector(".cake-scene");
            const hint = $("cakeHint");
            const button = $("blowCandles");

            if (!button || button.disabled) return;

            if (cakeScene) {
                cakeScene.classList.add("candles-out");
            }

            if (hint) {
                hint.textContent =
                    "Your wish is on its way! Make it come true. ♡";
            }

            button.textContent = "Wish made! ❤️";
            button.disabled = true;

            showToast("May all your wishes come true! 🎂");
        }

        // ======================================
        // 9. BACKGROUND MUSIC
        // ======================================

        const music = $("bgMusic");
        const musicButton = $("musicToggle");
        const musicStatus = $("musicStatus");

        function updateMusicLabel(playing) {
            if (musicStatus) {
                musicStatus.textContent = playing
                    ? "Music On ♫"
                    : "Play Music";
            }

            if (musicButton) {
                musicButton.setAttribute(
                    "aria-label",
                    playing ? "Pause music" : "Play music"
                );
            }
        }

        async function toggleMusic() {
            if (!music) {
                showToast("Music player could not be found.");
                return;
            }

            try {
                if (music.paused) {
                    await music.play();
                    updateMusicLabel(true);
                } else {
                    music.pause();
                    updateMusicLabel(false);
                }
            } catch (error) {
                console.error("Music error:", error);
                showToast("Check static/music/birthday.mp3 file.");
            }
        }

        if (music) {
            music.addEventListener("play", () => updateMusicLabel(true));
            music.addEventListener("pause", () => updateMusicLabel(false));
            music.addEventListener("ended", () => updateMusicLabel(false));
        }

        // ======================================
        // 10. FIREWORKS
        // ======================================

        function startFireworks() {
            const canvas = $("fireworksCanvas");
            if (!canvas) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            stopFireworks();

            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;

            const colors = [
                "#ff8db8",
                "#ffd166",
                "#ffffff",
                "#b8a0ff",
                "#71d7d1"
            ];

            let frame = 0;

            function createFirework() {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height * 0.65;

                const color =
                    colors[Math.floor(Math.random() * colors.length)];

                for (let i = 0; i < 45; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 4 + 1;

                    particles.push({
                        x: x,
                        y: y,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed,
                        alpha: 1,
                        color: color
                    });
                }
            }

            function animate() {
                if (currentScene !== 8) {
                    fireworksAnimation = null;
                    return;
                }

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                if (frame % 35 === 0) {
                    createFirework();
                }

                for (let i = particles.length - 1; i >= 0; i--) {
                    const particle = particles[i];

                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    particle.vy += 0.035;
                    particle.alpha -= 0.012;

                    ctx.globalAlpha = Math.max(0, particle.alpha);
                    ctx.fillStyle = particle.color;

                    ctx.beginPath();
                    ctx.arc(
                        particle.x,
                        particle.y,
                        2.5,
                        0,
                        Math.PI * 2
                    );
                    ctx.fill();

                    if (particle.alpha <= 0) {
                        particles.splice(i, 1);
                    }
                }

                ctx.globalAlpha = 1;
                frame++;

                fireworksAnimation =
                    requestAnimationFrame(animate);
            }

            animate();
        }

        function stopFireworks() {
            if (fireworksAnimation !== null) {
                cancelAnimationFrame(fireworksAnimation);
                fireworksAnimation = null;
            }

            particles = [];

            const canvas = $("fireworksCanvas");

            if (canvas) {
                const ctx = canvas.getContext("2d");

                if (ctx) {
                    ctx.clearRect(
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );
                }
            }
        }

        // ======================================
        // 11. RESET WEBSITE / REPLAY
        // ======================================

        function replayWebsite() {
            stopFireworks();

            if (music) {
                music.pause();
                music.currentTime = 0;
            }

            updateMusicLabel(false);

            poppedBalloons = 0;

            const field = $("balloonField");
            if (field) field.innerHTML = "";

            const counter = $("popCount");

            if (counter) {
                counter.textContent =
                    "Pop all 5 balloons to reveal your wishes";
            }

            const nextButton = $("balloonNext");

            if (nextButton) {
                nextButton.classList.add("hidden");
            }

            const cakeScene = document.querySelector(".cake-scene");

            if (cakeScene) {
                cakeScene.classList.remove("candles-out");
            }

            const blowButton = $("blowCandles");

            if (blowButton) {
                blowButton.disabled = false;
                blowButton.textContent = "🌬 Blow the candles";
            }

            const hint = $("cakeHint");

            if (hint) {
                hint.textContent =
                    "Take a deep breath and make a wish ✨";
            }

            if (toastTimer !== null) {
                clearTimeout(toastTimer);
                toastTimer = null;
            }

            const toast = $("toast");

            if (toast) {
                toast.classList.remove("show");
            }

            showScene(1);
        }

        // ======================================
        // 12. ALL BUTTON CLICKS
        // ======================================

        document.addEventListener("click", function (event) {
            const button = event.target.closest("button");

            if (!button) return;

            // Open first surprise
            if (button.id === "startBtn") {
                event.preventDefault();
                showScene(2);
                return;
            }

            // Next scene buttons
            if (button.hasAttribute("data-next")) {
                event.preventDefault();

                const nextScene = Number(button.dataset.next);
                showScene(nextScene);
                return;
            }

            // Final surprise
            if (button.id === "finishBtn") {
                event.preventDefault();
                showScene(8);
                return;
            }

            // Replay
            if (button.id === "replayBtn") {
                event.preventDefault();
                replayWebsite();
                return;
            }

            // Blow candles
            if (button.id === "blowCandles") {
                event.preventDefault();
                blowCandles();
                return;
            }

            // Music
            if (button.id === "musicToggle") {
                event.preventDefault();
                toggleMusic();
                return;
            }

            // Balloon pop
            if (button.classList.contains("balloon")) {
                event.preventDefault();
                popBalloon(button);
            }
        });

        // ======================================
        // 13. RESPONSIVE FIREWORKS
        // ======================================

        window.addEventListener("resize", function () {
            if (currentScene !== 8) return;

            const canvas = $("fireworksCanvas");

            if (canvas) {
                canvas.width = canvas.clientWidth;
                canvas.height = canvas.clientHeight;
            }
        });

        // ======================================
        // 14. INITIALISE WEBSITE
        // ======================================

        createStars();
        showScene(1);

        console.log("Nitika Birthday Surprise is ready! ❤️");
        console.log("Start button found:", !!$("startBtn"));
        console.log("Scene 2 found:", !!$("scene2"));
    }

    // Works whether the script loads before or after DOM is ready.
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initWebsite);
    } else {
        initWebsite();
    }

})();

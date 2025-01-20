document.addEventListener("DOMContentLoaded", () => {
    const objectsContainer = document.getElementById("objects-container");
    const categories = document.querySelectorAll(".category");
    const feedback = document.getElementById("feedback");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");
    const playAgainButton = document.getElementById("play-again");

    let score = 0;
    let timer = 60;
    let correctPlacements = 0;
    const totalShapes = 6;
    let timerInterval;

    const objects = [
        { id: 1, shape: "circle", src: "images/circle.jpeg" },
        { id: 2, shape: "square", src: "images/square.jpg" },
        { id: 3, shape: "triangle", src: "images/triangle.jpeg" },
        { id: 4, shape: "rectangle", src: "images/rectangle.jpeg" },
        { id: 5, shape: "oval", src: "images/oval.jpg" },
        { id: 6, shape: "semiCircle", src: "images/semiCircle.png" },
    ];

    const initializeGame = () => {

        score = 0;
        timer = 60;
        correctPlacements = 0;

        categories.forEach(category => {
            category.style.backgroundColor = "";
        });
        scoreDisplay.textContent = `अंक: ${score}`;
        timerDisplay.textContent = `कालः: ${timer}s`;
        feedback.textContent = "";
        playAgainButton.style.display = "none";
        objectsContainer.innerHTML = "";

        objects.forEach((object) => {
            const img = document.createElement("img");
            img.src = object.src;
            img.alt = object.shape;
            img.classList.add("draggable");
            img.draggable = true;
            img.dataset.shape = object.shape;

            img.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("shape", object.shape);
            });

            objectsContainer.appendChild(img);
        });
        categories.forEach((category) => {
            category.addEventListener("dragover", preventDefault);
            category.addEventListener("drop", handleDrop);
        });
        startTimer();
    };

    const handleDrop = (e) => {
        const shape = e.dataTransfer.getData("shape");
        const categoryShape = e.target.dataset.shape;
        const draggedImage = document.querySelector(`[data-shape="${shape}"]`);


        categories.forEach(category => {
            category.style.backgroundColor = "";
        });

        if (shape === categoryShape) {
            score += 10;
            correctPlacements++;
            scoreDisplay.textContent = `अंक: ${score}`;
            feedback.textContent = "उचितं!";
            feedback.style.color = "green";

            e.target.style.backgroundColor = "green";

            e.target.removeEventListener("dragover", preventDefault);
            e.target.removeEventListener("drop", handleDrop);

            if (correctPlacements === totalShapes) {
                feedback.textContent = "त्वं जितवान्! अन्तिम स्कोर ~ " + score;
                clearInterval(timerInterval);
                playAgainButton.style.display = "inline-block";
            }
        } else {
            feedback.textContent = "पुनः प्रयासं कुरुत";
            feedback.style.color = "red";


            e.target.style.backgroundColor = "red";
        }
    };



    const preventDefault = (e) => e.preventDefault();

    const startTimer = () => {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timer--;
            timerDisplay.textContent = `कालः: ${timer}s`;

            if (timer === 0) {
                clearInterval(timerInterval);
                feedback.textContent = "गेम ओवर! अन्तिम स्कोर ~ " + score;
                playAgainButton.style.display = "inline-block";
            }
        }, 1000);
    };
    playAgainButton.addEventListener("click", initializeGame);
    initializeGame();
});

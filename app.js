const balloons = document.querySelectorAll(".balloons img");

let clickCount = 0;

// Define a custom triangle shape for confetti
const triangle = confetti.shapeFromPath({ path: 'M0 10 L5 0 L10 10z' });

// Attach click event listeners to all balloons
balloons.forEach((balloon) => {
    balloon.addEventListener("click", () => {
        if (balloon.style.opacity === "0") return; // Prevent multiple clicks

        // Hide the balloon
        balloon.style.opacity = "0";

        // Play the pop sound first
        const popSound = new Audio("pop.mp3");
        const uniqueSound = new Audio(balloon.getAttribute("data-audio"));

        popSound.play();

        // When the pop sound finishes, play the unique sound
        popSound.addEventListener("ended", () => {
            uniqueSound.play();
        });

        // Get balloon position relative to the viewport
        const rect = balloon.getBoundingClientRect();

        // Add confetti effect
        confetti({
            particleCount: 50,
            spread: 40,
            scalar: 1.5,
            shapes: [triangle], // Use the triangle shape
            origin: {
                x: rect.left / window.innerWidth,
                y: rect.top / window.innerHeight,
            },
            colors: ["#ff073a"],
            gravity: 0.3,
        });

        clickCount++;
    });
});

// Function to reset balloons to their original state
function resetBalloons() {
    balloons.forEach((balloon) => {
        balloon.style.opacity = "1";
    });
    clickCount = 0;
}

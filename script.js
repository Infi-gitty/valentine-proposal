document.addEventListener('DOMContentLoaded', () => {
    const gameMusic = document.getElementById('background-music');
    const finalMusic = document.getElementById('final-music');
    const message = document.getElementById('message');
    const guessInput = document.getElementById('guess-input');

    // Correct word to guess
    const correctWord = "DUDU HUBBY";

    // Function to create confetti
    function createConfetti() {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 75%)`;
            document.body.appendChild(confetti);
            setTimeout(() => {
                confetti.remove();
            }, 5000); // Remove confetti after animation duration
        }
    }

    // Function to start the confetti loop
    function startConfettiLoop() {
        return setInterval(createConfetti, 1000); // Adjust the interval as needed
    }

    // Check Guess Function
    function checkGuess() {
        const userGuess = guessInput.value.trim().toUpperCase();
        if (userGuess === correctWord) {
            message.textContent = 'Congratulations! You guessed the right word!';
            startConfettiLoop();
            setTimeout(showProposalScreen, 2000);
        } else {
            message.textContent = 'Oops! Try again.';
        }
    }

    // Screen Transition Functions
    function showProposalScreen() {
        document.getElementById('game-screen').classList.remove('active');
        document.getElementById('proposal-screen').classList.add('active');
        gameMusic.pause();
        finalMusic.play();
    }

    function showEndScreen() {
        document.getElementById('proposal-screen').classList.remove('active');
        document.getElementById('end-screen').classList.add('active');
        finalMusic.pause();
        startConfettiLoop(); // Start confetti loop again for the end screen
    }

    function handleYesClick() {
        startConfettiLoop();
        showEndScreen();
    }

    // Add event listener to the submit button
    document.querySelector('button[onclick="checkGuess()"]').addEventListener('click', checkGuess);

    // Add event listeners to proposal screen buttons
    document.querySelectorAll('#proposal-screen button').forEach(button => {
        button.addEventListener('click', handleYesClick);
    });

    // Start background music
    gameMusic.play();
});
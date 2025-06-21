
class GuessTheNumberGame {
    constructor() {
        this.secretNumber = 0;
        this.attempts = 0;
        this.gameOver = false;
        this.bestScore = localStorage.getItem('bestScore') || null;

        this.initializeElements();
        this.setupEventListeners();
        this.startNewGame();
        this.updateBestScore();
    }

    initializeElements() {
        this.guessInput = document.getElementById('guessInput');
        this.submitBtn = document.getElementById('submitBtn');
        this.feedback = document.getElementById('feedback');
        this.attemptsDisplay = document.getElementById('attempts');
        this.bestScoreDisplay = document.getElementById('bestScore');
        this.restartBtn = document.getElementById('restartBtn');
    }

    setupEventListeners() {
        this.submitBtn.addEventListener('click', () => this.makeGuess());
        this.guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.makeGuess();
        });
        this.restartBtn.addEventListener('click', () => this.startNewGame());

        // Fun input validation
        this.guessInput.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            if (value < 1 || value > 100) {
                e.target.style.borderColor = '#ff6b9d';
                e.target.style.animation = 'shake 0.3s ease-in-out';
            } else {
                e.target.style.borderColor = '#ff9a9e';
                e.target.style.animation = '';
            }
        });
    }

    startNewGame() {
        this.secretNumber = Math.floor(Math.random() * 100) + 1;
        this.attempts = 0;
        this.gameOver = false;

        this.guessInput.value = '';
        this.guessInput.disabled = false;
        this.submitBtn.disabled = false;

        this.updateDisplay();
        this.showFeedback("Ready when you are! 😊🎈", "");

        console.log(`🎯 Secret number is: ${this.secretNumber}`); // For testing
    }

    makeGuess() {
        if (this.gameOver) return;

        const guess = parseInt(this.guessInput.value);

        // Input validation with cute messages
        if (isNaN(guess) || guess < 1 || guess > 100) {
            this.showFeedback("Oopsy! Pick a number between 1 and 100! 😅🎈", "");
            this.guessInput.focus();
            return;
        }

        this.attempts++;
        this.updateDisplay();

        if (guess === this.secretNumber) {
            this.handleWin();
        } else if (guess < this.secretNumber) {
            this.showFeedback(`Too low! 📈 Try higher! 🚀`, "too-low");
        } else {
            this.showFeedback(`Too high! 📉 Try lower! 🎯`, "too-high");
        }

        this.guessInput.value = '';
        this.guessInput.focus();
    }

    handleWin() {
        this.gameOver = true;
        this.guessInput.disabled = true;
        this.submitBtn.disabled = true;

        const messages = [
            `🎉 You nailed it! The number was ${this.secretNumber}! 🎊`,
            `🌟 Fantastic! You got it in ${this.attempts} tries! ✨`,
            `🎈 Woohoo! You're a number-guessing superstar! 🏆`,
            `🎯 Bulls-eye! Perfect guess! 🎪`
        ];

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        this.showFeedback(randomMessage, "winner");

        // Update best score
        if (!this.bestScore || this.attempts < this.bestScore) {
            this.bestScore = this.attempts;
            localStorage.setItem('bestScore', this.bestScore);
            this.updateBestScore();

            setTimeout(() => {
                this.showFeedback(`🏆 NEW RECORD! ${this.attempts} attempts! You're amazing! 🌟`, "winner");
            }, 2000);
        }
    }

    showFeedback(message, className) {
        this.feedback.textContent = message;
        this.feedback.className = `feedback ${className}`;
    }

    updateDisplay() {
        this.attemptsDisplay.textContent = this.attempts;
    }

    updateBestScore() {
        this.bestScoreDisplay.textContent = this.bestScore || '-';
    }
}

// Start the game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new GuessTheNumberGame();
});

// Add some fun console messages
console.log('🎯 Welcome to Guess the Number! 🎈');
console.log('💡 Tip: Check the console to see the secret number while testing!');
console.log('🎨 Made with love by Dipti! 🧡');

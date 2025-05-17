class QuizGame {
    constructor() {
        this.currentLevel = 1;
        this.questions = [
            {
                image: '../assets/img/pict26.png',
                correctAnswer: 'tidur',
                options: ['bernyanyi', 'menari', 'tidur',]
            },
            {
                image: '../assets/img/pict27.png',
                correctAnswer: 'menonton tv',
                options: ['menonton tv', 'memasak', 'mandi']
            }
        ];
        this.correctAnswers = 0;
        this.init();
    }

    init() {
        this.feedbackOverlay = document.getElementById('feedbackOverlay');
        this.feedbackImage = document.getElementById('feedbackImage');
        this.scoreOverlay = document.getElementById('scoreOverlay');
        this.star1 = document.getElementById('star1');
        this.star2 = document.getElementById('star2');
        this.questionImage = document.getElementById('questionImage');
        this.setupLevel();
        this.setupEventListeners();
    }

    setupLevel() {
        const question = this.questions[this.currentLevel - 1];
        this.questionImage.src = question.image;
        
        const optionsContainer = document.querySelector('.options-container');
        optionsContainer.innerHTML = '';
        
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.classList.add('option-btn');
            button.textContent = option;
            button.addEventListener('click', () => this.checkAnswer(option));
            optionsContainer.appendChild(button);
        });
    }

    checkAnswer(answer) {
        const correct = answer === this.questions[this.currentLevel - 1].correctAnswer;
        
        if (correct) {
            this.correctAnswers++;
        }

        this.showFeedback(correct);
    }

    showFeedback(isCorrect) {
        this.feedbackImage.src = isCorrect ? '../assets/img/benar.png' : '../assets/img/salah.png';
        this.feedbackOverlay.style.display = 'flex';
        
        setTimeout(() => {
            this.feedbackOverlay.style.display = 'none';
            if (this.currentLevel === 1) {
                this.currentLevel++;
                this.setupLevel();
            } else {
                this.showScore();
            }
        }, 2000);
    }

    showScore() {
        this.scoreOverlay.style.display = 'flex';
        
        // Hide promote button
        const promoteBtn = document.getElementById('promoteBtn');
        if (promoteBtn) {
            promoteBtn.style.display = 'none';
        }

        // Add congratulations message
        const congratsMsg = document.createElement('div');
        congratsMsg.className = 'congrats-message';
        congratsMsg.innerHTML = '✨ Hebat kamu telah menyelesaikannya! ✨';
        
        // Insert at the beginning of score popup
        const scorePopup = document.querySelector('.score-popup');
        if (scorePopup) {
            scorePopup.insertBefore(congratsMsg, scorePopup.firstChild);
        }

        // Animate stars appearing
        setTimeout(() => {
            if (this.correctAnswers >= 1) {
                this.star1.style.opacity = '1';
            }
            if (this.correctAnswers === 2) {
                setTimeout(() => {
                    this.star2.style.opacity = '1';
                }, 300);
            }
        }, 500);

        // Keep only the back button functionality
        const scoreBackBtn = document.getElementById('scoreBackBtn');
        if (scoreBackBtn) {
            scoreBackBtn.onclick = () => {
                window.location.href = '../tampilankelas/kelas.html';
            };
        }
    }

    setupEventListeners() {
        const backBtn = document.getElementById('backBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                window.location.href = '../tampilankelas/kelas.html';
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new QuizGame();
});

function onGameComplete(score, currentLevel) {
    LevelSystem.completeLevel(currentLevel, score);
    // Redirect back to level selection after delay
    setTimeout(() => {
        window.location.href = '../tampilankelas/kelas.html';
    }, 2000);
}
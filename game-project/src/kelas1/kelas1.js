class QuizGame {
    constructor() {
        this.currentLevel = 1;
        this.questions = [
            {
                image: '../assets/img/pict17.png',
                correctAnswer: 'bermain bola',
                options: ['bermain bola', 'berenang',]
            },
            {
                image: '../assets/img/pict18.png',
                correctAnswer: 'membaca',
                options: ['berenang', 'membaca']
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

        const promoteBtn = document.getElementById('promoteBtn');
        const scoreBackBtn = document.getElementById('scoreBackBtn');

        if (promoteBtn) {
            promoteBtn.onclick = () => {
                if (this.correctAnswers > 0) {
                    localStorage.setItem('kelas2Unlocked', 'true');
                    window.location.href = '../kelas2/kelas2.html';
                } else {
                    this.scoreOverlay.style.display = 'none';
                    this.currentLevel = 1;
                    this.correctAnswers = 0;
                    this.setupLevel();
                }
            };
        }

        if (scoreBackBtn) {
            scoreBackBtn.onclick = () => {
                window.location.href = '../tampilanMenu/tampilanMenu.html';
            };
        }
    }

    setupEventListeners() {
        const backBtn = document.getElementById('backBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                window.location.href = '../tampilanMenu/tampilanMenu.html';
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new QuizGame();
});
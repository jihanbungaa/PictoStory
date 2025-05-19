class QuizGame {
    constructor() {
        this.currentLevel = 1;
        this.questions = [
            {
                image: '../assets/img/pict19.png',
                correctAnswer: 'lompat tali',
                options: ['lompat tali', 'berlari',]
            },
            {
                image: '../assets/img/pict20.png',
                correctAnswer: 'makan',
                options: ['tidur', 'makan', 'mandi']
            },
            {
                image: '../assets/img/sepeda.png',
                correctAnswer: 'bermain sepeda',
                options: ['makan', 'mencuci', 'bermain sepeda']
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
        this.star3 = document.getElementById('star3');
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
            this.currentLevel++;
            if (this.currentLevel <= this.questions.length) {
                this.setupLevel();
            } else {
                this.showScore();
            }

        }, 2000);
    }

    showScore() {
        this.scoreOverlay.style.display = 'flex';
        
        setTimeout(() => {
            if (this.correctAnswers >= 1) {
                this.star1.style.opacity = '1';
            }
            if (this.correctAnswers >= 2) {
                setTimeout(() => {
                    this.star2.style.opacity = '1';
                    // Simpan progress ke localStorage
                    localStorage.setItem('currentLevel', '3');
                    localStorage.setItem('highestLevel', Math.max(3, parseInt(localStorage.getItem('highestLevel') || 1)));
                }, 300);
            }
            if (this.correctAnswers >= 3) {
                setTimeout(() => {
                    this.star3.style.opacity = '1';
                }, 600);
            }
        }, 500);

        // Update tombol promote
        const promoteBtn = document.getElementById('promoteBtn');
        if (promoteBtn) {
            promoteBtn.onclick = () => {
                if (this.correctAnswers >= 2) {
                    localStorage.setItem('currentLevel', '3');
                    window.location.href = '../kelas3/kelas3.html';
                } else {
                    alert('Jawaban benar kamu belum cukup untuk lanjut ke kelas 3.\nKamu butuh minimal 2 jawaban benar!');
                }
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
        document.querySelector('.back-button').addEventListener('click', function() {
    // Pastikan progress tersimpan sebelum kembali
    const progress = JSON.parse(localStorage.getItem('pictostoryProgress')) || {};
    if (progress['level1'] > 0) {
        LevelSystem.completeLevel(1, progress['level1']);
    }
    window.location.href = '../tampilankelas/kelas.html';
});
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new QuizGame();
});


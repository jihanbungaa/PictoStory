class PuzzleGame {
    constructor() {
        this.currentLevel = 1;
        this.stories = [
             "Rio sedang marah🤯\n\nSusun puzzle dengan potongan yang benar untuk melengkapi gambar!",
             "Rico dengan kucing dan bola benang  \n\nSusun puzzle dengan potongan yang benar untuk melengkapi gambar",     
        ];
        this.feedbackOverlay = document.getElementById('feedbackOverlay');
        this.feedbackImage = document.getElementById('feedbackImage');
        this.scoreOverlay = document.getElementById('scoreOverlay');
        this.star1 = document.getElementById('star1');
        this.star2 = document.getElementById('star2');
        this.correctAnswers = 0;
        
        this.init();
    }

    init() {
        this.storyBoard = document.getElementById('storyBoard');
        this.sourcePieces = document.getElementById('sourcePieces');
        this.targetBoard = document.getElementById('targetBoard');
        this.checkBtn = document.getElementById('checkBtn');     
        this.backBtn = document.getElementById('backBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.setupLevel();
        this.setupEventListeners();
    }

     setupLevel() {
        const storyText = this.storyBoard.querySelector('.story-text');
        storyText.textContent = this.stories[this.currentLevel - 1];

        this.sourcePieces.innerHTML = '';
        this.targetBoard.innerHTML = '';

        // Update example image
        const exampleImage = document.querySelector('.question-images img:nth-child(' + this.currentLevel + ')');
        if (exampleImage) {
            exampleImage.style.display = 'block';
        }
        const otherImage = document.querySelector('.question-images img:nth-child(' + (this.currentLevel === 1 ? 2 : 1) + ')');
        if (otherImage) {
            otherImage.style.display = 'none';
        }

        // Create puzzle pieces array with both correct and incorrect pieces
        const correctPieces = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const incorrectPieces = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        
        // Combine correct and incorrect pieces
        let allPieces = [];
        correctPieces.forEach(num => {
            allPieces.push({
                number: num,
                isCorrect: true
            });
        });
        incorrectPieces.forEach(num => {
            allPieces.push({
                number: num,
                isCorrect: false
            });
        });

        // Shuffle all pieces
        this.shuffleArray(allPieces);

        // Create and add pieces to source area
        allPieces.forEach(piece => {
            const pieceElement = document.createElement('img');
            if (this.currentLevel === 1) {
                pieceElement.src = piece.isCorrect ? 
                    `../assets/img/pict24_${piece.number}.png` : 
                    `../assets/img/pict8_${piece.number}.png`;
            } else {
                pieceElement.src = piece.isCorrect ? 
                    `../assets/img/pict25_${piece.number}.png` : 
                    `../assets/img/pict7_${piece.number}.png`;
            }
            pieceElement.classList.add('puzzle-piece');
            pieceElement.setAttribute('data-piece', piece.number);
            pieceElement.setAttribute('data-correct', piece.isCorrect);
            pieceElement.draggable = true;
            this.sourcePieces.appendChild(pieceElement);
        });

        // Create drop zones
        for (let i = 1; i <= 9; i++) {
            const dropZone = document.createElement('div');
            dropZone.classList.add('drop-zone');
            dropZone.setAttribute('data-position', i);
            this.targetBoard.appendChild(dropZone);
        }
    }

    setupEventListeners() {
        let draggedPiece = null; // Track the dragged piece

        this.sourcePieces.addEventListener('dragstart', (e) => {
            draggedPiece = e.target; // Store the actual piece element
            e.dataTransfer.setData('text/plain', e.target.getAttribute('data-piece'));
            // Add visual feedback
            e.target.style.opacity = '0.6';
        });

        this.sourcePieces.addEventListener('dragend', (e) => {
            // Reset opacity
            if (draggedPiece) {
                draggedPiece.style.opacity = '1';
            }
        });

        this.targetBoard.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        this.targetBoard.addEventListener('drop', (e) => {
            e.preventDefault();
            const dropZone = e.target.closest('.drop-zone');
            if (!dropZone || !draggedPiece) return;

            // If there's already a piece in the drop zone, swap it back to source
            if (dropZone.children.length > 0) {
                const existingPiece = dropZone.children[0];
                this.sourcePieces.appendChild(existingPiece);
            }

            // Move the original dragged piece
            dropZone.appendChild(draggedPiece);
            draggedPiece.style.opacity = '1';
            draggedPiece = null; // Reset reference
        });

        this.checkBtn.addEventListener('click', () => this.checkSolution());
        this.nextBtn.addEventListener('click', () => this.nextLevel());
        this.backBtn.addEventListener('click', () => {
            window.location.href = '../tampilanMenu/tampilanMenu.html';
        });

        this.promoteBtn.addEventListener('click', () => {
            alert('🎉 SELAMAT! Kamu telah menyelesaikan semua level! 🌟');
            window.location.href = '../tampilanMenu/tampilanMenu.html';
        });
    }

    showFeedback(isCorrect) {
        this.feedbackImage.src = isCorrect ? '../assets/img/benar.png' : '../assets/img/salah.png';
        this.feedbackOverlay.style.display = 'flex';
        
        if (isCorrect) {
            this.correctAnswers++;
        }
        
        setTimeout(() => {
            this.feedbackOverlay.style.display = 'none';
            if (this.currentLevel === 1) {
                this.nextLevel();
            } else if (this.currentLevel === 2) {
                if (isCorrect) {
                    localStorage.setItem('kelas5Unlocked', 'true');
                    this.showScore();
                } else {
                    this.setupLevel();
                }
            }
        }, 2000);
    }

    showScore() {
        this.scoreOverlay.style.display = 'flex';
        
        // Create score table container
        const scoreTable = document.createElement('div');
        scoreTable.style.cssText = `
            background: #fde6b9;
            border: 4px solid #ff9a3c;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 0 20px rgba(0,0,0,0.2);
            text-align: center;
            max-width: 500px;
            width: 90%;
        `;
        
        // Add congratulatory message inside the table
        const congratsMsg = document.createElement('div');
        congratsMsg.style.cssText = `
            color: #ff6b6b;
            font-size: 1.8em;
            font-family: 'Comic Sans MS', cursive, sans-serif;
            text-align: center;
            margin: 20px 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
            background: linear-gradient(45deg, #FFD700, #FFA500);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            padding: 10px;
        `;
        congratsMsg.textContent = '🌟 Selamat! Kamu telah menyelesaikan semua kelas! 🌟';
        
        // Add elements to score table
        scoreTable.appendChild(congratsMsg);
        
        // Add stars container
        const starsContainer = document.createElement('div');
        starsContainer.style.margin = '20px 0';
        starsContainer.appendChild(this.star1);
        starsContainer.appendChild(this.star2);
        scoreTable.appendChild(starsContainer);
        
        // Clear existing content and add new score table
        this.scoreOverlay.innerHTML = '';
        this.scoreOverlay.appendChild(scoreTable);
        
        // Animation for stars
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

        // Add back button
        const backBtn = document.createElement('button');
        backBtn.textContent = 'Kembali ke Menu';
        backBtn.style.cssText = `
            margin-top: 20px;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background: #4CAF50;
            color: white;
            cursor: pointer;
            font-family: 'Comic Sans MS', cursive, sans-serif;
        `;
        backBtn.onclick = () => {
            document.location.href = '../tampilanMenu/tampilanMenu.html';
        };
        scoreTable.appendChild(backBtn);
    }

    checkSolution() {
        const dropZones = this.targetBoard.querySelectorAll('.drop-zone');
        let correct = true;

        dropZones.forEach((zone, index) => {
            if (!zone.children[0] || 
                parseInt(zone.children[0].getAttribute('data-piece')) !== index + 1 ||
                zone.children[0].getAttribute('data-correct') !== 'true') {
                correct = false;
            }
        });

        this.showFeedback(correct);
    }

    nextLevel() {
        // Always proceed to next level when LANJUT is clicked
        if (this.currentLevel < 2) {
            this.currentLevel++;
            this.nextBtn.style.display = 'none';
            this.setupLevel();
        }
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

// Start the game
document.addEventListener('DOMContentLoaded', () => {
    new PuzzleGame();
});

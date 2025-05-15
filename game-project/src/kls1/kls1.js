class PuzzleGame {
    constructor() {
        this.currentLevel = 1;
        this.stories = [
            "🌳Anak Laki-laki yang sedang memegang piala🎈",
            
            "🐱 Lina yang sedang marah✨",
        ];
        this.completedPuzzles = 0;
        
        this.promoteBtn = document.getElementById('promoteBtn');
        
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
        // Update story text
        const storyText = this.storyBoard.querySelector('.story-text');
        storyText.textContent = this.stories[this.currentLevel - 1];

        // Clear previous example image if exists
        const oldExample = this.storyBoard.querySelector('.example-container');
        if (oldExample) oldExample.remove();

        // Create example image container
        const exampleContainer = document.createElement('div');
        exampleContainer.classList.add('example-container');

        // Create balloons
        const balloon1 = document.createElement('img');
        balloon1.src = '../assets/img/balon.png';
        balloon1.classList.add('floating-balloon', 'balloon-left');

        const balloon2 = document.createElement('img');
        balloon2.src = '../assets/img/balon.png';
        balloon2.classList.add('floating-balloon', 'balloon-right');

        // Create example image based on current level
        const exampleImage = document.createElement('img');
        exampleImage.src = this.currentLevel === 1 
            ? '../assets/img/gambar8.png'  // First puzzle example
            : '../assets/img/gambar9.png';  // Second puzzle example
        exampleImage.classList.add('example-image');
        exampleImage.alt = this.currentLevel === 1 
            ? 'Anak Laki-laki memegang piala'
            : 'Lina yang sedang marah';

        // Assemble the container
        exampleContainer.appendChild(balloon1);
        exampleContainer.appendChild(exampleImage);
        exampleContainer.appendChild(balloon2);
        this.storyBoard.appendChild(exampleContainer);

        // Clear puzzle areas
        this.sourcePieces.innerHTML = '';
        this.targetBoard.innerHTML = '';

        // Create puzzle pieces
        const pieces = [1, 2, 3, 4];
        this.shuffleArray(pieces);

        pieces.forEach(num => {
            const piece = document.createElement('img');
            // Update image path to match the exact filenames
            if (this.currentLevel === 1) {
                piece.src = `../assets/img/gambar(8)${num}.png`; // Level 1 assets
            } else {
                piece.src = `../assets/img/gambar(9)${num}.png`; // Level 2 assets
            }
            piece.classList.add('puzzle-piece');
            piece.setAttribute('data-piece', num);
            piece.draggable = true;
            this.sourcePieces.appendChild(piece);
        });

        // Create drop zones
        for (let i = 1; i <= 4; i++) {
            const dropZone = document.createElement('div');
            dropZone.classList.add('drop-zone');
            dropZone.setAttribute('data-position', i);
            this.targetBoard.appendChild(dropZone);
        }
    }

    setupEventListeners() {
        this.sourcePieces.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.getAttribute('data-piece'));
        });

        this.targetBoard.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        this.targetBoard.addEventListener('drop', (e) => {
            e.preventDefault();
            const dropZone = e.target.closest('.drop-zone');
            if (!dropZone) return;

            const pieceNum = e.dataTransfer.getData('text/plain');
            const piece = document.querySelector(`[data-piece="${pieceNum}"]`);
            
            if (dropZone.children.length === 0) {
                dropZone.appendChild(piece);
            }
        });

        this.checkBtn.addEventListener('click', () => this.checkSolution());
        this.nextBtn.addEventListener('click', () => this.nextLevel());
        this.backBtn.addEventListener('click', () => {
            window.location.href = '../tampilanMenu/tampilanMenu.html';
        });
        this.promoteBtn.addEventListener('click', () => {
            window.location.href = '../kls2/kls2.html';
        });
    }

    checkSolution() {
        const dropZones = this.targetBoard.querySelectorAll('.drop-zone');
        let correct = true;

        dropZones.forEach((zone, index) => {
            if (!zone.children[0] || zone.children[0].getAttribute('data-piece') !== (index + 1).toString()) {
                correct = false;
            }
        });

        if (correct) {
            this.completedPuzzles++;
            alert('🎉 HOREE! KAMU BERHASIL! 🎉\n\nWah, kamu hebat sekali! Puzzle-nya sudah tersusun dengan sempurna!\n\n✨ SELAMAT YA! ✨');
            
            if (this.completedPuzzles === 2) {
                // Show NAIK KELAS button when both puzzles completed
                this.nextBtn.style.display = 'inline-block';
                this.nextBtn.textContent = 'NAIK KELAS';
                localStorage.setItem('kelas2Unlocked', 'true');
                this.nextBtn.addEventListener('click', () => {
                    window.location.href = '../kls2/kls2.html';
                });
            } else if (this.currentLevel === 1) {
                this.nextBtn.style.display = 'inline-block';
                this.nextBtn.textContent = 'LANJUT';
            }
        } else {
            if (this.currentLevel === 2) {
                // For last puzzle, give option to retry
                alert('🤔 Ups! Puzzle-nya masih belum pas nih...\nAyo coba lagi! 💪');
                this.setupLevel(); // Reset puzzle pieces
            } else {
                alert('🤔 Ups! Puzzle-nya masih belum pas nih...\nAyo coba lagi! 💪');
                this.nextBtn.style.display = 'inline-block';
                this.nextBtn.textContent = 'LANJUT';
            }
        }
    }

    nextLevel() {
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

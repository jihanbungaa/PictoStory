class PuzzleGame {
    constructor() {
        this.currentLevel = 1;
        this.stories = [
            "Rio yang sedang sedih \n\nSusun puzzle dengan potongan yang benar untuk melengkapi gambar",
            "4 anak perempuan sedang belajar bersama. \n\nSusun puzzle dengan potongan yang benar untuk melengkapi gambar!"
        ];
        this.promoteBtn = document.getElementById('promoteBtn');
        this.completedPuzzles = 0;
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

        // Clear previous example image
        const oldExample = this.storyBoard.querySelector('.example-container');
        if (oldExample) oldExample.remove();

        // Create example container
        const exampleContainer = document.createElement('div');
        exampleContainer.classList.add('example-container');

        // Add floating balloons
        const balloon1 = document.createElement('img');
        balloon1.src = '../assets/img/balon.png';
        balloon1.classList.add('floating-balloon', 'balloon-left');

        const balloon2 = document.createElement('img');
        balloon2.src = '../assets/img/balon.png';
        balloon2.classList.add('floating-balloon', 'balloon-right');

        // Add example image based on level
        const exampleImage = document.createElement('img');
        exampleImage.src = this.currentLevel === 1 
            ? '../assets/img/pict8.png'
            : '../assets/img/pict7.png';
        exampleImage.classList.add('example-image');

        // Assemble container
        exampleContainer.appendChild(balloon1);
        exampleContainer.appendChild(exampleImage);
        exampleContainer.appendChild(balloon2);
        this.storyBoard.appendChild(exampleContainer);

        this.sourcePieces.innerHTML = '';
        this.targetBoard.innerHTML = '';

        if (this.currentLevel === 1) {
            // First puzzle - 3x3 using pict8_ assets
            const pieces = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            this.shuffleArray(pieces);
            
            pieces.forEach(num => {
                const piece = document.createElement('img');
                piece.src = `../assets/img/pict8_${num}.png`;  // Using pict8_ for first puzzle
                piece.classList.add('puzzle-piece');
                piece.setAttribute('data-piece', num);
                piece.draggable = true;
                this.sourcePieces.appendChild(piece);
            });
        } else {
            // Second puzzle - 3x3 with correct (pict7_) and incorrect (pict13_) pieces
            const correctPieces = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            const wrongPieces = [1, 3, 5].map(num => `wrong_${num}`); // Using some numbers for pict13_
            const allPieces = [...correctPieces, ...wrongPieces];
            this.shuffleArray(allPieces);
            
            allPieces.forEach(piece => {
                const pieceElement = document.createElement('img');
                if (typeof piece === 'number') {
                    pieceElement.src = `../assets/img/pict7_${piece}.png`;  // Correct pieces using pict7_
                } else {
                    const wrongNum = piece.split('_')[1];
                    pieceElement.src = `../assets/img/pict13_${wrongNum}.png`;  // Wrong pieces using pict13_
                }
                pieceElement.classList.add('puzzle-piece');
                pieceElement.setAttribute('data-piece', piece);
                pieceElement.draggable = true;
                this.sourcePieces.appendChild(pieceElement);
            });
        }

        // Create 3x3 grid of drop zones
        for (let i = 1; i <= 9; i++) {
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
            alert('🎉 SELAMAT! Kamu telah menyelesaikan semua level! 🌟');
            window.location.href = '../tampilanMenu/tampilanMenu.html';
        });
    }

    checkSolution() {
        const dropZones = this.targetBoard.querySelectorAll('.drop-zone');
        let correct = true;

        dropZones.forEach((zone, index) => {
            if (!zone.children[0] || 
                parseInt(zone.children[0].getAttribute('data-piece')) !== index + 1) {
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

class PuzzleGame {
    constructor() {
        this.stars = 3;
        this.correctPlacements = 0;
        this.initGame();
        this.initButtons(); // Add button initialization
    }

    initGame() {
        this.setupDragAndDrop();
    }
  
    setupDragAndDrop() {
        const dragItems = document.querySelectorAll('.drag-item');
        const dropZones = document.querySelectorAll('.drop-zone');

        dragItems.forEach(item => {
            item.addEventListener('dragstart', (e) => this.handleDragStart(e));
            item.addEventListener('dragend', (e) => this.handleDragEnd(e));
        });

        dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => this.handleDragOver(e));
            zone.addEventListener('drop', (e) => this.handleDrop(e));
        });
    }

    handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.item);
        e.dataTransfer.setData('imageSource', e.target.querySelector('img').src);
    }

    handleDragEnd(e) {
        // Handle drag end if needed
    }

    handleDragOver(e) {
        e.preventDefault();
    }

    handleDrop(e) {
        e.preventDefault();
        const itemType = e.dataTransfer.getData('text/plain');
        const imageSource = e.dataTransfer.getData('imageSource');
        
        if (e.target.dataset.item === itemType) {
            const droppedImage = e.target.querySelector('.dropped-image');
            droppedImage.innerHTML = `<img src="${imageSource}" alt="${itemType}">`;
            e.target.classList.add('filled');
            
            // Hide the original drag item
            const originalItem = document.querySelector(`.drag-item[data-item="${itemType}"]`);
            originalItem.style.visibility = 'hidden';
            
            this.correctPlacements++;
            e.target.classList.add('correct');
            
            if (this.correctPlacements === 6) { // Make sure this number matches your total puzzle pieces
                this.showScore();
            }
        } else {
            this.removeStar();
            e.target.classList.add('incorrect');
            
            setTimeout(() => {
                e.target.querySelector('.dropped-image').innerHTML = '';
                e.target.classList.remove('incorrect');
            }, 1000);
        }
    }

    initButtons() {
        const backBtn = document.getElementById('backBtn');
        const checkBtn = document.getElementById('checkBtn');

        backBtn.addEventListener('click', () => {
            window.location.href = '../tampilanMenu/tampilanMenu.html';
        });

        checkBtn.addEventListener('click', () => {
            this.showScore();
        });
    }

    showScore() {
        const overlay = document.querySelector('.score-overlay');
        const contentContainer = document.createElement('div');
        
        contentContainer.style.cssText = `
            background-color: #fff9e6;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            min-width: 300px;
        `;

        const message = document.createElement('h2');
        message.textContent = '✨ Hebat kamu telah menyelesaikannya! ✨';
        message.style.cssText = `
            color: #333;
            font-size: 20px;
            margin-bottom: 20px;
        `;
        
        const starsContainer = document.createElement('div');
        starsContainer.style.cssText = 'display: flex; justify-content: center; gap: 20px; margin: 20px 0;';
        
        // Add stars based on remaining stars
        for (let i = 0; i < this.stars; i++) {
            const star = document.createElement('div');
            star.innerHTML = '⭐';
            star.style.fontSize = '40px';
            starsContainer.appendChild(star);
        }
        
        const kembaliButton = document.createElement('button');
        kembaliButton.textContent = 'KEMBALI';
        kembaliButton.style.cssText = `
            padding: 10px 30px;
            background-color: #ff6b6b;
            color: white;
            border: none;
            border-radius: 25px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 20px;
        `;
        
        kembaliButton.addEventListener('click', () => {
            window.location.href = '../tampilanMenu/tampilanMenu.html';
        });

        // Clear and show overlay
        overlay.innerHTML = '';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        
        // Assemble the popup
        contentContainer.appendChild(message);
        contentContainer.appendChild(starsContainer);
        contentContainer.appendChild(kembaliButton);
        overlay.appendChild(contentContainer);
    }

    removeStar() {
        if (this.stars > 0) {
            this.stars--;
        }
    }
}

// Initialize the game when the document loads
document.addEventListener('DOMContentLoaded', () => {
    new PuzzleGame();
});
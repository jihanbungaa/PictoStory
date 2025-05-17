// script.js
const draggables = document.querySelectorAll('.draggable');
const dropzones = document.querySelectorAll('.dropzone');
const stars = [
  document.getElementById('star1'),
  document.getElementById('star2'),
  document.getElementById('star3')
];
let starIndex = 0;
let correctCount = 0;

draggables.forEach(drag => {
  drag.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text', drag.id);
  });
});

dropzones.forEach(zone => {
  zone.addEventListener('dragover', (e) => e.preventDefault());

  zone.addEventListener('drop', (e) => {
    const draggedId = e.dataTransfer.getData('text');
    const dragged = document.getElementById(draggedId);
    const correct = dragged.dataset.match === zone.dataset.answer;

    if (correct) {
      zone.innerHTML = '';
      zone.appendChild(dragged);
      correctCount++;
    } else {
      if (starIndex < stars.length) {
        stars[starIndex].style.visibility = 'hidden';
        starIndex++;
      }
    }

    if (correctCount === 6 || starIndex === 3) {
      document.getElementById('popup').style.display = 'block';
    }
  });
});

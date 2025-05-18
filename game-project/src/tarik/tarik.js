let stars = 3;

document.querySelectorAll('.draggable').forEach(img => {
  img.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
  });
});

document.querySelectorAll('.drop-zone').forEach(zone => {
  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    const correctId = zone.dataset.correct;

    if (draggedId === correctId) {
      zone.innerHTML = '';
      zone.appendChild(document.getElementById(draggedId));
      zone.style.background = '#d4f9d4';
      document.getElementById(draggedId).draggable = false;
    } else {
      stars--;
      updateStars();
      alert('Salah, coba lagi!');
    }

    if (checkComplete()) {
      document.getElementById('result').textContent = `🎉 Selesai! Bintangmu: ${stars}`;
    }
  });
});

function updateStars() {
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`star${i}`).style.opacity = i <= stars ? '1' : '0.2';
  }
}

function checkComplete() {
  const complete = [...document.querySelectorAll('.drop-zone')].every(zone =>
    zone.querySelector('img')
  );
  
  if (complete) {
    setTimeout(() => showPopup(), 500);
  }

  return complete;
}
function showPopup() {
  for (let i = 1; i <= 3; i++) {
    const star = document.getElementById(`popup-star${i}`);
    star.style.opacity = i <= stars ? '1' : '0.2';
  }

  document.getElementById('popup').style.display = 'block';
}


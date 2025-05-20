document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-btn');
  const htpButton = document.getElementById('htp-btn');
  const rstButton = document.getElementById('rst-btn');

  startButton.addEventListener('click', () => {
    window.location.href = '../pilihan/pilihan.html';
  });

  htpButton.addEventListener('click', () => {
    window.location.href = '../penjelasan/penjelasan.html';
  });

  rstButton.addEventListener('click', () => {
    localStorage.clear(); // or any reset logic
    alert("Progress berhasil direset!");
  });

  // Optional: Tambahkan efek suara jika diinginkan
  const buttons = document.querySelectorAll('.menu-button');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      // const hoverSound = new Audio('../assets/sound/hover.mp3');
      // hoverSound.play();
    });

    button.addEventListener('click', () => {
      // const clickSound = new Audio('../assets/sound/click.mp3');
      // clickSound.play();
    });
  });

  // (Jika diperlukan) Cek unlock untuk kelas 2
  const kelas2Button = document.querySelector('[data-kelas="2"]');
  if (kelas2Button) {
    const isKelas2Unlocked = localStorage.getItem('kelas2Unlocked') === 'true';
    const lockIcon = kelas2Button.querySelector('.lock-icon');

    if (isKelas2Unlocked) {
      if (lockIcon) lockIcon.style.display = 'none';
      kelas2Button.classList.add('unlocked');
      kelas2Button.disabled = false;
    } else {
      if (lockIcon) lockIcon.style.display = 'block';
      kelas2Button.classList.add('locked');
      kelas2Button.disabled = true;
    }
  }
});

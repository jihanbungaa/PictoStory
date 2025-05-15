document.addEventListener('DOMContentLoaded', function() {
    const mainText = document.createElement('div');
    mainText.className = 'instruction-text';
    mainText.innerHTML = `
        <h1>👋 Hai Teman-teman!</h1>
        <p class="message">
            🎯 Mari bermain puzzle! 
            <br><br>
            👆 Ambil gambar dari sebelah kiri
            <br>
            ➡️ Taruh gambar ke kotak putih di sebelah kanan
            <br>
            ✨ Susun gambar dengan benar ya!
        </p>
    `;

    const nextButton = document.createElement('button');
    nextButton.className = 'next-button';
    nextButton.innerHTML = '🎮 Ayo Mulai Bermain!';
    nextButton.onclick = function() {
        // Animasi sebelum pindah halaman
        mainText.style.animation = 'fadeOut 0.5s ease';
        nextButton.style.animation = 'fadeOut 0.5s ease';
        
        setTimeout(() => {
            window.location.href = '../tampilankls/kls.html';
        }, 500);
    };

    // Tambahkan elemen ke halaman
    document.body.appendChild(mainText);
    document.body.appendChild(nextButton);
});
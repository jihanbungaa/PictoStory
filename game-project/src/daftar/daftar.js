document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (username.length < 3) {
        alert('Nama pengguna harus minimal 3 huruf ya! 😊');
        return;
    }
    
    if (password.length < 4) {
        alert('Kata sandi harus minimal 4 karakter ya! 🔐');
        return;
    }
    
    // Store user data in localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    
    // Show success message with animation
    const formBox = document.querySelector('.form-box');
    formBox.style.animation = 'success 0.5s ease';
    
    setTimeout(() => {
        // Redirect to next page
        window.location.href = '../tampilankls/kls.html';
    }, 500);
});

// Add some fun interactions
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
    });
});
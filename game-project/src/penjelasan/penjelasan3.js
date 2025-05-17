document.addEventListener('DOMContentLoaded', function() {
    // Get all elements that need animation
    const title = document.querySelector('.rainbow-text');
    const greeting = document.querySelector('.greeting');
    const mainText = document.querySelector('.main-text');
    const steps = document.querySelectorAll('.step');
    const buttons = document.querySelectorAll('.btn');

    // Initially hide all elements
    [title, greeting, mainText, ...steps, ...buttons].forEach(el => {
        el.style.opacity = '0';
    });

    // Animate title first
    setTimeout(() => {
        title.style.animation = 'fadeIn 1s forwards';
    }, 500);

    // Animate greeting
    setTimeout(() => {
        greeting.style.animation = 'fadeIn 1s forwards';
    }, 1500);

    // Animate main text
    setTimeout(() => {
        mainText.style.animation = 'fadeIn 1s forwards';
    }, 2500);

    // Animate each step sequentially
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.style.animation = 'fadeIn 1s forwards';
        }, 3500 + (index * 1000));
    });

    // Animate buttons last
    setTimeout(() => {
        buttons.forEach(btn => {
            btn.style.animation = 'fadeIn 1s forwards';
        });
    }, 3500 + (steps.length * 1000));
});
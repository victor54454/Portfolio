// ===== SMOOTH SCROLL NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ANIMATION AU SCROLL =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s';
        }
    });
}, { 
    threshold: 0.1 
});

// Observer les éléments à animer
document.querySelectorAll('.skill-card, .project-card, .timeline-item').forEach(el => {
    observer.observe(el);
});

// ===== HEADER SCROLL EFFECT =====
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Ajoute une ombre plus prononcée au header quand on scroll
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===== THEME TOGGLE (DARK/LIGHT MODE) =====
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Charger le thème sauvegardé
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
}

// Toggle le thème au clic
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    // Sauvegarder la préférence
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
});

// ===== CONSOLE MESSAGE =====
console.log('%c👋 Salut ! Tu inspectes le code ? J\'aime ça ! 😄', 'color: #00ff00; font-size: 16px; font-weight: bold;');
console.log('%c📧 N\'hésite pas à me contacter si tu veux discuter tech !', 'color: #0080ff; font-size: 14px;');
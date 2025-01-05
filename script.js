// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            if (entry.target.classList.contains('service-item')) {
                entry.target.style.animation = 'float 3s ease-in-out infinite';
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animations
document.querySelectorAll('.section, .work-card, .service-item').forEach(elem => {
    observer.observe(elem);
});

document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll effect
    const nav = document.querySelector('.nav-container');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Enhanced hover effects for work cards
    const cards = document.querySelectorAll('.work-card');
    let isHovering = false;

    const handleCardHover = (e, card) => {
        if (!isHovering) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 30;
        const angleY = (centerX - x) / 30;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            isHovering = true;
        });
        
        card.addEventListener('mousemove', (e) => handleCardHover(e, card));
        
        card.addEventListener('mouseleave', () => {
            isHovering = false;
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
});

// Cleanup function
const cleanup = () => {
    observer.disconnect();
};

// Call cleanup when needed (e.g., page unload)
window.addEventListener('unload', cleanup);

// Add this to your CSS
document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    </style>
`);

// Add animation classes to CSS
const style = document.createElement('style');
style.textContent = `
    .hidden {
        opacity: 0;
        transform: translateY(50px);
        transition: all 1s cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }
    
    .reveal {
        opacity: 1;
        transform: translateY(0);
    }
    
    .work-item {
        transition: transform 0.6s cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }
    
    .reveal-on-scroll {
        opacity: 0;
        transform: translateY(50px);
        transition: all 1s cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }
    
    .revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

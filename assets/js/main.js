// --- Initialize Lenis Smooth Scroll ---
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// --- GSAP Animations ---
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
});

// Cursor Hover Effects
const interactables = document.querySelectorAll('a, .btn, .project-card, .service-card, .timeline-item');
interactables.forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
            scale: 3,
            backgroundColor: 'rgba(0, 229, 255, 0.15)',
            border: '1px solid var(--accent-color)',
            mixBlendMode: 'normal'
        });
    });
    item.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
            scale: 1,
            backgroundColor: 'var(--accent-color)',
            border: 'none',
            mixBlendMode: 'difference'
        });
    });
});

// Navbar Background Change
ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
        if (self.direction === 1) {
            document.querySelector('nav').classList.add('scrolled');
        } else {
            if (self.progress === 0) {
                document.querySelector('nav').classList.remove('scrolled');
            }
        }
    }
});

// Hero Section Animations
const tl = gsap.timeline();

tl.from('.reveal-text', {
    y: 100,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "power4.out",
    delay: 0.5
});

tl.from('.hero-img-container', {
    scale: 0.8,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out"
}, "-=1");

tl.from('.blob', {
    scale: 0,
    opacity: 0,
    duration: 2,
    ease: "elastic.out(1, 0.3)",
}, "-=1.5");

// Section Title Reveals
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top 85%',
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power2.out"
    });
});

// Reveal Up Animation
gsap.utils.toArray('.reveal-up').forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 90%',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// Timeline Item Reveals
gsap.utils.toArray('.reveal-left').forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 85%',
        },
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out"
    });
});

gsap.utils.toArray('.reveal-right').forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 85%',
        },
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out"
    });
});

// Staggered Projects Reveal
gsap.from('.project-card', {
    scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%',
    },
    y: 80,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
});

// Parallax for blobs
window.addEventListener('scroll', () => {
    const depth = 0.3;
    const move = window.pageYOffset * depth;
    gsap.to('.blob', { y: move, ease: 'none', duration: 0.5 });
});

// --- Mobile Menu ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close menu when a link is clicked
const navItems = document.querySelectorAll('.nav-links li a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});


// Newsletter Animation
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = newsletterForm.querySelector('.newsletter-btn');
        const input = newsletterForm.querySelector('input');

        if (input.value.trim() === "") return;

        // Loading State
        btn.classList.add('loading');

        // Simulate API call
        setTimeout(() => {
            btn.classList.remove('loading');
            btn.classList.add('success');
            btn.innerHTML = '✓';

            // Confetti effect (optional simplified version)
            gsap.to(btn, {
                scale: 1.2,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });

            input.value = '';
            input.placeholder = 'Thanks for subscribing!';

            // Reset after delay
            setTimeout(() => {
                btn.classList.remove('success');
                btn.innerHTML = '→';
                input.placeholder = 'Email Address';
            }, 3000);
        }, 1500);
    });
}

// WhatsApp Entrance Animation
gsap.from('.whatsapp-btn', {
    scale: 0.5,
    opacity: 0,
    duration: 1,
    delay: 2,
    ease: "elastic.out(1, 0.5)"
});


(function () {
    'use strict';

    function initScrollReveal() {
        const reveals = document.querySelectorAll('.reveal');

        if (!reveals.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px',
            },
        );

        reveals.forEach((el) => observer.observe(el));
    }

    function initLazyImages() {
        const images = document.querySelectorAll('img[data-src]');

        if (!images.length) return;

        const imageObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target;

                        const tempImg = new Image();
                        tempImg.onload = () => {
                            img.src = img.dataset.src;
                            img.classList.add('loaded');
                            img.removeAttribute('data-src');
                        };
                        tempImg.src = img.dataset.src;

                        imageObserver.unobserve(img);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '100px',
            },
        );

        images.forEach((img) => {
            img.classList.add('img-lazy');
            imageObserver.observe(img);
        });
    }

    function initThemeTransition() {
        document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
            btn.addEventListener('click', () => {
                document.documentElement.classList.add('theme-transitioning');
                setTimeout(() => {
                    document.documentElement.classList.remove('theme-transitioning');
                }, 300);
            });
        });
    }

    function autoRevealSections() {
        const sections = document.querySelectorAll('.home-section, .hero, .about__section, .project-card, .post-item');

        sections.forEach((section, index) => {
            if (!section.classList.contains('reveal')) {
                section.classList.add('reveal');
                if (index < 3) {
                    section.classList.add(`reveal-delay-${index + 1}`);
                }
            }
        });
    }

    function init() {
        autoRevealSections();
        initScrollReveal();
        initLazyImages();
        initThemeTransition();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

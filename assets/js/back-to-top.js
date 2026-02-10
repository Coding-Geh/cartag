(function () {
    'use strict';

    const getScrollThreshold = () => {
        const btn = document.querySelector('.back-to-top');
        if (btn && btn.dataset.scrollThreshold) {
            return parseInt(btn.dataset.scrollThreshold) || 300;
        }
        return 300;
    };

    const SCROLL_THRESHOLD = getScrollThreshold();

    function init() {
        const btn = document.querySelector('.back-to-top');
        if (!btn) return;

        function updateVisibility() {
            if (window.scrollY > SCROLL_THRESHOLD) {
                btn.classList.add('is-visible');
                btn.setAttribute('aria-hidden', 'false');
            } else {
                btn.classList.remove('is-visible');
                btn.setAttribute('aria-hidden', 'true');
            }
        }

        function scrollToTop() {
            const currentFocus = document.activeElement;

            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });

            setTimeout(() => {
                const mainContent = document.getElementById('main-content');
                if (mainContent) {
                    mainContent.setAttribute('tabindex', '-1');
                    mainContent.focus();
                    setTimeout(() => {
                        mainContent.removeAttribute('tabindex');
                    }, 100);
                } else {
                    const firstHeading = document.querySelector('h1, h2');
                    if (firstHeading) {
                        firstHeading.setAttribute('tabindex', '-1');
                        firstHeading.focus();
                        setTimeout(() => {
                            firstHeading.removeAttribute('tabindex');
                        }, 100);
                    } else if (currentFocus) {
                        currentFocus.focus();
                    }
                }
            }, 300);
        }

        window.addEventListener('scroll', updateVisibility, { passive: true });
        btn.addEventListener('click', scrollToTop);

        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToTop();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.altKey && e.key === 'Home' && btn.classList.contains('is-visible')) {
                e.preventDefault();
                scrollToTop();
            }
        });

        updateVisibility();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

(function () {
    'use strict';

    function init() {
        const copyButtons = document.querySelectorAll('.share-button--copy');

        if (!copyButtons.length) return;

        let liveRegion = document.getElementById('share-announcements');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'share-announcements';
            liveRegion.className = 'sr-only';
            liveRegion.setAttribute('role', 'status');
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            document.body.appendChild(liveRegion);
        }

        copyButtons.forEach((button) => {
            const url = button.getAttribute('data-url');
            if (!url) return;

            async function copyLink() {
                try {
                    await navigator.clipboard.writeText(url);

                    const originalLabel = button.getAttribute('aria-label');
                    button.setAttribute('aria-label', 'Link copied to clipboard');
                    button.classList.add('copied');
                    liveRegion.textContent = 'Link copied to clipboard';

                    setTimeout(() => {
                        button.setAttribute('aria-label', originalLabel);
                        button.classList.remove('copied');
                        liveRegion.textContent = '';
                    }, 2000);
                } catch (err) {
                    try {
                        const textArea = document.createElement('textarea');
                        textArea.value = url;
                        textArea.style.position = 'fixed';
                        textArea.style.opacity = '0';
                        textArea.setAttribute('aria-hidden', 'true');
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textArea);

                        const originalLabel = button.getAttribute('aria-label');
                        button.setAttribute('aria-label', 'Link copied to clipboard');
                        button.classList.add('copied');
                        liveRegion.textContent = 'Link copied to clipboard';

                        setTimeout(() => {
                            button.setAttribute('aria-label', originalLabel);
                            button.classList.remove('copied');
                            liveRegion.textContent = '';
                        }, 2000);
                    } catch (fallbackErr) {
                        button.setAttribute('aria-label', 'Failed to copy link');
                        liveRegion.textContent = 'Failed to copy link';
                        setTimeout(() => {
                            button.setAttribute('aria-label', 'Copy link');
                            liveRegion.textContent = '';
                        }, 2000);
                    }
                }
            }

            button.addEventListener('click', copyLink);

            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    copyLink();
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

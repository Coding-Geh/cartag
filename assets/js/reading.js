(function () {
    'use strict';

    function initReadingProgress() {
        const progressBar = document.getElementById('reading-progress-bar');
        const article = document.querySelector('.post-body, .project-body');

        if (!progressBar || !article) return;

        function updateProgress() {
            const articleTop = article.offsetTop;
            const articleHeight = article.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrolled = window.scrollY;

            const progress = Math.min(
                Math.max(((scrolled - articleTop + windowHeight * 0.3) / articleHeight) * 100, 0),
                100,
            );

            progressBar.style.width = progress + '%';
        }

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    function initTOC() {
        const toc = document.querySelector('.toc');
        if (!toc) return;

        const toggle = toc.querySelector('.toc__toggle');
        const nav = toc.querySelector('.toc__nav');
        const links = toc.querySelectorAll('.toc__list a');
        const headings = [];

        links.forEach((link) => {
            const id = link.getAttribute('href')?.replace('#', '');
            if (id) {
                const heading = document.getElementById(id);
                if (heading) {
                    headings.push({ id, link, heading });
                }
            }
        });

        if (toggle && nav) {
            function toggleTOC() {
                const isCollapsed = toggle.classList.toggle('collapsed');
                nav.classList.toggle('collapsed', isCollapsed);
                toggle.setAttribute('aria-expanded', isCollapsed ? 'false' : 'true');
            }

            toggle.addEventListener('click', toggleTOC);

            toggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleTOC();
                }
            });
        }

        if (headings.length) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const id = entry.target.id;
                            links.forEach((link) => {
                                link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                            });
                        }
                    });
                },
                {
                    rootMargin: '-20% 0px -80% 0px',
                },
            );

            headings.forEach(({ heading }) => observer.observe(heading));
        }
    }

    function initCodeCopy() {
        const codeBlocks = document.querySelectorAll('pre code');

        if (!codeBlocks.length) return;

        let toast = document.querySelector('.copy-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'copy-toast';
            toast.setAttribute('role', 'status');
            toast.setAttribute('aria-live', 'polite');
            toast.setAttribute('aria-atomic', 'true');
            toast.textContent = 'Copied!';
            document.body.appendChild(toast);
        }

        let liveRegion = document.getElementById('copy-announcements');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'copy-announcements';
            liveRegion.className = 'sr-only';
            liveRegion.setAttribute('role', 'status');
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            document.body.appendChild(liveRegion);
        }

        codeBlocks.forEach((block, index) => {
            const pre = block.parentElement;
            pre.classList.add('code-block');

            const button = document.createElement('button');
            button.className = 'copy-button';
            button.textContent = 'Copy';
            button.type = 'button';
            button.setAttribute('aria-label', `Copy code block ${index + 1}`);

            async function copyCode() {
                try {
                    await navigator.clipboard.writeText(block.textContent);

                    button.classList.add('copied');
                    button.textContent = 'Copied!';
                    button.setAttribute('aria-label', 'Code copied to clipboard');

                    toast.classList.add('show');
                    liveRegion.textContent = 'Code copied to clipboard';

                    setTimeout(() => {
                        button.classList.remove('copied');
                        button.textContent = 'Copy';
                        button.setAttribute('aria-label', `Copy code block ${index + 1}`);
                        toast.classList.remove('show');
                        liveRegion.textContent = '';
                    }, 2000);
                } catch (err) {
                    try {
                        const textArea = document.createElement('textarea');
                        textArea.value = block.textContent;
                        textArea.style.position = 'fixed';
                        textArea.style.opacity = '0';
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textArea);

                        button.classList.add('copied');
                        button.textContent = 'Copied!';
                        button.setAttribute('aria-label', 'Code copied to clipboard');
                        toast.classList.add('show');
                        liveRegion.textContent = 'Code copied to clipboard';

                        setTimeout(() => {
                            button.classList.remove('copied');
                            button.textContent = 'Copy';
                            button.setAttribute('aria-label', `Copy code block ${index + 1}`);
                            toast.classList.remove('show');
                            liveRegion.textContent = '';
                        }, 2000);
                    } catch (fallbackErr) {
                        button.textContent = 'Error';
                        button.setAttribute('aria-label', 'Failed to copy code');
                        liveRegion.textContent = 'Failed to copy code';
                        setTimeout(() => {
                            button.textContent = 'Copy';
                            button.setAttribute('aria-label', `Copy code block ${index + 1}`);
                            liveRegion.textContent = '';
                        }, 2000);
                    }
                }
            }

            button.addEventListener('click', copyCode);

            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    copyCode();
                }
            });

            pre.appendChild(button);
        });
    }

    function init() {
        initReadingProgress();
        initTOC();
        initCodeCopy();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

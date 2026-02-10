(function () {
    'use strict';

    function init() {
        const menuToggle = document.querySelector('.menu-toggle');
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');

        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', () => {
                const isOpen = sidebar.classList.toggle('is-open');
                overlay?.classList.toggle('is-visible', isOpen);
                document.body.classList.toggle('sidebar-open', isOpen);
                menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            });

            overlay?.addEventListener('click', () => {
                sidebar.classList.remove('is-open');
                overlay.classList.remove('is-visible');
                document.body.classList.remove('sidebar-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar?.classList.contains('is-open')) {
                sidebar.classList.remove('is-open');
                overlay?.classList.remove('is-visible');
                document.body.classList.remove('sidebar-open');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.focus();
            }
        });

        const langDropdown = document.querySelector('[data-lang-dropdown]');
        const langTrigger = document.querySelector('[data-lang-trigger]');
        const langList = langDropdown?.querySelector('.lang-dropdown__list');
        const langItems = langDropdown?.querySelectorAll('.lang-dropdown__item');
        let selectedLangIndex = -1;

        if (langTrigger && langList && langItems) {
            function toggleDropdown(open) {
                langTrigger.setAttribute('aria-expanded', open ? 'true' : 'false');
                langList.hidden = !open;
                if (!open) {
                    selectedLangIndex = -1;
                }
            }

            langTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = langTrigger.getAttribute('aria-expanded') === 'true';
                toggleDropdown(!isOpen);
                if (!isOpen && langItems.length > 0) {
                    selectedLangIndex = 0;
                    langItems[0].focus();
                }
            });

            langTrigger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const isOpen = langTrigger.getAttribute('aria-expanded') === 'true';
                    toggleDropdown(!isOpen);
                    if (!isOpen && langItems.length > 0) {
                        selectedLangIndex = 0;
                        langItems[0].focus();
                    }
                } else if (e.key === 'ArrowDown' && langList.hidden) {
                    e.preventDefault();
                    toggleDropdown(true);
                    selectedLangIndex = 0;
                    langItems[0].focus();
                } else if (e.key === 'Escape' && !langList.hidden) {
                    e.preventDefault();
                    toggleDropdown(false);
                    langTrigger.focus();
                }
            });

            langItems.forEach((item, index) => {
                item.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        selectedLangIndex = Math.min(selectedLangIndex + 1, langItems.length - 1);
                        langItems[selectedLangIndex].focus();
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        selectedLangIndex = Math.max(selectedLangIndex - 1, -1);
                        if (selectedLangIndex === -1) {
                            langTrigger.focus();
                        } else {
                            langItems[selectedLangIndex].focus();
                        }
                    } else if (e.key === 'Escape') {
                        e.preventDefault();
                        toggleDropdown(false);
                        langTrigger.focus();
                    } else if (e.key === 'Home') {
                        e.preventDefault();
                        selectedLangIndex = 0;
                        langItems[0].focus();
                    } else if (e.key === 'End') {
                        e.preventDefault();
                        selectedLangIndex = langItems.length - 1;
                        langItems[selectedLangIndex].focus();
                    }
                });

                item.addEventListener('focus', () => {
                    selectedLangIndex = index;
                });
            });

            document.addEventListener('click', (e) => {
                if (!langDropdown.contains(e.target)) {
                    toggleDropdown(false);
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !langList.hidden) {
                    toggleDropdown(false);
                    langTrigger.focus();
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

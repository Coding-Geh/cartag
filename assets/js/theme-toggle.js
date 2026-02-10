(function () {
    'use strict';

    const THEME_KEY = 'cartag-theme';
    const DARK = 'dark';
    const LIGHT = 'light';

    function getPreferredTheme() {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved === DARK || saved === LIGHT) {
            return saved;
        }

        const defaultPref = document.documentElement.getAttribute('data-theme-default') || 'auto';
        if (defaultPref === LIGHT || defaultPref === DARK) {
            return defaultPref;
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
    }

    function setTheme(theme) {
        if (theme !== DARK && theme !== LIGHT) {
            return;
        }
        document.documentElement.setAttribute('data-theme', theme);
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (e) {}
    }

    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
        const next = current === DARK ? LIGHT : DARK;
        setTheme(next);
    }

    function init() {
        setTheme(getPreferredTheme());

        const defaultPref = document.documentElement.getAttribute('data-theme-default') || 'auto';
        if (defaultPref === 'auto') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = (e) => {
                if (!localStorage.getItem(THEME_KEY)) {
                    setTheme(e.matches ? DARK : LIGHT);
                }
            };

            if (mediaQuery.addEventListener) {
                mediaQuery.addEventListener('change', handleChange);
            } else {
                mediaQuery.addListener(handleChange);
            }
        }

        document.querySelectorAll('.theme-toggle').forEach((btn) => {
            btn.addEventListener('click', toggleTheme);
            btn.setAttribute(
                'aria-pressed',
                document.documentElement.getAttribute('data-theme') === DARK ? 'true' : 'false',
            );
        });

        const observer = new MutationObserver(() => {
            document.querySelectorAll('.theme-toggle').forEach((btn) => {
                btn.setAttribute(
                    'aria-pressed',
                    document.documentElement.getAttribute('data-theme') === DARK ? 'true' : 'false',
                );
            });
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme'],
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

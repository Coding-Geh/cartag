(function () {
    'use strict';

    let searchIndex = null;
    let searchInput = null;
    let searchResults = null;
    let selectedIndex = -1;
    let debounceTimer = null;

    const getConfig = () => {
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer) {
            return {
                debounce: parseInt(searchContainer.dataset.searchDebounce) || 150,
                resultsLimit: parseInt(searchContainer.dataset.searchResultsLimit) || 8,
                indexUrl: searchContainer.dataset.searchIndexUrl || '/index.json',
            };
        }
        return { debounce: 150, resultsLimit: 8, indexUrl: '/index.json' };
    };

    async function loadSearchIndex() {
        try {
            const config = getConfig();
            const response = await fetch(config.indexUrl);
            if (response.ok) {
                searchIndex = await response.json();
            } else {
                searchIndex = [];
            }
        } catch (error) {
            searchIndex = [];
        }
    }

    function normalizeText(text) {
        return (text || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }

    function search(query) {
        if (!searchIndex || !query.trim()) {
            return [];
        }

        const normalizedQuery = normalizeText(query);
        const terms = normalizedQuery.split(/\s+/).filter((t) => t.length > 1);

        if (terms.length === 0) {
            return [];
        }

        const results = searchIndex
            .map((item) => {
                let score = 0;
                const titleNorm = normalizeText(item.title);
                const descNorm = normalizeText(item.description);
                const contentNorm = normalizeText(item.content);
                const tagsNorm = (item.tags || []).map((t) => normalizeText(t));

                terms.forEach((term) => {
                    if (titleNorm.includes(term)) {
                        score += titleNorm.startsWith(term) ? 10 : 5;
                    }
                    if (tagsNorm.some((tag) => tag.includes(term))) {
                        score += 4;
                    }
                    if (descNorm.includes(term)) {
                        score += 3;
                    }
                    if (contentNorm.includes(term)) {
                        score += 1;
                    }
                });

                return { item, score };
            })
            .filter((r) => r.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, getConfig().resultsLimit)
            .map((r) => r.item);

        return results;
    }

    function highlightMatch(text, query) {
        if (!text || !query) return text || '';

        const terms = query
            .toLowerCase()
            .split(/\s+/)
            .filter((t) => t.length > 1);
        let result = text;

        terms.forEach((term) => {
            const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            result = result.replace(regex, '<mark>$1</mark>');
        });

        return result;
    }

    function renderResults(results, query) {
        if (!searchResults || !searchInput) return;

        let liveRegion = document.getElementById('search-announcements');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'search-announcements';
            liveRegion.className = 'sr-only';
            liveRegion.setAttribute('role', 'status');
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            document.body.appendChild(liveRegion);
        }

        if (results.length === 0) {
            if (query.trim()) {
                searchResults.innerHTML = `
                    <div class="search-no-results" role="status" aria-live="polite" aria-atomic="true">
                        <p>No results for "<strong>${escapeHtml(query)}</strong>"</p>
                    </div>
                `;
                liveRegion.textContent = `No results found for "${escapeHtml(query)}"`;
            } else {
                searchResults.innerHTML = '';
                liveRegion.textContent = '';
            }
            const isVisible = query.trim().length > 0;
            searchResults.classList.toggle('is-visible', isVisible);
            searchInput.setAttribute('aria-expanded', isVisible ? 'true' : 'false');
            selectedIndex = -1;
            return;
        }

        const html = results
            .map((item, index) => {
                const typeLabel = item.type === 'post' ? 'Blog' : 'Project';
                const typeClass = item.type === 'post' ? 'search-result__type--post' : 'search-result__type--project';
                const readingTime =
                    item.type === 'post' && item.readingTime
                        ? `<span class="search-result__reading">${item.readingTime} min read</span>`
                        : '';

                return `
                <a href="${item.url}" 
                   class="search-result ${index === selectedIndex ? 'is-selected' : ''}" 
                   data-index="${index}"
                   role="option"
                   aria-selected="${index === selectedIndex ? 'true' : 'false'}">
                    <div class="search-result__header">
                        <span class="search-result__type ${typeClass}">${typeLabel}</span>
                        ${readingTime}
                    </div>
                    <h4 class="search-result__title">${highlightMatch(item.title, query)}</h4>
                    ${item.description ? `<p class="search-result__desc">${highlightMatch(item.description, query)}</p>` : ''}
                    ${
                        item.tags && item.tags.length > 0
                            ? `
                        <div class="search-result__tags">
                            ${item.tags
                                .slice(0, 3)
                                .map((tag) => `<span class="search-result__tag">${tag}</span>`)
                                .join('')}
                        </div>
                    `
                            : ''
                    }
                </a>
            `;
            })
            .join('');

        searchResults.innerHTML = html;
        searchResults.classList.add('is-visible');
        searchInput.setAttribute('aria-expanded', 'true');

        const resultsText = results.length === 1 ? 'result' : 'results';
        liveRegion.textContent = `${results.length} ${resultsText} found. Use arrow keys to navigate, Enter to select.`;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function handleKeyNavigation(e) {
        const results = searchResults.querySelectorAll('.search-result');
        if (results.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, results.length - 1);
            updateSelection(results);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, -1);
            updateSelection(results);
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            results[selectedIndex].click();
        } else if (e.key === 'Escape') {
            searchInput.blur();
            searchResults.classList.remove('is-visible');
            searchInput.setAttribute('aria-expanded', 'false');
            selectedIndex = -1;
        }
    }

    function updateSelection(results) {
        results.forEach((r, i) => {
            const isSelected = i === selectedIndex;
            r.classList.toggle('is-selected', isSelected);
            r.setAttribute('aria-selected', isSelected ? 'true' : 'false');

            if (isSelected) {
                const title = r.querySelector('.search-result__title')?.textContent || '';
                const type = r.querySelector('.search-result__type')?.textContent || '';
                const liveRegion = document.getElementById('search-announcements');
                if (liveRegion) {
                    liveRegion.textContent = `Selected: ${title}, ${type}`;
                }
            }
        });
        if (selectedIndex >= 0) {
            results[selectedIndex].scrollIntoView({ block: 'nearest' });
        }
    }

    function init() {
        searchInput = document.getElementById('home-search');
        searchResults = document.getElementById('search-results');

        if (!searchInput || !searchResults) return;

        loadSearchIndex();

        const config = getConfig();
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const query = e.target.value;
                const results = search(query);
                selectedIndex = -1;
                renderResults(results, query);
            }, config.debounce);
        });

        searchInput.addEventListener('keydown', handleKeyNavigation);

        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim()) {
                const results = search(searchInput.value);
                renderResults(results, searchInput.value);
            }
        });

        searchInput.addEventListener('blur', () => {
            setTimeout(() => {
                if (!document.activeElement.closest('.search-container')) {
                    searchResults.classList.remove('is-visible');
                    searchInput.setAttribute('aria-expanded', 'false');
                }
            }, 200);
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                searchResults.classList.remove('is-visible');
                searchInput.setAttribute('aria-expanded', 'false');
                selectedIndex = -1;
            }
        });

        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
                searchInput.select();
            }
        });

        searchResults.addEventListener('mouseover', (e) => {
            const result = e.target.closest('.search-result');
            if (result) {
                const index = parseInt(result.dataset.index, 10);
                if (!isNaN(index)) {
                    selectedIndex = index;
                    updateSelection(searchResults.querySelectorAll('.search-result'));
                }
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

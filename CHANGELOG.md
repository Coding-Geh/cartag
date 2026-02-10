# Changelog

All notable changes to the CartaG theme will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-19

### Added

- **Comprehensive configuration system** - All theme aspects configurable via `hugo.toml`
- **Complete documentation** - Detailed `theme.toml.example` with organized configuration sections
- **Multilingual support** - Full i18n implementation (English & Indonesian)
- **Per-language bio configuration** - Separate bio content for each language
- **Status pages** - Maintenance and coming soon pages with countdown timers
- **Search functionality** - Client-side search with configurable debounce and results
- **Project deck links** - Additional link type for project cards (e.g., presentation slides)
- **Language toggle** - Clean "EN/ID ⌄" design with improved UX
- **CDN support** - Full CDN integration for avatar, favicon, and content images
- **SEO optimization** - Complete meta tags, Open Graph, Twitter Cards, JSON-LD structured data
- **Typography configuration** - Google Fonts integration with configurable weights and display
- **UI enhancements** - FAB button, back-to-top, theme toggle, responsive design
- **Accessibility features** - ARIA labels, keyboard navigation, screen reader support
- **Performance optimizations** - Lazy loading, debouncing, passive event listeners

### Changed

- **Simplified README** - Clean quick start guide referencing detailed configuration file
- **Configuration organization** - Logical grouping of parameters by functionality
- **Template structure** - Consistent partial organization and error handling
- **Language toggle design** - From bordered dropdown to minimal text with chevron

### Removed

- **Unused email notification feature** - Removed `showNotify` parameter and related code
- **Unnecessary CSS** - Cleaned unused styles and responsive rules
- **Redundant i18n strings** - Removed unused translation keys

### Fixed

- **Template spacing errors** - Corrected partial calls and whitespace issues
- **TOC generation** - Fixed table of contents template bugs
- **Education section formatting** - Removed double-escaped apostrophes
- **Maintenance page isolation** - Proper footer/sidebar hiding on status pages
- **Multilingual search** - Dynamic URL generation for all languages

---

## Development Notes

This is the initial public release of CartaG theme, representing a complete and production-ready Hugo theme suitable for portfolio and personal websites.

### Key Features

- **Portfolio-focused** - Optimized for showcasing projects and professional content
- **Bilingual ready** - English/Indonesian support with extensible i18n system
- **Developer-friendly** - Comprehensive configuration with clear documentation
- **Performance-oriented** - Modern web standards and optimization techniques
- **Accessible** - WCAG compliance and screen reader support

### Configuration

All configuration options are documented in [`theme.toml.example`](theme.toml.example) with detailed explanations and sensible defaults.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

**Note**: This changelog follows [Keep a Changelog](https://keepachangelog.com/) format and [Semantic Versioning](https://semver.org/).

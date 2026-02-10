# CartaG

**CartaG v1.0.0** is a modern, accessible, and performance-optimized Hugo theme for portfolios and blogs. With comprehensive WCAG 2.1 AA compliance, Core Web Vitals optimization, and full i18n support, it's ready for professional use.

[![Hugo](https://img.shields.io/badge/Hugo-0.155%2B-ff4088?style=flat&logo=hugo)](https://gohugo.io)
[![License](https://img.shields.io/badge/License-CC%20BY%204.0-blue.svg)](https://creativecommons.org/licenses/by/4.0/)
[![Accessibility](https://img.shields.io/badge/WCAG-2.1%20AA-green.svg)](https://www.w3.org/WAI/WCAG21/quickref/)
[![Performance](https://img.shields.io/badge/Lighthouse-95%2B-brightgreen.svg)](https://developers.google.com/web/tools/lighthouse)

---

## Features

| Feature                | Description                                                                            |
| ---------------------- | -------------------------------------------------------------------------------------- |
| **Sidebar layout**     | Fixed sidebar with profile, nav, theme toggle, language switcher                       |
| **Dark / light mode**  | Toggle + `auto` (system preference), no flash on load                                  |
| **i18n**               | Full English & Indonesian; all UI strings translatable                                 |
| **Sections**           | Enable/disable Home, About, Projects, Blog via config                                  |
| **Search**             | Client-side search (home page), keyboard shortcut `Ctrl+K` / `Cmd+K`                   |
| **Responsive**         | Mobile menu, touch-friendly, readable typography                                       |
| **Accessibility**      | WCAG 2.1 AA compliant with comprehensive keyboard navigation and screen reader support |
| **Performance**        | Core Web Vitals optimized with performance monitoring and lazy loading                 |
| **RSS**                | Auto-generated; link in footer                                                         |
| **SEO**                | Canonical, hreflang, Open Graph, Twitter Card, JSON-LD structured data                 |
| **Fully Configurable** | All aspects customizable via `hugo.toml` (SEO, typography, search, images, UI)         |

---

## Installation

### 1. Git submodule (recommended)

```bash
cd your-site
git submodule add https://github.com/Coding-Geh/cartag themes/cartag
```

In `hugo.toml`:

```toml
theme = "cartag"
```

### 2. Hugo module

In `hugo.toml`:

```toml
[module]
  [[module.imports]]
    path = "github.com/Coding-Geh/cartag"
```

Then:

```bash
hugo mod get
hugo mod tidy
```

### 3. Run the example site

From the theme repo:

```bash
cd exampleSite
hugo server --themesDir ../..
```

Open `http://localhost:1313`. Use the language switcher (EN/ID) and the theme toggle in the sidebar.

---

## Configuration

### Quick Start

1. Copy the configuration template:

    ```bash
    cp themes/cartag/theme.toml.example hugo.toml
    ```

2. Edit `hugo.toml` with your information:

    ```toml
    baseURL = "https://yoursite.com"
    title = "Your Name"
    theme = "cartag"

    [params]
      description = "Your tagline"
      author = "Your Name"
      avatar = "images/avatar.jpg"

      [params.bio]
        en = "Your bio in English"
        id = "Your bio in Indonesian"

      [params.social]
        github = "https://github.com/yourusername"
        linkedin = "https://linkedin.com/in/yourprofile"
        email = "you@example.com"
    ```

3. Add your content in `content/about/`, `content/projects/`, and `content/posts/`

📖 **For all configuration options, see [`theme.toml.example`](theme.toml.example)**

---

## Content Structure

### Multilingual (optional)

```toml
defaultContentLanguageInSubdir = true

[languages.en]
  weight = 1
  languageName = "EN"
[languages.id]
  weight = 2
  languageName = "ID"
```

Create paired content, e.g. `content/about/_index.md` and `content/about/_index.id.md`. All theme strings are in `i18n/en.yaml` and `i18n/id.yaml` (overridable in your site's `i18n/`).

### Advanced Configuration Example

All theme aspects are configurable. Here's a comprehensive example:

```toml
[params]
  # ... basic params above ...

  # SEO Configuration
  [params.seo]
    metaDescriptionLength = 160
    ogDescriptionLength = 200
    searchIndexDescriptionLength = 160
    searchIndexContentLength = 200
    articleTagLimit = 5

  # Search Configuration
  [params.search]
    debounce = 150              # milliseconds
    resultsLimit = 8

  # Typography Configuration
  [params.typography]
    useGoogleFonts = true
    fontFamily = "Inter"
    fontWeights = [400, 500, 600, 700]
    fontDisplay = "swap"        # "swap" | "block" | "fallback" | "optional"

  # Images Configuration & CDN Support
  [params.images]
    useCDN = false              # true = use avatarCDN for avatar & favicon
    avatarCDN = ""              # e.g. "https://res.cloudinary.com/.../avatar.png"
    cdnBase = ""                # optional: base URL for relative image paths (posts/projects); empty = local or use full URLs in front matter
    projectImageWidth = 300
    projectImageHeight = 180

  # UI Configuration
  [params.ui]
    scrollThreshold = 300        # pixels

  # Blog Configuration (additional options)
  [params.blog]
    relatedPostsLimit = 3
    tagLimitOnList = 3
```

**Note:** All configuration options have sensible defaults. You only need to set values you want to customize.

### CDN support (images)

The theme supports CDN for images in two ways:

1. **Avatar & favicon**  
   Set `params.images.useCDN = true` and `params.images.avatarCDN = "https://.../"`. The sidebar avatar, favicon, and OG fallback use this URL. If `useCDN` is false, the theme uses `params.avatar` (local path).

2. **Content images (posts, projects)**
    - Use a **full URL** in front matter: `image: "https://res.cloudinary.com/.../photo.png"` — the theme uses it as-is.
    - Or set `params.images.cdnBase = "https://your-cdn.com/assets"` so that **relative** paths (e.g. `image: "images/photo.jpg"`) become `https://your-cdn.com/assets/images/photo.jpg`.

All image URLs are resolved via the `image-url` partial (full URLs pass through; relative paths use `cdnBase` when set, otherwise site-relative or absolute).

### Full options reference

| Key                                       | Default             | Description                                                                             |
| ----------------------------------------- | ------------------- | --------------------------------------------------------------------------------------- |
| **Profile**                               |                     |                                                                                         |
| `params.description`                      | —                   | Tagline under name (sidebar & hero)                                                     |
| `params.author`                           | —                   | Author name                                                                             |
| `params.location`                         | —                   | Optional location (hero)                                                                |
| `params.avatar`                           | —                   | Local avatar path (e.g. `images/avatar.jpg`); used when `params.images.useCDN` is false |
| `params.avatarZoom`                       | `100`               | Avatar crop zoom (100 = normal)                                                         |
| `params.favicon`                          | —                   | Local favicon path; used when `params.images.useCDN` is false                           |
| `params.bio`                              | —                   | **Per-language bio** (see section below)                                                |
| `params.resumeURL`                        | `""`                | Resume/CV URL; empty = hide                                                             |
| `params.images.useCDN`                    | `false`             | If true, use `params.images.avatarCDN` for avatar and favicon                           |
| `params.images.avatarCDN`                 | `""`                | Full URL for avatar/favicon when `useCDN` is true (e.g. Cloudinary)                     |
| `params.images.cdnBase`                   | `""`                | CDN base for other images; empty = local                                                |
| **Sections**                              |                     |                                                                                         |
| `params.sections.about`                   | `true`              | Show About in nav                                                                       |
| `params.sections.projects`                | `true`              | Show Projects in nav                                                                    |
| `params.sections.blog`                    | `true`              | Show Blog in nav                                                                        |
| **Home**                                  |                     |                                                                                         |
| `params.home.showSearch`                  | `true`              | Search box on home                                                                      |
| `params.home.showHero`                    | `true`              | Hero block                                                                              |
| `params.home.heroCTA`                     | `"projects"`        | Primary CTA: `projects` \| `contact` \| `resume` \| `none`                              |
| `params.home.showProjects`                | `true`              | Featured projects section                                                               |
| `params.home.projectsLimit`               | `4`                 | Max projects on home                                                                    |
| `params.home.projectsLayout`              | `"grid"`            | `grid` \| `list`                                                                        |
| `params.home.projectsFeaturedOnly`        | `true`              | Only `featured: true` projects                                                          |
| `params.home.showPosts`                   | `true`              | Latest posts section                                                                    |
| `params.home.postsLimit`                  | `3`                 | Max posts on home                                                                       |
| **About**                                 |                     |                                                                                         |
| `params.about.showSkills`                 | `true`              | Skills section (from front matter)                                                      |
| `params.about.skillsLayout`               | `"badges"`          | `badges` \| `grouped`                                                                   |
| `params.about.showExperience`             | `true`              | Experience (from front matter)                                                          |
| `params.about.showEducation`              | `true`              | Education (from front matter)                                                           |
| `params.about.showCertifications`         | `true`              | Certifications (from front matter)                                                      |
| `params.about.showContact`                | `false`             | Contact block at bottom                                                                 |
| **Projects**                              |                     |                                                                                         |
| `params.projects.layout`                  | `"grid"`            | `grid` \| `list`                                                                        |
| `params.projects.showListHeader`          | `false`             | Title + description on list                                                             |
| `params.projects.useDescriptionOnly`      | `true`              | Card text from `description` only                                                       |
| **Blog**                                  |                     |                                                                                         |
| `params.blog.layout`                      | `"list"`            | `grid` \| `list`                                                                        |
| `params.blog.showListHeader`              | `false`             | Title + description on list                                                             |
| `params.blog.showDateOnList`              | `true`              | Date on list cards                                                                      |
| `params.blog.showReadTimeOnList`          | `true`              | “X min read” on list                                                                    |
| `params.blog.showExcerptOnList`           | `true`              | Excerpt on list                                                                         |
| `params.blog.showReadTime`                | `true`              | Read time on single post                                                                |
| `params.blog.showDate`                    | `true`              | Date on single post                                                                     |
| `params.blog.showTOC`                     | `false`             | Table of contents on single post (or set per post via `toc: true`)                      |
| `params.blog.showRelated`                 | `true`              | Related posts section below article                                                     |
| `params.blog.relatedPostsLimit`           | `3`                 | Max related posts to show                                                               |
| `params.blog.tagLimitOnList`              | `3`                 | Max tags to show on list cards                                                          |
| **UI**                                    |                     |                                                                                         |
| `params.fab.enable`                       | `false`             | Floating “Contact” button                                                               |
| `params.fab.text`                         | `"Let's Talk"`      | FAB label                                                                               |
| `params.fab.url`                          | —                   | FAB link (e.g. `mailto:...`)                                                            |
| `params.fab.icon`                         | `"mail"`            | Icon name (e.g. `mail`)                                                                 |
| `params.backToTop.enable`                 | `true`              | Back-to-top button                                                                      |
| **Theme**                                 |                     |                                                                                         |
| `params.colorScheme.toggle`               | `true`              | Show theme toggle                                                                       |
| `params.colorScheme.default`              | `"auto"`            | `light` \| `dark` \| `auto`                                                             |
| `params.colorScheme.primary`              | `"#007acc"`         | Theme color (meta theme-color, tiles)                                                   |
| **SEO**                                   |                     |                                                                                         |
| `params.seo.metaDescriptionLength`        | `160`               | Meta description truncate length                                                        |
| `params.seo.ogDescriptionLength`          | `200`               | Open Graph description truncate length                                                  |
| `params.seo.searchIndexDescriptionLength` | `160`               | Search index description length                                                         |
| `params.seo.searchIndexContentLength`     | `200`               | Search index content length                                                             |
| `params.seo.articleTagLimit`              | `5`                 | Max article tags for OG meta                                                            |
| **Search**                                |                     |                                                                                         |
| `params.search.debounce`                  | `150`               | Search input debounce (ms)                                                              |
| `params.search.resultsLimit`              | `8`                 | Max search results to show                                                              |
| **Typography**                            |                     |                                                                                         |
| `params.typography.useGoogleFonts`        | `true`              | Enable Google Fonts                                                                     |
| `params.typography.fontFamily`            | `"Inter"`           | Font family name                                                                        |
| `params.typography.fontWeights`           | `[400,500,600,700]` | Font weights array                                                                      |
| `params.typography.fontDisplay`           | `"swap"`            | Font display strategy                                                                   |
| **Images**                                |                     |                                                                                         |
| `params.images.projectImageWidth`         | `300`               | Project card image width                                                                |
| `params.images.projectImageHeight`        | `180`               | Project card image height                                                               |
| **Status pages**                          |                     |                                                                                         |
| `params.maintenance.enable`               | `false`             | **Maintenance page** (see section below)                                                |
| `params.comingSoon.enable`                | `false`             | **Coming soon page** (see section below)                                                |

---

## Advanced Configuration

### Per-Language Profile (Bio)

The `params.bio` field supports multiple languages, similar to content files. Configure it in `hugo.toml`:

```toml
[params.bio]
  en = "Building things on the web."
  id = "Membangun hal-hal di web."
  # Add more languages as needed
  es = "Construyendo cosas en la web."
```

The theme will automatically display the appropriate bio based on the current language.

### Maintenance Page

Display a maintenance page on your entire site while making updates:

```toml
[params.maintenance]
  enable = true     # Set to true to show maintenance page
```

The maintenance page:

- Hides sidebar, footer, and other components
- Displays centered status icon and message
- Shows social links (from `params.social`)
- Respects dark/light theme preference

### Coming Soon Page

Launch a coming soon page with optional countdown timer:

```toml
[params.comingSoon]
  enable = true

  # Optional countdown timer (RFC3339). Leave empty for static page.
  launchDate = "2025-03-31T00:00:00Z"

  # Per-language messages
  [params.comingSoon.message]
    en = "We're working hard to bring you something amazing."
    id = "Kami sedang mengerjakan sesuatu yang luar biasa."
```

**Notes:** Use [RFC3339](https://datatracker.ietf.org/doc/html/rfc3339) for `launchDate`. Add a message key for each language in `[languages]`.

### Quick Start: Copy-Paste Configuration

Here's a complete, ready-to-use `hugo.toml` configuration you can copy and customize:

```toml
baseURL = "https://yoursite.com"
languageCode = "en"
defaultContentLanguage = "en"
defaultContentLanguageInSubdir = true
title = "Your Name"
theme = "cartag"

[params]
  description = "Your tagline"
  author = "Your Name"
  location = "Your Location"
  avatar = "images/avatar.jpg"
  favicon = "images/avatar.jpg"

  # Per-language bio
  [params.bio]
    en = "Your bio in English"
    id = "Your bio in Indonesian"

  [params.images]
    useCDN = false
    avatarCDN = ""
    cdnBase = ""

  [params.sections]
    about = true
    projects = true
    blog = true

  [params.home]
    showSearch = true
    showHero = true
    heroCTA = "projects"
    showProjects = true
    showPosts = true

  [params.fab]
    enable = true
    text = "Let's Talk"
    url = "mailto:your-email@example.com"

  [params.social]
    github = "https://github.com/yourusername"
    linkedin = "https://linkedin.com/in/yourprofile"
    email = "your-email@example.com"

  # Maintenance and Coming Soon (optional)
  [params.maintenance]
    enable = false

  [params.comingSoon]
    enable = false
    launchDate = ""
    [params.comingSoon.message]
      en = "Coming soon..."
      id = "Segera hadir..."

[languages.en]
  weight = 1
  languageName = "EN"

[languages.id]
  weight = 2
  languageName = "ID"

[markup]
  [markup.highlight]
    style = "github-dark"
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = true

[taxonomies]
  tag = "tags"

[outputs]
  home = ["HTML", "RSS", "JSON"]
```

---

## Content Structure

### Multilingual (optional)

```toml
defaultContentLanguageInSubdir = true

[languages.en]
  weight = 1
  languageName = "EN"
[languages.id]
  weight = 2
  languageName = "ID"
```

Create paired content, e.g. `content/about/_index.md` and `content/about/_index.id.md`. All theme strings are in `i18n/en.yaml` and `i18n/id.yaml` (overridable in your site’s `i18n/`).

### About page

In `content/about/_index.md` use front matter for structured blocks:

```yaml
title: 'About'

# Optional sections (shown if params.about.* is true)
skills: [JavaScript, Hugo, CSS]
experience:
    - role: 'Developer'
      company: 'Company'
      period: '2020 – present'
      description: '...'
education:
    - degree: 'B.S. Computer Science'
      institution: 'University'
      year: '2020'
certifications:
    - name: 'Cert Name'
      issuer: 'Issuer'
      year: '2024'
      url: 'https://...'
```

### Projects

In `content/projects/`:

```yaml
title: 'Project Name'
date: 2024-01-01
description: 'Short description for cards and SEO.'
tags: [web, hugo]
image: 'images/project.jpg'
links:
    github: 'https://github.com/...'
    demo: 'https://...'
featured: true # for home “featured” section when projectsFeaturedOnly is true
```

### Blog

In `content/posts/` use front matter: `title`, `date`, `description`, `tags`, `draft`. Optional: `image` (featured image), `toc: true` (table of contents). Theme uses `description` for excerpts and meta description.

### Archetypes

The theme provides three archetypes:

| File                     | Use case                           | Key fields                                                                  |
| ------------------------ | ---------------------------------- | --------------------------------------------------------------------------- |
| `archetypes/default.md`  | Generic pages (fallback)           | title, date, draft, description, tags                                       |
| `archetypes/posts.md`    | Blog posts (`hugo new posts/...`)  | title, date, draft, description, tags, image, toc                           |
| `archetypes/projects.md` | Projects (`hugo new projects/...`) | title, date, description, tags, image, links (github, demo, deck), featured |

Copy from theme into your site's `archetypes/` to customize.

### SEO best practices (template)

- **Every page:** Set `description` in front matter (meta description, Open Graph, search index). Keep under ~160 characters for meta.
- **Section indexes:** Add `description` to `content/posts/_index.md` and `content/projects/_index.md` (and `_index.id.md` if multilingual).
- **Canonical & hreflang:** Theme outputs canonical URL and hreflang for all pages when multilingual.
- **Structured data:** Theme outputs JSON-LD (WebSite, Article, Project). Ensure `params.author` and `params.description` are set in `hugo.toml`.
- **Config:** Use `params.seo` to tune description lengths and article tag limit (see options table above).

---

## Dark / light mode

- **Toggle:** Sidebar (and mobile header) theme button.
- **Default:** Set `params.colorScheme.default` to `light`, `dark`, or `auto`.
- **Persistence:** Choice is stored in `localStorage` and applied before first paint to avoid flash.
- **Transition:** Optional short transition on toggle is wired to buttons with `data-theme-toggle` (already on theme toggles).

No extra or duplicate theme logic; one source of truth in `theme-toggle.js`.

---

## Customization

### Typography

Customize fonts via `params.typography`:

```toml
[params.typography]
  useGoogleFonts = true        # Set to false to use system fonts
  fontFamily = "Inter"         # Any Google Font name
  fontWeights = [400, 500, 600, 700]
  fontDisplay = "swap"         # Font loading strategy
```

### SEO Optimization

The theme outputs canonical URLs, hreflang (multilingual), Open Graph, Twitter Card, and JSON-LD. Fine-tune via:

```toml
[params.seo]
  metaDescriptionLength = 160           # Meta description truncate
  ogDescriptionLength = 200             # Open Graph description truncate
  searchIndexDescriptionLength = 160    # Search index JSON description
  searchIndexContentLength = 200        # Search index JSON content
  articleTagLimit = 5                   # Max tags in article meta
```

Set `description` in every page's front matter for best results.

### Search Behavior

Adjust search functionality:

```toml
[params.search]
  debounce = 150              # Input debounce delay (ms)
  resultsLimit = 8             # Maximum results to display
```

### Image Configuration

Configure image handling:

```toml
[params.images]
  cdnBase = ""                # CDN base URL (empty = local)
  projectImageWidth = 300      # Project card image width
  projectImageHeight = 180     # Project card image height
```

All configuration options have sensible defaults. Customize only what you need.

---

## Documentation & example

- **Docs:** This README is the main documentation (install, config, content, archetypes, SEO, i18n, dark mode, performance).
- **Example site:** `exampleSite/` is a minimal demo with:
    - `hugo.toml` with full params (including SEO and multilingual)
    - Sample content: about, one post, one project; section indexes with `description` for SEO
    - Archetypes in theme: `default.md`, `posts.md`, `projects.md` (copy to your site's `archetypes/` to customize)

Run it:

```bash
cd exampleSite
hugo server --themesDir ../..
```

For a real-world site using the theme, see [cartag-levian](https://el.codinggeh.com) (optional).

---

## Performance & code quality

- **Performance:** Lazy-loaded images, debounced search (`params.search.debounce`), passive scroll listeners, minified CSS/JS, optional Google Fonts with `font-display: swap`. Target: solid Core Web Vitals (LCP, FID, CLS).
- **Security:** User content escaped with `htmlEscape`; external links use `rel="noopener noreferrer"`.
- **Consistency:** JS uses IIFE, `'use strict'`, and DOMContentLoaded init; templates use config defaults and escaping; SCSS uses variables and BEM-like naming.

---

## Requirements

- **Hugo:** Extended 0.112 or higher (for SCSS).
- **Browsers:** Modern evergreen (ES6, IntersectionObserver, etc.).

---

## License

CC BY 4.0 — [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/).  
You may use and adapt the theme with attribution.

---

**CartaG** by [Coding Geh](https://codinggeh.com) · [Repository](https://github.com/Coding-Geh/cartag)

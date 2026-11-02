# SparkleBay Mobile Car Wash

A responsive, multi-page website for **SparkleBay**, a mobile car wash serving Johannesburg, built for WEDE5020 (Web Development Introduction).

- **Live site:** https://sparklebay.netlify.app *(replace with your deployed URL)*
- **Repository:** *(add your GitHub link)*
- **Student:** *(Nkateko Baloyi )*

## Table of contents
1. [Project overview](#1-project-overview)
2. [Tech stack](#2-tech-stack)
3. [File structure](#3-file-structure)
4. [Running the site locally](#4-running-the-site-locally)
5. [Features by part](#5-features-by-part)
6. [SEO and security](#6-seo-and-security)
7. [Testing checklist](#7-testing-checklist)
8. [Deployment](#8-deployment)
9. [Git workflow and commit evidence](#9-git-workflow-and-commit-evidence)
10. [Changelog](#10-changelog)
11. [Known limitations](#11-known-limitations)
12. [Detailed explanation of changes](#12-detailed-explanation-of-changes)
13. [References](#references)

## 1. Project overview
> Keep your Part 1 text here: business purpose, target audience (students, busy professionals, small business fleets, car enthusiasts), brand colours, wireframes and sitemap.

SparkleBay brings an eco-friendly car wash to the customer's home, office or our fixed site. The website lets visitors learn about the business, compare services and prices, ask for an estimate, book a wash and contact the team.

## 2. Tech stack
| Area | Choice |
|---|---|
| Markup | HTML5 (MDN Web Docs, 2025a), semantic landmarks (`header`, `nav`, `main`, `footer`) |
| Styling | CSS3 (MDN Web Docs, 2025b): custom properties, Grid, Flexbox, media queries, pseudo-classes (`:hover`, `:focus-visible`, `:nth-child`) |
| Scripting | Vanilla JavaScript (MDN Web Docs, 2026) (no framework), `fetch` for AJAX |
| Map | Leaflet 1.9.4 (Agafonkin, 2023) with Esri World Street Map tiles (Esri, n.d.) |
| Fonts | Manrope (headings) and Karla (body), Google Fonts |
| Images | Unsplash (free licence) (Unsplash, n.d.), saved locally with descriptive names |
| Form handling | Formspree endpoint for bookings (Formspree, n.d.); `mailto:` for contact |
| Hosting | Netlify (free tier) (Netlify, n.d.) |

## 3. File structure
```
/
├── index.html          Welcome splash page
├── home.html           Home
├── about.html          About Us (tabs)
├── services.html       Price list (search/sort), gallery lightbox, FAQ accordion
├── booking.html        Booking form (AJAX)
├── enquiry.html        Enquiry form (estimate response)
├── contact.html        Contact form + interactive map
├── changelog.html      Website summary of project changes
├── docs/               Word documentation (SparkleBay_Project_Documentation.docx)
├── style.css           Part 2 styles (design tokens, layout, responsive rules)
├── part3.css           Part 3 component styles
├── script.js           All JavaScript
├── images/             Photos with descriptive file names
├── robots.txt          Crawler rules
├── sitemap.xml         Page list for search engines
├── _headers            Netlify security headers
├── download_images.py  Helper that saves the photos into /images
└── README.md           This document
```

## 4. Running the site locally
1. Clone the repository: `git clone <your-repo-url>`
2. Optional: run `python download_images.py` to save the photos into `images/`.
3. Open `index.html` in a browser, or use the VS Code "Live Server" extension.
4. Geolocation (map button) needs `localhost` or HTTPS, so Live Server is recommended.

## 5. Features by part
**Part 1: structure.** Seven linked pages, shared navigation, semantic HTML, tables, forms and images with alt text.

**Part 2: styling and responsiveness.** Design tokens (navy, aqua, white, charcoal), type scale, sticky header, cards, striped table, hover and focus states, breakpoints at 639px and 899px, reduced-motion support.

**Part 3: functionality and SEO.**
| Feature | Where | How it works |
|---|---|---|
| Tabs | About | ARIA tab roles (W3C, n.d.), arrow-key navigation |
| Accordion | Services | One panel open at a time, CSS height animation |
| Scroll reveal | Home, About | CSS transition triggered by `IntersectionObserver` (MDN Web Docs, 2026) |
| Gallery lightbox | Services | Click to enlarge, previous/next, arrows, Esc, focus returned |
| Dynamic price list | Services | Table built from a JS data array; search, category filter, sort |
| Interactive map | Contact | Leaflet marker, 20 km service circle, "Check my location" distance |
| Enquiry response | Enquiry | Validates, then shows cost, fleet discount, call-out fee, time and availability |
| Contact email | Contact | Validates, then compiles a `mailto:` email the visitor sends |
| Booking (AJAX) | Booking | Validates, then `fetch` POST without reloading the page |
| Validation | All forms | Required fields, SA phone format, email, name, date range, lengths; messages shown under each field |

## 6. SEO and security
- Unique title, meta description and meta keywords per page (Google, n.d.), using local keywords such as "mobile car wash Johannesburg".
- One `<h1>` per page with a logical H2/H3 hierarchy.
- Descriptive image file names (for example `mobile-car-wash-hero.jpg`), alt text, `width`/`height`, lazy loading.
- Clean lowercase URLs, canonical links, Open Graph and Twitter tags, schema.org `AutoWash` structured data (schema.org, n.d.).
- Internal links in the body text and a footer menu on every page; mobile-friendly layout.
- `robots.txt` and `sitemap.xml` in the site root.
- Speed: preconnect hints, `font-display: swap`, deferred script, lazy images, no framework.
- Security: Content-Security-Policy and related headers (`_headers`), no inline scripts or handlers, user text inserted with `textContent`, honeypot field on the booking form, `noopener` on external links.
- Off-page plan: Google Business Profile, Facebook and Instagram pages linking to the site, backlinks from local suppliers and community pages, the same business name, area and email in every directory.

## 7. Testing checklist
| Test | Result |
|---|---|
| All navigation links open the right page | |
| Each form shows errors for empty and invalid input | |
| Valid booking shows a success message (demo mode or Formspree) | |
| Enquiry shows a correct estimate (example: Full Service Detail, SUV, 5 vehicles, mobile = R592.50) | |
| Contact form opens a prefilled email | |
| Services search, filter and sort work | |
| Lightbox opens, navigates and closes with Esc | |
| Map loads, marker and circle show, location button works | |
| Layout checked at 360px, 768px and 1280px widths | |
| Keyboard-only use: tabs, accordion, lightbox and forms | |
| Deployed site loads without console errors | |

*(Fill in the Result column as you test.)*

## 8. Deployment
1. Push the repository to GitHub.
2. In Netlify choose **Add new site > Import from Git**, select the repository, leave the build command empty and set the publish directory to `/`.
3. Replace `https://sparklebay.netlify.app` in the canonical tags, `sitemap.xml` and `robots.txt` with the real URL.
4. Create a form at formspree.io and replace `YOUR_FORM_ID` in `booking.html`. Until then the booking form runs in demo mode.

## 9. Git workflow and commit evidence
Work is committed in small steps with messages in the form `type: what changed`, where the type is `feat`, `fix`, `style`, `docs` or `seo`. Example history for Part 3:

| # | Commit message |
|---|---|
| 1 | `fix: rename pages to lowercase and replace inquiries page with enquiry.html` |
| 2 | `style: add part3.css and remove duplicate font import from style.css` |
| 3 | `feat: add tabs on About page and accordion FAQ on Services page` |
| 4 | `feat: build dynamic services table with search, filter and sort` |
| 5 | `feat: add gallery lightbox with keyboard support` |
| 6 | `feat: add Leaflet map with service area and location check` |
| 7 | `feat: add form validation module with inline error messages` |
| 8 | `feat: enquiry estimate response and contact email compiler` |
| 9 | `feat: booking form AJAX submission` |
| 10 | `seo: add titles, descriptions, keywords, canonical links and structured data` |
| 11 | `seo: add robots.txt, sitemap.xml and security headers` |
| 12 | `docs: rewrite README with documentation and formal changelog` |

Branching: `main` holds the deployed version; larger changes can be developed on a branch (for example `feature/map`) and merged. Run `git log --oneline` to view the history.

## 10. Changelog
This project follows the [Keep a Changelog](https://keepachangelog.com) format and semantic versioning. Dates are `YYYY-MM-DD`.

### [3.1.0] - 2026-11-02 (Documentation and changelog page)
**Added**
- `docs/SparkleBay_Project_Documentation.docx`: Word summary of the proposal, Part 2 improvements report, Part 2 feedback response and every Part 3 change, with a requirements table.
- `changelog.html`: a page on the website that summarises the changes, the page renames and the feedback response, with a link to download the Word document. Linked from the footer menu on every page and listed in `sitemap.xml`.
- README section 12, "Detailed explanation of changes".

**Changed**
- Cache-busting version on `script.js`, `style.css` and `part3.css` links raised to `?v=4`.

### [3.0.0] - 2026-10-29 (Part 3: functionality and SEO)
**Added**
- `script.js` with tabs, accordion, scroll reveal, gallery lightbox, dynamic services list, form validation, AJAX booking, enquiry estimate, contact email compiler and Leaflet map.
- `part3.css` for the new components; `style.css` kept as the Part 2 base.
- `enquiry.html` with service, vehicle type, number of vehicles, location and date fields.
- Gallery and FAQ sections on `services.html`; tabs on `about.html`; map and message type on `contact.html`.
- `robots.txt`, `sitemap.xml`, `_headers`, `download_images.py`.
- Per-page meta description, keywords, canonical URL, Open Graph tags and schema.org structured data.
- Skip link, `<main>` landmark and `lang="en-ZA"`.
- Formal documentation in this README (sections 1 to 11).

**Changed**
- Page names to lowercase (`Home.html` to `home.html`, and so on) for clean URLs.
- `Inquiries.html` replaced by `enquiry.html`; navigation updated on every page.
- Buttons that used `onclick` navigation are now real links.
- Booking service dropdown now lists the real services and prices.
- Footer standardised on every page; copyright updated to 2024-2026.
- Placeholder US address and phone replaced with Johannesburg details.
- Fonts load from the page head with `display=swap`; the CSS `@import` was removed.

**Fixed**
- Home page grid had five cards and an empty cell; a sixth card was added.
- Contact form had no validation or submission behaviour.
- Welcome and enquiry pages lacked the contact email in the footer.
- Map tiles: OpenStreetMap blocked requests without a referrer and CARTO required an API key, so the map now uses Esri tiles.

### [2.1.0] - 2026-10-29 (Changes made in response to Part 2 feedback)
Lecturer feedback: *"Excellent work. CSS, responsiveness, pseudo-classes, and references are well implemented; improve the GitHub documentation, commit evidence, and provide a formal changelog section."*

| Feedback point | Action taken | Where to see it |
|---|---|---|
| Improve the GitHub documentation | README rewritten with overview, tech stack, file structure, local setup, feature table, SEO and security notes, testing checklist, deployment steps and known limitations. | Sections 1 to 8 and 11 |
| Improve commit evidence | Work is split into small commits with descriptive `type: message` titles; the planned history is listed and can be checked with `git log --oneline`. | Section 9 and the GitHub commit history |
| Provide a formal changelog section | Changelog now uses versions, dates and Added/Changed/Fixed categories, with this feedback response recorded as its own entry. | This section |
| Keep strengths (CSS, responsiveness, pseudo-classes, references) | `style.css` carried forward unchanged apart from the font import; references list extended and kept in a consistent format. | `style.css`, References |

### [2.0.0] - Part 2 (CSS styling and responsive design)
*(Add the date.)*
**Added:** `style.css` with design tokens, type scale, sticky header, cards, tables, forms, hero, splash page, hover/focus pseudo-classes and mobile-first breakpoints; reduced-motion support.

### [1.0.0] - Part 1 (HTML structure)
*(Add the date.)*
**Added:** welcome page, Home, About Us, Services, Booking, Inquiries and Contact pages with shared navigation, tables, forms, images and alt text.

## 11. Known limitations
- The booking form runs in demo mode until a Formspree form ID is added.
- The contact form opens the visitor's email app instead of sending from the server (no back end).
- Prices, phone number and location are sample values for the assignment.
- The map shows an approximate Johannesburg hub, not a real street address.
- Customer reviews are placeholders until real reviews exist.

## 12. Detailed explanation of changes
This section explains each change and why it was made. The same material is in `docs/SparkleBay_Project_Documentation.docx` and on `changelog.html`.

### 12.1 From the original proposal to the finished site
SparkleBay replaces informal WhatsApp promotion with one central website for services, prices, service area and booking. The proposal targeted 25 booking enquiries a month, 300 visits a month, 40% of visitors viewing pricing and 10 verified reviews in six months. Each Part 3 feature supports one of these goals: the booking, enquiry and contact forms generate enquiries; SEO improves local visibility; the searchable price list supports decisions; and the reviews placeholder prepares for credibility.

### 12.2 Part 2 to Part 3
| Area | Part 2 | Part 3 | Why |
|---|---|---|---|
| Interactivity | Hover effects only | Tabs, accordion, lightbox, scroll reveal, map | Better user experience and engagement |
| Services | Static table | Searchable, filterable, sortable table built from data | Faster decisions; one source of truth for prices |
| Enquiry | Basic form, no behaviour | Validated form with estimate response | Gives an immediate answer and better quality enquiries |
| Contact | Form with no action | Validated form that compiles an email | Visitor can send a complete message |
| Booking | Mismatched service list, no action | Real services, validation, AJAX | Matches the price list; no page reload |
| SEO | Title only | Titles, descriptions, keywords, canonical, structured data, robots, sitemap | Findable in search, especially locally |
| Files | Mixed-case names | Lowercase, descriptive names | Clean URLs and fewer hosting problems |
| Documentation | Short README | Full README, changelog page and Word document | Responds to Part 2 feedback |

### 12.3 Problems found and fixed during development
| Problem | Cause | Fix |
|---|---|---|
| Page looked unstyled | `style.css` missing from the delivered folder | Added back; duplicate font `@import` removed |
| Map showed "Access blocked" | OpenStreetMap tiles reject requests with no referrer (OpenStreetMap contributors, n.d.; local files, localhost) | Changed tile provider |
| Map showed "API key required" | CARTO basemaps now need an API key | Switched to Esri World Street Map tiles |
| Old script kept running | Browser cache | Added `?v=` version number to asset links |

### 12.4 Updated sitemap
`index.html` leads to `home.html`. `home.html` links to `about.html`, `services.html`, `booking.html`, `enquiry.html` and `contact.html`. `about.html` links to `services.html`, `enquiry.html` and `contact.html`. `services.html` links to `booking.html` with the chosen service pre-selected. `contact.html` links to `services.html` and `booking.html`. `changelog.html` is reachable from the footer menu of every page. All pages are in the main menu and listed in `sitemap.xml`.

## References

Referencing style: IIE Harvard (The Independent Institute of Education). In-text citations use (Author, year); the list is in alphabetical order.

Afrihost. 2026a. *Shared Hosting: Linux and Windows.* [Online]. Available at: https://www.afrihost.com/shared-hosting [Accessed 5 August 2026].

Agafonkin, V. 2023. *Leaflet: an open-source JavaScript library for mobile-friendly interactive maps.* [Online]. Available at: https://leafletjs.com [Accessed 2 November 2026].

Esri. n.d. *ArcGIS World Street Map.* [Online]. Available at: https://www.arcgis.com [Accessed 2 November 2026].

Formspree. n.d. *Formspree Help.* [Online]. Available at: https://help.formspree.io [Accessed 2 November 2026].

Google. n.d. *Google Search Central Documentation.* [Online]. Available at: https://developers.google.com/search/docs [Accessed 2 November 2026].

MDN Web Docs. 2025a. *HTML: HyperText Markup Language.* [Online]. Available at: https://developer.mozilla.org/en-US/docs/Web/HTML [Accessed 5 August 2026].

MDN Web Docs. 2025b. *CSS: Cascading Style Sheets.* [Online]. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS [Accessed 5 August 2026].

MDN Web Docs. 2026. *JavaScript.* [Online]. Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript [Accessed 5 August 2026].

Netlify. n.d. *Netlify Docs.* [Online]. Available at: https://docs.netlify.com [Accessed 2 November 2026].

OpenStreetMap contributors. n.d. *OpenStreetMap.* [Online]. Available at: https://www.openstreetmap.org [Accessed 2 November 2026].

schema.org. n.d. *AutoWash.* [Online]. Available at: https://schema.org/AutoWash [Accessed 2 November 2026].

Unsplash. n.d. *Unsplash License.* [Online]. Available at: https://unsplash.com/license [Accessed 2 November 2026].

W3C. n.d. *WAI-ARIA Authoring Practices Guide.* [Online]. Available at: https://www.w3.org/WAI/ARIA/apg [Accessed 2 November 2026].


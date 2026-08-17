# Koganecho Pavilion Homepage Design Spec

Date: 2026-08-03
Project: Koganecho Pavilion promotional website for Gwangju Biennale Pavilion 2026

## 1. Goal

Build a GitHub Pages-ready promotional website for Koganecho Pavilion, linked from the Koganecho website. The first release must communicate the pavilion identity, guide visitors into Part 1 and Part 2, and provide enough structured information for both general visitors and art professionals.

The site must use the provided `doc/` materials, especially:

- `doc/코가네쵸파빌리온홍보페이지 구축.pptx`
- `doc/DESIGN-figma.md`
- exhibition proposal PDFs
- artist, institution, image, and logo materials under `doc/002 기관별 자료/`, `doc/003 아티스트 자료/`, and `doc/전시정보/`

The PPT should guide the page structure and visual language, but the website must not be a direct copy.

## 2. Primary Audience

The site serves two primary audiences:

- General visitors who need to understand the exhibition quickly, including period, venue, and the difference between Part 1 and Part 2.
- Art professionals, curators, and institution staff who need to understand the pavilion concept, participating artists, participating institutions, and the wider Asian art network.

Press and partner users are secondary audiences. Their needs are addressed through clear basic information, bilingual text, and usable images/captions where available.

## 3. Release Scope

Use a staged release approach.

### First Release

The first public version includes:

- Main page
- Part 1 page
- Part 2 page
- Participating artist list
- Participating institution list
- Korean and English core content with equal visual hierarchy

### Later Expansion

The information architecture must allow these later additions:

- Artist detail pages
- Artwork image slideshow pages
- Institution detail pages
- Expandable institution image/archive sections
- Additional archive/program pages if materials become ready

## 4. Information Architecture

### Main Page

The main page must treat both pavilion explanation and Part 1 / Part 2 entry banners as primary content.

Recommended first-view order:

1. Top label: `Gwangju Biennale Pavilion 2026`
2. Menu button in the upper-right
3. Large bilingual title:
   - `Koganecho Pavilion`
   - `코가네쵸 파빌리온`
4. Pavilion overview block in Korean and English
5. Two large entry banners:
   - Part 1: Artist Exhibition
   - Part 2: Archive Exhibition
6. Compact metadata row:
   - Exhibition period: September 5 - November 15, 2026
   - Venues: Jeon-il Building 245 Citizen Gallery and Gwangju Dong-gu House of Humanities
   - Languages: Korean and English

Below the first view:

1. Pavilion overview in more detail
2. Visit information
3. Part 1 summary and artist list
4. Part 2 summary and institution list
5. Network summary: countries, organizations, artists
6. Footer with organizer/cooperation links and contact information if available

### Part 1 Page

Part 1 focuses on the artist exhibition.

Content:

- Program banner
- Exhibition title and subtitle
- Venue and period
- Curatorial/exhibition overview
- Participating artist list
- Artist cards or rows showing name, country/region, medium, and recommending institution where available
- Later extension point for artist detail pages and artwork slideshows

### Part 2 Page

Part 2 focuses on archive exhibition and participating institutions.

Content:

- Program banner
- Exhibition title and subtitle
- Venue and period
- Archive exhibition overview
- Participating institution list
- Institution cards or rows showing name, region/country, logo/image where available
- Later extension point for institution pages and image/archive expansion

## 5. Visual Direction

The approved direction is a high-impact charcoal exhibition-wall treatment.

Core design rules:

- Primary background: charcoal / near-black
- Primary text: warm off-white
- Part 1 / Part 2 action blocks: strong blue, referencing the PPT banners
- Structural outlines: green line system, referencing the PPT wireframe boxes
- Layout: large bilingual typography, generous spacing, simple rectangular composition
- Navigation: upper-right menu button, kept visually clear and direct
- Images: use real exhibition, artist, artwork, or institution images where possible to avoid placeholder feel

The design should feel more polished than the PPT while preserving its basic language:

- Keep: large type, blue program banners, green outline boxes, clear page-to-page entry logic
- Change: reduce placeholder feeling, add real content/images, improve mobile behavior, refine typography and spacing

## 6. Bilingual Treatment

Korean and English are both primary languages.

Requirements:

- Core information must appear in both Korean and English.
- Korean and English should have equal visual hierarchy, not a main/sub translation relationship.
- Language display can use paired blocks, stacked bilingual headings, or side-by-side sections on larger screens.
- On mobile, bilingual content should stack cleanly without forcing cramped columns.

Japanese is not in the first-release scope unless a specific required text is later provided.

## 7. Interaction Model

The first release uses simple static-site navigation suitable for GitHub Pages.

Required interactions:

- Menu button opens or reveals navigation links.
- Main page Part 1 banner links to Part 1 page.
- Main page Part 2 banner links to Part 2 page.
- Artist names/cards can link to future detail pages, but first release may keep them as non-clickable cards if details are not ready.
- Institution names/cards can link to future detail pages, but first release may keep them as non-clickable cards if details are not ready.

Avoid complex CMS behavior or runtime backends in the first release.

## 8. Content Source Rules

Use local source documents as the basis for content. Text should be edited for web readability rather than pasted in full.

Content extraction priorities:

1. PPT structure from `doc/코가네쵸파빌리온홍보페이지 구축.pptx`
2. Exhibition overview and curatorial intent from proposal PDFs
3. Part 1 artist exhibition details from `doc/전시정보/파트1 아티스트 전시/`
4. Part 2 archive exhibition details from `doc/전시정보/파트2 아카이브 전시/`
5. Artist and institution names, biographies, images, logos, and captions from `doc/002 기관별 자료/` and `doc/003 아티스트 자료/`

Long proposal text should become concise web copy. Full detail can be added later through detail pages or downloadable references if needed.

## 9. Responsive Behavior

Desktop:

- First view may use a two-column layout: title/overview on one side, Part 1 / Part 2 banners on the other.
- Lists can use grids if enough space is available.

Mobile:

- First view stacks in this order:
  1. Top label and menu
  2. Bilingual title
  3. Pavilion overview
  4. Part 1 banner
  5. Part 2 banner
  6. Compact metadata
- Lists become single-column.
- Text must not overlap, shrink unpredictably, or require horizontal scrolling.

## 10. Accessibility And Readability

Because the approved visual direction uses a dark background, contrast must be treated as a core requirement.

Requirements:

- Body text must use warm off-white or high-contrast panels.
- Long text sections need generous line-height and width limits.
- Green outline elements must remain visible against charcoal.
- Blue banners must have readable white text.
- Image captions must be legible and visually connected to the image.
- Navigation and link targets must be keyboard accessible.

## 11. Technical Assumptions

The first release should be a static site deployable to GitHub Pages.

Recommended implementation shape:

- Static frontend, likely Vite or equivalent lightweight build setup
- No backend for the first release
- Local content data files for artists, institutions, venues, and program metadata
- Asset directory for selected images/logos
- Routes/pages for main, Part 1, and Part 2

If the final implementation uses GitHub Pages, routing should avoid server-only behavior and should support direct page refreshes.

## 12. Success Criteria

The first release is successful when:

- A visitor understands that this is the Koganecho Pavilion for Gwangju Biennale 2026 within the first screen.
- The pavilion explanation and Part 1 / Part 2 entry banners are both immediately visible or quickly accessible.
- Korean and English are both treated as primary languages.
- General visitors can find period, venues, and program split without searching.
- Art professionals can find participating artists and institutions.
- The visual direction feels high-impact, not like a plain document or raw PPT wireframe.
- The site can be deployed on GitHub Pages without backend services.

## 13. Out Of Scope For First Release

- Full CMS
- Search
- Filter-heavy artist/institution database
- Complete artist detail pages
- Complete artwork slideshow pages
- Complete institution detail pages
- Multilingual Japanese version
- Dynamic program schedule management

These can be added after the first public version is stable.

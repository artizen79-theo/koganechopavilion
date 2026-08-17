// Language State
let currentLang = localStorage.getItem('pavilion_lang') || 'ko';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('pavilion_lang', lang);
  document.querySelectorAll('[data-ko]').forEach(el => {
    if (lang === 'ko') {
      el.innerHTML = el.getAttribute('data-ko');
    } else {
      el.innerHTML = el.getAttribute('data-en');
    }
  });

  // Switch image sources for multilingual banners
  document.querySelectorAll('img[data-src-ko]').forEach(img => {
    const srcKo = img.getAttribute('data-src-ko');
    const srcEn = img.getAttribute('data-src-en');
    if (lang === 'ko' && srcKo) {
      img.src = srcKo;
    } else if (lang === 'en' && srcEn) {
      img.src = srcEn;
    }
  });

  const langBtnText = document.getElementById('lang-btn-text');
  if (langBtnText) {
    langBtnText.textContent = lang === 'ko' ? 'EN / KR' : 'KR / EN';
  }

  // Re-render lists upon language change
  renderPart1Artists();
  renderPart2Institutions();
  renderArtistDetail();
  renderInstitutionDetail();
}

function toggleLanguage() {
  setLanguage(currentLang === 'ko' ? 'en' : 'ko');
}

// Navigation Overlay Toggle
function openNavMenu() {
  const overlay = document.getElementById('nav-overlay');
  if (overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeNavMenu() {
  const overlay = document.getElementById('nav-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ESC Key listener
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeNavMenu();
    closeModal('artist-modal');
    closeModal('institution-modal');
  }
});

// Render Part 1 Participating Artists List (Pure Plain Bold Text Names Only, NO Boxes)
function renderPart1Artists() {
  const container = document.getElementById('part1-artists-grid');
  if (!container || typeof ARTISTS_DATA === 'undefined') return;

  container.innerHTML = ARTISTS_DATA.map(artist => {
    const name = currentLang === 'ko' ? artist.nameKo : artist.nameEn;
    return `
      <a class="artist-plain-name" href="artist.html?id=${artist.id}"
         style="font-size: clamp(1.6rem, 3.5vw, 2.2rem); font-weight: 900; color: #FFFFFF; text-decoration: none; cursor: pointer; padding: 0.85rem 0; transition: all 0.2s ease; border-bottom: 1px solid rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: space-between;"
         onmouseover="this.style.color='var(--accent-green-light)'; this.style.borderColor='var(--accent-green-light)'; this.style.paddingLeft='10px';"
         onmouseout="this.style.color='#FFFFFF'; this.style.borderColor='rgba(255,255,255,0.15)'; this.style.paddingLeft='0px';">
        <span style="font-weight: 900;">${name}</span>
        <span style="font-size: 1.1rem; opacity: 0.5; font-family: var(--font-mono);">→</span>
      </a>
    `;
  }).join('');
}

// Render Part 2 Participating Institutions List (Pure Plain Bold Text Names Only, NO Boxes)
function renderPart2Institutions() {
  const container = document.getElementById('part2-institutions-grid');
  if (!container || typeof INSTITUTIONS_DATA === 'undefined') return;

  container.innerHTML = INSTITUTIONS_DATA.map(inst => {
    const name = currentLang === 'ko' ? (inst.nameShortKo || inst.nameKo) : (inst.nameShortEn || inst.nameEn);
    return `
      <a class="inst-plain-name" href="institution.html?id=${inst.id}"
         style="font-size: clamp(1.25rem, 2.2vw, 1.7rem); font-weight: 900; color: #FFFFFF; text-decoration: none; cursor: pointer; padding: 0.75rem 0; transition: all 0.2s ease; border-bottom: 1px solid rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: space-between;"
         onmouseover="this.style.color='var(--accent-green-light)'; this.style.borderColor='var(--accent-green-light)'; this.style.paddingLeft='10px';"
         onmouseout="this.style.color='#FFFFFF'; this.style.borderColor='rgba(255,255,255,0.15)'; this.style.paddingLeft='0px';">
        <span style="font-weight: 900;">${name}</span>
        <span style="font-size: 1.1rem; opacity: 0.5; font-family: var(--font-mono);">→</span>
      </a>
    `;
  }).join('');
}

// Artist & Institution SNS/website link chips
function renderArtistLinks(links) {
  if (!links || !links.length) return '';
  const icons = {
    website: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
    instagram: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>',
    facebook: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>',
    blog: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>',
    x: '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 1.2h3.7l-8.1 9.3L24 22.8h-7.5l-5.9-7.7-6.7 7.7H.2l8.7-9.9L0 1.2h7.7l5.3 7 6-7zm-1.3 19.4h2L6.6 3.3H4.4l13.2 17.3z"/></svg>',
    email: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>'
  };
  const link = (l) => {
    const icon = icons[l.type] || icons.website;
    const label = l.label || l.url;
    const hrefAttr = l.url.replace(/"/g, '&quot;');
    const ext = l.type === 'email' ? '' : ' target="_blank" rel="noopener"';
    return `<a class="artist-link-chip" href="${hrefAttr}"${ext} title="${hrefAttr}">${icon}<span>${label}</span></a>`;
  };
  return `<div class="artist-links">${links.map(link).join('')}</div>`;
}

// Render Artist Detail Page (artist.html?id=...)
function renderArtistDetail() {
  const container = document.getElementById('artist-detail');
  if (!container || typeof ARTISTS_DATA === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const artist = ARTISTS_DATA.find(a => a.id === id);
  const ko = currentLang === 'ko';

  if (!artist) {
    container.innerHTML = `
      <div class="artist-notfound">
        <p>${ko ? '아티스트 정보를 찾을 수 없습니다.' : 'Artist not found.'}</p>
        <p style="margin-top: 1.5rem; display: flex; justify-content: center;">
          <a class="artist-nav-link list-icon-btn" href="part1.html" title="${ko ? 'Part 1 목록' : 'Part 1 List'}" aria-label="${ko ? 'Part 1 목록' : 'Part 1 List'}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
              <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
              <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
              <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
            </svg>
          </a>
        </p>
      </div>`;
    return;
  }

  const name = ko ? artist.nameKo : artist.nameEn;
  const subName = ko ? artist.nameEn : artist.nameKo;
  const institution = ko ? artist.institutionKo : artist.institutionEn;
  const bio = ko ? artist.bioKo : artist.bioEn;

  document.title = `${name} | 코가네쵸 파빌리온`;

  const artworks = typeof ARTIST_ARTWORKS !== 'undefined' ? (ARTIST_ARTWORKS[artist.id] || []) : [];
  const galleryTitle = ko ? '작품 이미지' : 'Works';

  const idx = ARTISTS_DATA.findIndex(a => a.id === id);
  const prev = idx > 0 ? ARTISTS_DATA[idx - 1] : null;
  const next = idx < ARTISTS_DATA.length - 1 ? ARTISTS_DATA[idx + 1] : null;
  const prevName = prev ? (ko ? prev.nameKo : prev.nameEn) : '';
  const nextName = next ? (ko ? next.nameKo : next.nameEn) : '';

  container.innerHTML = `
    <div class="artist-detail">
      ${artist.image ? `
        <div class="artist-detail-img">
          <img src="${artist.image}" alt="${artist.nameKo}">
        </div>` : ''}

      <div class="artist-detail-info">
        <h1 class="artist-detail-name">${name}</h1>
        <div class="artist-detail-subname">${subName}</div>

        <div class="artist-info-row">
          <strong>${ko ? '추천 기관' : 'Institution'}:</strong> ${institution}
        </div>

        <div class="artist-bio-section">
          <h3>${ko ? '프로필' : 'Profile'}</h3>
          <p>${bio}</p>
        </div>

        ${renderArtistLinks(artist.links)}
      </div>
    </div>

    ${artworks.length ? `
      <section class="artist-gallery">
        <div class="artist-gallery-grid">
          ${artworks.map((item, index) => {
            const a = typeof item === 'string' ? { thumb: item, large: item } : item;
            const capAttr = (a.caption || '').replace(/"/g, '&quot;');
            return `
            <button type="button" class="artist-gallery-item" data-large="${a.large}" data-caption="${capAttr}" data-index="${index}" aria-label="${name} ${galleryTitle} ${index + 1} ${ko ? '확대 보기' : 'view large'}">
              <img src="${a.thumb}" alt="${name} ${galleryTitle} ${index + 1}" loading="lazy">
              <span class="gallery-expand" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
              </span>
              <figcaption>${String(index + 1).padStart(2, '0')}</figcaption>
            </button>`;
          }).join('')}
        </div>
      </section>` : ''}

    <div class="artist-nav">
      ${prev ? `<a class="artist-nav-link prev" href="artist.html?id=${prev.id}">← ${prevName}</a>` : '<span></span>'}
      <a class="artist-nav-link list-icon-btn" href="part1.html" title="${ko ? 'Part 1 목록' : 'Part 1 List'}" aria-label="${ko ? 'Part 1 목록' : 'Part 1 List'}">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
          <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
          <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
          <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
        </svg>
      </a>
      ${next ? `<a class="artist-nav-link next" href="artist.html?id=${next.id}">${nextName} →</a>` : '<span></span>'}
    </div>
  `;
}

// Modal logic with Image support
function openArtistModal(artistId) {
  if (typeof ARTISTS_DATA === 'undefined') return;
  const artist = ARTISTS_DATA.find(a => a.id === artistId);
  if (!artist) return;

  const modal = document.getElementById('artist-modal');
  if (!modal) return;

  document.getElementById('modal-artist-country').textContent = currentLang === 'ko' ? artist.countryKo : artist.countryEn;
  document.getElementById('modal-artist-name').textContent = currentLang === 'ko' ? artist.nameKo : artist.nameEn;
  document.getElementById('modal-artist-subname').textContent = currentLang === 'ko' ? artist.nameEn : artist.nameKo;
  document.getElementById('modal-artist-work').textContent = currentLang === 'ko' ? (artist.workTitleKo || '미정') : (artist.workTitleEn || 'TBD');
  document.getElementById('modal-artist-inst').textContent = currentLang === 'ko' ? artist.institutionKo : artist.institutionEn;
  document.getElementById('modal-artist-medium').textContent = currentLang === 'ko' ? artist.mediumKo : artist.mediumEn;
  document.getElementById('modal-artist-bio').textContent = currentLang === 'ko' ? artist.bioKo : artist.bioEn;

  const imgContainer = document.getElementById('modal-artist-img-wrapper');
  if (imgContainer) {
    if (artist.image) {
      imgContainer.innerHTML = `<img src="${artist.image}" alt="${artist.nameKo}" style="width:100%; max-height:380px; object-fit:contain; border-radius:4px; margin-bottom:1.25rem; border:1px solid var(--border-light); background:var(--bg-card); padding:0.25rem;">`;
    } else {
      imgContainer.innerHTML = '';
    }
  }

  const tagsContainer = document.getElementById('modal-artist-tags');
  if (tagsContainer) {
    tagsContainer.innerHTML = artist.tags.map(t => `<span class="tag-badge">#${t}</span>`).join(' ');
  }

  modal.classList.add('active');
}

// Institution SNS/website link chips
function renderInstitutionLinks(inst) {
  if (!inst) return '';
  const links = [];

  if (inst.website && inst.website.trim()) {
    let url = inst.website.trim();
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    links.push({
      type: 'website',
      url: url,
      label: inst.website.replace(/^https?:\/\//i, '').replace(/\/$/, '')
    });
  }

  if (inst.instagram && inst.instagram.trim()) {
    const handles = inst.instagram.split('/');
    handles.forEach(h => {
      const clean = h.trim().replace(/^@/, '');
      if (clean) {
        links.push({
          type: 'instagram',
          url: `https://www.instagram.com/${clean}/`,
          label: `@${clean}`
        });
      }
    });
  }

  if (inst.facebook && inst.facebook.trim()) {
    let url = inst.facebook.trim();
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    links.push({
      type: 'website',
      url: url,
      label: 'Facebook'
    });
  }

  if (!links.length) return '';
  return renderArtistLinks(links);
}

// Render Institution Detail Page (institution.html?id=...)
function renderInstitutionDetail() {
  const container = document.getElementById('institution-detail');
  if (!container || typeof INSTITUTIONS_DATA === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || 'koganecho';
  const inst = INSTITUTIONS_DATA.find(i => i.id === id);
  const ko = currentLang === 'ko';

  if (!inst) {
    container.innerHTML = `
      <div class="artist-notfound">
        <p>${ko ? '기관 정보를 찾을 수 없습니다.' : 'Institution not found.'}</p>
        <p style="margin-top: 1.5rem; display: flex; justify-content: center;">
          <a class="artist-nav-link list-icon-btn" href="part2.html" title="${ko ? 'Part 2 목록' : 'Part 2 List'}" aria-label="${ko ? 'Part 2 목록' : 'Part 2 List'}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
              <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
              <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
              <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
            </svg>
          </a>
        </p>
      </div>`;
    return;
  }

  const name = ko ? inst.nameKo : inst.nameEn;
  const subName = ko ? inst.nameEn : inst.nameKo;
  const region = ko ? `${inst.countryKo} (${inst.regionKo})` : `${inst.countryEn} (${inst.regionEn})`;
  const role = ko ? inst.roleKo : inst.roleEn;
  const director = ko ? inst.directorKo : inst.directorEn;
  const desc = ko ? inst.descriptionKo : inst.descriptionEn;

  document.title = `${name} | 코가네쵸 파빌리온`;

  const images = typeof INSTITUTION_IMAGES !== 'undefined' ? (INSTITUTION_IMAGES[inst.id] || []) : [];
  const galleryTitle = ko ? '기관 이미지' : 'Gallery';

  const idx = INSTITUTIONS_DATA.findIndex(i => i.id === id);
  const prev = idx > 0 ? INSTITUTIONS_DATA[idx - 1] : null;
  const next = idx < INSTITUTIONS_DATA.length - 1 ? INSTITUTIONS_DATA[idx + 1] : null;
  const prevName = prev ? (ko ? (prev.nameShortKo || prev.nameKo) : (prev.nameShortEn || prev.nameEn)) : '';
  const nextName = next ? (ko ? (next.nameShortKo || next.nameKo) : (next.nameShortEn || next.nameEn)) : '';

  container.innerHTML = `
    <div class="artist-detail" style="grid-template-columns: minmax(0, 1fr);">
      <div class="artist-detail-info">
        <div class="artist-meta">
          <span class="artist-country">${region}</span>
          ${role ? `<span class="artist-medium">${role}</span>` : ''}
        </div>

        <h1 class="artist-detail-name">${name}</h1>
        <div class="artist-detail-subname">${subName}</div>

        ${director ? `
          <div class="artist-info-row" style="margin-bottom: 0.9rem;">
            <strong>${ko ? '대표 / 디렉터' : 'Director'}:</strong> ${director}
          </div>` : ''}

        <div class="artist-bio-section">
          <h3>${ko ? '기관 소개' : 'About Institution'}</h3>
          <p>${desc}</p>
        </div>

        ${renderArtistLinks(inst.links)}
      </div>
    </div>

    ${images.length ? `
      <section class="artist-gallery">
        <div class="artist-gallery-grid">
          ${images.map((item, index) => {
            const a = typeof item === 'string' ? { thumb: item, large: item } : item;
            return `
            <button type="button" class="artist-gallery-item" data-large="${a.large}" data-index="${index}" aria-label="${name} ${galleryTitle} ${index + 1} ${ko ? '확대 보기' : 'view large'}">
              <img src="${a.thumb}" alt="${name} ${galleryTitle} ${index + 1}" loading="lazy">
              <span class="gallery-expand" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
              </span>
              <figcaption>${String(index + 1).padStart(2, '0')}</figcaption>
            </button>`;
          }).join('')}
        </div>
      </section>` : ''}

    <div class="artist-nav">
      ${prev ? `<a class="artist-nav-link prev" href="institution.html?id=${prev.id}">← ${prevName}</a>` : '<span></span>'}
      <a class="artist-nav-link list-icon-btn" href="part2.html" title="${ko ? 'Part 2 목록' : 'Part 2 List'}" aria-label="${ko ? 'Part 2 목록' : 'Part 2 List'}">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
          <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
          <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
          <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
        </svg>
      </a>
      ${next ? `<a class="artist-nav-link next" href="institution.html?id=${next.id}">${nextName} →</a>` : '<span></span>'}
    </div>
  `;
}

function openInstitutionModal(instId) {
  if (typeof INSTITUTIONS_DATA === 'undefined') return;
  const inst = INSTITUTIONS_DATA.find(i => i.id === instId);
  if (!inst) return;

  const modal = document.getElementById('institution-modal');
  if (!modal) return;

  document.getElementById('modal-inst-region').textContent = currentLang === 'ko' ? `${inst.countryKo} (${inst.regionKo})` : `${inst.countryEn} (${inst.regionEn})`;
  document.getElementById('modal-inst-name').textContent = currentLang === 'ko' ? inst.nameKo : inst.nameEn;
  document.getElementById('modal-inst-subname').textContent = currentLang === 'ko' ? inst.nameEn : inst.nameKo;
  document.getElementById('modal-inst-role').textContent = currentLang === 'ko' ? inst.roleKo : inst.roleEn;
  document.getElementById('modal-inst-desc').textContent = currentLang === 'ko' ? inst.descriptionKo : inst.descriptionEn;

  const linksContainer = document.getElementById('modal-inst-links');
  if (linksContainer) {
    linksContainer.innerHTML = renderInstitutionLinks(inst);
  }

  const imgContainer = document.getElementById('modal-inst-img-wrapper');
  if (imgContainer) {
    if (inst.image) {
      imgContainer.innerHTML = `<img src="${inst.image}" alt="${inst.nameKo}" style="width:100%; max-height:280px; object-fit:cover; border-radius:4px; margin-bottom:1.25rem; border:1px solid var(--border-light);">`;
    } else {
      imgContainer.innerHTML = '';
    }
  }

  modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

// ===================== Lightbox (artwork image viewer) =====================
let lbImages = [];
let lbIndex = 0;

function ensureLightbox() {
  if (document.getElementById('lightbox')) return;
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.id = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.innerHTML = `
    <button type="button" class="lightbox-btn lightbox-close" aria-label="${currentLang === 'ko' ? '닫기' : 'Close'}">✕</button>
    <button type="button" class="lightbox-btn lightbox-nav prev" aria-label="${currentLang === 'ko' ? '이전' : 'Previous'}">‹</button>
    <div class="lightbox-stage">
      <img class="lightbox-img" id="lightbox-img" alt="">
      <div id="lightbox-caption" class="lightbox-caption"></div>
    </div>
    <button type="button" class="lightbox-btn lightbox-nav next" aria-label="${currentLang === 'ko' ? '다음' : 'Next'}">›</button>
  `;
  document.body.appendChild(lb);

  lb.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lb.querySelector('.lightbox-nav.prev').addEventListener('click', () => lbStep(-1));
  lb.querySelector('.lightbox-nav.next').addEventListener('click', () => lbStep(1));

  // click backdrop to close
  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLightbox();
  });

  // touch swipe
  let touchX = null;
  lb.addEventListener('touchstart', (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) lbStep(dx < 0 ? 1 : -1);
    touchX = null;
  }, { passive: true });
}

function openLightbox(images, startIndex) {
  lbImages = images;
  lbIndex = startIndex;
  ensureLightbox();
  const lb = document.getElementById('lightbox');
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
  lbRender();
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb && lb.classList.contains('active')) {
    lb.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function lbStep(delta) {
  if (!lbImages.length) return;
  lbIndex = (lbIndex + delta + lbImages.length) % lbImages.length;
  lbRender();
}

function lbRender() {
  const img = document.getElementById('lightbox-img');
  const captionEl = document.getElementById('lightbox-caption');
  const item = lbImages[lbIndex];
  const large = typeof item === 'string' ? item : item.large;
  const caption = (typeof item === 'object' && item.caption) ? item.caption : '';
  img.classList.add('loading');
  const loader = () => img.classList.remove('loading');
  img.addEventListener('load', loader, { once: true });
  img.src = large;
  if (captionEl) {
    captionEl.textContent = caption;
    captionEl.style.display = caption ? 'block' : 'none';
  }
}

// thumbnail click → open lightbox
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.artist-gallery-item');
  if (!btn) return;
  const grid = btn.closest('.artist-gallery-grid');
  if (!grid) return;
  const items = [...grid.querySelectorAll('.artist-gallery-item')];
  const images = items.map(it => ({
    large: it.dataset.large,
    caption: it.dataset.caption || ''
  }));
  openLightbox(images, Number(btn.dataset.index));
});

// lightbox arrow-key navigation
document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('lightbox');
  if (!lb || !lb.classList.contains('active')) return;
  if (e.key === 'ArrowLeft') lbStep(-1);
  else if (e.key === 'ArrowRight') lbStep(1);
});

// Collapsible Section Toggle (큐레토리얼 텍스트 / 참여 작가 접기·펼치기)
function toggleSection(headerEl) {
  const content = headerEl.nextElementSibling;
  const toggle = headerEl.querySelector('.section-toggle');
  if (!content) return;
  const isCollapsed = content.classList.toggle('collapsed');
  if (toggle) {
    toggle.textContent = isCollapsed ? '+' : '−';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
});

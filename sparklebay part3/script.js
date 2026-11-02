/* ==========================================================================
   SparkleBay Mobile Car Wash — script.js (Part 3)
   Vanilla JavaScript, loaded with `defer` on every page.
   Sections: 1 Data | 2 Helpers | 3 UI (tabs, accordion, reveal, lightbox)
             4 Dynamic services + search | 5 Validation | 6 Forms | 7 Map
   ========================================================================== */
'use strict';

/* ---------- 1. Data ---------- */
const RECIPIENT = 'info@sparklebay.com'; // contact form email goes here
const BASE_COORDS = [-26.2041, 28.0473]; // Johannesburg (placeholder hub)
const SERVICES = [
  { id: 'exterior-wash', name: 'Exterior Wash', category: 'Exterior', minutes: 30, price: 20, desc: 'Hand wash and dry of the exterior of your car.' },
  { id: 'interior-detailing', name: 'Interior Detailing', category: 'Interior', minutes: 60, price: 50, desc: 'Deep cleaning of the interior, including vacuuming and wiping down surfaces.' },
  { id: 'full-service-detail', name: 'Full Service Detail', category: 'Full valet', minutes: 120, price: 100, desc: 'Complete interior and exterior detailing.' },
  { id: 'waxing', name: 'Waxing', category: 'Exterior', minutes: 45, price: 30, desc: 'Application of wax to protect the paint and enhance shine.' },
  { id: 'engine-bay-cleaning', name: 'Engine Bay Cleaning', category: 'Engine', minutes: 45, price: 40, desc: 'Careful, thorough degreasing.' },
  { id: 'headlight-restoration', name: 'Headlight Restoration', category: 'Exterior', minutes: 30, price: 25, desc: 'Restoring clarity to foggy or yellowed headlights.' }
];

/* ---------- 2. Helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const rand = n => 'R' + (Number.isInteger(n) ? n : n.toFixed(2));
const el = (tag, cls, text) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text; // textContent = no HTML injection
  return e;
};

/* Images: if a local file is missing, fall back to the remote copy */
function initImageFallback() {
  const swap = img => {
    if (img.dataset.fallback && img.src !== img.dataset.fallback) img.src = img.dataset.fallback;
  };
  document.addEventListener('error', e => { if (e.target.tagName === 'IMG') swap(e.target); }, true);
  $$('img[data-fallback]').forEach(i => { if (i.complete && i.naturalWidth === 0) swap(i); });
}

/* Dropdowns that list services (booking + enquiry) are built from SERVICES */
function populateServiceSelects() {
  const wanted = new URLSearchParams(location.search).get('service');
  $$('select[data-services]').forEach(sel => {
    SERVICES.forEach(s => {
      const o = new Option(`${s.name} — ${rand(s.price)}`, s.id);
      o.dataset.price = s.price;
      o.dataset.minutes = s.minutes;
      sel.add(o);
    });
    if (wanted && SERVICES.some(s => s.id === wanted)) sel.value = wanted;
    const hint = $('[data-price-hint]');
    const show = () => {
      const s = SERVICES.find(x => x.id === sel.value);
      if (hint) hint.textContent = s ? `${s.desc} Takes about ${s.minutes} min. From ${rand(s.price)}.` : '';
    };
    sel.addEventListener('change', show);
    show();
  });
  // Date pickers cannot go into the past
  const today = new Date().toISOString().slice(0, 10);
  $$('input[type="date"]').forEach(d => d.setAttribute('min', today));
}

/* ---------- 3. UI components ---------- */

/* 3.1 Tabs (About page) — keyboard accessible, content visible without JS */
function initTabs() {
  $$('[data-tabs]').forEach(wrap => {
    const tabs = $$('[role="tab"]', wrap);
    const panels = $$('[role="tabpanel"]', wrap);
    const show = tab => {
      tabs.forEach(t => {
        const on = t === tab;
        t.setAttribute('aria-selected', on);
        t.tabIndex = on ? 0 : -1;
      });
      panels.forEach(p => { p.hidden = p.id !== tab.getAttribute('aria-controls'); });
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => show(t));
      t.addEventListener('keydown', e => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
        next.focus();
        show(next);
      });
    });
    show(tabs[0]);
  });
}

/* 3.2 Accordion (Services FAQ) — one panel open at a time, animated by CSS */
function initAccordion() {
  $$('.accordion').forEach(acc => {
    const triggers = $$('.accordion-trigger', acc);
    triggers.forEach(btn => btn.addEventListener('click', () => {
      const wasOpen = btn.getAttribute('aria-expanded') === 'true';
      triggers.forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        $('#' + b.getAttribute('aria-controls')).classList.remove('open');
      });
      if (!wasOpen) {
        btn.setAttribute('aria-expanded', 'true');
        $('#' + btn.getAttribute('aria-controls')).classList.add('open');
      }
    }));
  });
}

/* 3.3 Scroll reveal animation (CSS transition + IntersectionObserver) */
function initReveal() {
  const items = $$('[data-reveal]');
  if (!items.length || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('visible');
      io.unobserve(en.target);
      // remove helper classes afterwards so card hover effects work normally
      setTimeout(() => en.target.classList.remove('reveal', 'visible'), 800);
    });
  }, { threshold: 0.12 });
  items.forEach(i => { i.classList.add('reveal'); io.observe(i); });
}

/* 3.4 Gallery lightbox — Esc closes, arrows navigate, focus is returned */
function initLightbox() {
  const links = $$('a[data-lightbox]');
  if (!links.length) return;
  const box = el('div', 'lightbox');
  box.hidden = true;
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Image viewer');
  box.innerHTML = '<button type="button" class="lb-close" aria-label="Close image viewer">&times;</button>' +
    '<button type="button" class="lb-nav lb-prev" aria-label="Previous image">&#10094;</button>' +
    '<figure><img alt=""><figcaption></figcaption></figure>' +
    '<button type="button" class="lb-nav lb-next" aria-label="Next image">&#10095;</button>';
  document.body.appendChild(box);
  const img = $('img', box), cap = $('figcaption', box), closeBtn = $('.lb-close', box);
  let index = 0, opener = null;

  const render = () => {
    const a = links[index];
    img.dataset.fallback = a.dataset.fallback || '';
    img.src = a.getAttribute('href');
    img.alt = $('img', a).alt;
    cap.textContent = a.dataset.caption || img.alt;
  };
  const open = i => { opener = links[i]; index = i; render(); box.hidden = false; document.body.style.overflow = 'hidden'; closeBtn.focus(); };
  const close = () => { box.hidden = true; document.body.style.overflow = ''; if (opener) opener.focus(); };
  const step = d => { index = (index + d + links.length) % links.length; render(); };

  links.forEach((a, i) => a.addEventListener('click', e => { e.preventDefault(); open(i); }));
  closeBtn.addEventListener('click', close);
  $('.lb-prev', box).addEventListener('click', () => step(-1));
  $('.lb-next', box).addEventListener('click', () => step(1));
  box.addEventListener('click', e => { if (e.target === box) close(); });
  document.addEventListener('keydown', e => {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });
}

/* ---------- 4. Dynamic services table with search / filter / sort ---------- */
function initServices() {
  const body = $('#service-rows');
  if (!body) return;
  const q = $('#service-search'), cat = $('#service-category'), sort = $('#service-sort'), count = $('#service-count');
  [...new Set(SERVICES.map(s => s.category))].forEach(c => cat.add(new Option(c, c)));

  const row = s => {
    const tr = el('tr');
    tr.append(el('td', '', s.name), el('td', '', s.desc), el('td', '', `${s.minutes} min`), el('td', '', rand(s.price)));
    const td = el('td');
    const a = el('a', '', 'Book');
    a.href = 'booking.html?service=' + encodeURIComponent(s.id);
    a.setAttribute('aria-label', 'Book ' + s.name);
    td.appendChild(a);
    tr.appendChild(td);
    return tr;
  };

  const render = () => {
    const term = q.value.trim().toLowerCase();
    const list = SERVICES.filter(s =>
      (cat.value === 'all' || s.category === cat.value) &&
      `${s.name} ${s.desc} ${s.category}`.toLowerCase().includes(term));
    const [key, dir] = sort.value.split('-');
    list.sort((a, b) => (key === 'price' ? a.price - b.price : a.name.localeCompare(b.name)) * (dir === 'desc' ? -1 : 1));
    if (list.length) {
      body.replaceChildren(...list.map(row));
    } else {
      const tr = el('tr'), td = el('td', '', 'No services match your search. Try a different word or choose "All services".');
      td.colSpan = 5;
      tr.appendChild(td);
      body.replaceChildren(tr);
    }
    count.textContent = `Showing ${list.length} of ${SERVICES.length} services`;
  };
  [q, cat, sort].forEach(c => c.addEventListener('input', render));
  $('#service-reset').addEventListener('click', () => { q.value = ''; cat.value = 'all'; sort.value = 'name-asc'; render(); q.focus(); });
  render();
}

/* ---------- 5. Validation ---------- */
const REQUIRED_MSG = {
  name: 'Please enter your name.', email: 'Please enter your email address.',
  phone: 'Please enter your phone number.', service: 'Please choose a service.',
  date: 'Please choose a date.', area: 'Please enter your suburb or area.',
  type: 'Please choose a message type.', vehicle: 'Please choose your vehicle type.',
  vehicles: 'Please enter the number of vehicles.', location: 'Please choose where we should wash.',
  message: 'Please type your message.'
};
// each check returns true when valid, or an error string
const CHECK = {
  name: v => /^[\p{L}'’. -]{2,50}$/u.test(v) || 'Use 2–50 letters only (spaces, hyphens and apostrophes are fine).',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || 'Enter a valid email address, e.g. name@example.com.',
  phone: v => /^(\+27|0)[1-9]\d{8}$/.test(v.replace(/[\s()-]/g, '')) || 'Enter a valid South African number, e.g. 082 123 4567 or +27 82 123 4567.',
  area: v => (v.length >= 2 && v.length <= 60) || 'Area must be 2–60 characters.',
  vehicles: v => (/^\d+$/.test(v) && +v >= 1 && +v <= 50) || 'Enter a whole number between 1 and 50.',
  date: v => {
    const d = new Date(v + 'T00:00:00'), t = new Date(), max = new Date();
    t.setHours(0, 0, 0, 0);
    max.setFullYear(max.getFullYear() + 1);
    if (isNaN(d)) return 'Enter a valid date.';
    if (d < t) return 'The date cannot be in the past.';
    if (d > max) return 'Please choose a date within the next 12 months.';
    return true;
  },
  message: v => (v.length >= 10 && v.length <= 500) || 'Your message must be between 10 and 500 characters.'
};

function fieldError(f) {
  const v = f.value.trim();
  if (!v) return f.required ? (REQUIRED_MSG[f.name] || 'This field is required.') : '';
  const check = CHECK[f.name];
  const r = check ? check(v) : true;
  return r === true ? '' : r;
}

function showError(f, msg) {
  let p = document.getElementById('err-' + f.id);
  if (!p) {
    p = el('p', 'error-msg');
    p.id = 'err-' + f.id;
    p.setAttribute('role', 'alert');
    f.insertAdjacentElement('afterend', p);
    f.setAttribute('aria-describedby', ((f.getAttribute('aria-describedby') || '') + ' ' + p.id).trim());
  }
  p.textContent = msg;
  f.classList.toggle('invalid', !!msg);
  f.setAttribute('aria-invalid', msg ? 'true' : 'false');
}

function status(form, text, type) {
  const s = $('.form-status', form);
  s.className = 'form-status' + (type ? ' ' + type : '');
  s.textContent = text;
  return s;
}

/* Attach client-side validation to a form; run onValid() when everything passes */
function wireForm(form, onValid) {
  form.noValidate = true; // we show our own messages instead of browser bubbles
  const fields = $$('input, select, textarea', form).filter(f => !['submit', 'hidden'].includes(f.type) && !f.name.startsWith('_'));
  fields.forEach(f => {
    f.addEventListener('blur', () => showError(f, fieldError(f)));
    f.addEventListener('input', () => { if (f.classList.contains('invalid')) showError(f, fieldError(f)); });
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    let first = null;
    fields.forEach(f => {
      const msg = fieldError(f);
      showError(f, msg);
      if (msg && !first) first = f;
    });
    if (first) {
      status(form, 'Please fix the highlighted fields and try again.', 'error');
      first.focus();
      return;
    }
    status(form, '');
    onValid();
  });
}

/* ---------- 6. Forms ---------- */

/* 6.1 Booking — AJAX (fetch) submission, page does not reload */
function initBooking() {
  const form = $('#booking-form');
  if (!form) return;
  wireForm(form, async () => {
    const btn = $('[type="submit"]', form);
    btn.disabled = true;
    status(form, 'Sending your booking…', 'info');
    try {
      const endpoint = form.getAttribute('action');
      let ok = true;
      if (endpoint.includes('YOUR_FORM_ID')) {
        await new Promise(r => setTimeout(r, 900)); // demo mode until a real endpoint is added
      } else {
        const res = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        ok = res.ok;
      }
      if (!ok) throw new Error('Server responded with an error');
      const svc = SERVICES.find(s => s.id === form.elements.service.value);
      status(form, `Thank you, ${form.elements.name.value.trim()}! Your ${svc ? svc.name : 'wash'} request for ${form.elements.date.value} has been received. We will confirm by email at ${form.elements.email.value.trim()}.`, 'success');
      form.reset();
      $('[data-price-hint]').textContent = '';
    } catch (err) {
      status(form, 'Sorry, we could not send your booking. Please try again, or email ' + RECIPIENT + '.', 'error');
    } finally {
      btn.disabled = false;
    }
  });
}

/* 6.2 Enquiry — validates, then answers with an estimated cost and availability */
function initEnquiry() {
  const form = $('#enquiry-form');
  if (!form) return;
  wireForm(form, () => {
    const svcOpt = form.elements.service.selectedOptions[0];
    const vehOpt = form.elements.vehicle.selectedOptions[0];
    const n = parseInt(form.elements.vehicles.value, 10);
    const base = (+svcOpt.dataset.price) * (+vehOpt.dataset.mult) * n;
    const discount = n >= 5 ? base * 0.1 : 0;
    const callout = form.elements.location.value === 'mobile' ? 30 : 0;
    const total = base - discount + callout;
    const hours = Math.max(1, Math.ceil((+svcOpt.dataset.minutes * n) / 60));
    const day = new Date(form.elements.date.value + 'T00:00:00').getDay();
    const avail = day === 0 ? 'Closed on Sundays — please pick another day, or we will suggest the nearest slot.'
      : day === 6 ? 'Limited Saturday slots — we will confirm by email within one working day.'
      : 'Slots are available on this day — book now to secure your time.';

    const out = $('#enquiry-result');
    out.replaceChildren();
    out.hidden = false;
    out.appendChild(el('h3', '', `Thanks ${form.elements.name.value.trim()}, here is your estimate`));
    const dl = el('dl', 'quote');
    const add = (k, v) => { dl.append(el('dt', '', k), el('dd', '', v)); };
    add('Service', svcOpt.textContent.split(' — ')[0]);
    add('Vehicles', `${n} × ${vehOpt.textContent}`);
    add('Base price', rand(base));
    if (discount) add('Fleet discount (10%)', '−' + rand(discount));
    if (callout) add('Mobile call-out fee', rand(callout));
    add('Estimated total', rand(total));
    add('Approx. time on site', `${hours} hour${hours > 1 ? 's' : ''}`);
    add('Availability', avail);
    out.appendChild(dl);
    out.appendChild(el('p', '', 'This is an estimate; the final price is confirmed when you book.'));
    const a = el('a', 'btn btn-primary', 'Book this service');
    a.href = 'booking.html?service=' + encodeURIComponent(form.elements.service.value);
    out.appendChild(a);
    out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    out.focus();
  });
}

/* 6.3 Contact — compiles the validated input into an email the visitor sends */
function initContact() {
  const form = $('#contact-form');
  if (!form) return;
  wireForm(form, () => {
    const lines = [
      `Name: ${form.elements.name.value.trim()}`,
      `Email: ${form.elements.email.value.trim()}`,
      `Phone: ${form.elements.phone.value.trim() || 'not provided'}`,
      `Message type: ${form.elements.type.value}`, '', 'Message:', form.elements.message.value.trim()
    ];
    const subject = `[${form.elements.type.value}] Message from ${form.elements.name.value.trim()}`;
    const body = lines.join('\n');
    const out = $('#contact-preview');
    out.replaceChildren(
      el('h3', '', 'Your email is ready'),
      el('p', '', `To: ${RECIPIENT}`),
      el('p', '', `Subject: ${subject}`)
    );
    out.appendChild(el('pre', '', body));
    const a = el('a', 'btn btn-primary', 'Send this email');
    a.href = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    out.appendChild(a);
    out.hidden = false;
    status(form, 'Message validated. Press "Send this email" to open it in your email app.', 'success');
    out.focus();
  });
}

/* ---------- 7. Interactive map (Leaflet + Esri tiles) ---------- */
function initMap() {
  const mapEl = $('#map');
  if (!mapEl || !window.L) return;
  const map = L.map(mapEl, { scrollWheelZoom: false }).setView(BASE_COORDS, 10);
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, HERE, Garmin, OpenStreetMap contributors'
  }).addTo(map);
  L.marker(BASE_COORDS).addTo(map).bindPopup('<strong>SparkleBay</strong><br>Johannesburg service hub').openPopup();
  L.circle(BASE_COORDS, { radius: 20000, color: '#1e97a4', fillColor: '#2fb8c6', fillOpacity: 0.12 })
    .addTo(map).bindTooltip('Mobile service area (about 20 km)');
  map.on('focus', () => map.scrollWheelZoom.enable());
  map.on('blur', () => map.scrollWheelZoom.disable());

  const msg = $('#map-message');
  $('#locate-btn').addEventListener('click', () => { msg.textContent = 'Finding your location…'; map.locate({ setView: true, maxZoom: 12 }); });
  map.on('locationfound', e => {
    L.marker(e.latlng).addTo(map).bindPopup('You are here').openPopup();
    const km = map.distance(e.latlng, BASE_COORDS) / 1000;
    msg.textContent = km <= 20
      ? `You are about ${km.toFixed(1)} km from our hub — inside our mobile service area.`
      : `You are about ${km.toFixed(1)} km from our hub — outside our usual area, contact us for a custom quote.`;
  });
  map.on('locationerror', () => { msg.textContent = 'We could not get your location. Check your browser permissions and try again.'; });
}

/* ---------- Start ---------- */
initImageFallback();
populateServiceSelects();
initTabs();
initAccordion();
initReveal();
initLightbox();
initServices();
initBooking();
initEnquiry();
initContact();
initMap();

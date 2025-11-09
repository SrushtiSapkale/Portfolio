// Tabs + panels
const tabs = document.querySelectorAll('.tab');
const panels = {
  projects: document.getElementById('panel-projects'),
  blog: document.getElementById('panel-blog'),
  osc: document.getElementById('panel-osc'),
  contact: document.getElementById('panel-contact'),
};

function show(target) {
  // toggle active tab
  tabs.forEach(t =>
    t.setAttribute('aria-selected', String(t.dataset.target === target))
  );
  // toggle panels
  Object.entries(panels).forEach(([key, el]) => {
    el.classList.toggle('active', key === target);
  });
  // update hash for deep-linking
  const hash = `#${target}`;
  if (location.hash !== hash) history.replaceState(null, '', hash);
}

// Click to switch
tabs.forEach(tab =>
  tab.addEventListener('click', () => show(tab.dataset.target))
);

// Keyboard support: ArrowLeft/ArrowRight to move between tabs
document.addEventListener('keydown', (e) => {
  if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
  const list = Array.from(tabs);
  const currentIndex = list.findIndex(t => t.getAttribute('aria-selected') === 'true');
  if (currentIndex === -1) return;
  const dir = e.key === 'ArrowRight' ? 1 : -1;
  const next = (currentIndex + dir + list.length) % list.length;
  list[next].focus();
  show(list[next].dataset.target);
});

// Deep-link support: /#blog etc.
const initial = (location.hash || '#projects').replace('#', '');
if (panels[initial]) show(initial);

// Fake contact form submit (no backend)
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  // rudimentary validation
  if (!data.name || !data.email || !data.message) {
    statusEl.textContent = 'Please complete all fields.';
    return;
  }
  statusEl.textContent = 'Thanks! This demo didn\'t actually send — connect to a backend or a form service.';
  form.reset();
});

// Year stamp
document.getElementById('year').textContent = new Date().getFullYear();

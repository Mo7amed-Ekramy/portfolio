'use strict';
const menu = document.querySelector('.menu-button');
const nav = document.querySelector('.nav-links');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); }
menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('is-open', !expanded);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.nav')) closeMenu(); });
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  let count = 0;
  document.querySelectorAll('.project-card').forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    if (!card.hidden) count++;
  });
  document.querySelector('#filter-status').textContent = `${count} projects shown`;
}));
const dialog = document.querySelector('#project-dialog');
let projectData;
async function openProject(button) {
  try {
    button.disabled = true;
    if (!projectData) {
      const response = await fetch('project-data.json');
      if (!response.ok) throw new Error('Project data unavailable');
      projectData = await response.json();
    }
    const project = projectData.find(item => item.id === button.dataset.project);
    if (!project) throw new Error('Project unavailable');
    for (const [id, value] of [['dialog-label', project.label], ['dialog-title', project.name], ['dialog-description', project.description], ['dialog-note', project.note]]) document.getElementById(id).textContent = value;
    document.querySelector('#dialog-highlights').replaceChildren(...project.highlights.map(text => {
      const li = document.createElement('li'); li.textContent = text; return li;
    }));
    const links = [];
    for (const [text, url] of [['View source', project.url], ['Open demo', project.demo]]) {
      if (!url) continue;
      const a = document.createElement('a'); a.href = url; a.textContent = `${text} ↗`;
      a.target = '_blank'; a.rel = 'noopener noreferrer'; a.className = 'button button-mint'; links.push(a);
    }
    document.querySelector('#dialog-links').replaceChildren(...links);
    dialog.showModal(); document.body.classList.add('dialog-open');
  } catch { document.querySelector('#filter-status').textContent = 'Project notes could not load. Please use the source link or try again.';
  } finally { button.disabled = false; }
}
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => openProject(button)));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) {
  const r = dialog.getBoundingClientRect();
  if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
}});
dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText('mohamedekramy2510@gmail.com'); status.textContent = 'Email copied. Thanks for reaching out!';
  } catch { status.textContent = 'Please copy the email address above, or select it to open your email app.'; }
});
document.querySelector('#year').textContent = new Date().getFullYear();

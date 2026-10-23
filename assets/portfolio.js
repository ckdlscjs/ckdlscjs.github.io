(() => {
  const page = document.body;
  const themeButton = document.querySelector('.theme-toggle');
  function applyTheme(theme) {
    page.dataset.theme = theme;
    const dark = theme === 'dark';
    const label = dark ? '밝은 테마로 전환' : '어두운 테마로 전환';
    themeButton.setAttribute('aria-label', label);
    themeButton.title = label;
    themeButton.querySelector('i').className = dark ? 'fas fa-sun' : 'fas fa-moon';
  }
  let savedTheme = 'light';
  try { savedTheme = localStorage.getItem('portfolio-theme') || 'light'; } catch (_) {}
  applyTheme(savedTheme === 'dark' ? 'dark' : 'light');
  themeButton.addEventListener('click', () => {
    const theme = page.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
    try { localStorage.setItem('portfolio-theme', theme); } catch (_) {}
  });
  const filters = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('.project-card');
  filters.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    let count = 0;
    filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    cards.forEach(card => {
      const visible = filter === 'all' || (filter === 'featured' ? card.dataset.featured === 'true' : card.dataset.category === filter);
      card.hidden = !visible;
      if (visible) count++;
    });
    document.getElementById('project-count').textContent = `${count}개 프로젝트`;
  }));
  let trigger = null;
  document.querySelectorAll('[data-dialog]').forEach(button => button.addEventListener('click', () => {
    const dialog = document.getElementById(button.dataset.dialog);
    if (!dialog) return;
    trigger = button;
    dialog.showModal();
    page.style.overflow = 'hidden';
  }));
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      const box = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => {
      page.style.overflow = '';
      trigger?.focus();
    });
  });
})();

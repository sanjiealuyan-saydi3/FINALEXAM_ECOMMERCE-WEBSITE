document.addEventListener('DOMContentLoaded', () => {
  const search = document.getElementById('searchProducts');
  const filter = document.getElementById('styleFilter');
  const sort = document.getElementById('sortProducts');
  const grid = document.getElementById('shopGrid');
  const empty = document.getElementById('emptyState');
  const getItems = () => Array.from(document.querySelectorAll('.shop-item'));

  function updateProducts() {
    const term = (search?.value || '').trim().toLowerCase();
    const style = filter?.value || 'all';
    let shown = 0;
    getItems().forEach(item => {
      const matches = item.dataset.name.includes(term) && (style === 'all' || item.dataset.style === style);
      item.classList.toggle('d-none', !matches);
      if (matches) shown++;
    });
    if (sort && grid) {
      const visible = getItems().filter(el => !el.classList.contains('d-none'));
      visible.sort((a,b) => {
        const pa = Number(a.dataset.price), pb = Number(b.dataset.price);
        if (sort.value === 'low') return pa-pb;
        if (sort.value === 'high') return pb-pa;
        return 0;
      });
      visible.forEach(el => grid.appendChild(el));
    }
    empty?.classList.toggle('d-none', shown > 0);
  }
  search?.addEventListener('input', updateProducts);
  filter?.addEventListener('change', updateProducts);
  sort?.addEventListener('change', updateProducts);

  let bag = [];
  const count = document.getElementById('bagCount');
  function renderBag() { if (count) count.textContent = bag.length; }
  document.querySelectorAll('.add-bag').forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.shop-product');
      const size = card?.querySelector('.size-select')?.value || 'M';
      bag.push({name: button.dataset.product, size});
      renderBag();
      const old = button.textContent;
      button.textContent = 'Added ✓';
      setTimeout(() => button.textContent = old, 900);
    });
  });
  document.getElementById('clearBag')?.addEventListener('click', () => { bag = []; renderBag(); });

  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', event => {
    event.preventDefault();
    const feedback = document.getElementById('contactFeedback');
    feedback.className = 'alert alert-success mt-3';
    feedback.textContent = 'Thanks! This demo form is working visually, but no message was sent or stored.';
    contactForm.reset();
  });
  document.getElementById('newsletterForm')?.addEventListener('submit', event => {
    event.preventDefault();
    alert('Thanks for joining the demo list! No email address was sent or stored.');
    event.target.reset();
  });
});
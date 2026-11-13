/* Trang chủ: chọn form + màu, màu đổi ảnh. Dữ liệu lấy từ blanks.js (window.HP_BLANKS). */
(() => {
  const B = window.HP_BLANKS; if (!B) return;
  const $ = s => document.querySelector(s);
  const tabsEl = $('#formTabs'), swEl = $('#swatches'); if (!tabsEl || !swEl) return;
  const FORMS = [
    ['oversize', 'Oversize', '100% cotton · 250 GSM'],
    ['boxy', 'Boxy', '100% cotton · 250 GSM'],
    ['babytee', 'Baby Tee', '100% cotton · 250 GSM'],
    ['polo', 'Polo', 'Cá sấu co giãn 4 chiều · 250 GSM']
  ];
  const DEFAULTS = { oversize: 'cam-do', boxy: 'do-tuoi', babytee: 'do-cam', polo: 'cam' };
  let form = 'oversize', color = DEFAULTS.oversize;
  const front = $('#imgFront'), back = $('#imgBack'), name = $('#pickName'), spec = $('#pickSpec'), tryBtn = $('#tryBtn');

  const swap = (img, src, alt) => {
    if (img.getAttribute('src') === src) return;
    const pre = new Image();
    pre.onload = () => { img.classList.add('swap'); setTimeout(() => { img.src = src; img.alt = alt; img.classList.remove('swap'); }, 120); };
    pre.src = src;
  };
  const render = () => {
    const list = B[form], c = list.find(x => x.id === color) || list[0];
    const label = FORMS.find(f => f[0] === form);
    swap(front, c.front, label[1] + ' ' + c.name.toLowerCase() + ' mặt trước');
    swap(back, c.back, label[1] + ' ' + c.name.toLowerCase() + ' mặt sau');
    name.textContent = label[1] + ' · ' + c.name;
    spec.textContent = label[2] + '. ' + list.length + ' màu phôi.';
    tabsEl.querySelectorAll('.tab').forEach(b => b.setAttribute('aria-selected', b.dataset.form === form));
    swEl.querySelectorAll('.swatch-btn').forEach(b => b.setAttribute('aria-pressed', b.dataset.id === c.id));
    if (tryBtn) tryBtn.href = 'ai-studio.html#mockup';
    try { window.HP_STATE && window.HP_STATE.set('home_pick', { form, color: c.id }); } catch {}
  };
  const drawSwatches = () => {
    swEl.innerHTML = B[form].map(c =>
      `<button type="button" class="swatch-btn" data-id="${c.id}" style="background:${c.hex}" aria-label="${c.name}" aria-pressed="false"></button>`).join('');
  };
  tabsEl.innerHTML = FORMS.map(f => `<button type="button" class="tab" role="button" data-form="${f[0]}" aria-selected="false">${f[1]}</button>`).join('');
  tabsEl.addEventListener('click', e => {
    const b = e.target.closest('.tab'); if (!b) return;
    form = b.dataset.form;
    const list = B[form]; color = list.some(x => x.id === DEFAULTS[form]) ? DEFAULTS[form] : list[0].id;
    drawSwatches(); render();
  });
  swEl.addEventListener('click', e => {
    const b = e.target.closest('.swatch-btn'); if (!b) return;
    color = b.dataset.id; render();
  });
  drawSwatches(); render();
})();

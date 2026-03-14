// Main system: utility modal binding, event wiring, initialization
function bindUtilityPanels() {
  const navButtons = Array.from(document.querySelectorAll('[data-utility-target]'));
  const panels = Array.from(document.querySelectorAll('.utility-content'));
  const modal = document.getElementById('utilityModal');
  const modalTitle = document.getElementById('utilityModalTitle');
  const closeBtn = document.getElementById('closeUtilityModalBtn');
  const backdrop = document.querySelector('[data-close-utility-modal]');

  const openPanel = (targetId, openModal = true) => {
    navButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.utilityTarget === targetId));
    panels.forEach((panel) => panel.classList.toggle('active', panel.id === targetId));
    const activeBtn = navButtons.find((btn) => btn.dataset.utilityTarget === targetId);
    const activePanel = panels.find((panel) => panel.id === targetId);
    if (modalTitle) modalTitle.textContent = activeBtn ? `${activeBtn.textContent.trim()}` : (activePanel?.querySelector('.section-mini-title')?.textContent || '功能視窗');
    if (openModal && modal) {
      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    }
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  navButtons.forEach((btn) => {
    btn.addEventListener('click', () => openPanel(btn.dataset.utilityTarget, true));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  if (navButtons[0]) openPanel(navButtons[0].dataset.utilityTarget, false);
}

function bindEvents() {
  document.body.addEventListener('click', (e) => {
    const actionEl = e.target.closest('[data-action]');
    const battleEl = e.target.closest('[data-battle]');
    const skillEl = e.target.closest('[data-skill]');
    const itemEl = e.target.closest('[data-item]');
    const mapTravel = e.target.closest('[data-map-travel]');
    const evolveBtn = e.target.closest('[data-evolve-from]');
    const menuSkillBtn = e.target.closest('[data-menu-skill]');
    const itemUseBtn = e.target.closest('[data-item-use]');
    const statPlusBtn = e.target.closest('[data-stat-plus]');
    const jobLearnBtn = e.target.closest('[data-job-learn]');
    const jobEquipBtn = e.target.closest('[data-job-equip]');

    if (actionEl) handleAction(actionEl.dataset.action);
    else if (battleEl) handleBattleAction(battleEl.dataset.battle);
    else if (skillEl) useSkillInBattle(skillEl.dataset.skill);
    else if (itemEl) {
      useItem(itemEl.dataset.item);
      if (state.battle) enemyTurn();
    } else if (mapTravel) moveTo(mapTravel.dataset.mapTravel);
    else if (evolveBtn) evolveSkill(evolveBtn.dataset.evolveFrom, evolveBtn.dataset.evolveTo);
    else if (menuSkillBtn) useSkillFromMenu(menuSkillBtn.dataset.menuSkill);
    else if (itemUseBtn) useItem(itemUseBtn.dataset.itemUse);
    else if (statPlusBtn) applyStatPoint(statPlusBtn.dataset.statPlus);
    else if (jobLearnBtn) learnJob(jobLearnBtn.dataset.jobLearn);
    else if (jobEquipBtn) equipJob(jobEquipBtn.dataset.jobEquip);
  });

  els.saveBtn.addEventListener('click', () => saveGame(true));
  els.loadBtn.addEventListener('click', () => loadGame(true));
  els.exportBtn.addEventListener('click', exportSave);
  els.importBtn.addEventListener('click', () => els.importInput.click());
  els.importInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) importSave(e.target.files[0]);
    e.target.value = '';
  });
  els.newGameBtn.addEventListener('click', () => {
    if (window.confirm('確定要重開新局嗎？目前進度會被新的本機存檔覆蓋。')) newGame();
  });
}

function init() {
  const loaded = loadGame(false);
  if (!loaded) newGame();
  else render();
  bindUtilityPanels();
  bindEvents();
}

init();

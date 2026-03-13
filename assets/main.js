// Main system: tab binding, event wiring, initialization
function bindTabs() {
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach((c) => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
    });
  });
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
  bindTabs();
  bindEvents();
}

init();

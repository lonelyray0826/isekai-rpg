// Save system: local save, export/import, migration bootstrapping
function saveGame(showMessage = true) {
  localStorage.setItem(GD.meta.saveKey, JSON.stringify(state));
  if (showMessage) {
    logEntry('system', '已寫入本機存檔。');
    render();
  }
}

function autoSave() {
  saveGame(false);
}

function loadGame(showMessage = true) {
  const raw = localStorage.getItem(GD.meta.saveKey);
  if (!raw) {
    if (showMessage) {
      logEntry('system', '目前沒有可讀取的本機存檔。');
      render();
    }
    return false;
  }
  try {
    state = JSON.parse(raw);
    syncRuntimeState();
    if (showMessage) logEntry('system', '已讀取本機存檔。');
    render();
    return true;
  } catch (err) {
    console.error(err);
    if (showMessage) {
      logEntry('system', '存檔損毀，無法讀取。');
      render();
    }
    return false;
  }
}

function exportSave() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `灰燼裂隙_Beta_v2_5_Save_${state.raceName || '未知'}_Lv${state.level}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  logEntry('system', '已匯出存檔檔案。');
  render();
}

function importSave(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      state = JSON.parse(reader.result);
      syncRuntimeState();
      saveGame(false);
      logEntry('system', '匯入成功，並已覆蓋目前本機存檔。');
      render();
    } catch (err) {
      console.error(err);
      logEntry('system', '匯入失敗，請確認檔案為此遊戲匯出的 JSON 存檔。');
      render();
    }
  };
  reader.readAsText(file);
}

function syncRuntimeState() {
  const starter = GD.startingState();
  if (!state.version) state.version = GD.meta.version;
  if (!state.log) state.log = [];
  if (!state.ui) state.ui = clone(starter.ui || { mode: null });
  if (typeof state.ui.mode === 'undefined') state.ui.mode = null;
  if (typeof state.ui.sceneFocus === 'undefined') state.ui.sceneFocus = null;
  if (!state.view) state.view = clone(starter.view || { nodeId: null });
  if (typeof state.view.nodeId === 'undefined') state.view.nodeId = (starter.view && starter.view.nodeId) || null;
  if (!state.inventory) state.inventory = clone(starter.inventory);
  Object.entries(starter.inventory).forEach(([id, qty]) => {
    if (typeof state.inventory[id] !== 'number') state.inventory[id] = qty;
  });
  if (!state.skills) state.skills = clone(starter.skills);
  Object.entries(starter.skills).forEach(([id, node]) => {
    if (!state.skills[id]) state.skills[id] = clone(node);
  });
  if (!state.quests) state.quests = clone(starter.quests);
  Object.entries(starter.quests).forEach(([id, node]) => {
    if (!state.quests[id]) state.quests[id] = clone(node);
  });
  if (!state.flags) state.flags = clone(starter.flags);
  Object.entries(starter.flags).forEach(([id, value]) => {
    if (typeof state.flags[id] === 'undefined') state.flags[id] = value;
  });
  if (!state.jobs) state.jobs = clone(starter.jobs || {});
  Object.entries(starter.jobs || {}).forEach(([id, node]) => {
    if (!state.jobs[id]) state.jobs[id] = clone(node);
  });
  if (!state.records) state.records = clone(starter.records || {});
  Object.entries(starter.records || {}).forEach(([id, val]) => {
    if (typeof state.records[id] === 'undefined') state.records[id] = val;
  });
  if (typeof state.currentJob === 'undefined') state.currentJob = starter.currentJob || null;
  if (typeof state.originClass === 'undefined') state.originClass = starter.originClass || '平民';
  if (typeof state.heldObject === 'undefined') state.heldObject = starter.heldObject || null;
  if (typeof state.gameOver === 'undefined') state.gameOver = starter.gameOver || null;
  if (!state.guild) state.guild = clone(starter.guild);
  if (!state.guild.commissions) state.guild.commissions = {};
  Object.keys(starter.guild.commissions).forEach((id) => {
    if (!state.guild.commissions[id]) state.guild.commissions[id] = clone(starter.guild.commissions[id]);
  });
  if (!state.recentCorpse) state.recentCorpse = null;
  if (state.recentCorpse && !state.recentCorpse.harvestedParts) state.recentCorpse.harvestedParts = {};

  if (!state.resources) state.resources = {};
  Object.entries(starter.resources).forEach(([id, val]) => {
    if (typeof state.resources[id] !== 'number') state.resources[id] = val;
  });

  if (!state.originData && typeof createOriginStartState === 'function') {
    const fresh = createOriginStartState();
    state.originData = fresh.originData;
    state.raceId = fresh.raceId;
    state.raceName = fresh.raceName;
    state.birthOriginId = fresh.birthOriginId;
    state.birthOriginName = fresh.birthOriginName;
    state.growthStage = fresh.growthStage;
    state.growthProfile = fresh.growthProfile;
  }
  if (typeof ensureSurvivalState === 'function') ensureSurvivalState();
  if (typeof ensureProfessionState === 'function') ensureProfessionState();
  if (typeof ensureSkillDiscoveryState === 'function') ensureSkillDiscoveryState();
  if (typeof ensurePerceptionState === 'function') ensurePerceptionState();

  Object.keys(GD.locations).forEach((id) => {
    if (id === 'riftmoor') GD.locations[id].unlocked = !!state.flags.rift_path_unlocked;
  });
  recalcDerived();
  syncQuestProgress();
}

function newGame() {
  state = typeof createOriginStartState === 'function' ? createOriginStartState() : GD.startingState();
  state.gameOver = null;
  state.heldObject = null;
  if (state.ui) state.ui.sceneFocus = null;
  syncRuntimeState();
  const d = recalcDerived();
  state.resources.hp = d.maxHp;
  state.resources.sp = d.maxSp;
  state.resources.mp = d.maxMp;
  saveGame(false);
  render();
}

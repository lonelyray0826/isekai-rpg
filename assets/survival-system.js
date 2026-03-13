// Survival system: satiety / hunger handling
function getSatietyMax() {
  return 100;
}

function ensureSurvivalState() {
  if (!state.resources) state.resources = {};
  if (typeof state.resources.satiety !== 'number') state.resources.satiety = 78;
  state.resources.satiety = clamp(state.resources.satiety, 0, getSatietyMax());
}

function getSatietyTier() {
  ensureSurvivalState();
  const v = state.resources.satiety;
  if (v >= 75) return { key: 'full', label: '飽足', maxSpPenaltyPct: 0, hitPenalty: 0, evaPenalty: 0, patkPenalty: 0, matkPenalty: 0 };
  if (v >= 45) return { key: 'normal', label: '普通', maxSpPenaltyPct: 0, hitPenalty: 0, evaPenalty: 0, patkPenalty: 0, matkPenalty: 0 };
  if (v >= 20) return { key: 'hungry', label: '飢餓', maxSpPenaltyPct: 0.15, hitPenalty: 3, evaPenalty: 3, patkPenalty: 1, matkPenalty: 1 };
  if (v >= 1) return { key: 'starving', label: '虛弱', maxSpPenaltyPct: 0.3, hitPenalty: 8, evaPenalty: 6, patkPenalty: 2, matkPenalty: 2 };
  return { key: 'collapse', label: '瀕餓', maxSpPenaltyPct: 0.4, hitPenalty: 12, evaPenalty: 10, patkPenalty: 4, matkPenalty: 4 };
}

function getSatietyEffects() {
  return getSatietyTier();
}

function restoreSatiety(amount, reason = '') {
  ensureSurvivalState();
  if (amount <= 0) return;
  const before = state.resources.satiety;
  state.resources.satiety = clamp(state.resources.satiety + amount, 0, getSatietyMax());
  const diff = state.resources.satiety - before;
  if (diff > 0 && reason) logEntry('system', `${reason}，飽食度恢復 ${diff}。`);
}

function spendSatiety(amount, reason = '', silent = true) {
  ensureSurvivalState();
  if (amount <= 0) return 0;
  const beforeTier = getSatietyTier().label;
  const before = state.resources.satiety;
  state.resources.satiety = clamp(state.resources.satiety - amount, 0, getSatietyMax());
  const diff = before - state.resources.satiety;
  const afterTier = getSatietyTier().label;
  if (!silent && diff > 0 && reason) logEntry('system', `${reason}，飽食度下降 ${diff}。`);
  if (beforeTier !== afterTier) logEntry('system', `你的身體狀態變為【${afterTier}】。`);
  return diff;
}

function applyStarvationPenalty(turns = 1) {
  ensureSurvivalState();
  if (state.resources.satiety > 0) return;
  const loss = 4 * Math.max(1, turns);
  const cap = getResourceCap('hp') || recalcDerived().maxHp;
  state.resources.hp = clamp((state.resources.hp || cap) - loss, 0, cap);
  logEntry('battle', `飢餓侵蝕你的身體，你失去 ${loss} 點生命。`);
}

function applyTimeSatietyCost(turns = 1, reason = '時間流逝') {
  ensureSurvivalState();
  const fx = typeof getProfessionEffects === 'function' ? getProfessionEffects() : { satietyDecayReduction: 0 };
  const cost = Math.max(1, Math.floor(6 * turns * (1 - (fx.satietyDecayReduction || 0))));
  spendSatiety(cost, reason, true);
  applyStarvationPenalty(turns);
}

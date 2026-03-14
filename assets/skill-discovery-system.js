// Skill discovery system: lower-tier skills are learned by accumulated practice, not chance
function ensureSkillDiscoveryState() {
  if (!state.skillDiscovery) state.skillDiscovery = {};
  Object.keys(GD.skills || {}).forEach((skillId) => {
    const def = GD.skills[skillId];
    if (!state.skillDiscovery[skillId]) state.skillDiscovery[skillId] = { attempts: {}, discovered: false, practice: 0, lastSource: null };
    if (!state.skillDiscovery[skillId].attempts) state.skillDiscovery[skillId].attempts = {};
    if (typeof state.skillDiscovery[skillId].practice !== 'number') state.skillDiscovery[skillId].practice = 0;
    if (typeof state.skillDiscovery[skillId].discovered !== 'boolean') state.skillDiscovery[skillId].discovered = hasLearnedSkill(skillId);
    if (hasLearnedSkill(skillId) && def.learnThreshold) {
      state.skillDiscovery[skillId].practice = Math.max(state.skillDiscovery[skillId].practice, def.learnThreshold);
      state.skillDiscovery[skillId].discovered = true;
    }
  });
}

function getSkillDiscoveryNode(skillId) {
  ensureSkillDiscoveryState();
  return state.skillDiscovery[skillId];
}

function getSkillLearnConfig(skillId, source) {
  const def = GD.skills?.[skillId];
  if (!def) return null;
  return def.practiceSources?.[source] || def.learnSources?.[source] || null;
}

function getSkillLearnHint(skillId) {
  return GD.skills?.[skillId]?.learnHint || '';
}

function getLearnableSkillsForSource(source) {
  return Object.values(GD.skills || {}).filter((def) => {
    if (hasLearnedSkill(def.id)) return false;
    return !!getSkillLearnConfig(def.id, source);
  });
}

function getSkillLearnThreshold(skillId) {
  return GD.skills?.[skillId]?.learnThreshold || 100;
}

function addSkillPractice(skillId, amount, reason = '') {
  const def = GD.skills?.[skillId];
  if (!def || amount <= 0) return false;
  const node = getSkillDiscoveryNode(skillId);
  if (hasLearnedSkill(skillId)) {
    return gainSkillProficiency(skillId, amount, reason || '持續鍛鍊');
  }
  const before = node.practice || 0;
  const threshold = getSkillLearnThreshold(skillId);
  node.practice = clamp(before + amount, 0, threshold);
  if (node.practice > before) {
    const diff = node.practice - before;
    logEntry('system', `${def.name} 習得熟練 +${diff}${reason ? `（${reason}）` : ''}。`);
  }
  if (before < threshold && node.practice >= threshold) {
    return learnSkill(skillId, node.lastSource || 'practice', { startProficiency: Math.max(80, threshold), sourceLabel: '熟練達標' });
  }
  return false;
}

function learnSkill(skillId, source = 'unknown', config = null) {
  const def = GD.skills[skillId];
  if (!def || hasLearnedSkill(skillId)) return false;
  const cfg = config || getSkillLearnConfig(skillId, source) || {};
  const node = getSkillDiscoveryNode(skillId);
  const threshold = getSkillLearnThreshold(skillId);
  state.skills[skillId] = state.skills[skillId] || { learned: false, equipped: false, proficiency: 0 };
  state.skills[skillId].learned = true;
  state.skills[skillId].equipped = true;
  state.skills[skillId].proficiency = Math.max(state.skills[skillId].proficiency || 0, cfg.startProficiency || threshold || 80);
  node.discovered = true;
  node.practice = Math.max(node.practice || 0, threshold || 0);
  logEntry('reward', `你在【${cfg.sourceLabel || source}】的反覆鍛鍊中，終於學會了技能【${def.name}】。`);
  if (def.growthHint) logEntry('system', `${def.name}：${def.growthHint}`);
  autoSave();
  return true;
}

function getPracticeGain(skillId, source, options = {}) {
  const cfg = getSkillLearnConfig(skillId, source);
  if (!cfg) return 0;
  let gain = cfg.basePractice || cfg.baseChance || 0;
  if (options.success) gain += cfg.successBonus || 8;
  if (options.crit || options.nat20) gain += cfg.critBonus || 6;
  if (options.highRisk) gain += cfg.highRiskBonus || 5;
  if (options.flatBonus) gain += options.flatBonus;
  if (cfg.mainStat) gain += Math.max(0, getAbilityModifier(cfg.mainStat)) * (cfg.mainStatWeight || 2);
  if (cfg.subStat) gain += Math.max(0, getAbilityModifier(cfg.subStat)) * (cfg.subStatWeight || 1);
  return Math.max(1, Math.round(gain));
}

function tryLearnSkill(skillId, source, options = {}) {
  const def = GD.skills[skillId];
  if (!def) return false;
  const cfg = getSkillLearnConfig(skillId, source);
  if (!cfg) return false;
  const node = getSkillDiscoveryNode(skillId);
  node.attempts[source] = (node.attempts[source] || 0) + 1;
  node.lastSource = source;
  const gained = getPracticeGain(skillId, source, options);
  const learnedNow = addSkillPractice(skillId, gained, cfg.sourceLabel || options.label || source);
  const threshold = getSkillLearnThreshold(skillId);
  if (!learnedNow) {
    const marks = new Set([Math.floor(threshold * 0.25), Math.floor(threshold * 0.5), Math.floor(threshold * 0.75)]);
    if (marks.has(node.practice)) {
      logEntry('system', `你對【${def.name}】的理解又更深了一層（${node.practice} / ${threshold}）。`);
    }
  }
  return learnedNow;
}

function triggerSkillLearning(source, options = {}) {
  getLearnableSkillsForSource(source).forEach((def) => tryLearnSkill(def.id, source, options));
}

function getSkillLearningSummary() {
  const unlearned = Object.values(GD.skills || {}).filter((def) => !hasLearnedSkill(def.id) && def.learnHint);
  return unlearned.slice(0, 6).map((def) => {
    const node = getSkillDiscoveryNode(def.id);
    const threshold = getSkillLearnThreshold(def.id);
    return `${def.name}：${node.practice || 0} / ${threshold}｜${def.learnHint}`;
  });
}

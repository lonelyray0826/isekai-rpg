// Skill discovery system: learn base skills from actions with probability
function ensureSkillDiscoveryState() {
  if (!state.skillDiscovery) state.skillDiscovery = {};
  Object.keys(GD.skills || {}).forEach((skillId) => {
    if (!state.skillDiscovery[skillId]) state.skillDiscovery[skillId] = { attempts: {}, discovered: false };
    if (!state.skillDiscovery[skillId].attempts) state.skillDiscovery[skillId].attempts = {};
    if (typeof state.skillDiscovery[skillId].discovered !== 'boolean') state.skillDiscovery[skillId].discovered = hasLearnedSkill(skillId);
  });
}

function getSkillDiscoveryNode(skillId) {
  ensureSkillDiscoveryState();
  return state.skillDiscovery[skillId];
}

function getSkillLearnConfig(skillId, source) {
  return GD.skills?.[skillId]?.learnSources?.[source] || null;
}

function getSkillLearnHint(skillId) {
  return GD.skills?.[skillId]?.learnHint || '';
}

function getLearnableSkillsForSource(source) {
  return Object.values(GD.skills || {}).filter((def) => !hasLearnedSkill(def.id) && def.learnSources && def.learnSources[source]);
}

function getSkillLearnChance(skillId, source, options = {}) {
  const cfg = getSkillLearnConfig(skillId, source);
  if (!cfg) return 0;
  const node = getSkillDiscoveryNode(skillId);
  const attempts = node.attempts[source] || 0;
  let chancePct = (cfg.baseChance || 0) + attempts * (cfg.perAttempt || 0) + (options.flatBonus || 0);
  if (cfg.mainStat) chancePct += Math.max(0, getAbilityModifier(cfg.mainStat)) * (cfg.mainStatWeight || 2);
  if (cfg.subStat) chancePct += Math.max(0, getAbilityModifier(cfg.subStat)) * (cfg.subStatWeight || 1);
  if (options.success) chancePct += 5;
  if (options.crit || options.nat20) chancePct += 9;
  if (options.highRisk) chancePct += 4;
  return clamp(Math.round(chancePct), cfg.minChance || 3, cfg.maxChance || 95);
}

function learnSkill(skillId, source = 'unknown', config = null) {
  const def = GD.skills[skillId];
  if (!def || hasLearnedSkill(skillId)) return false;
  const cfg = config || getSkillLearnConfig(skillId, source) || {};
  state.skills[skillId] = state.skills[skillId] || { learned: false, equipped: false, proficiency: 0 };
  state.skills[skillId].learned = true;
  state.skills[skillId].equipped = true;
  state.skills[skillId].proficiency = Math.max(state.skills[skillId].proficiency || 0, cfg.startProficiency || 80);
  const node = getSkillDiscoveryNode(skillId);
  node.discovered = true;
  logEntry('reward', `你在【${cfg.sourceLabel || source}】中領悟了技能【${def.name}】。`);
  if (def.growthHint) logEntry('system', `${def.name}：${def.growthHint}`);
  autoSave();
  return true;
}

function tryLearnSkill(skillId, source, options = {}) {
  const def = GD.skills[skillId];
  if (!def || hasLearnedSkill(skillId)) return false;
  const cfg = getSkillLearnConfig(skillId, source);
  if (!cfg) return false;
  const node = getSkillDiscoveryNode(skillId);
  node.attempts[source] = (node.attempts[source] || 0) + 1;
  const learned = options.force || chance(getSkillLearnChance(skillId, source, options));
  if (learned) return learnSkill(skillId, source, cfg);
  const attemptCount = node.attempts[source];
  if (attemptCount === 1 || attemptCount === 3 || attemptCount === 5) {
    logEntry('system', `你在【${cfg.sourceLabel || source}】中隱約摸到了【${def.name}】的訣竅。`);
  }
  return false;
}

function triggerSkillLearning(source, options = {}) {
  getLearnableSkillsForSource(source).forEach((def) => tryLearnSkill(def.id, source, options));
}

function getSkillLearningSummary() {
  const unlearned = Object.values(GD.skills || {}).filter((def) => !hasLearnedSkill(def.id) && def.learnHint);
  return unlearned.slice(0, 4).map((def) => `${def.name}：${def.learnHint}`);
}

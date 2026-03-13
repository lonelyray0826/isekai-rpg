// Skill system: proficiency, evolution, item use, menu skill use
function gainSkillProficiency(skillId, amount, reason = '') {
  if (!hasLearnedSkill(skillId)) return;
  const skillState = getSkillState(skillId);
  const before = skillState.proficiency || 0;
  skillState.proficiency = clamp(before + amount, 0, GD.skills[skillId].maxProficiency || 1000);
  const after = skillState.proficiency;
  if (after > before) {
    logEntry('system', `${GD.skills[skillId].name} 熟練度 +${after - before}${reason ? `（${reason}）` : ''}。`);
    if (after >= 1000 && before < 1000) logEntry('reward', `${GD.skills[skillId].name} 已達滿熟練，可在技能頁查看進化分支。`);
  }
}

function canEvolve(skillId, targetId) {
  if (!hasLearnedSkill(skillId)) return false;
  const skill = GD.skills[skillId];
  const skillState = getSkillState(skillId);
  if (!skill.evolveTo.includes(targetId) || (skillState.proficiency || 0) < 1000) return false;
  const req = skill.evolveRequirements[targetId];
  if (!req) return false;
  if (state.level < req.level) return false;
  if (req.stats) {
    for (const [stat, value] of Object.entries(req.stats)) {
      if (getFinalStat(stat) < value) return false;
    }
  }
  return true;
}

function evolveSkill(fromId, toId) {
  if (!canEvolve(fromId, toId)) {
    logEntry('system', `尚未滿足 ${GD.skills[toId].name} 的進化條件。`);
    render();
    return;
  }
  state.skills[toId] = state.skills[toId] || { learned: true, equipped: true, proficiency: 150 };
  state.skills[toId].learned = true;
  state.skills[toId].equipped = true;
  if ((state.skills[toId].proficiency || 0) < 150) state.skills[toId].proficiency = 150;
  state.skills[fromId].equipped = false;
  logEntry('reward', `${GD.skills[fromId].name} 已進化為 ${GD.skills[toId].name}。新的技能熟練度承繼為 150。`);
  autoSave();
  render();
}

function useItem(itemId) {
  const count = state.inventory[itemId] || 0;
  if (count <= 0) return;
  const item = GD.items[itemId];
  const jobFx = typeof getProfessionEffects === 'function' ? getProfessionEffects() : { satietyGainFlat: 0, foodSpBonus: 0 };

  if (itemId === 'potion') {
    removeItem(itemId, 1);
    restoreResource('hp', 45);
    if (hasLearnedSkill('first_aid')) gainSkillProficiency('first_aid', 50, '使用治癒物資');
    if (typeof triggerSkillLearning === 'function') triggerSkillLearning('medical_use', { label: '使用治癒藥水', success: true, flatBonus: 3 });
    logEntry('system', '你飲下治癒藥水，恢復 45 點生命。');
  } else if (itemId === 'ether') {
    removeItem(itemId, 1);
    restoreResource('mp', 30);
    logEntry('system', '你使用以太藥滴，恢復 30 點魔力。');
  } else if (itemId === 'ration') {
    removeItem(itemId, 1);
    restoreResource('sp', 18 + (jobFx.foodSpBonus || 0));
    restoreSatiety(28 + (jobFx.satietyGainFlat || 0), '你食用了旅行口糧');
    recordActivity('rationUsed', 1);
    recordActivity('cookProgress', 1);
    if (getCurrentJobId() === 'cook') gainJobExp('cook', 28, '處理口糧');
    logEntry('system', `你食用旅行口糧，恢復 ${18 + (jobFx.foodSpBonus || 0)} 點體力。`);
  } else {
    logEntry('system', `${item.name} 目前僅作為事件材料使用。`);
  }
  autoSave();
  render();
}

function useSkillFromMenu(skillId) {
  if (!hasLearnedSkill(skillId)) return;
  const skill = GD.skills[skillId];
  const d = recalcDerived();
  const jobFx = typeof getProfessionEffects === 'function' ? getProfessionEffects() : { healingPct: 0 };
  if (!skill.useContexts.includes('menu')) {
    logEntry('system', `${skill.name} 不能在場景中直接施放。`);
    render();
    return;
  }
  if (skill.costSP && state.resources.sp < skill.costSP) {
    logEntry('system', `${skill.name} 需要 ${skill.costSP} 點體力。`);
    render();
    return;
  }
  spendResource('sp', skill.costSP || 0);
  const stageRatio = getSkillStageInfo(getSkillState(skillId).proficiency || 0).ratio;
  let heal = skillId === 'field_surgery'
    ? Math.floor((28 + d.VIT * 3 + d.INT * 2) * stageRatio)
    : Math.floor((16 + d.VIT * 2 + d.INT) * stageRatio);
  heal = Math.floor(heal * (1 + (jobFx.healingPct || 0)));
  restoreResource('hp', heal);
  gainSkillProficiency(skillId, 120, '場景施放');
  logEntry('system', `你施放 ${skill.name}，恢復 ${heal} 點生命。`);
  autoSave();
  render();
}

// Anatomy system: corpse handling, part-based harvesting, quality resolution
function openAnatomyMenu() {
  if (!hasCorpseToDissect()) {
    logEntry('system', '目前沒有可處理的魔物屍體。');
    render();
    return;
  }
  if (!getAnatomyProfile()) {
    logEntry('system', '你還不懂正規解剖，但可以嘗試粗略處理屍體；實作過程中有機率領悟【魔物解剖】。');
  }
  setUiMode('anatomy_menu');
  render();
}

function closeAnatomyMenu() {
  setUiMode(null);
  render();
}

function canHarvestCorpsePart(partId) {
  if (!hasCorpseToDissect()) return false;
  const part = GD.anatomyParts[partId];
  if (!part) return false;
  if (part.enemyId !== state.recentCorpse.enemyId) return false;
  const harvested = state.recentCorpse.harvestedParts || {};
  return !harvested[partId];
}

function resolveAnatomyQuality(rate, roll, qualityBonus = 0) {
  return resolveQualityByRate(rate, roll, qualityBonus);
}

function anatomyProficiencyBonus(profile) {
  if (!profile) return 0;
  const bySkill = Math.floor((profile.proficiency || 0) / 200);
  const byStage = profile.stage.label === '滿熟' ? 3 : profile.stage.label === '大成' ? 2 : profile.stage.label === '專精' ? 1 : 0;
  return bySkill + byStage;
}

function dissectCorpsePart(partId) {
  if (!canHarvestCorpsePart(partId)) {
    logEntry('system', '這個部位已被處理，或目前不能採取。');
    render();
    return;
  }
  let profile = getAnatomyProfile();
  const improvised = !profile;

  const part = GD.anatomyParts[partId];
  const enemy = GD.enemies[state.recentCorpse.enemyId];
  const spCost = part.spCost || 2;
  if (state.resources.sp < spCost) {
    logEntry('system', `處理 ${part.label} 至少需要 ${spCost} 點體力。`);
    render();
    return;
  }

  const jobFx = getProfessionEffects();
  spendResource('sp', spCost);
  const dc = normalizeDc(part.dc || 10);
  const rate = clamp(
    Math.round(
      42
      + getFinalStat(part.main || 'DEX') * 2
      + getFinalStat(part.sub || 'INT')
      + getSkillCheckBonus('anatomy') * 4
      + anatomyProficiencyBonus(profile) * 5
      + getProficiencyBonus() * 2
      - dc * 4
      - (improvised ? 8 : 0)
    ),
    5,
    95
  );
  const roll = rollDie(100);
  const qualityBonus = (part.slot === 'hide' ? (jobFx.hideQualityBonus || 0) : 0) + (getCurrentJobId() === 'hunter' ? 1 : 0);
  const quality = resolveAnatomyQuality(rate, roll, qualityBonus);
  const harvested = state.recentCorpse.harvestedParts || (state.recentCorpse.harvestedParts = {});
  harvested[partId] = true;

  logEntry('system', `【${part.label}】採取成功率 ${rate}%｜判定值 ${roll}${improvised ? '（未受訓解剖）' : ''}。`);

  const rewards = [];
  if (quality !== 'ruined') {
    (part.loot[quality] || []).forEach((drop) => {
      const rate = (drop.chance || 1) * 100 + recalcDerived().passive.rareFind * 100;
      if ((drop.chance || 1) >= 1 || chance(rate)) {
        addItem(drop.id, drop.qty || 1);
        rewards.push(`${GD.items[drop.id].name} ×${drop.qty || 1}`);
      }
    });
  }

  recordActivity('anatomyCount', 1);
  recordActivity('huntProgress', 1);
  if (part.slot === 'hide') recordActivity('hideHarvested', 1);
  if (getCurrentJobId() === 'hunter') gainJobExp('hunter', 18, `解剖 ${enemy.name}`);
  if (getCurrentJobId() === 'tailor' && part.slot === 'hide') gainJobExp('tailor', 22, `處理 ${part.label}`);

  const profGain = quality === 'rare' ? 130 : quality === 'fine' ? 105 : quality === 'normal' ? 80 : quality === 'poor' ? 55 : 40;
  if (typeof triggerSkillLearning === 'function') {
    triggerSkillLearning('anatomy_attempt', {
      label: `${enemy.name}｜${part.label}`,
      success: quality !== 'ruined',
      crit: quality === 'rare',
      flatBonus: quality === 'rare' ? 8 : quality === 'fine' ? 5 : quality === 'normal' ? 3 : 0
    });
  }
  profile = getAnatomyProfile();
  if (profile) gainSkillProficiency(profile.skillId, profGain, `解剖 ${enemy.name}｜${part.label}`);
  if (quality === 'rare') addExp(16, `${enemy.name} 高品質解剖`);
  else if (quality === 'fine') addExp(10, `${enemy.name} 部位採取`);
  else if (quality === 'normal') addExp(6, `${enemy.name} 解剖`);

  if (quality === 'ruined') {
    logEntry('system', `${part.label} 的切口完全失手，這個部位被你弄壞了。`);
  } else if (rewards.length) {
    const qualityLabel = quality === 'rare' ? '稀有' : quality === 'fine' ? '精良' : quality === 'normal' ? '完整' : '粗糙';
    logEntry('reward', `你從 ${enemy.name} 身上完成【${part.label}】採取，品質為【${qualityLabel}】。取得：${rewards.join('、')}。`);
  } else {
    logEntry('system', `你完成了 ${part.label} 的處理，但沒有保留下任何可用素材。`);
  }

  if (!hasCorpseToDissect()) {
    state.recentCorpse.dissected = true;
    setUiMode(null);
    logEntry('system', `${enemy.name} 的可處理部位已全部完成。`);
  }

  syncQuestProgress();
  autoSave();
  render();
}

function renderAnatomyChoices() {
  const corpse = state.recentCorpse;
  if (!corpse || corpse.locationId !== state.location) {
    setUiMode(null);
    renderChoices();
    return;
  }
  const enemy = GD.enemies[corpse.enemyId];
  const harvested = corpse.harvestedParts || {};
  const parts = getCorpseParts(corpse);
  const anatomy = getAnatomyProfile();

  const html = parts.map((part) => {
    const harvestedLabel = harvested[part.id] ? '已處理' : `消耗 ${part.spCost || 2} 體力`;
    return `
      <button class="choice-btn" data-action="dissect_part:${part.id}" ${harvested[part.id] ? 'disabled' : ''}>
        <span class="choice-main">${part.label}</span>
        <span class="choice-sub">${part.summary}｜主屬性 ${part.main}/${part.sub}｜難度 ${normalizeDc(part.dc || 10)}｜${harvestedLabel}</span>
      </button>
    `;
  }).join('');

  els.choicesPanel.innerHTML = `
    <div class="choice-board-wrap">
      <div class="choice-board-header">${enemy.name}｜部位解剖</div>
      <div class="choice-board-sub">目前解剖技能：${anatomy ? anatomy.def.name : '未習得（粗略解剖）'}｜熟練 ${anatomy ? anatomy.proficiency : 0} / 1000｜段位 ${anatomy ? anatomy.stage.label : '未受訓'}｜副職：${getCurrentJobDef()?.name || '無'}</div>
      ${html}
      <button class="choice-btn" data-action="anatomy_close">
        <span class="choice-main">暫停解剖</span>
        <span class="choice-sub">返回一般場景行動。</span>
      </button>
    </div>
  `;
}

// Profession system: commoner base + side jobs
function ensureProfessionState() {
  if (!state.originClass) state.originClass = '平民';
  if (typeof state.currentJob === 'undefined') state.currentJob = null;
  if (!state.jobs) state.jobs = {};
  Object.keys(GD.jobs || {}).forEach((jobId) => {
    if (!state.jobs[jobId]) state.jobs[jobId] = { learned: false, exp: 0 };
  });
  if (!state.records) {
    state.records = {
      forageCount: 0,
      monsterKills: 0,
      biologicalKills: 0,
      anatomyCount: 0,
      hideHarvested: 0,
      mealsCooked: 0,
      rationUsed: 0,
      towerSalvage: 0,
      martialSkillUses: 0,
      magicSkillUses: 0,
      smithProgress: 0,
      cookProgress: 0,
      huntProgress: 0
    };
  }
}

function getCurrentJobId() {
  ensureProfessionState();
  return state.currentJob || null;
}

function getCurrentJobDef() {
  const id = getCurrentJobId();
  return id ? GD.jobs[id] : null;
}

function getJobRankThresholds(jobId) {
  return GD.jobs[jobId]?.rankThresholds || [0, 80, 180, 320];
}

function getJobLevel(jobId) {
  ensureProfessionState();
  const node = state.jobs[jobId];
  if (!node || !node.learned) return 0;
  const exp = node.exp || 0;
  const thresholds = getJobRankThresholds(jobId);
  if (exp >= thresholds[3]) return 4;
  if (exp >= thresholds[2]) return 3;
  if (exp >= thresholds[1]) return 2;
  return 1;
}

function getJobRankLabel(jobId) {
  const level = getJobLevel(jobId);
  return ['未就職', '見習', '熟手', '專業', '大師'][level] || '未就職';
}

function recordActivity(key, amount = 1) {
  ensureProfessionState();
  state.records[key] = (state.records[key] || 0) + amount;
}

function getJobUnlockProgress(jobId) {
  ensureProfessionState();
  if (jobId === 'tailor') return { current: state.records.hideHarvested || 0, required: 2, label: '取得皮革類素材' };
  if (jobId === 'blacksmith') return { current: state.records.smithProgress || 0, required: 3, label: '翻找遺蹟／施展武技' };
  if (jobId === 'cook') return { current: state.records.cookProgress || 0, required: 2, label: '烹煮或食用口糧' };
  if (jobId === 'farmer') return { current: state.records.forageCount || 0, required: 3, label: '成功採集灰葉草' };
  if (jobId === 'hunter') return { current: state.records.huntProgress || 0, required: 3, label: '討伐或解剖生物型魔物' };
  return { current: 0, required: 1, label: '活動累計' };
}

function jobLearnable(jobId) {
  ensureProfessionState();
  const node = state.jobs[jobId];
  const progress = getJobUnlockProgress(jobId);
  return !node.learned && progress.current >= progress.required;
}

function learnJob(jobId) {
  ensureProfessionState();
  const job = GD.jobs[jobId];
  if (!job) return;
  if (state.jobs[jobId]?.learned) {
    equipJob(jobId);
    return;
  }
  const progress = getJobUnlockProgress(jobId);
  if (progress.current < progress.required) {
    logEntry('system', `尚未達成 ${job.name} 的就職條件：${progress.label} ${progress.current} / ${progress.required}。`);
    render();
    return;
  }
  const cost = job.learnCostGold || 0;
  if (state.gold < cost) {
    logEntry('system', `就職 ${job.name} 需要 ${cost} 金幣。`);
    render();
    return;
  }
  state.gold -= cost;
  state.jobs[jobId].learned = true;
  state.jobs[jobId].exp = Math.max(state.jobs[jobId].exp || 0, 0);
  state.currentJob = jobId;
  logEntry('reward', `你以【${state.originClass}】之身完成第一次副職就職，現在的副職業為【${job.name}】。`);
  autoSave();
  render();
}

function equipJob(jobId) {
  ensureProfessionState();
  const job = GD.jobs[jobId];
  if (!job || !state.jobs[jobId]?.learned) return;
  state.currentJob = jobId;
  logEntry('system', `你將目前的副職業切換為【${job.name}】。`);
  autoSave();
  render();
}

function gainJobExp(jobId, amount, reason = '') {
  ensureProfessionState();
  if (!jobId || !state.jobs[jobId]?.learned || amount <= 0) return;
  const before = getJobLevel(jobId);
  state.jobs[jobId].exp = Math.min(999, (state.jobs[jobId].exp || 0) + amount);
  const after = getJobLevel(jobId);
  if (reason) logEntry('system', `${GD.jobs[jobId].name} 副職經驗 +${amount}（${reason}）。`);
  if (after > before) logEntry('reward', `${GD.jobs[jobId].name} 提升至【${getJobRankLabel(jobId)}】。`);
}

function getProfessionEffects() {
  ensureProfessionState();
  const jobId = getCurrentJobId();
  const base = {
    jobId,
    jobName: jobId ? GD.jobs[jobId].name : '無',
    satietyDecayReduction: 0,
    exploreBonus: 0,
    anatomyBonus: 0,
    travelSpDiscount: 0,
    rareFind: 0,
    firstStrike: 0,
    evadeBonus: 0,
    hitBonus: 0,
    patkBonus: 0,
    matkBonus: 0,
    bioHitBonus: 0,
    martialDamageFlat: 0,
    hideQualityBonus: 0,
    healingPct: 0,
    salvageGoldBonus: 0,
    satietyGainFlat: 0,
    foodSpBonus: 0,
    herbQtyBonusChance: 0
  };
  if (!jobId) return base;
  const lv = getJobLevel(jobId);
  if (jobId === 'tailor') {
    base.hideQualityBonus = Math.max(0, lv - 1);
    base.healingPct = 0.05 * lv;
  } else if (jobId === 'blacksmith') {
    base.patkBonus = lv;
    base.martialDamageFlat = lv * 2;
    base.salvageGoldBonus = lv * 4;
  } else if (jobId === 'cook') {
    base.satietyDecayReduction = 0.06 * lv;
    base.satietyGainFlat = 6 + lv * 4;
    base.foodSpBonus = 4 + lv * 2;
  } else if (jobId === 'farmer') {
    base.exploreBonus = lv * 2;
    base.satietyDecayReduction = 0.04 * lv;
    base.herbQtyBonusChance = 0.12 + lv * 0.06;
  } else if (jobId === 'hunter') {
    base.anatomyBonus = lv;
    base.firstStrike = 0.03 * lv;
    base.bioHitBonus = lv;
    base.hideQualityBonus = Math.max(0, lv - 1);
  }
  return base;
}

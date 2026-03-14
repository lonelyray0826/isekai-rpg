// Core system: shared state, derived values, progression helpers
var GD = window.GAME_DATA;
var DB = window.GAME_DB;
var $ = (sel) => document.querySelector(sel);

var els = {
  topStats: $("#topStats"),
  statusPanel: $("#statusPanel"),
  questPanel: $("#questPanel"),
  locationName: $("#locationName"),
  locationDesc: $("#locationDesc"),
  timeWeather: $("#timeWeather"),
  logPanel: $("#logPanel"),
  perceptionPanel: $("#perceptionPanel"),
  enemyPanel: $("#enemyPanel"),
  enemyStatusWrap: $("#enemyStatusWrap"),
  choicesPanel: $("#choicesPanel"),
  choiceHotbar: $("#choiceHotbar"),
  mapPanel: $("#mapPanel"),
  martialSkillsPanel: $("#martialSkillsPanel"),
  magicSkillsPanel: $("#magicSkillsPanel"),
  supportSkillsPanel: $("#supportSkillsPanel"),
  passiveSkillsPanel: $("#passiveSkillsPanel"),
  jobsPanel: $("#jobsPanel"),
  inventoryPanel: $("#inventoryPanel"),
  growthPanel: $("#growthPanel"),
  flagPanel: $("#flagPanel"),
  saveBtn: $("#saveBtn"),
  loadBtn: $("#loadBtn"),
  exportBtn: $("#exportBtn"),
  importBtn: $("#importBtn"),
  importInput: $("#importInput"),
  newGameBtn: $("#newGameBtn")
};

var state = null;

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function clamp(num, min, max) {
  return Math.max(min, Math.min(max, num));
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chance(rate) {
  return Math.random() * 100 < rate;
}

function expToNext(level) {
  return 45 + (level - 1) * 35 + Math.pow(level - 1, 2) * 12;
}

function getCurrentLocation() {
  if (!GD.locations[state.location]) {
    const fallbackId = Object.keys(GD.locations || {})[0];
    if (fallbackId) state.location = fallbackId;
  }
  return GD.locations[state.location];
}

function getFinalStat(statKey) {
  const node = state.stats[statKey];
  return node.base + node.gear + node.buff - node.debuff;
}

function getSkillState(skillId) {
  return state.skills[skillId] || null;
}

function hasLearnedSkill(skillId) {
  return !!(state.skills[skillId] && state.skills[skillId].learned);
}

function isSkillLatent(skillId) {
  return !!(GD.skills[skillId] && (GD.skills[skillId].practiceSources || GD.skills[skillId].learnSources) && !hasLearnedSkill(skillId));
}

function getSkillStageInfo(prof) {
  if (prof >= 1000) return { label: '滿熟', ratio: 1.30 };
  if (prof >= 750) return { label: '大成', ratio: 1.25 };
  if (prof >= 500) return { label: '專精', ratio: 1.16 };
  if (prof >= 250) return { label: '熟習', ratio: 1.08 };
  return { label: '入門', ratio: 1.00 };
}

function getAnatomySkillId() {
  const priority = ['essence_extraction', 'precise_anatomy', 'monster_anatomy'];
  return priority.find((id) => hasLearnedSkill(id)) || null;
}

function getAnatomyProfile() {
  const skillId = getAnatomySkillId();
  if (!skillId) return null;
  const skillState = getSkillState(skillId);
  const stage = getSkillStageInfo(skillState.proficiency || 0);
  return {
    skillId,
    def: GD.skills[skillId],
    proficiency: skillState.proficiency || 0,
    stage
  };
}

function getCorpseParts(corpse = state.recentCorpse) {
  if (!corpse) return [];
  return Object.values(GD.anatomyParts || {}).filter((row) => row.enemyId === corpse.enemyId);
}

function hasCorpseToDissect() {
  if (!state.recentCorpse || state.recentCorpse.locationId !== state.location) return false;
  const harvested = state.recentCorpse.harvestedParts || {};
  return getCorpseParts().some((part) => !harvested[part.id]);
}

function getPassiveEffects() {
  const effects = {
    hpPct: 0,
    physReduction: 0,
    exploreBonus: 0,
    rareFind: 0,
    travelSpDiscount: 0,
    evadeBonus: 0,
    firstStrike: 0,
    relicBonus: 0,
    anatomyBonus: 0,
    hitBonus: 0,
    patkBonus: 0,
    matkBonus: 0
  };

  const applyByStage = (skillId, values) => {
    if (!hasLearnedSkill(skillId)) return 0;
    const prof = getSkillState(skillId).proficiency || 0;
    if (prof >= 1000) return values[4];
    if (prof >= 750) return values[3];
    if (prof >= 500) return values[2];
    if (prof >= 250) return values[1];
    return values[0];
  };

  if (hasLearnedSkill('tough_body')) effects.hpPct += applyByStage('tough_body', [0.15, 0.17, 0.19, 0.21, 0.23]);
  if (hasLearnedSkill('iron_flesh')) {
    effects.hpPct += 0.24;
    effects.physReduction += 0.08;
  }
  if (hasLearnedSkill('traveler_instinct')) {
    effects.exploreBonus += applyByStage('traveler_instinct', [10, 11, 12, 13, 14]);
    effects.rareFind += 0.08;
    effects.firstStrike += 0.05;
  }
  if (hasLearnedSkill('relic_sense')) {
    effects.exploreBonus += 16;
    effects.rareFind += 0.15;
    effects.relicBonus += 10;
  }
  if (hasLearnedSkill('pathfinder_eye')) {
    effects.travelSpDiscount += 0.4;
    effects.evadeBonus += 8;
    effects.firstStrike += 0.08;
  }
  if (hasLearnedSkill('precise_anatomy')) effects.anatomyBonus += 2;
  if (hasLearnedSkill('essence_extraction')) {
    effects.anatomyBonus += 3;
    effects.rareFind += 0.08;
  }

  if (typeof getOriginPassiveEffects === 'function') {
    const originFx = getOriginPassiveEffects();
    effects.exploreBonus += originFx.exploreBonus || 0;
    effects.rareFind += originFx.rareFind || 0;
    effects.travelSpDiscount += originFx.travelSpDiscount || 0;
    effects.evadeBonus += originFx.evadeBonus || 0;
    effects.firstStrike += originFx.firstStrike || 0;
    effects.relicBonus += originFx.relicBonus || 0;
    effects.anatomyBonus += originFx.anatomyBonus || 0;
    effects.hitBonus += originFx.hitBonus || 0;
    effects.patkBonus += originFx.patkBonus || 0;
    effects.matkBonus += originFx.matkBonus || 0;
    effects.physReduction += originFx.physReduction || 0;
  }

  if (typeof getProfessionEffects === 'function') {
    const jobFx = getProfessionEffects();
    effects.exploreBonus += jobFx.exploreBonus || 0;
    effects.rareFind += jobFx.rareFind || 0;
    effects.travelSpDiscount += jobFx.travelSpDiscount || 0;
    effects.evadeBonus += jobFx.evadeBonus || 0;
    effects.firstStrike += jobFx.firstStrike || 0;
    effects.relicBonus += jobFx.relicBonus || 0;
    effects.anatomyBonus += jobFx.anatomyBonus || 0;
    effects.hitBonus += jobFx.hitBonus || 0;
    effects.patkBonus += jobFx.patkBonus || 0;
    effects.matkBonus += jobFx.matkBonus || 0;
  }

  return effects;
}

function recalcDerived() {
  if (typeof ensureSurvivalState === 'function') ensureSurvivalState();
  if (typeof ensureProfessionState === 'function') ensureProfessionState();
  const STR = getFinalStat('STR');
  const VIT = getFinalStat('VIT');
  const DEX = getFinalStat('DEX');
  const AGI = getFinalStat('AGI');
  const INT = getFinalStat('INT');
  const LUK = getFinalStat('LUK');
  const passive = getPassiveEffects();
  const satiety = typeof getSatietyEffects === 'function' ? getSatietyEffects() : { maxSpPenaltyPct: 0, hitPenalty: 0, evaPenalty: 0, patkPenalty: 0, matkPenalty: 0, label: '普通' };

  const maxHp = Math.floor((80 + VIT * 12 + STR * 4) * (1 + passive.hpPct));
  const maxSpRaw = Math.floor(40 + VIT * 8 + AGI * 4);
  const maxSp = Math.max(10, Math.floor(maxSpRaw * (1 - (satiety.maxSpPenaltyPct || 0))));
  const maxMp = Math.floor(30 + INT * 10 + LUK * 2);

  state.resources.hp = clamp(typeof state.resources.hp === 'number' ? state.resources.hp : maxHp, 0, maxHp);
  state.resources.sp = clamp(typeof state.resources.sp === 'number' ? state.resources.sp : maxSp, 0, maxSp);
  state.resources.mp = clamp(typeof state.resources.mp === 'number' ? state.resources.mp : maxMp, 0, maxMp);

  return {
    STR, VIT, DEX, AGI, INT, LUK,
    maxHp, maxSp, maxMp,
    patk: Math.floor(STR * 2 + DEX + state.level + passive.patkBonus - (satiety.patkPenalty || 0)),
    pdef: Math.floor(VIT * 2 + STR * 0.5),
    matk: Math.floor(INT * 2 + LUK * 0.5 + state.level + passive.matkBonus - (satiety.matkPenalty || 0)),
    mdef: Math.floor(INT * 1.5 + VIT),
    hit: Math.floor(75 + DEX * 2 + INT * 0.5 + passive.hitBonus - (satiety.hitPenalty || 0)),
    eva: Math.floor(AGI * 2 + DEX + LUK * 0.5 + passive.evadeBonus - (satiety.evaPenalty || 0)),
    cri: +(2 + DEX * 0.8 + LUK * 1.2).toFixed(1),
    ini: Math.floor(AGI * 2 + INT * 0.5),
    carry: Math.floor(20 + STR * 3 + VIT),
    passive,
    satiety
  };
}

function logEntry(type, text) {
  state.log.push({ type, text });
  if (state.log.length > 180) state.log = state.log.slice(-180);
}

function syncQuestProgress() {
  const herbState = state.guild?.commissions?.guild_herb_supply;
  if (herbState && herbState.accepted && !herbState.turnedIn && (state.inventory.ash_herb || 0) >= 3) {
    herbState.completed = true;
    if (state.quests.herb_contract.stage < 1) state.quests.herb_contract.stage = 1;
  }
  if (state.flags.chapel_clue_found && state.flags.tower_clue_found && !state.flags.rift_path_unlocked) {
    state.flags.rift_path_unlocked = true;
    GD.locations.riftmoor.unlocked = true;
    state.quests.main_rift.stage = 2;
    logEntry('system', '兩條裂隙線索互相呼應，你推知灰霧源頭位於【裂隙沼原】。新區域已開放。');
    gainSkillProficiency('traveler_instinct', 100, '成功追索異界路徑');
  }
}

function advanceTime(turns = 1) {
  if (typeof ensureSkillDiscoveryState === 'function') ensureSkillDiscoveryState();
  state.turn += turns;
  state.periodIndex = (state.periodIndex + turns) % GD.periods.length;
  if (state.turn > 0 && state.periodIndex === 0) state.day += 1;
  if (chance(45)) state.weatherIndex = rand(0, GD.weathers.length - 1);
  if (typeof applyTimeSatietyCost === 'function') applyTimeSatietyCost(turns);
}

function getResourceCap(type) {
  const d = recalcDerived();
  if (type === 'hp') return d.maxHp;
  if (type === 'sp') return d.maxSp;
  if (type === 'mp') return d.maxMp;
  if (type === 'satiety') return typeof getSatietyMax === 'function' ? getSatietyMax() : 100;
  return 0;
}

function spendResource(type, value) {
  state.resources[type] = clamp(state.resources[type] - value, 0, getResourceCap(type));
}

function restoreResource(type, value) {
  state.resources[type] = clamp(state.resources[type] + value, 0, getResourceCap(type));
}

function addItem(itemId, qty = 1) {
  state.inventory[itemId] = (state.inventory[itemId] || 0) + qty;
}

function removeItem(itemId, qty = 1) {
  state.inventory[itemId] = Math.max(0, (state.inventory[itemId] || 0) - qty);
}

function addExp(amount, reason = '') {
  if (amount <= 0) return;
  state.exp += amount;
  logEntry('reward', `獲得 ${amount} 經驗值${reason ? `：${reason}` : ''}。`);
  let need = expToNext(state.level);
  let leveled = false;
  while (state.exp >= need) {
    state.exp -= need;
    state.level += 1;
    const gainedStat = state.level % 3 === 0 ? 1 : 0;
    const gainedSkill = state.level % 5 === 0 ? 1 : 0;
    state.statPoints += gainedStat;
    state.skillPoints += gainedSkill;
    const d = recalcDerived();
    state.resources.hp = Math.min(d.maxHp, state.resources.hp + Math.floor(d.maxHp * 0.35));
    state.resources.sp = Math.min(d.maxSp, state.resources.sp + Math.floor(d.maxSp * 0.45));
    state.resources.mp = Math.min(d.maxMp, state.resources.mp + Math.floor(d.maxMp * 0.35));
    leveled = true;
    logEntry('reward', `你升到了 Lv.${state.level}。這個世界的成長極為緩慢：本次獲得屬性點 +${gainedStat}、技能點 +${gainedSkill}，並只恢復部分狀態。`);
    need = expToNext(state.level);
  }
  if (leveled) syncQuestProgress();
}

function gainGold(amount) {
  state.gold += amount;
  if (amount > 0) logEntry('reward', `獲得 ${amount} 金幣。`);
}

function applyStatPoint(statKey) {
  if (state.statPoints <= 0) return;
  if (state.stats[statKey].base >= 18) {
    logEntry('system', `${GD.statLabels[statKey]} 已進入高值區，現版本暫不允許再用一般成長點直接提升。`);
    render();
    return;
  }
  state.stats[statKey].base += 1;
  state.statPoints -= 1;
  logEntry('system', `${GD.statLabels[statKey]} 提升 1 點。這個世界的能力增長十分珍貴。`);
  autoSave();
  render();
}

function moveTo(locationId) {
  const target = GD.locations[locationId];
  if (!target) return;
  if (!target.unlocked) {
    logEntry('system', '這條路線尚未開放。');
    render();
    return;
  }
  const passive = recalcDerived().passive;
  const baseSpCost = 6;
  const cost = Math.max(2, Math.floor(baseSpCost * (1 - passive.travelSpDiscount)));
  if (state.resources.sp < cost) {
    logEntry('system', `體力不足，前往 ${target.name} 需要 ${cost} 點體力。`);
    render();
    return;
  }
  spendResource('sp', cost);
  state.location = locationId;
  if (state.ui) { state.ui.mode = null; state.ui.sceneFocus = null; }
  advanceTime(1);
  if (hasLearnedSkill('traveler_instinct')) gainSkillProficiency('traveler_instinct', 65, `移動至 ${target.name}`);
  if (typeof triggerSkillLearning === 'function') triggerSkillLearning('travel_move', { label: target.name, success: true });
  logEntry('system', `你抵達了 ${target.name}。旅途中消耗 ${cost} 點體力。`);
  syncQuestProgress();
  autoSave();
  render();
}

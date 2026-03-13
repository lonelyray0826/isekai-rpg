// RPG check system: percentage-based hit and success resolution
function getAbilityModifier(statKey) {
  return Math.floor((getFinalStat(statKey) - 10) / 3);
}

function getProficiencyBonus(level = state.level) {
  return Math.floor((Math.max(1, level) - 1) / 5);
}

function formatSigned(value) {
  return `${value >= 0 ? '+' : ''}${value}`;
}

function rollDie(sides = 100) {
  return rand(1, sides);
}

function normalizeDc(value) {
  if (value <= 30) return clamp(value, 5, 25);
  return clamp(8 + Math.round((value - 60) / 4), 8, 22);
}

function getSkillCheckBonus(skill = null) {
  const passive = recalcDerived().passive;
  if (skill === 'explore') return Math.floor(passive.exploreBonus / 4);
  if (skill === 'relic') return Math.floor((passive.exploreBonus + passive.relicBonus) / 4);
  if (skill === 'anatomy') {
    const anatomy = getAnatomyProfile();
    const profBonus = anatomy ? Math.floor((anatomy.proficiency || 0) / 200) : 0;
    return passive.anatomyBonus + profBonus;
  }
  return 0;
}

function rollCheckDetailed({ label, main, sub, difficulty = null, dc = null, bonus = 0, skill = null }) {
  const targetDc = normalizeDc(dc || difficulty || 10);
  const mainVal = getFinalStat(main);
  const subVal = getFinalStat(sub);
  const rate = clamp(
    Math.round(45 + mainVal * 2 + subVal + state.level + getSkillCheckBonus(skill) * 4 + bonus * 5 - targetDc * 4),
    5,
    95
  );
  const roll = rollDie(100);
  const success = roll <= rate;
  logEntry('system', `【${label}】成功率 ${rate}%｜判定值 ${roll}：${success ? '成功' : '失敗'}。`);
  return { success, rate, roll, targetDc };
}

function rollCheck(args) {
  return rollCheckDetailed(args).success;
}

function getEnemyArmorClass(enemy) {
  return Math.max(1, Math.floor((enemy.eva || 0) + (enemy.def || 0) * 0.6 + (enemy.agi || 0) * 1.4));
}

function getPlayerArmorClass() {
  const d = recalcDerived();
  return Math.max(1, Math.floor(d.eva + d.pdef * 0.6));
}

function resolveQualityByRate(rate, roll, qualityBonus = 0) {
  const margin = rate - roll + qualityBonus * 6;
  if (roll > rate + 15) return 'ruined';
  if (roll > rate) return 'poor';
  if (margin >= 35) return 'rare';
  if (margin >= 15) return 'fine';
  return 'normal';
}

function playerAttackRoll({ label, enemy, main = 'STR', sub = 'DEX', bonus = 0, magic = false }) {
  const d = recalcDerived();
  const jobFx = typeof getProfessionEffects === 'function' ? getProfessionEffects() : { bioHitBonus: 0 };
  const bioBonus = enemy?.bodyType === 'biological' ? (jobFx.bioHitBonus || 0) : 0;
  const offense = magic
    ? (d.hit * 0.55 + d.matk * 0.8 + getFinalStat(main) * 0.9 + getFinalStat(sub) * 0.35)
    : (d.hit * 0.6 + d.patk * 0.85 + getFinalStat(main) * 0.95 + getFinalStat(sub) * 0.4);
  const defense = magic
    ? ((enemy.mdef || 0) * 0.9 + (enemy.agi || 0) * 1.2 + 28)
    : ((enemy.def || 0) * 0.85 + (enemy.agi || 0) * 1.5 + 24);
  const hitChance = clamp(Math.round(58 + offense * 0.32 - defense * 0.26 + bonus * 6 + bioBonus * 4 + getProficiencyBonus() * 2), 10, 97);
  const roll = rollDie(100);
  const hit = roll <= hitChance;
  const critChance = clamp(Math.round(d.cri + (magic ? getFinalStat('INT') * 0.12 : getFinalStat('DEX') * 0.16) + bonus), 2, 35);
  const critRoll = hit ? rollDie(100) : 100;
  const crit = hit && critRoll <= critChance;
  const miss = !hit;
  logEntry('system', `【${label}】命中率 ${hitChance}%｜判定值 ${roll}：${hit ? (crit ? `暴擊（暴擊率 ${critChance}%｜暴擊判定 ${critRoll}）` : '命中') : '未命中'}。`);
  return { hit, crit, miss, roll, chance: hitChance, critChance, critRoll };
}

function enemyAttackRoll({ enemy, magic = false, label = null }) {
  const d = recalcDerived();
  const offense = magic
    ? ((enemy.matk || 0) * 0.9 + (enemy.agi || 0) * 0.6 + 24)
    : ((enemy.atk || 0) * 0.95 + (enemy.agi || 0) * 0.75 + 22);
  const defense = magic
    ? (d.eva * 0.35 + d.mdef * 0.95 + 18)
    : (d.eva * 0.45 + d.pdef * 0.95 + 18);
  const hitChance = clamp(Math.round(56 + offense * 0.3 - defense * 0.24), 12, 96);
  const roll = rollDie(100);
  const hit = roll <= hitChance;
  const critChance = clamp(Math.round(4 + (enemy.agi || 0) * 0.35 + (magic ? (enemy.matk || 0) * 0.06 : (enemy.atk || 0) * 0.06)), 3, 26);
  const critRoll = hit ? rollDie(100) : 100;
  const crit = hit && critRoll <= critChance;
  const miss = !hit;
  logEntry('system', `【${label || enemy.name}】命中率 ${hitChance}%｜判定值 ${roll}：${hit ? (crit ? `重擊命中（暴擊率 ${critChance}%｜暴擊判定 ${critRoll}）` : '命中') : '未命中'}。`);
  return { hit, crit, miss, roll, chance: hitChance, critChance, critRoll };
}

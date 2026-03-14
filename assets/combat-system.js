// Combat system: battles, traditional RPG hit checks, corpses, battle outcomes
function startBattle(enemyId, battleTag = '') {
  const enemyData = GD.enemies[enemyId];
  if (!enemyData || state.gameOver) return;
  state.battle = {
    enemyId,
    enemy: {
      ...clone(enemyData),
      hp: enemyData.maxHp,
      guard: false,
      burning: 0
    },
    turn: 1,
    tag: battleTag,
    playerGuard: false,
    playerReaction: null,
    interrupted: false,
    intent: null,
    firstAidUsed: false
  };
  setUiMode(null);
  if (state.ui) state.ui.sceneFocus = null;
  if (typeof queueEnemyIntent === 'function') queueEnemyIntent();
  logEntry('battle', enemyData.intro);
  if (state.battle.intent?.telegraph) logEntry('battle', `你注意到：${state.battle.intent.telegraph}`);
  autoSave();
  render();
}

function calcPhysicalDamage(multiplier = 1, flat = 0) {
  const d = recalcDerived();
  const enemy = state.battle.enemy;
  const base = d.patk * multiplier + flat - enemy.def * 0.65 + rand(0, 5);
  return Math.max(1, Math.floor(base));
}

function calcMagicDamage(multiplier = 1, flat = 0) {
  const d = recalcDerived();
  const enemy = state.battle.enemy;
  const base = d.matk * multiplier + flat - enemy.mdef * 0.6 + rand(0, 4);
  return Math.max(1, Math.floor(base));
}

function playerTakeDamage(amount, kind = 'physical') {
  const d = recalcDerived();
  let final = amount;
  if (kind === 'physical') final = Math.floor(final * (1 - d.passive.physReduction));
  if (state.battle && state.battle.playerGuard) final = Math.floor(final * 0.6);
  state.resources.hp = clamp(state.resources.hp - final, 0, d.maxHp);
  if (hasLearnedSkill('tough_body')) gainSkillProficiency('tough_body', Math.min(95, Math.max(40, Math.floor(final * 1.2))), '承受傷害');
  if (typeof triggerSkillLearning === 'function') triggerSkillLearning('take_damage', { label: '承受傷害', success: final >= 8, flatBonus: Math.floor(final / 6) });
  return final;
}


function triggerGameOver(reason = '你死亡了。') {
  const loc = getCurrentLocation();
  state.battle = null;
  state.gameOver = {
    reason,
    day: state.day,
    level: state.level,
    raceName: state.raceName,
    birthOriginName: state.birthOriginName,
    locationId: state.location,
    locationName: loc?.name || state.location
  };
  setUiMode('game_over');
  if (state.ui) state.ui.sceneFocus = null;
  localStorage.removeItem(GD.meta.saveKey);
  logEntry('battle', reason);
  logEntry('system', '這次生命已經結束。本機存檔已清除，你必須重新開局。');
  render();
  return true;
}

function getEnemyTurnContext() {
  const intent = state.battle?.intent || { style: 'physical', preferredReactions: [], damageMult: 1, hitBonus: 0, telegraph: '' };
  const preferred = new Set(intent.preferredReactions || []);
  const reaction = state.battle?.playerReaction || null;
  const result = {
    intent,
    reaction,
    magic: intent.style === 'magic',
    hitBonus: intent.hitBonus || 0,
    damageMult: intent.damageMult || 1,
    canceled: false,
    dodgeFlavor: false
  };
  if (reaction === 'guard') {
    state.battle.playerGuard = true;
    result.hitBonus += preferred.has('guard') ? -14 : -6;
    result.damageMult *= preferred.has('guard') ? 0.58 : 0.76;
  }
  if (reaction === 'dodge') {
    result.hitBonus += preferred.has('dodge') ? -18 : -8;
    result.damageMult *= preferred.has('dodge') ? 0.7 : 0.88;
    result.dodgeFlavor = true;
  }
  if (reaction === 'counter') {
    result.hitBonus += preferred.has('counter') ? -10 : -3;
    result.damageMult *= 0.92;
  }
  if (reaction === 'interrupt' && state.battle?.interrupted && intent.style === 'magic') {
    result.canceled = true;
  }
  return result;
}

function maybeInterruptIntent(skill = 'attack', bonus = 0) {
  if (!state.battle?.intent || state.battle.intent.style !== 'magic') return false;
  const rate = clamp(24 + getFinalStat('DEX') + Math.floor(getFinalStat('INT') * 0.7) + bonus, 15, 82);
  if (chance(rate)) {
    state.battle.interrupted = true;
    logEntry('battle', `你成功打亂了對方的蓄勢節奏（中斷率 ${rate}%）。`);
    return true;
  }
  logEntry('system', `你試圖在對方完成動作前干擾牠，但沒能完全打斷（中斷率 ${rate}%）。`);
  return false;
}

function finishEnemyPhase() {
  if (!state.battle) return;
  state.battle.playerGuard = false;
  state.battle.playerReaction = null;
  state.battle.interrupted = false;
  state.battle.turn += 1;
  if (typeof queueEnemyIntent === 'function') queueEnemyIntent();
}

function registerCorpse(enemyId) {
  const enemyData = GD.enemies[enemyId];
  const hasParts = Object.values(GD.anatomyParts || {}).some((row) => row.enemyId === enemyId);
  const isBiological = enemyData && enemyData.bodyType === 'biological';
  if (!enemyData || !isBiological || !hasParts) {
    state.recentCorpse = null;
    return;
  }
  state.recentCorpse = {
    enemyId,
    locationId: state.location,
    dissected: false,
    createdDay: state.day,
    createdTurn: state.turn,
    harvestedParts: {}
  };
  logEntry('system', `${enemyData.name} 倒下後留下完整屍體。你可以選擇不同部位進行解剖採取。`);
}

function checkBattleEnd() {
  if (!state.battle) return true;
  if (state.battle.enemy.hp <= 0) {
    const enemy = state.battle.enemy;
    logEntry('reward', `你擊敗了 ${enemy.name}。`);
    gainGold(enemy.gold || 0);
    addExp(enemy.exp || 0, enemy.name);
    (enemy.drops || []).forEach((drop) => {
      const rate = drop.chance * 100 + recalcDerived().passive.rareFind * 100;
      if (drop.chance >= 1 || chance(rate)) {
        addItem(drop.id, drop.qty || 1);
        logEntry('reward', `取得 ${GD.items[drop.id].name} ×${drop.qty || 1}。`);
      }
    });
    registerCommissionKill(enemy.id);
    registerCorpse(enemy.id);
    if (canDevourCorpse && canDevourCorpse() && enemy.bodyType === 'biological') {
      logEntry('system', `史萊姆本能在催促你吞食 ${enemy.name} 的殘骸，以吸收其中殘留的能力痕跡。`);
    }
    if (typeof triggerSkillLearning === 'function') {
      if (enemy.bodyType === 'biological') triggerSkillLearning('biological_hunt', { label: enemy.name, success: true, flatBonus: 3 });
      triggerSkillLearning('martial_victory', { label: `${enemy.name} 戰鬥勝利`, success: true, flatBonus: 2 });
      if (enemy.id === 'arcane_wisp' || enemy.id === 'chapel_wraith' || enemy.id === 'rift_beast') triggerSkillLearning('arcane_contact', { label: `${enemy.name} 奧術接觸`, success: true, highRisk: true, flatBonus: 4 });
    }
    resolveBattleOutcome(enemy.id);
    recordActivity('monsterKills', 1);
    if (enemy.bodyType === 'biological') {
      recordActivity('biologicalKills', 1);
      recordActivity('huntProgress', 1);
      if (getCurrentJobId() === 'hunter') gainJobExp('hunter', 24, `討伐 ${enemy.name}`);
    }
    state.battle = null;
    advanceTime(1);
    syncQuestProgress();
    autoSave();
    render();
    return true;
  }
  if (state.resources.hp <= 0) {
    return triggerGameOver(`你在與 ${state.battle.enemy.name} 的戰鬥中倒下了。`) || true;
  }
  return false;
}

function enemyTurn() {
  if (!state.battle || state.gameOver) return;
  const enemy = state.battle.enemy;
  const d = recalcDerived();

  if (enemy.burning > 0) {
    const burnDmg = Math.max(2, Math.floor(d.matk * 0.2));
    enemy.hp -= burnDmg;
    enemy.burning -= 1;
    logEntry('battle', `${enemy.name} 受到餘燼灼燒 ${burnDmg} 點傷害。`);
    if (checkBattleEnd()) return;
  }

  const ctx = getEnemyTurnContext();
  if (ctx.canceled) {
    logEntry('battle', `${enemy.name} 原本準備好的動作被你硬生生打斷了。`);
    finishEnemyPhase();
    autoSave();
    render();
    return;
  }

  const roll = enemyAttackRoll({
    enemy,
    magic: ctx.magic,
    label: `${enemy.name}${ctx.magic ? '蓄勢異能' : '攻擊'}`,
    bonus: ctx.hitBonus
  });
  if (!roll.hit) {
    logEntry('battle', ctx.dodgeFlavor ? `你順著 ${enemy.name} 的動作空隙滑開，避過了這一擊。` : `${enemy.name} 的攻勢被你避開了。`);
    finishEnemyPhase();
    autoSave();
    render();
    return;
  }

  let damage;
  if (ctx.magic) {
    damage = Math.max(1, Math.floor((enemy.matk - d.mdef * 0.45 + rand(0, 4)) * ctx.damageMult));
    if (roll.crit) damage = Math.floor(damage * 1.5);
    damage = playerTakeDamage(damage, 'magic');
    logEntry('battle', `${enemy.name} 釋放出已經成形的異界能量，造成 ${damage} 點魔法傷害。`);
  } else {
    damage = Math.max(1, Math.floor((enemy.atk - d.pdef * 0.5 + rand(0, 5)) * ctx.damageMult));
    if (roll.crit) damage = Math.floor(damage * 1.5);
    damage = playerTakeDamage(damage, 'physical');
    logEntry('battle', `${enemy.name} 的動作落到你身上，造成 ${damage} 點物理傷害。`);
  }

  if (enemy.id === 'rift_beast' && chance(25)) {
    const spLoss = Math.min(8, state.resources.sp);
    state.resources.sp -= spLoss;
    logEntry('battle', `裂隙獸的扭曲吼聲干擾了你的步伐，額外失去 ${spLoss} 點體力。`);
  }
  finishEnemyPhase();
  checkBattleEnd();
  autoSave();
  render();
}

function battleBasicAttack(mode = 'attack') {
  if (!state.battle || state.gameOver) return;
  const enemy = state.battle.enemy;
  const intent = state.battle.intent || { preferredReactions: [], style: 'physical' };
  const preferred = new Set(intent.preferredReactions || []);
  let bonus = 0;
  let mult = 1;
  let label = '普通攻擊';
  state.battle.playerReaction = mode;

  if (mode === 'counter') {
    label = '看準破綻的反擊';
    bonus += preferred.has('counter') ? 3 : 1;
    mult *= preferred.has('counter') ? 1.22 : 1.08;
  }
  if (mode === 'attack') {
    label = '搶先攻擊';
    bonus += intent.style === 'magic' ? 1 : 0;
  }

  const roll = playerAttackRoll({ label, enemy, main: 'STR', sub: 'DEX', bonus });
  if (!roll.hit) {
    if (typeof triggerSkillLearning === 'function') triggerSkillLearning('basic_attack', { label, success: false, flatBonus: 1 });
    logEntry('battle', `${label}落空了。`);
    enemyTurn();
    return;
  }
  let damage = Math.floor(calcPhysicalDamage(mult, getProfessionEffects().martialDamageFlat || 0) * mult);
  if (roll.crit || chance(recalcDerived().cri)) {
    damage = Math.floor(damage * 1.5);
    logEntry('battle', '你打出了一記暴擊。');
  }
  enemy.hp -= damage;
  if (mode === 'counter') logEntry('battle', `你等到 ${enemy.name} 靠近才還手，造成 ${damage} 點傷害。`);
  else logEntry('battle', `你以${label}對 ${enemy.name} 造成 ${damage} 點傷害。`);
  if (intent.style === 'magic') maybeInterruptIntent('attack', mode === 'counter' ? 12 : 6);
  recordActivity('martialSkillUses', 1);
  recordActivity('smithProgress', 1);
  if (getCurrentJobId() === 'blacksmith') gainJobExp('blacksmith', 10, '鍛鍊武技架式');
  if (typeof triggerSkillLearning === 'function') triggerSkillLearning('basic_attack', { label, success: true, flatBonus: enemy.bodyType === 'biological' ? 2 : 0 });
  if (checkBattleEnd()) return;
  enemyTurn();
}

function skillHitRoll(skillId, enemy, magic = false, bonus = 0) {
  const def = GD.skills[skillId];
  const main = magic ? 'INT' : 'STR';
  const sub = magic ? 'LUK' : 'DEX';
  return playerAttackRoll({ label: def.name, enemy, main, sub, bonus, magic });
}

function useSkillInBattle(skillId) {
  if (!state.battle || !hasLearnedSkill(skillId)) return;
  const skill = GD.skills[skillId];
  const d = recalcDerived();
  const jobFx = getProfessionEffects();

  if (skill.costSP && state.resources.sp < skill.costSP) {
    logEntry('system', `${skill.name} 需要 ${skill.costSP} 點體力。`);
    render();
    return;
  }
  if (skill.costMP && state.resources.mp < skill.costMP) {
    logEntry('system', `${skill.name} 需要 ${skill.costMP} 點魔力。`);
    render();
    return;
  }

  if (skill.costSP) spendResource('sp', skill.costSP);
  if (skill.costMP) spendResource('mp', skill.costMP);

  const stageRatio = getSkillStageInfo(getSkillState(skillId).proficiency || 0).ratio;
  const enemy = state.battle.enemy;
  const school = skill.school || 'support';
  if (school === 'martial') {
    recordActivity('martialSkillUses', 1);
    recordActivity('smithProgress', 1);
    if (getCurrentJobId() === 'blacksmith') gainJobExp('blacksmith', 18, `施放 ${skill.name}`);
  }
  if (school === 'magic') recordActivity('magicSkillUses', 1);

  if (skillId === 'slash') {
    const roll = skillHitRoll(skillId, enemy, false, 1);
    if (!roll.hit) logEntry('battle', `你施放 ${skill.name}，但被 ${enemy.name} 躲過。`);
    else {
      let damage = Math.floor(calcPhysicalDamage(1.15, 2 + (jobFx.martialDamageFlat || 0)) * stageRatio);
      if (roll.crit) damage = Math.floor(damage * 1.5);
      enemy.hp -= damage;
      logEntry('battle', `${skill.name} 命中，造成 ${damage} 點傷害。`);
    }
    if (hasLearnedSkill(skillId)) gainSkillProficiency(skillId, 140, '戰鬥施放');
  } else if (skillId === 'heavy_slash') {
    const roll = skillHitRoll(skillId, enemy, false, 0);
    if (!roll.hit) logEntry('battle', `${skill.name} 的重斬被閃開了。`);
    else {
      let damage = Math.floor(calcPhysicalDamage(1.55, 6 + (jobFx.martialDamageFlat || 0)) * stageRatio + enemy.def * 0.2);
      if (roll.crit) damage = Math.floor(damage * 1.5);
      enemy.hp -= damage;
      logEntry('battle', `${skill.name} 震開對手防勢，造成 ${damage} 點重擊傷害。`);
    }
    if (hasLearnedSkill(skillId)) gainSkillProficiency(skillId, 110, '戰鬥施放');
  } else if (skillId === 'rapid_slash') {
    let total = 0;
    for (let i = 0; i < 2; i += 1) {
      const roll = skillHitRoll(skillId, enemy, false, 2);
      if (roll.hit) {
        let hit = Math.floor(calcPhysicalDamage(0.78, 1 + (jobFx.martialDamageFlat || 0)) * stageRatio);
        if (roll.crit) hit = Math.floor(hit * 1.5);
        total += hit;
      }
    }
    enemy.hp -= total;
    logEntry('battle', `${skill.name} 連續切入，總共造成 ${total} 點傷害。`);
    if (hasLearnedSkill(skillId)) gainSkillProficiency(skillId, 110, '戰鬥施放');
  } else if (skillId === 'breaker_cleave') {
    const roll = skillHitRoll(skillId, enemy, false, 1);
    if (!roll.hit) logEntry('battle', `${skill.name} 劈空了。`);
    else {
      let damage = Math.floor(calcPhysicalDamage(1.8, 10 + (jobFx.martialDamageFlat || 0)) * stageRatio + enemy.def * 0.45);
      if (roll.crit) damage = Math.floor(damage * 1.5);
      enemy.hp -= damage;
      logEntry('battle', `${skill.name} 劈裂防禦，造成 ${damage} 點傷害。`);
    }
    if (hasLearnedSkill(skillId)) gainSkillProficiency(skillId, 90, '戰鬥施放');
  } else if (skillId === 'storm_flurry') {
    let total = 0;
    for (let i = 0; i < 3; i += 1) {
      const roll = skillHitRoll(skillId, enemy, false, 2);
      if (roll.hit) {
        let hit = Math.floor(calcPhysicalDamage(0.68, jobFx.martialDamageFlat || 0) * stageRatio);
        if (roll.crit) hit = Math.floor(hit * 1.5);
        total += hit;
      }
    }
    enemy.hp -= total;
    logEntry('battle', `${skill.name} 捲起暴風般的連擊，造成 ${total} 點總傷害。`);
    if (hasLearnedSkill(skillId)) gainSkillProficiency(skillId, 90, '戰鬥施放');
  } else if (skillId === 'spark') {
    const roll = skillHitRoll(skillId, enemy, true, 1);
    if (!roll.hit) logEntry('battle', `${skill.name} 擊偏了，火花濺散在地面。`);
    else {
      let damage = Math.floor(calcMagicDamage(1.18, 2) * stageRatio);
      if (roll.crit) damage = Math.floor(damage * 1.5);
      enemy.hp -= damage;
      logEntry('battle', `${skill.name} 擊中 ${enemy.name}，造成 ${damage} 點火焰傷害。`);
    }
    gainSkillProficiency(skillId, 140, '戰鬥施放');
  } else if (skillId === 'firebolt') {
    const roll = skillHitRoll(skillId, enemy, true, 0);
    if (!roll.hit) logEntry('battle', `${skill.name} 失手掠過目標。`);
    else {
      let damage = Math.floor(calcMagicDamage(1.52, 6) * stageRatio);
      if (roll.crit) damage = Math.floor(damage * 1.5);
      enemy.hp -= damage;
      logEntry('battle', `${skill.name} 穿透灰霧，造成 ${damage} 點火焰傷害。`);
    }
    if (hasLearnedSkill(skillId)) gainSkillProficiency(skillId, 110, '戰鬥施放');
  } else if (skillId === 'ember_guard') {
    state.battle.playerGuard = true;
    enemy.burning = Math.max(enemy.burning, 2);
    const splash = Math.floor(d.matk * 0.35 * stageRatio);
    enemy.hp -= splash;
    logEntry('battle', `${skill.name} 包覆你全身，並以餘燼反燒 ${enemy.name} ${splash} 點傷害。`);
    if (hasLearnedSkill(skillId)) gainSkillProficiency(skillId, 110, '戰鬥施放');
  } else if (skillId === 'flare_lance') {
    const roll = skillHitRoll(skillId, enemy, true, 1);
    if (!roll.hit) logEntry('battle', `${skill.name} 未能貫穿目標。`);
    else {
      let damage = Math.floor(calcMagicDamage(1.95, 9) * stageRatio);
      if (roll.crit) damage = Math.floor(damage * 1.5);
      enemy.hp -= damage;
      logEntry('battle', `${skill.name} 貫穿目標，造成 ${damage} 點高額傷害。`);
    }
    if (hasLearnedSkill(skillId)) gainSkillProficiency(skillId, 90, '戰鬥施放');
  } else if (skillId === 'blazing_aegis') {
    state.battle.playerGuard = true;
    enemy.burning = Math.max(enemy.burning, 3);
    const splash = Math.floor(d.matk * 0.45 * stageRatio);
    enemy.hp -= splash;
    logEntry('battle', `${skill.name} 展開灼焰壁障，並回敬 ${splash} 點灼燒傷害。`);
    if (hasLearnedSkill(skillId)) gainSkillProficiency(skillId, 90, '戰鬥施放');
  } else if (skillId === 'first_aid' || skillId === 'field_surgery') {
    let heal = skillId === 'field_surgery'
      ? Math.floor((28 + d.VIT * 3 + d.INT * 2) * stageRatio)
      : Math.floor((16 + d.VIT * 2 + d.INT) * stageRatio);
    heal = Math.floor(heal * (1 + (jobFx.healingPct || 0)));
    restoreResource('hp', heal);
    logEntry('battle', `${skill.name} 讓你恢復 ${heal} 點生命。`);
    if (hasLearnedSkill(skillId)) gainSkillProficiency(skillId, 120, '戰鬥治療');
  }

  if (state.battle?.intent?.style === 'magic' && skill.type === 'active' && skill.school !== 'support') maybeInterruptIntent(skillId, skill.school === 'martial' ? 8 : 4);
  if (checkBattleEnd()) return;
  enemyTurn();
}

function fleeBattle() {
  if (!state.battle) return;
  const dc = 10 + Math.floor((state.battle.enemy.agi || 0) / 2);
  const success = rollCheck({ label: '撤退', main: 'AGI', sub: 'LUK', dc, bonus: 0, skill: 'explore' });
  if (success) {
    logEntry('battle', `你成功從 ${state.battle.enemy.name} 手下脫身。`);
    state.battle = null;
    spendResource('sp', Math.min(8, state.resources.sp));
    autoSave();
    render();
  } else {
    logEntry('battle', '撤退失敗，敵人緊追不放。');
    enemyTurn();
  }
}

function guardBattle() {
  if (!state.battle) return;
  state.battle.playerReaction = 'guard';
  state.battle.playerGuard = true;
  logEntry('battle', '你穩住架勢，準備硬接這一下。');
  enemyTurn();
}

function dodgeBattle() {
  if (!state.battle) return;
  state.battle.playerReaction = 'dodge';
  logEntry('battle', '你先把重心放低，準備順著對方動作橫移閃開。');
  enemyTurn();
}

function interruptBattle() {
  if (!state.battle) return;
  state.battle.playerReaction = 'interrupt';
  const enemy = state.battle.enemy;
  const roll = playerAttackRoll({ label: '打斷動作', enemy, main: 'DEX', sub: 'AGI', bonus: 2 });
  if (!roll.hit) {
    logEntry('battle', '你試圖搶進打斷對方，卻沒能碰到要害。');
    enemyTurn();
    return;
  }
  const damage = Math.floor(calcPhysicalDamage(0.72, 0));
  enemy.hp -= damage;
  logEntry('battle', `你搶在對方完成動作前刺入空檔，造成 ${damage} 點傷害。`);
  maybeInterruptIntent('interrupt', 16);
  if (checkBattleEnd()) return;
  enemyTurn();
}


function resolveBattleOutcome(enemyId) {
  if (enemyId === 'chapel_wraith' && !state.flags.chapel_clue_found) {
    state.flags.chapel_clue_found = true;
    state.quests.main_rift.stage = 1;
    logEntry('reward', '你自祭壇幽影中取得【破損聖印】，其中記錄了灰裂隙的第一段線索。');
    gainSkillProficiency('traveler_instinct', 90, '遺跡調查成功');
    gainSkillProficiency('spark', 70, '與幽影戰鬥');
  }
  if (enemyId === 'arcane_wisp' && !state.flags.tower_clue_found) {
    state.flags.tower_clue_found = true;
    state.quests.main_rift.stage = 1;
    logEntry('reward', '弧光碎晶內殘留的座標與聖印內容互相吻合，第二段線索已取得。');
    gainSkillProficiency('spark', 80, '解析奧術碎晶');
    gainSkillProficiency('traveler_instinct', 90, '追索異界波動');
  }
  if (enemyId === 'rift_beast' && !state.flags.rift_core_stabilized) {
    state.flags.rift_core_stabilized = true;
    state.quests.main_rift.stage = 3;
    addExp(80, '暫時封穩灰燼裂隙');
    gainGold(60);
    logEntry('reward', '你將裂隙穩定核嵌入核心祭環，灰霧暫時平息。Beta v1 的主線到此結束。後續版本可在此基底上擴充。');
  }
}

function handleBattleAction(type) {
  if (type === 'attack') battleBasicAttack('attack');
  if (type === 'counter') battleBasicAttack('counter');
  if (type === 'guard') guardBattle();
  if (type === 'dodge') dodgeBattle();
  if (type === 'interrupt') interruptBattle();
  if (type === 'flee') fleeBattle();
}

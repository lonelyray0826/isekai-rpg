// Combat system: battles, traditional RPG hit checks, corpses, battle outcomes
function startBattle(enemyId, battleTag = '') {
  const enemyData = GD.enemies[enemyId];
  if (!enemyData) return;
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
    firstAidUsed: false
  };
  setUiMode(null);
  logEntry('battle', enemyData.intro);
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
    const loss = Math.min(20, state.gold);
    state.gold -= loss;
    state.location = 'emberport';
    state.battle = null;
    const d = recalcDerived();
    state.resources.hp = Math.floor(d.maxHp * 0.6);
    state.resources.sp = Math.floor(d.maxSp * 0.5);
    state.resources.mp = Math.floor(d.maxMp * 0.5);
    setUiMode(null);
    logEntry('battle', `你在戰鬥中倒下，被路過的巡路者救回餘燼港。遺失 ${loss} 金幣。`);
    autoSave();
    render();
    return true;
  }
  return false;
}

function enemyTurn() {
  if (!state.battle) return;
  const enemy = state.battle.enemy;
  const d = recalcDerived();

  if (enemy.burning > 0) {
    const burnDmg = Math.max(2, Math.floor(d.matk * 0.2));
    enemy.hp -= burnDmg;
    enemy.burning -= 1;
    logEntry('battle', `${enemy.name} 受到餘燼灼燒 ${burnDmg} 點傷害。`);
    if (checkBattleEnd()) return;
  }

  const isMagic = enemy.matk > 0 && chance(35);
  const roll = enemyAttackRoll({ enemy, magic: isMagic, label: `${enemy.name}${isMagic ? '法術' : '攻擊'}` });
  if (!roll.hit) {
    logEntry('battle', `${enemy.name} 的攻勢被你避開了。`);
    state.battle.playerGuard = false;
    render();
    return;
  }

  let damage;
  if (isMagic) {
    damage = Math.max(1, Math.floor(enemy.matk - d.mdef * 0.45 + rand(0, 4)));
    if (roll.crit) damage = Math.floor(damage * 1.5);
    damage = playerTakeDamage(damage, 'magic');
    logEntry('battle', `${enemy.name} 以異界能量轟擊你，造成 ${damage} 點魔法傷害。`);
  } else {
    damage = Math.max(1, Math.floor(enemy.atk - d.pdef * 0.5 + rand(0, 5)));
    if (roll.crit) damage = Math.floor(damage * 1.5);
    damage = playerTakeDamage(damage, 'physical');
    logEntry('battle', `${enemy.name} 對你造成 ${damage} 點物理傷害。`);
  }

  if (enemy.id === 'rift_beast' && chance(25)) {
    const spLoss = Math.min(8, state.resources.sp);
    state.resources.sp -= spLoss;
    logEntry('battle', `裂隙獸的扭曲吼聲干擾了你的步伐，額外失去 ${spLoss} 點體力。`);
  }
  state.battle.playerGuard = false;
  checkBattleEnd();
  autoSave();
  render();
}

function battleBasicAttack() {
  if (!state.battle) return;
  const enemy = state.battle.enemy;
  const roll = playerAttackRoll({ label: '普通攻擊', enemy, main: 'STR', sub: 'DEX', bonus: 0 });
  if (!roll.hit) {
    if (typeof triggerSkillLearning === 'function') triggerSkillLearning('basic_attack', { label: '普通攻擊', success: false, flatBonus: 1 });
    logEntry('battle', '你的普通攻擊落空了。');
    enemyTurn();
    return;
  }
  let damage = calcPhysicalDamage(1, getProfessionEffects().martialDamageFlat || 0);
  if (roll.crit || chance(recalcDerived().cri)) {
    damage = Math.floor(damage * 1.5);
    logEntry('battle', '你打出了一記暴擊。');
  }
  enemy.hp -= damage;
  recordActivity('martialSkillUses', 1);
  recordActivity('smithProgress', 1);
  if (getCurrentJobId() === 'blacksmith') gainJobExp('blacksmith', 10, '鍛鍊武技架式');
  if (typeof triggerSkillLearning === 'function') triggerSkillLearning('basic_attack', { label: '普通攻擊', success: true, flatBonus: enemy.bodyType === 'biological' ? 2 : 0 });
  logEntry('battle', `你以普通攻擊對 ${enemy.name} 造成 ${damage} 點傷害。`);
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
  state.battle.playerGuard = true;
  logEntry('battle', '你穩住架勢，準備承受下一輪衝擊。');
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
  if (type === 'attack') battleBasicAttack();
  if (type === 'guard') guardBattle();
  if (type === 'flee') fleeBattle();
}

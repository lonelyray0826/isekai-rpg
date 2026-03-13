// Action system: world interactions and dispatch
function actionGuildReport() {
  openGuildBoard();
}

function actionRestInn() {
  const cost = 12;
  if (state.gold < cost) {
    logEntry('system', `休息需要 ${cost} 金幣，但你手頭不足。`);
    render();
    return;
  }
  state.gold -= cost;
  const d = recalcDerived();
  state.resources.hp = d.maxHp;
  state.resources.sp = d.maxSp;
  state.resources.mp = d.maxMp;
  restoreSatiety(22, '旅店熱湯與睡眠讓你恢復了精神');
  if (hasLearnedSkill('tough_body')) gainSkillProficiency('tough_body', 50, '完整休息');
  if (typeof triggerSkillLearning === 'function') {
    triggerSkillLearning('field_rest', { label: '旅店休息', success: true });
    triggerSkillLearning('medical_use', { label: '旅店整備', success: true, flatBonus: 2 });
  }
  logEntry('system', `你在旅店休息了一晚，支付 ${cost} 金幣並完全恢復狀態。`);
  advanceTime(1);
  autoSave();
  render();
}

function actionBuySupplies() {
  openMarket('emberport_market', 'buy');
}

function actionOpenMarket() {
  openMarket('emberport_market', 'buy');
}

function actionCookMeal() {
  const jobFx = getProfessionEffects();
  if ((state.inventory.beast_meat || 0) <= 0 && (state.inventory.ration || 0) <= 0) {
    logEntry('system', '你沒有可用於烹煮的獸肉或口糧。');
    render();
    return;
  }
  if ((state.inventory.beast_meat || 0) > 0) {
    removeItem('beast_meat', 1);
    restoreResource('hp', 10);
    restoreResource('sp', 16 + (jobFx.foodSpBonus || 0));
    restoreSatiety(40 + (jobFx.satietyGainFlat || 0), '熱食讓你恢復了胃口');
    logEntry('reward', '你把獸肉烹成熱食，恢復少量生命、體力與大量飽食度。');
  } else {
    removeItem('ration', 1);
    restoreResource('sp', 12 + (jobFx.foodSpBonus || 0));
    restoreSatiety(32 + (jobFx.satietyGainFlat || 0), '你把口糧重新加熱整理成一份像樣的餐點');
    logEntry('reward', '你把旅行口糧加熱成一份簡單餐點，飽食與體力都有所恢復。');
  }
  recordActivity('mealsCooked', 1);
  recordActivity('cookProgress', 1);
  if (getCurrentJobId() === 'cook') gainJobExp('cook', 34, '烹煮熱食');
  advanceTime(1);
  autoSave();
  render();
}

function actionForageHerb() {
  if (state.resources.sp < 8) {
    logEntry('system', '搜尋草藥至少需要 8 點體力。');
    render();
    return;
  }
  spendResource('sp', 8);
  const bonus = getCurrentJobId() === 'farmer' ? getJobLevel('farmer') : 0;
  const success = rollCheck({ label: '林地採集', main: 'DEX', sub: 'LUK', dc: 11, skill: 'explore', bonus });
  if (success) {
    let qty = chance(40 + recalcDerived().passive.rareFind * 100) ? 2 : 1;
    if (chance((getProfessionEffects().herbQtyBonusChance || 0) * 100)) qty += 1;
    addItem('ash_herb', qty);
    addExp(10 + qty * 2, '林地採集');
    if (hasLearnedSkill('traveler_instinct')) gainSkillProficiency('traveler_instinct', 70, '成功採集');
    if (typeof triggerSkillLearning === 'function') triggerSkillLearning('forage', { label: '成功採集', success: true });
    recordActivity('forageCount', 1);
    if (getCurrentJobId() === 'farmer') gainJobExp('farmer', 26, '採集灰葉草');
    logEntry('reward', `你採得灰葉草 ×${qty}。`);
  } else {
    if (typeof triggerSkillLearning === 'function') triggerSkillLearning('forage', { label: '野外採集', success: false, flatBonus: 1 });
    logEntry('system', '你只翻出一些普通雜草與潮濕泥土。');
  }
  advanceTime(1);
  syncQuestProgress();
  autoSave();
  render();
}

function actionHiddenCache() {
  if (state.flags.opened_hidden_cache) {
    logEntry('system', '你已經取走這處林中藏匣的內容。');
    render();
    return;
  }
  const bonus = (state.inventory.lockpick || 0) > 0 ? 1 : 0;
  const success = rollCheck({ label: '林中藏匣', main: 'DEX', sub: 'INT', dc: 14, bonus, skill: 'explore' });
  if (success) {
    state.flags.opened_hidden_cache = true;
    addItem('potion', 1);
    addItem('ether', 1);
    gainGold(24);
    addExp(22, '破解藏匣');
    if (hasLearnedSkill('traveler_instinct')) gainSkillProficiency('traveler_instinct', 90, '發現隱藏補給');
    if (typeof triggerSkillLearning === 'function') triggerSkillLearning('danger_explore', { label: '破解藏匣', success: true });
    logEntry('reward', '你利用開鎖針撬開藏匣，找到了藥品與一袋硬幣。');
  } else {
    const hurt = playerTakeDamage(8, 'physical');
    logEntry('battle', `你碰觸了殘留陷阱，被鐵片劃傷，受到 ${hurt} 點傷害。`);
  }
  advanceTime(1);
  autoSave();
  render();
}

function actionChapelInvestigate() {
  const success = rollCheck({ label: '荒鐘祭壇', main: 'INT', sub: 'LUK', dc: 13, skill: 'relic' });
  if (!success) {
    const hurt = playerTakeDamage(10, 'magic');
    logEntry('battle', `祭壇殘留的灰光突然逆湧，你受到 ${hurt} 點魔力灼傷。`);
    advanceTime(1);
    autoSave();
    render();
    return;
  }
  if (!state.flags.chapel_clue_found) {
    startBattle('chapel_wraith', 'chapel');
    if (hasLearnedSkill('traveler_instinct')) gainSkillProficiency('traveler_instinct', 65, '祭壇調查成功');
    if (typeof triggerSkillLearning === 'function') triggerSkillLearning('danger_explore', { label: '祭壇調查', success: true });
    return;
  }
  addExp(12, '再度調查禮拜堂');
  if (hasLearnedSkill('traveler_instinct')) gainSkillProficiency('traveler_instinct', 45, '再度調查遺址');
  if (typeof triggerSkillLearning === 'function') triggerSkillLearning('danger_explore', { label: '重複調查遺址', success: true, flatBonus: 1 });
  logEntry('system', '你再次檢視破損祭壇，僅確認灰霧已比先前薄弱。');
  advanceTime(1);
  autoSave();
  render();
}

function actionChapelPrayRest() {
  restoreResource('sp', 18);
  restoreResource('mp', 24);
  if (hasLearnedSkill('first_aid')) gainSkillProficiency('first_aid', 45, '環境整備');
  if (typeof triggerSkillLearning === 'function') {
    triggerSkillLearning('field_rest', { label: '禮拜堂短暫休整', success: true, flatBonus: 1 });
    triggerSkillLearning('medical_use', { label: '現地處置', success: true });
  }
  logEntry('system', '你在長椅與殘火間短暫整備，體力與魔力略有恢復。');
  advanceTime(1);
  autoSave();
  render();
}

function actionTowerStudy() {
  const success = rollCheck({ label: '斷塔符文', main: 'INT', sub: 'DEX', dc: 14, skill: 'relic' });
  if (!success) {
    const hurt = playerTakeDamage(12, 'magic');
    logEntry('battle', `弧光碎火炸裂，你受到 ${hurt} 點傷害。`);
    advanceTime(1);
    autoSave();
    render();
    return;
  }
  if (!state.flags.tower_clue_found) {
    startBattle('arcane_wisp', 'tower');
    if (hasLearnedSkill('spark')) gainSkillProficiency('spark', 50, '解析塔底符文');
    if (typeof triggerSkillLearning === 'function') triggerSkillLearning('tower_study', { label: '解析塔底符文', success: true, flatBonus: 4 });
    return;
  }
  addExp(12, '再度解析符文');
  if (hasLearnedSkill('spark')) gainSkillProficiency('spark', 40, '重複解析奧術痕跡');
  if (typeof triggerSkillLearning === 'function') triggerSkillLearning('tower_study', { label: '重複解析奧術痕跡', success: true });
  logEntry('system', '你重新檢視塔底環陣，發現灰霧流向比先前更加穩定。');
  advanceTime(1);
  autoSave();
  render();
}

function actionTowerSalvage() {
  spendResource('sp', Math.min(6, state.resources.sp));
  const gotEther = chance(35 + recalcDerived().passive.rareFind * 100);
  gainGold(rand(8, 18) + (getProfessionEffects().salvageGoldBonus || 0));
  if (gotEther) {
    addItem('ether', 1);
    logEntry('reward', '你在石堆中翻出了完好的以太藥滴。');
  } else {
    logEntry('system', '你只找到少量可用金屬與舊硬幣。');
  }
  recordActivity('towerSalvage', 1);
  recordActivity('smithProgress', 1);
  if (getCurrentJobId() === 'blacksmith') gainJobExp('blacksmith', 28, '翻找遺蹟與舊金屬');
  if (hasLearnedSkill('traveler_instinct')) gainSkillProficiency('traveler_instinct', 55, '翻找遺蹟');
  if (typeof triggerSkillLearning === 'function') triggerSkillLearning('danger_explore', { label: '翻找遺蹟', success: true });
  advanceTime(1);
  autoSave();
  render();
}

function actionHuntWolf() {
  startBattle('wolf', 'greenwood');
}

function actionRiftDescend() {
  if (!state.flags.rift_path_unlocked) {
    logEntry('system', '你尚未掌握完整路徑資訊，灰霧會讓你迷失。');
    render();
    return;
  }
  if (state.flags.rift_core_stabilized) {
    logEntry('system', '裂隙核心已在 Beta v1 暫時穩定，後續可在此基底追加第二章內容。');
    render();
    return;
  }
  startBattle('rift_beast', 'rift');
}

function actionRiftHarvest() {
  const success = rollCheck({ label: '裂隙採集', main: 'AGI', sub: 'LUK', dc: 15, skill: 'explore' });
  if (success) {
    addItem('ether', 1);
    gainGold(18);
    addExp(20, '裂隙採集成功');
    if (hasLearnedSkill('traveler_instinct')) gainSkillProficiency('traveler_instinct', 90, '危險區採集');
    if (typeof triggerSkillLearning === 'function') triggerSkillLearning('danger_explore', { label: '裂隙採集', success: true, highRisk: true, flatBonus: 3 });
    logEntry('reward', '你趁灰霧轉淡時取回一份裂隙殘渣與可販售的碎晶。');
  } else {
    const hurt = playerTakeDamage(16, 'magic');
    logEntry('battle', `灰霧逆捲入體，你受到 ${hurt} 點侵蝕傷害。`);
  }
  advanceTime(1);
  autoSave();
  render();
}

function handleAction(actionId) {
  const travelMap = {
    travel_greenwood: 'greenwood',
    travel_chapel: 'chapel',
    travel_tower: 'tower',
    travel_rift: 'riftmoor',
    travel_emberport: 'emberport'
  };
  if (travelMap[actionId]) {
    moveTo(travelMap[actionId]);
    return;
  }
  if (actionId.startsWith('guild_accept:')) return acceptCommission(actionId.split(':')[1]);
  if (actionId.startsWith('guild_turnin:')) return turnInCommission(actionId.split(':')[1]);
  if (actionId.startsWith('market_buy:')) return buyFromMarket(actionId.split(':')[1]);
  if (actionId.startsWith('market_sell:')) return sellToMarket(actionId.split(':')[1]);
  if (actionId.startsWith('market_tab:')) return setMarketTab(actionId.split(':')[1]);
  if (actionId.startsWith('dissect_part:')) return dissectCorpsePart(actionId.split(':')[1]);

  const map = {
    guild_report: actionGuildReport,
    open_market: actionOpenMarket,
    market_close: closeMarket,
    guild_close: () => { setUiMode(null); render(); },
    rest_inn: actionRestInn,
    buy_supplies: actionBuySupplies,
    cook_meal: actionCookMeal,
    forage_herb: actionForageHerb,
    hunt_wolf: actionHuntWolf,
    hidden_cache: actionHiddenCache,
    chapel_investigate: actionChapelInvestigate,
    chapel_pray_rest: actionChapelPrayRest,
    tower_study: actionTowerStudy,
    tower_salvage: actionTowerSalvage,
    rift_descend: actionRiftDescend,
    rift_harvest: actionRiftHarvest,
    dissect_corpse: openAnatomyMenu,
    anatomy_close: closeAnatomyMenu
  };
  const fn = map[actionId];
  if (fn) fn();
}

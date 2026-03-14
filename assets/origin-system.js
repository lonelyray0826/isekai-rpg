// Origin system: harsh-growth random birth origins, racial traits, slime corpse devour
const ORIGIN_RACES = {
  human: {
    id: 'human',
    name: '人類嬰兒',
    weight: 46,
    growthStage: '嬰兒',
    summary: '在人的社會秩序中成長，會因出身階層而擁有不同的起跑條件。',
    trade: { buyMult: 1.0, sellMult: 1.0 },
    passive: {},
    origins: [
      {
        id: 'wealthy', name: '富人家', weight: 24, location: 'emberport', gold: 88,
        statDelta: { INT: 1, LUK: 1, DEX: 1 }, satiety: 92,
        inventory: { potion: 2, ether: 1, ration: 3, lockpick: 1 },
        trade: { buyMult: 0.95, sellMult: 1.06 },
        passive: { relicBonus: 1 },
        logs: ['你在一戶有資產的商人家庭誕生。更好的照料讓你的起跑線略高於常人。']
      },
      {
        id: 'common', name: '平民家', weight: 48, location: 'emberport', gold: 36,
        statDelta: { STR: 1, VIT: 1 }, satiety: 80,
        inventory: { potion: 1, ether: 0, ration: 2, lockpick: 0 },
        trade: { buyMult: 1.0, sellMult: 1.0 },
        passive: {},
        logs: ['你出生在靠勞力維生的家庭。沒有過多資源，但也不至於一無所有。']
      },
      {
        id: 'slum', name: '貧民窟', weight: 28, location: 'emberport', gold: 8,
        statDelta: { DEX: 1, AGI: 1, VIT: 1 }, satiety: 60,
        inventory: { potion: 0, ether: 0, ration: 1, lockpick: 1 },
        trade: { buyMult: 1.08, sellMult: 0.94 },
        passive: { evadeBonus: 2, anatomyBonus: 1 },
        logs: ['你在港鎮陰暗的巷弄中出生。飢餓與擁擠讓你更早學會躲避與撿拾。']
      }
    ]
  },
  goblin: {
    id: 'goblin',
    name: '哥布林幼體',
    weight: 34,
    growthStage: '幼體',
    summary: '哥布林是群體生活的魔物種族，與人類社會的秩序與價值體系截然不同。',
    trade: { buyMult: 1.14, sellMult: 0.86 },
    passive: { bioHitBonus: 1, anatomyBonus: 1 },
    origins: [
      {
        id: 'hunter_den', name: '狩獵巢群', weight: 42, location: 'greenwood', gold: 2,
        statDelta: { AGI: 2, DEX: 1, VIT: 1 }, satiety: 72,
        inventory: { potion: 0, ether: 0, ration: 1, beast_meat: 1 },
        passive: { bioHitBonus: 2, firstStrike: 0.05 },
        logs: ['你出生在靠狩獵與圍捕維生的哥布林巢群。群體合作比個體榮耀更重要。']
      },
      {
        id: 'scavenger_den', name: '拾荒巢群', weight: 38, location: 'greenwood', gold: 4,
        statDelta: { DEX: 2, LUK: 1, AGI: 1 }, satiety: 68,
        inventory: { potion: 0, ether: 0, ration: 1, lockpick: 1 },
        passive: { rareFind: 0.05 },
        logs: ['你在拾荒與回收為主的巢群長大，對人類遺留物與腐敗屍骸有更高的適應力。']
      },
      {
        id: 'runt_den', name: '邊緣巢群', weight: 20, location: 'greenwood', gold: 0,
        statDelta: { STR: 1, VIT: 1, AGI: 1 }, satiety: 58,
        inventory: { potion: 0, ether: 0, ration: 0, beast_meat: 1 },
        passive: { physReduction: 0.03 },
        logs: ['你在資源稀薄的邊緣巢群中存活下來。弱者若想活著，只能變得更狠。']
      }
    ]
  },
  slime: {
    id: 'slime',
    name: '史萊姆幼體',
    weight: 20,
    growthStage: '幼體',
    summary: '史萊姆不是群居種族，更依賴本能、吞噬與分解；牠們能從屍體殘餘中抽取能力痕跡。',
    trade: { buyMult: 1.2, sellMult: 0.8 },
    passive: { anatomyBonus: 2, rareFind: 0.05 },
    canDevourCorpse: true,
    origins: [
      {
        id: 'grave_slime', name: '墓地黏核', weight: 36, location: 'chapel', gold: 0,
        statDelta: { VIT: 2, INT: 1 }, satiety: 74,
        inventory: { potion: 0, ether: 1, ration: 0 },
        passive: { relicBonus: 1, anatomyBonus: 3 },
        logs: ['你在墓地潮濕的泥層間形成。腐朽、死氣與殘餘記憶是你最初的養分。']
      },
      {
        id: 'marsh_slime', name: '沼澤黏團', weight: 34, location: 'greenwood', gold: 0,
        statDelta: { VIT: 1, AGI: 1, LUK: 1 }, satiety: 76,
        inventory: { potion: 0, ether: 0, ration: 0 },
        passive: { evadeBonus: 2, travelSpDiscount: 0.08 },
        logs: ['你在陰濕沼泥間誕生。漂流、躲藏與被動等待獵物，是你熟悉的生存方式。']
      },
      {
        id: 'carrion_slime', name: '屍餌黏核', weight: 30, location: 'greenwood', gold: 0,
        statDelta: { VIT: 1, INT: 1, LUK: 1 }, satiety: 82,
        inventory: { potion: 0, ether: 0, ration: 0, beast_meat: 1 },
        passive: { anatomyBonus: 2, rareFind: 0.08 },
        logs: ['你在被遺棄的屍骸旁成形。吞食死亡遺留的碎片，是你理解世界的方式。']
      }
    ]
  }
};

function weightedPick(list) {
  const total = list.reduce((sum, row) => sum + (row.weight || 1), 0);
  let roll = Math.random() * total;
  for (const row of list) {
    roll -= (row.weight || 1);
    if (roll <= 0) return row;
  }
  return list[list.length - 1];
}

function getOriginData() {
  return state?.originData || null;
}

function getOriginRace() {
  const data = getOriginData();
  return data ? data.race : null;
}

function getOriginTradeModifiers() {
  const data = getOriginData();
  return data?.trade || { buyMult: 1, sellMult: 1 };
}

function getOriginPassiveEffects() {
  const data = getOriginData();
  return data?.passive || {};
}

function getOriginSummaryText() {
  const data = getOriginData();
  if (!data) return '未知出身';
  return `${data.raceName}｜${data.originName}｜${data.growthTag}`;
}

function canDevourCorpse() {
  return !!getOriginData()?.canDevourCorpse;
}

function getGrowthModeLabel() {
  return state?.growthProfile?.label || '重養成';
}

function getGrowthRuleSummary() {
  return state?.growthProfile?.summary || '能力值成長速度緩慢。';
}

function createOriginStartState() {
  const start = GD.startingState();
  const race = weightedPick(Object.values(ORIGIN_RACES));
  const origin = weightedPick(race.origins);
  start.raceId = race.id;
  start.raceName = race.name;
  start.birthOriginId = origin.id;
  start.birthOriginName = origin.name;
  start.growthStage = race.growthStage;
  start.originClass = '平民';
  start.location = origin.location;
  start.gold = origin.gold;
  start.resources.satiety = origin.satiety;
  start.originData = {
    raceId: race.id,
    raceName: race.name,
    raceSummary: race.summary,
    originId: origin.id,
    originName: origin.name,
    growthTag: race.growthStage,
    passive: Object.assign({}, race.passive || {}, origin.passive || {}),
    trade: {
      buyMult: ((race.trade?.buyMult || 1) * (origin.trade?.buyMult || 1)),
      sellMult: ((race.trade?.sellMult || 1) * (origin.trade?.sellMult || 1))
    },
    canDevourCorpse: !!race.canDevourCorpse,
    logs: [...(race.logs || []), ...(origin.logs || [])]
  };
  start.growthProfile = {
    mode: 'harsh',
    label: '重養成／生存',
    summary: '升級只會少量帶來成長印記，能力值不再輕易上升；一旦死亡，本輪旅程就會直接結束。'
  };
  Object.entries(origin.statDelta || {}).forEach(([stat, delta]) => {
    if (start.stats[stat]) start.stats[stat].base += delta;
  });
  Object.entries(origin.inventory || {}).forEach(([itemId, qty]) => {
    start.inventory[itemId] = qty;
  });
  start.log = [
    { type: 'system', text: `你本次輪迴的起點是【${race.name}／${origin.name}】。這是一條偏向重養成與求生的漫長成長路線。` },
    ...start.originData.logs.map((text) => ({ type: 'system', text })),
    { type: 'system', text: '初階技能不再以機率瞬間領悟，而是必須透過反覆行動累積習得熟練，達門檻後才會真正學會。' },
    { type: 'system', text: race.id === 'slime' ? '史萊姆幼體可對生物屍體進行吞食同化，從殘骸中汲取技能痕跡。' : '你仍以平民為基底，後續可培養為各種生活副職與戰鬥流派。' }
  ];
  return start;
}

function getEnemyDevourRewards(enemyId) {
  const enemy = GD.enemies?.[enemyId];
  return enemy?.devourRewards || [];
}

function devourCorpse() {
  if (!canDevourCorpse()) {
    logEntry('system', '只有史萊姆幼體具備吞食屍體同化能力。');
    render();
    return;
  }
  if (!hasCorpseToDissect()) {
    logEntry('system', '目前沒有可吞食的生物屍體。');
    render();
    return;
  }
  const corpse = state.recentCorpse;
  const enemy = GD.enemies[corpse.enemyId];
  const rewards = getEnemyDevourRewards(corpse.enemyId);
  const satietyGain = Math.min(26, 10 + rewards.length * 4);
  restoreSatiety(satietyGain, `你吞食了 ${enemy.name} 的殘骸`);
  restoreResource('hp', Math.min(12, 4 + rewards.length * 2));
  let gained = [];
  rewards.forEach((row) => {
    const amount = row.practice || 0;
    if (amount <= 0) return;
    addSkillPractice(row.skillId, amount, `吞食 ${enemy.name}`);
    const skill = GD.skills?.[row.skillId];
    if (skill) gained.push(`${skill.name} +${amount}`);
  });
  corpse.harvestedParts = corpse.harvestedParts || {};
  getCorpseParts(corpse).forEach((part) => { corpse.harvestedParts[part.id] = true; });
  corpse.dissected = true;
  state.recentCorpse = null;
  setUiMode(null);
  logEntry('reward', gained.length ? `你吞食了 ${enemy.name} 的殘骸，並從中汲取：${gained.join('、')}。` : `你吞食了 ${enemy.name} 的殘骸，吸收了少量生命精華。`);
  autoSave();
  render();
}

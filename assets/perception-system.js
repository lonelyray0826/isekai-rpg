// Perception system: visible-object interactions and enemy intent telegraphs
function ensurePerceptionState() {
  if (!state.ui) state.ui = { mode: null, sceneFocus: null };
  if (typeof state.ui.sceneFocus === 'undefined') state.ui.sceneFocus = null;
  if (typeof state.heldObject === 'undefined') state.heldObject = null;
  if (typeof state.gameOver === 'undefined') state.gameOver = null;
}

function getHeldObject() {
  ensurePerceptionState();
  return state.heldObject || null;
}

function setHeldObject(obj) {
  ensurePerceptionState();
  state.heldObject = obj ? clone(obj) : null;
}

function clearHeldObject() {
  setHeldObject(null);
}

function getVisibleSceneObjects(locationId = state.location) {
  ensurePerceptionState();
  return Object.values(GD.sceneObjects || {})
    .filter((row) => row.locationId === locationId)
    .filter((row) => !(row.visibleIfFlags || []).some((flag) => !state.flags?.[flag]))
    .sort((a, b) => (a.sort || 999) - (b.sort || 999));
}

function getSceneFocusObject() {
  ensurePerceptionState();
  if (!state.ui.sceneFocus) return null;
  return GD.sceneObjects?.[state.ui.sceneFocus] || null;
}

function openSceneFocus(objectId) {
  ensurePerceptionState();
  if (!GD.sceneObjects?.[objectId]) return;
  state.ui.sceneFocus = objectId;
  render();
}

function closeSceneFocus() {
  ensurePerceptionState();
  state.ui.sceneFocus = null;
  render();
}

function pickUpStone() {
  if (getHeldObject()) {
    logEntry('system', `你的手上已經拿著【${getHeldObject().name}】。`);
    render();
    return;
  }
  setHeldObject({ id: 'rough_stone', name: '粗糙石塊', storable: true });
  logEntry('system', '你把石塊抓進掌心。現在可以選擇繼續拿著、放下，或收進行囊。');
  autoSave();
  render();
}

function storeHeldObject() {
  const held = getHeldObject();
  if (!held) {
    logEntry('system', '你手上沒有正拿著的東西。');
    render();
    return;
  }
  if (held.id) addItem(held.id, 1);
  logEntry('reward', `你把【${held.name}】收進了行囊。`);
  clearHeldObject();
  autoSave();
  render();
}

function dropHeldObject() {
  const held = getHeldObject();
  if (!held) {
    logEntry('system', '你手上沒有正拿著的東西。');
    render();
    return;
  }
  logEntry('system', `你把【${held.name}】放回了地上。`);
  clearHeldObject();
  autoSave();
  render();
}

function renderPerspectiveChoices() {
  ensurePerceptionState();
  const held = getHeldObject();
  const focus = getSceneFocusObject();
  if (focus) {
    const interactions = clone(focus.interactions || []);
    const topActions = [];
    if (held) {
      topActions.push(`
        <button class="choice-btn secondary" data-action="held_store">
          <span class="choice-main">把【${held.name}】收進行囊</span>
          <span class="choice-sub">先把手上的東西整理好，再繼續處理眼前目標。</span>
        </button>
      `);
      topActions.push(`
        <button class="choice-btn secondary" data-action="held_drop">
          <span class="choice-main">把【${held.name}】放下</span>
          <span class="choice-sub">讓雙手重新空出來。</span>
        </button>
      `);
    }
    const html = [
      `<div class="focus-card"><div class="card-title">你正看著：${focus.title}</div><div class="card-sub">${focus.summary}</div></div>`,
      ...topActions,
      ...interactions.map((row) => `
        <button class="choice-btn" data-action="${row.id}">
          <span class="choice-main">${row.label}</span>
          <span class="choice-sub">${row.desc || '—'}</span>
        </button>
      `),
      `
        <button class="choice-btn secondary" data-action="scene_back">
          <span class="choice-main">移開視線，重新環視四周</span>
          <span class="choice-sub">回到目前位置的可見物件列表。</span>
        </button>
      `
    ];
    els.choicesPanel.innerHTML = html.join('');
    return;
  }

  const objects = getVisibleSceneObjects();
  const html = [];
  if (held) {
    html.push(`
      <div class="focus-card held-card">
        <div class="card-title">你手上正拿著：${held.name}</div>
        <div class="card-sub">在目前視角下，這會影響你接下來能立即做出的動作。</div>
      </div>
      <button class="choice-btn secondary" data-action="held_store">
        <span class="choice-main">把【${held.name}】收進行囊</span>
        <span class="choice-sub">讓它成為正式攜帶物品。</span>
      </button>
      <button class="choice-btn secondary" data-action="held_drop">
        <span class="choice-main">把【${held.name}】放下</span>
        <span class="choice-sub">放回腳邊，讓雙手空出來。</span>
      </button>
    `);
  }
  html.push(`
    <div class="focus-card">
      <div class="card-title">你現在看見的東西</div>
      <div class="card-sub">不再直接列出抽象選單；你必須先對眼前事物產生視線與意圖，之後才能延伸出下一步操作。</div>
    </div>
  `);
  objects.forEach((obj) => {
    html.push(`
      <button class="choice-btn" data-action="scene_focus:${obj.id}">
        <span class="choice-main">${obj.title}</span>
        <span class="choice-sub">${obj.summary}</span>
      </button>
    `);
  });

  if (hasCorpseToDissect()) {
    const corpse = GD.enemies[state.recentCorpse.enemyId];
    html.push(`
      <button class="choice-btn danger" data-action="dissect_corpse">
        <span class="choice-main">倒在一旁的 ${corpse.name} 屍體</span>
        <span class="choice-sub">你看得到牠還有可處理的部位。要靠近觀察並決定從哪裡下手。</span>
      </button>
    `);
    if (typeof canDevourCorpse === 'function' && canDevourCorpse()) {
      html.push(`
        <button class="choice-btn danger" data-action="devour_corpse">
          <span class="choice-main">殘留氣味濃重的 ${corpse.name} 屍體</span>
          <span class="choice-sub">史萊姆幼體本能告訴你，這具屍骸可以被吞食吸收。</span>
        </button>
      `);
    }
  }

  els.choicesPanel.innerHTML = html.join('');
}

function getIntentProfiles(enemy) {
  const list = enemy?.intentProfiles || [];
  if (list.length) return list;
  return [{
    id: 'default_strike',
    telegraph: `${enemy?.name || '敵人'} 正在調整姿勢，像是隨時都會衝上來。`,
    style: enemy?.matk > (enemy?.atk || 0) ? 'magic' : 'physical',
    preferredReactions: ['guard', 'dodge'],
    damageMult: 1,
    hitBonus: 0
  }];
}

function chooseEnemyIntent(enemy) {
  const profiles = getIntentProfiles(enemy);
  return clone(profiles[rand(0, profiles.length - 1)]);
}

function queueEnemyIntent() {
  if (!state.battle) return;
  state.battle.intent = chooseEnemyIntent(state.battle.enemy);
  state.battle.playerReaction = null;
  state.battle.interrupted = false;
}

function getReactionOptionsForIntent(intent) {
  const style = intent?.style || 'physical';
  const preferred = new Set(intent?.preferredReactions || []);
  const options = [
    { id: 'attack', label: '抓住瞬間搶先攻擊', desc: '不等待，直接在對方完成動作前先出手。' },
    { id: 'guard', label: '穩住架勢硬吃這一下', desc: '以防守換取穩定。若剛好看準了攻擊路線，效果會更好。' },
    { id: 'dodge', label: '橫移或後撤閃避', desc: '把全部注意力放在躲開這一次動作。' }
  ];
  if (style === 'magic' || preferred.has('interrupt')) {
    options.push({ id: 'interrupt', label: '趁蓄勢時打斷牠', desc: '主動上前干擾節奏，尤其適合面對蓄力或施法。' });
  } else if (preferred.has('counter')) {
    options.push({ id: 'counter', label: '看準破綻反擊', desc: '不是單純搶攻，而是等對方進到你能還手的距離。' });
  }
  options.push({ id: 'flee', label: '抽身撤退', desc: '現在放棄這場戰鬥。' });
  return options;
}

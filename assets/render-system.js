// Render system: UI painting, boards, tabs
function barHtml(label, value, max) {
  const pct = max > 0 ? Math.floor((value / max) * 100) : 0;
  return `
    <div class="bar-wrap">
      <div class="bar-label-row"><span>${label}</span><span>${value} / ${max}</span></div>
      <div class="bar-track"><div class="bar-fill" style="width:${pct}%;"></div></div>
    </div>
  `;
}

function renderTopStats() {
  const d = recalcDerived();
  const held = typeof getHeldObject === 'function' ? getHeldObject() : null;
  const chips = [
    ['生命', `${state.resources.hp} / ${d.maxHp}`],
    ['體力', `${state.resources.sp} / ${d.maxSp}`],
    ['魔力', `${state.resources.mp} / ${d.maxMp}`],
    ['飽食', `${state.resources.satiety} / ${getSatietyMax()}`],
    ['金幣', `${state.gold}`],
    ['手上', held ? held.name : '空手']
  ];
  els.topStats.innerHTML = chips.map(([label, value]) => `
    <div class="top-stat-chip">
      <div class="top-stat-label">${label}</div>
      <div class="top-stat-value">${value}</div>
    </div>
  `).join('');
}

function renderStatus() {
  const d = recalcDerived();
  const held = typeof getHeldObject === 'function' ? getHeldObject() : null;
  els.statusPanel.innerHTML = `
    <div class="info-card">
      <div class="stat-grid">
        ${GD.statOrder.map((stat) => `
          <div class="stat-box">
            <div class="stat-name">${GD.statLabels[stat]}</div>
            <div class="stat-value">${d[stat]}</div>
            <div class="stat-sub">核心屬性</div>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="info-card">
      <div class="kv-line"><span>物攻 / 物防</span><strong>${d.patk} / ${d.pdef}</strong></div>
      <div class="kv-line"><span>魔攻 / 魔防</span><strong>${d.matk} / ${d.mdef}</strong></div>
      <div class="kv-line"><span>命中 / 閃避</span><strong>${d.hit} / ${d.eva}</strong></div>
      <div class="kv-line"><span>暴擊 / 先制</span><strong>${d.cri}% / ${d.ini}</strong></div>
      <div class="kv-line"><span>負重上限</span><strong>${d.carry}</strong></div>
      <div class="kv-line"><span>飽食狀態</span><strong>${d.satiety.label}</strong></div>
      <div class="kv-line"><span>目前手持</span><strong>${held ? held.name : '空手'}</strong></div>
      <div class="kv-line"><span>出生種族</span><strong>${state.raceName || '未知'}</strong></div>
      <div class="kv-line"><span>出生環境</span><strong>${state.birthOriginName || '未知'}</strong></div>
      <div class="kv-line"><span>成長階段</span><strong>${state.growthStage || '幼體'}</strong></div>
      <div class="kv-line"><span>成長模式</span><strong>${typeof getGrowthModeLabel === 'function' ? getGrowthModeLabel() : '重養成'}</strong></div>
    </div>
    <div class="info-card">
      ${barHtml('生命', state.resources.hp, d.maxHp)}
      ${barHtml('體力', state.resources.sp, d.maxSp)}
      ${barHtml('魔力', state.resources.mp, d.maxMp)}
      ${barHtml('飽食度', state.resources.satiety, getSatietyMax())}
    </div>
  `;
}

function renderQuests() {
  const questCards = Object.entries(state.quests).map(([id, q]) => {
    const def = GD.questDefs[id];
    const stage = clamp(q.stage, 0, def.stages.length - 1);
    return `
      <div class="quest-card">
        <div class="card-title">${def.title}</div>
        <div class="card-sub">${def.stages[stage]}</div>
      </div>
    `;
  });

  const commissionCards = Object.values(GD.guildCommissions || {})
    .filter((def) => {
      const runtime = ensureCommissionState(def.id);
      return runtime.accepted || runtime.turnedIn || commissionReadyToTurnIn(def.id);
    })
    .map((def) => `
      <div class="quest-card">
        <div class="card-title">${def.title}</div>
        <div class="card-sub">${getCommissionStatusLabel(def.id)}｜${getCommissionProgressText(def.id) || def.objectiveText}</div>
      </div>
    `);

  els.questPanel.innerHTML = questCards.concat(commissionCards).join('') || `<div class="quest-card"><div class="card-sub">目前沒有追蹤中的任務。</div></div>`;
}


function getPerceptionSlotLabel(index) {
  const labels = ['腳邊', '左近', '正前方', '右前方', '更遠處'];
  return labels[index % labels.length];
}

function describeObjectPerception(obj, index) {
  const slot = getPerceptionSlotLabel(index);
  const verbMap = {
    pickup: '你先注意到',
    trail: '你看見',
    resource: '你注意到',
    exit: '你的視線越過去，能看見',
    building: '你的視線落到',
    body: '你看見',
    corpse: '你看見',
    sound: '你聽見'
  };
  return {
    main: `【${slot}】${verbMap[obj.kind] || '你看見'}${obj.title}`,
    sub: obj.summary || '你暫時只能先記住這個目標的位置。'
  };
}

function describeExitPerception(exit) {
  return {
    main: `【${exit.direction || '前方'}】${exit.label}`,
    sub: exit.desc || '把身體挪過去之後，視野才會刷新。'
  };
}

function renderPerceptionPanel() {
  if (!els.perceptionPanel) return;
  const held = typeof getHeldObject === 'function' ? getHeldObject() : null;
  const node = typeof getCurrentSceneNode === 'function' ? getCurrentSceneNode() : null;
  const objects = typeof getVisibleSceneObjects === 'function' ? getVisibleSceneObjects() : [];

  if (state.gameOver) {
    els.perceptionPanel.innerHTML = `
      <div class="scene-note-block">
        <div class="scene-note-title">最後停下的地方</div>
        <div class="scene-note-text">${state.gameOver.reason || '這次生命已經結束。'}</div>
      </div>
    `;
    return;
  }

  const lines = [];
  if (state.battle) {
    const enemy = state.battle.enemy;
    const intent = state.battle.intent || { telegraph: `${enemy.name} 正在觀察你。` };
    lines.push(`你眼前的敵人是【${enemy.name}】。`);
    lines.push(intent.telegraph);
  } else {
    if (node?.summary) lines.push(node.summary);
    if (objects.length) {
      lines.push(`你目前看見：${objects.map((obj) => obj.title).join('、')}。`);
    } else {
      lines.push('你目前沒有看見明顯可直接處理的目標。');
    }
  }
  if (held) lines.push(`你手上正拿著【${held.name}】。`);

  els.perceptionPanel.innerHTML = `
    <div class="scene-note-block">
      <div class="scene-note-title">當前視野</div>
      <div class="scene-note-text">${lines.join('<br>')}</div>
    </div>
  `;
}

function renderScene() {
  if (state.gameOver) {
    els.locationName.textContent = '【遊戲結束】';
    els.locationDesc.textContent = state.gameOver.reason || '這次生命已經結束，你必須重新開局。';
    els.timeWeather.textContent = `第 ${state.gameOver.day || state.day} 日｜${state.gameOver.locationName || getCurrentLocation().name}`;
    return;
  }
  const loc = getCurrentLocation();
  const focus = typeof getSceneFocusObject === 'function' ? getSceneFocusObject() : null;
  els.locationName.textContent = loc.name;
  if (state.battle && state.battle.intent) {
    els.locationDesc.textContent = `${loc.summary}｜你正從 ${state.battle.enemy.name} 的動作預兆判斷下一步反應。`;
  } else if (focus) {
    els.locationDesc.textContent = `${loc.summary}｜你已經把注意力壓在 ${focus.title} 上，接下來就是決定怎麼碰它。`;
  } else {
    els.locationDesc.textContent = `${loc.summary}｜先讓視線和身體都對準眼前的事物，再決定下一步。`;
  }
  els.timeWeather.textContent = `第 ${state.day} 日｜${GD.periods[state.periodIndex]}｜${GD.weathers[state.weatherIndex]}`;
}

function renderLog() {
  const entries = [...state.log].reverse();
  els.logPanel.innerHTML = entries.map((entry) => `
    <div class="log-entry ${entry.type}">${String(entry.text).replace(/`/g, '')}</div>
  `).join('');
  els.logPanel.scrollTop = 0;
}

function decorateChoiceButtons() {
  if (!els.choicesPanel) return;
  const buttons = Array.from(els.choicesPanel.querySelectorAll('.choice-btn'));
  buttons.forEach((btn, index) => {
    const oldBadge = btn.querySelector('.choice-index');
    if (oldBadge) oldBadge.remove();
    const badge = document.createElement('span');
    badge.className = 'choice-index';
    badge.textContent = String(index + 1);
    btn.prepend(badge);
  });
}

function renderGameOverChoices() {
  const info = state.gameOver || {};
  els.choicesPanel.innerHTML = `
    <div class="focus-card danger-card">
      <div class="card-title">這次生命已經結束</div>
      <div class="card-sub">${info.reason || '死亡使這一輪旅程終止。'}<br>種族：${info.raceName || state.raceName || '未知'}｜出身：${info.birthOriginName || state.birthOriginName || '未知'}｜等級：Lv.${info.level || state.level}</div>
    </div>
    <button class="choice-btn danger" data-action="restart_after_death">
      <span class="choice-main">重新開局</span>
      <span class="choice-sub">永久死亡已結算，本機存檔也已清除。新的生命會重新隨機誕生。</span>
    </button>
  `;
}

function renderChoices() {
  if (state.gameOver) return renderGameOverChoices();
  if (state.battle) return renderBattleChoices();
  if (state.ui?.mode === 'guild_board') return renderGuildChoices();
  if (state.ui?.mode === 'market') return renderMarketChoices();
  if (state.ui?.mode === 'anatomy_menu') return renderAnatomyChoices();
  if (typeof renderPerspectiveChoices === 'function') return renderPerspectiveChoices();
  els.choicesPanel.innerHTML = '<div class="focus-card"><div class="card-sub">目前沒有可用行動。</div></div>';
}

function renderBattleSkillSection(title, skills) {
  if (!skills.length) return '';
  return `
    <div class="battle-section-title">${title}</div>
    ${skills.map((skill) => `
      <button class="choice-btn" data-skill="${skill.id}">
        <span class="choice-main">${skill.name}</span>
        <span class="choice-sub">${skill.description}</span>
      </button>
    `).join('')}
  `;
}

function renderBattleChoices() {
  const enemy = state.battle.enemy;
  if (!state.battle.intent && typeof queueEnemyIntent === 'function') queueEnemyIntent();
  const intent = state.battle.intent || { telegraph: `${enemy.name} 正盯著你。`, style: 'physical' };
  const learnedActive = Object.entries(state.skills)
    .filter(([id, s]) => s.learned && GD.skills[id].type === 'active' && GD.skills[id].useContexts.includes('battle'))
    .map(([id]) => GD.skills[id]);
  const martial = learnedActive.filter((s) => s.school === 'martial');
  const magic = learnedActive.filter((s) => s.school === 'magic');
  const support = learnedActive.filter((s) => s.school !== 'martial' && s.school !== 'magic');
  const reactions = typeof getReactionOptionsForIntent === 'function' ? getReactionOptionsForIntent(intent) : [];

  els.choicesPanel.innerHTML = `
    <div class="focus-card danger-card">
      <div class="card-title">你看見 ${enemy.name} 正在蓄勢</div>
      <div class="card-sub">${intent.telegraph}</div>
    </div>
    ${reactions.map((row) => `
      <button class="choice-btn" data-battle="${row.id}">
        <span class="choice-main">${row.label}</span>
        <span class="choice-sub">${row.desc}</span>
      </button>
    `).join('')}
    ${renderBattleSkillSection('武技', martial)}
    ${renderBattleSkillSection('魔法', magic)}
    ${renderBattleSkillSection('生活／支援', support)}
    <button class="choice-btn" data-item="potion" ${state.inventory.potion > 0 ? '' : 'disabled'}>
      <span class="choice-main">使用治癒藥水</span>
      <span class="choice-sub">目前持有：${state.inventory.potion || 0}</span>
    </button>
  `;
  els.locationName.textContent = `【戰鬥中】${enemy.name}｜HP ${Math.max(0, enemy.hp)} / ${enemy.maxHp}`;
}

function renderEnemyStatus() {
  const enemyEmptyHint = document.getElementById('enemyEmptyHint');
  if (!state.battle) {
    els.enemyStatusWrap.classList.add('hidden');
    els.enemyPanel.innerHTML = `<div class="enemy-empty">目前未進入戰鬥。</div>`;
    if (enemyEmptyHint) enemyEmptyHint.style.display = '';
    return;
  }
  if (enemyEmptyHint) enemyEmptyHint.style.display = 'none';
  const enemy = state.battle.enemy;
  const intent = state.battle.intent || { telegraph: '對方正觀察你的動作。', style: 'unknown' };
  const hpNow = Math.max(0, enemy.hp);
  const hpMax = Math.max(1, enemy.maxHp || 1);
  const burnTag = enemy.burning > 0 ? `<span class="tag danger">燃燒 ${enemy.burning}</span>` : `<span class="tag">狀態穩定</span>`;
  els.enemyStatusWrap.classList.remove('hidden');
  els.enemyPanel.innerHTML = `
    <div class="enemy-card">
      <div class="card-title-row">
        <div class="card-title">${enemy.name}</div>
        ${burnTag}
      </div>
      <div class="card-sub">${enemy.note || enemy.intro || '敵對單位資料已顯示。'}</div>
      <div class="focus-card compact-card">
        <div class="card-title">可見預兆</div>
        <div class="card-sub">${intent.telegraph}</div>
      </div>
      ${barHtml('敵方生命', hpNow, hpMax)}
      <div class="enemy-grid">
        <div class="enemy-kv"><span>類型</span><strong>${enemy.bodyType === 'biological' ? '生物型' : '靈體型'}</strong></div>
        <div class="enemy-kv"><span>即將手段</span><strong>${intent.style === 'magic' ? '魔法／異能' : '物理攻勢'}</strong></div>
        <div class="enemy-kv"><span>物攻</span><strong>${enemy.atk || 0}</strong></div>
        <div class="enemy-kv"><span>魔攻</span><strong>${enemy.matk || 0}</strong></div>
        <div class="enemy-kv"><span>物防</span><strong>${enemy.def || 0}</strong></div>
        <div class="enemy-kv"><span>魔防</span><strong>${enemy.mdef || 0}</strong></div>
        <div class="enemy-kv"><span>敏捷</span><strong>${enemy.agi || 0}</strong></div>
        <div class="enemy-kv"><span>經驗</span><strong>${enemy.exp || 0}</strong></div>
      </div>
    </div>
  `;
}

function renderMap() {
  els.mapPanel.innerHTML = Object.values(GD.locations).map((loc) => `
    <div class="map-card ${loc.unlocked ? '' : 'locked'}">
      <div class="card-title-row">
        <div class="card-title">${loc.name}${state.location === loc.id ? '｜目前所在' : ''}</div>
        ${loc.unlocked ? `<button class="small-btn" data-map-travel="${loc.id}" ${state.location === loc.id ? 'disabled' : ''}>前往</button>` : `<span class="tag">未解鎖</span>`}
      </div>
      <div class="card-sub">${loc.summary}</div>
    </div>
  `).join('');
}

function buildSkillCard(id, skillState) {
  const def = GD.skills[id];
  const stage = getSkillStageInfo(skillState.proficiency || 0);
  const evolves = (def.evolveTo || []).filter((targetId) => canEvolve(id, targetId));
  const requirementText = (def.evolveTo || []).map((targetId) => {
    const req = def.evolveRequirements[targetId];
    if (!req) return '';
    const statsText = Object.entries(req.stats || {}).map(([k, v]) => `${k} ${v}+`).join(' / ');
    return `${GD.skills[targetId].name}：Lv.${req.level}+${statsText ? `｜${statsText}` : ''}`;
  }).join('<br>');
  return `
    <div class="skill-card">
      <div class="card-title-row">
        <div class="card-title">${def.name}</div>
        <span class="tag">${def.category}</span>
      </div>
      <div class="card-sub">${def.description}</div>
      <div class="skill-tags">
        <span class="tag">熟練：${skillState.proficiency} / ${def.maxProficiency}</span>
        <span class="tag">段位：${stage.label}</span>
        <span class="tag">階級：${def.tier}</span>
      </div>
      ${barHtml('熟練度', skillState.proficiency, def.maxProficiency)}
      <div class="card-meta">${def.growthHint}</div>
      ${requirementText ? `<div class="card-meta">進化條件：<br>${requirementText}</div>` : ''}
      <div class="skill-actions">
        ${def.useContexts.includes('menu') ? `<button class="skill-action-btn" data-menu-skill="${id}">施放</button>` : ''}
        ${evolves.map((targetId) => `<button class="skill-action-btn" data-evolve-from="${id}" data-evolve-to="${targetId}">進化→${GD.skills[targetId].name}</button>`).join('')}
      </div>
    </div>
  `;
}

function renderSkills() {
  const martialCards = [];
  const magicCards = [];
  const supportCards = [];
  const passiveCards = [];

  Object.entries(state.skills).filter(([, s]) => s.learned).forEach(([id, skillState]) => {
    const def = GD.skills[id];
    const html = buildSkillCard(id, skillState);
    if (def.type === 'passive') passiveCards.push(html);
    else if (def.school === 'martial') martialCards.push(html);
    else if (def.school === 'magic') magicCards.push(html);
    else supportCards.push(html);
  });

  els.martialSkillsPanel.innerHTML = martialCards.join('') || `<div class="skill-card"><div class="card-sub">尚未學會武技。可先以普通攻擊實戰，累積【斬擊】的習得熟練。</div></div>`;
  els.magicSkillsPanel.innerHTML = magicCards.join('') || `<div class="skill-card"><div class="card-sub">尚未學會魔法。多調查符文與奧術痕跡，逐步累積【火花】的習得熟練。</div></div>`;
  els.supportSkillsPanel.innerHTML = supportCards.join('') || `<div class="skill-card"><div class="card-sub">尚未學會生活／支援技能。醫療處置與解剖實作可逐步達到習得門檻。</div></div>`;
  els.passiveSkillsPanel.innerHTML = passiveCards.join('') || `<div class="skill-card"><div class="card-sub">尚未學會被動技能。旅行、受傷與生存行動會累積對應熟練。</div></div>`;
}

function renderJobs() {
  ensureProfessionState();
  const current = getCurrentJobDef();
  const header = `
    <div class="inventory-card">
      <div class="card-title-row">
        <div class="card-title">職涯概況</div>
        <span class="tag">基底：${state.originClass}</span>
      </div>
      <div class="card-sub">出生：${typeof getOriginSummaryText === 'function' ? getOriginSummaryText() : '未知'}｜目前副職：${current ? current.name : '未就職'}｜你可以依據培養方向逐步學習生活系副職，並在已習得的副職間切換。</div>
    </div>
  `;
  const cards = Object.values(GD.jobs || {}).map((job) => {
    const node = state.jobs[job.id];
    const progress = getJobUnlockProgress(job.id);
    const learned = !!node.learned;
    const level = getJobLevel(job.id);
    const rank = getJobRankLabel(job.id);
    const canLearn = jobLearnable(job.id);
    const isEquipped = state.currentJob === job.id;
    return `
      <div class="inventory-card ${isEquipped ? 'highlight-card' : ''}">
        <div class="card-title-row">
          <div class="card-title">${job.name}</div>
          <span class="tag">${learned ? rank : '未就職'}</span>
        </div>
        <div class="card-sub">${job.summary}</div>
        <div class="card-meta">解鎖條件：${job.unlockHint}</div>
        <div class="card-meta">進度：${progress.label} ${progress.current} / ${progress.required}</div>
        <div class="card-meta">學習花費：${job.learnCostGold} 金幣</div>
        ${learned ? barHtml('副職熟練', node.exp || 0, (job.rankThresholds || [0,80,180,320])[3]) : ''}
        <div class="card-meta">效果：${(job.bonuses || []).join('、')}</div>
        <div class="inventory-actions">
          ${!learned ? `<button class="inventory-btn" data-job-learn="${job.id}" ${canLearn ? '' : 'disabled'}>就職</button>` : ''}
          ${learned ? `<button class="inventory-btn" data-job-equip="${job.id}" ${isEquipped ? 'disabled' : ''}>${isEquipped ? '已就職中' : '切換副職'}</button>` : ''}
        </div>
      </div>
    `;
  });
  els.jobsPanel.innerHTML = header + cards.join('');
}

function renderInventory() {
  const anatomy = getAnatomyProfile();
  const held = typeof getHeldObject === 'function' ? getHeldObject() : null;
  const infoCards = [];
  if (held) {
    infoCards.push(`
      <div class="inventory-card highlight-card">
        <div class="card-title-row"><div class="card-title">手持物</div><span class="tag">即時操作</span></div>
        <div class="card-sub">你目前正拿著【${held.name}】。這類物件不一定先進背包，而是會先影響當下能做的反應。</div>
      </div>
    `);
  }
  if (anatomy) {
    infoCards.push(`
      <div class="inventory-card">
        <div class="card-title-row"><div class="card-title">${anatomy.def.name}</div><span class="tag">解剖熟練</span></div>
        <div class="card-sub">目前熟練度 ${anatomy.proficiency} / 1000｜段位：${anatomy.stage.label}</div>
      </div>
    `);
  }
  infoCards.push(`
    <div class="inventory-card">
      <div class="card-title-row"><div class="card-title">生存概況</div><span class="tag">${getSatietyTier().label}</span></div>
      <div class="card-sub">飽食度會隨時間與冒險逐步下降；太低時將削弱體力與戰鬥表現。</div>
      ${barHtml('飽食度', state.resources.satiety, getSatietyMax())}
    </div>
  `);
  if (state.recentCorpse && state.recentCorpse.locationId === state.location) {
    const corpse = GD.enemies[state.recentCorpse.enemyId];
    const remainingParts = getCorpseParts().filter((part) => !state.recentCorpse.harvestedParts?.[part.id]).map((part) => part.label).join('、') || '無';
    infoCards.push(`
      <div class="inventory-card">
        <div class="card-title-row"><div class="card-title">最近可處理屍體</div><span class="tag">${hasCorpseToDissect() ? '可解剖' : '已處理完畢'}</span></div>
        <div class="card-sub">${corpse.name}｜剩餘部位：${remainingParts}</div>
      </div>
    `);
  }

  const itemCards = Object.entries(state.inventory).filter(([, qty]) => qty > 0).map(([id, qty]) => {
    const item = GD.items[id];
    const usable = ['potion', 'ether', 'ration'].includes(id);
    return `
      <div class="inventory-card">
        <div class="card-title-row"><div class="card-title">${item.name} ×${qty}</div><span class="tag">${item.kind}</span></div>
        <div class="card-sub">${item.desc}</div>
        ${usable ? `<div class="inventory-actions"><button class="inventory-btn" data-item-use="${id}">使用</button></div>` : ''}
      </div>
    `;
  });
  els.inventoryPanel.innerHTML = infoCards.concat(itemCards).join('') || `<div class="inventory-card"><div class="card-sub">目前行囊是空的。</div></div>`;
}

function renderGrowth() {
  const need = expToNext(state.level);
  const learningHints = typeof getSkillLearningSummary === 'function' ? getSkillLearningSummary() : [];
  els.growthPanel.innerHTML = `
    <div class="growth-card">
      <div class="kv-line"><span>角色等級</span><strong>Lv.${state.level}</strong></div>
      <div class="kv-line"><span>當前經驗</span><strong>${state.exp} / ${need}</strong></div>
      <div class="kv-line"><span>升級尚需</span><strong>${Math.max(0, need - state.exp)}</strong></div>
      <div class="kv-line"><span>出生種族</span><strong>${state.raceName || '未知'}</strong></div>
      <div class="kv-line"><span>出生環境</span><strong>${state.birthOriginName || '未知'}</strong></div>
      <div class="kv-line"><span>成長規則</span><strong>${typeof getGrowthModeLabel === 'function' ? getGrowthModeLabel() : '重養成'}</strong></div>
      <div class="kv-line"><span>可分配屬性點</span><strong>${state.statPoints}</strong></div>
      <div class="kv-line"><span>可用技能點</span><strong>${state.skillPoints}</strong></div>
      <div class="card-meta">${typeof getGrowthRuleSummary === 'function' ? getGrowthRuleSummary() : ''}</div>
      ${barHtml('升級進度', state.exp, need)}
    </div>
    <div class="growth-card">
      <div class="section-mini-title">屬性分配</div>
      <div class="grid-list">
        ${GD.statOrder.map((stat) => `
          <div class="kv-line">
            <span>${GD.statLabels[stat]}｜${getFinalStat(stat)}</span>
            <button class="small-btn" data-stat-plus="${stat}" ${state.statPoints > 0 ? '' : 'disabled'}>+1</button>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="growth-card">
      <div class="section-mini-title">技能習得進度</div>
      <div class="card-meta">${learningHints.length ? learningHints.join('<br>') : '目前所有可累積習得的初階技能皆已學會。'}</div>
    </div>
  `;
}

function renderFlags() {
  const corpseText = state.recentCorpse ? `${GD.enemies[state.recentCorpse.enemyId].name}｜${hasCorpseToDissect() ? '可解剖' : '已處理完'}` : '無';
  const lines = [
    ['公會接觸', state.flags.met_guild_master ? '已完成' : '未接觸'],
    ['禮拜堂線索', state.flags.chapel_clue_found ? '已取得' : '未取得'],
    ['斷塔線索', state.flags.tower_clue_found ? '已取得' : '未取得'],
    ['裂隙沼原', state.flags.rift_path_unlocked ? '已開放' : '未開放'],
    ['裂隙穩定', state.flags.rift_core_stabilized ? '已完成' : '尚未完成'],
    ['目前副職', getCurrentJobDef()?.name || '未就職'],
    ['出生種族', state.raceName || '未知'],
    ['出生環境', state.birthOriginName || '未知'],
    ['最近屍體', corpseText]
  ];
  els.flagPanel.innerHTML = lines.map(([k, v]) => `
    <div class="flag-card"><div class="kv-line"><span>${k}</span><strong>${v}</strong></div></div>
  `).join('');
}

function render() {
  if (!state?.gameOver && state?.resources?.hp <= 0 && typeof triggerGameOver === 'function') {
    triggerGameOver('你因傷勢過重而失去意識，這次生命已經結束。');
    return;
  }
  document.title = `灰燼裂隙｜${state?.raceName || '旅者'}｜${getCurrentLocation().name}`;
  syncQuestProgress();
  renderTopStats();
  renderStatus();
  renderQuests();
  renderScene();
  renderPerceptionPanel();
  renderLog();
  renderChoices();
  decorateChoiceButtons();
  renderEnemyStatus();
  renderMap();
  renderSkills();
  renderJobs();
  renderInventory();
  renderGrowth();
  renderFlags();
}

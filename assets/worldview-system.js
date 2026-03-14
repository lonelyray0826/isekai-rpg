// World view system: directional movement -> refreshed vision -> object interaction
(function () {
  function ensureWorldViewState() {
    if (!state) return;
    if (!state.view) state.view = { nodeId: null };

    const allLocations = Object.keys(GD.locations || {});
    if (!GD.locations?.[state.location]) {
      state.location = allLocations[0] || 'emberport';
    }

    const sceneNodes = GD.sceneNodes || {};
    const allNodes = Object.values(sceneNodes);
    if (!allNodes.length) return;

    let currentNode = sceneNodes[state.view.nodeId];
    if (!currentNode || currentNode.locationId !== state.location) {
      const localStart = getStartNodeIdForLocation(state.location);
      if (localStart) {
        state.view.nodeId = localStart;
        currentNode = sceneNodes[state.view.nodeId] || null;
      }
    }

    if (!currentNode) {
      const fallbackNode = allNodes.find((row) => row.isStart) || allNodes[0];
      state.location = fallbackNode.locationId;
      state.view.nodeId = fallbackNode.id;
    }
  }

  function getStartNodeIdForLocation(locationId) {
    const nodes = Object.values(GD.sceneNodes || {}).filter((row) => row.locationId === locationId);
    const start = nodes.find((row) => row.isStart);
    return (start || nodes[0] || {}).id || null;
  }

  function getCurrentSceneNode() {
    ensureWorldViewState();
    return GD.sceneNodes?.[state.view?.nodeId] || null;
  }

  function getNodeExits(nodeId = state.view?.nodeId) {
    return Object.values(GD.sceneExits || {})
      .filter((row) => row.fromNodeId === nodeId)
      .sort((a, b) => (a.sort || 999) - (b.sort || 999));
  }

  function getVisibleSceneObjects(locationId = state.location, nodeId = state.view?.nodeId) {
    ensurePerceptionState();
    return Object.values(GD.sceneObjects || {})
      .filter((row) => row.locationId === locationId)
      .filter((row) => !row.nodeIds || row.nodeIds.includes(nodeId))
      .filter((row) => !(row.visibleIfFlags || []).some((flag) => !state.flags?.[flag]))
      .sort((a, b) => (a.sort || 999) - (b.sort || 999));
  }

  function getSceneFocusObject() {
    ensurePerceptionState();
    const focusId = state.ui?.sceneFocus;
    if (!focusId) return null;
    const obj = GD.sceneObjects?.[focusId] || null;
    if (!obj) return null;
    const visibleIds = getVisibleSceneObjects().map((row) => row.id);
    return visibleIds.includes(focusId) ? obj : null;
  }

  function openSceneFocus(objectId) {
    ensurePerceptionState();
    const visibleIds = getVisibleSceneObjects().map((row) => row.id);
    if (!visibleIds.includes(objectId)) {
      logEntry('system', '你目前的位置與視角還看不到那個東西。');
      render();
      return;
    }
    state.ui.sceneFocus = objectId;
    render();
  }

  function closeSceneFocus() {
    ensurePerceptionState();
    state.ui.sceneFocus = null;
    render();
  }

  function setSceneNode(nodeId, opts = {}) {
    ensureWorldViewState();
    const node = GD.sceneNodes?.[nodeId];
    if (!node) return;
    state.view.nodeId = nodeId;
    if (state.ui) state.ui.sceneFocus = null;
    if (!opts.silent) {
      logEntry('system', opts.entryText || `你移動到【${node.title}】。${node.summary}`);
    }
    if (opts.advanceTurns) advanceTime(opts.advanceTurns);
  }

  function stepByExit(exitId) {
    const exit = GD.sceneExits?.[exitId];
    if (!exit) return;
    if (exit.travelLocationId) {
      return moveTo(exit.travelLocationId, { arrivalNodeId: exit.arrivalNodeId, overrideCost: exit.spCost, entryText: `你沿著路徑離開目前位置。${exit.desc || ''}`.trim() });
    }
    const target = GD.sceneNodes?.[exit.toNodeId];
    if (!target) return;
    const cost = Math.max(0, exit.spCost || 1);
    if (state.resources.sp < cost) {
      logEntry('system', `體力不足，往【${target.title}】移動需要 ${cost} 點體力。`);
      render();
      return;
    }
    if (cost > 0) spendResource('sp', cost);
    setSceneNode(target.id, { entryText: `你往${exit.direction || '前方'}移動。${target.summary}`, advanceTurns: 1 });
    if (hasLearnedSkill('traveler_instinct')) gainSkillProficiency('traveler_instinct', 35, `步行至 ${target.title}`);
    if (typeof addSkillPractice === 'function') addSkillPractice('traveler_instinct', 2, `移動至 ${target.title}`);
    syncQuestProgress();
    autoSave();
    render();
  }

  function sceneListen() {
    const node = getCurrentSceneNode();
    if (!node) return;
    const cost = 1;
    if (state.resources.sp < cost) {
      logEntry('system', '你太疲憊，連停下來仔細傾聽都很勉強。');
      render();
      return;
    }
    spendResource('sp', cost);
    const objects = getVisibleSceneObjects();
    const hints = objects.length ? `你現在能分辨出：${objects.map((row) => row.title).join('、')}。` : '周圍暫時沒有明顯可辨識的東西。';
    logEntry('system', `${node.listenText || '你停下來聽了聽四周。'} ${hints}`);
    if (typeof addSkillPractice === 'function') addSkillPractice('traveler_instinct', 3, `傾聽 ${node.title}`);
    advanceTime(1);
    autoSave();
    render();
  }

  function scenePause() {
    const node = getCurrentSceneNode();
    if (!node) return;
    logEntry('system', `你暫時停在【${node.title}】不動，重新整理呼吸與視線。`);
    advanceTime(1);
    autoSave();
    render();
  }


  function getSensePositionLabel(index) {
    const labels = ['腳邊', '左近', '正前方', '右近', '更遠處'];
    return labels[index % labels.length];
  }

  function buildObjectActionLabel(obj, index) {
    return `查看【${getSensePositionLabel(index)}】的${obj.title}`;
  }

  function buildObjectActionDesc(obj) {
    return obj.summary || '先看清楚，再決定要不要互動。';
  }

  function renderDirectionButtons(exits) {
    if (!exits.length) {
      return '<div class="focus-card"><div class="card-sub">目前沒有可移動的方向。</div></div>';
    }
    return exits.map((exit) => `
      <button class="choice-btn movement" data-action="step_exit:${exit.id}">
        <span class="choice-main">移動：${exit.label}</span>
        <span class="choice-sub">${exit.desc || '往這個方向移動，並看看會出現什麼。'}</span>
      </button>
    `).join('');
  }

  function renderPerspectiveChoices() {
    ensureWorldViewState();
    ensurePerceptionState();
    const held = getHeldObject ? getHeldObject() : null;
    const focus = getSceneFocusObject();
    let node = getCurrentSceneNode();
    if (!node) {
      ensureWorldViewState();
      node = getCurrentSceneNode();
    }
    if (!node) {
      const loc = getCurrentLocation();
      els.choicesPanel.innerHTML = `
        <div class="focus-card danger-card">
          <div class="card-title">目前視野節點遺失，已嘗試重新定位</div>
          <div class="card-sub">你所在的位置資料暫時對不上，因此先回到可辨識的起點節點。你可以先重新整理視線，或從地圖前往其他區域。</div>
        </div>
        <button class="choice-btn secondary" data-action="scene_recover">
          <span class="choice-main">重新定位目前視角</span>
          <span class="choice-sub">把視野重設到目前地區的起始節點。</span>
        </button>
        ${loc ? `<button class="choice-btn secondary" data-map-travel="${loc.id}"><span class="choice-main">回到【${loc.name}】入口</span><span class="choice-sub">直接用地圖移動重新進入目前區域。</span></button>` : ''}
      `;
      return;
    }

    if (focus) {
      const interactions = clone(focus.interactions || []);
      const topActions = [];
      if (held) {
        topActions.push(`
          <button class="choice-btn secondary" data-action="held_store">
            <span class="choice-main">先把【${held.name}】收進行囊</span>
            <span class="choice-sub">先把手上的重量整理好，再處理眼前這個目標。</span>
          </button>
        `);
        topActions.push(`
          <button class="choice-btn secondary" data-action="held_drop">
            <span class="choice-main">把【${held.name}】放下</span>
            <span class="choice-sub">讓雙手重新空出來。</span>
          </button>
        `);
      }
      els.choicesPanel.innerHTML = [
        `<div class="focus-card"><div class="card-title">眼前目標：${focus.title}</div><div class="card-sub">${focus.summary}</div></div>`,
        ...topActions,
        ...interactions.map((row) => `
          <button class="choice-btn" data-action="${row.id}">
            <span class="choice-main">${row.label}</span>
            <span class="choice-sub">${row.desc || '—'}</span>
          </button>
        `),
        `<button class="choice-btn secondary" data-action="scene_back"><span class="choice-main">返回周圍視野</span><span class="choice-sub">回到目前位置的整體視野。</span></button>`
      ].join('');
      return;
    }

    const objects = getVisibleSceneObjects();
    const exits = getNodeExits(node.id);
    const html = [`<div class="focus-card"><div class="card-title">你目前所在位置：${node.title}</div><div class="card-sub">先處理眼前看見的事物，再決定是否移動。</div></div>`];
    if (held) {
      html.push(`
        <div class="focus-card held-card">
          <div class="card-title">你手上正拿著：${held.name}</div>
          <div class="card-sub">手上的東西會直接改變你這一瞬間最順手的反應。</div>
        </div>
        <button class="choice-btn secondary" data-action="held_store">
          <span class="choice-main">把【${held.name}】收進行囊</span>
          <span class="choice-sub">讓它成為正式攜帶物品。</span>
        </button>
        <button class="choice-btn secondary" data-action="held_drop">
          <span class="choice-main">把【${held.name}】放下</span>
          <span class="choice-sub">讓雙手重新空出來。</span>
        </button>
      `);
    }

    html.push(`<div class="section-mini-title">互動</div>`);
    if (objects.length) {
      html.push(...objects.map((obj, index) => `
        <button class="choice-btn primary-sense" data-action="scene_focus:${obj.id}">
          <span class="choice-main">${buildObjectActionLabel(obj, index)}</span>
          <span class="choice-sub">${buildObjectActionDesc(obj)}</span>
        </button>
      `));
    } else {
      html.push(`<div class="focus-card"><div class="card-sub">這一瞬間，你眼前沒有特別突出的可互動目標。</div></div>`);
    }

    if (hasCorpseToDissect()) {
      const corpse = GD.enemies[state.recentCorpse.enemyId];
      html.push(`
        <button class="choice-btn danger" data-action="dissect_corpse">
          <span class="choice-main">靠近倒在近處的 ${corpse.name} 屍體</span>
          <span class="choice-sub">你已經能碰到牠的殘骸，接下來得決定要從哪個部位下手。</span>
        </button>
      `);
      if (typeof canDevourCorpse === 'function' && canDevourCorpse()) {
        html.push(`
          <button class="choice-btn danger" data-action="devour_corpse">
            <span class="choice-main">貼上去吞食 ${corpse.name} 的殘骸</span>
            <span class="choice-sub">史萊姆幼體能從屍體中汲取殘留能力痕跡。</span>
          </button>
        `);
      }
    }

    html.push(`<div class="section-mini-title">移動</div>`);
    html.push(renderDirectionButtons(exits));
    html.push(`
      <button class="choice-btn secondary" data-action="scene_listen">
        <span class="choice-main">停下來傾聽四周</span>
        <span class="choice-sub">不急著移動，先再確認一次周遭動靜。</span>
      </button>
      <button class="choice-btn secondary" data-action="scene_pause">
        <span class="choice-main">原地停住</span>
        <span class="choice-sub">先穩住呼吸，再決定下一步。</span>
      </button>
    `);
    els.choicesPanel.innerHTML = html.join('');
  }

  function renderScene() {
    if (state.gameOver) {
      els.locationName.textContent = '【遊戲結束】';
      els.locationDesc.textContent = state.gameOver.reason || '這次生命已經結束，你必須重新開局。';
      els.timeWeather.textContent = `第 ${state.gameOver.day || state.day} 日｜${state.gameOver.locationName || getCurrentLocation().name}`;
      return;
    }
    ensureWorldViewState();
    const loc = getCurrentLocation();
    const node = getCurrentSceneNode();
    const focus = getSceneFocusObject();
    els.locationName.textContent = node ? `${loc.name}｜${node.title}` : loc.name;
    if (state.battle && state.battle.intent) {
      els.locationDesc.textContent = `${node?.summary || loc.summary}｜${state.battle.enemy.name} 的動作已經要成形了，你得立刻反應。`;
    } else if (focus) {
      els.locationDesc.textContent = `${node?.summary || loc.summary}｜你的注意力現在壓在 ${focus.title} 上，接下來就是決定怎麼碰它。`;
    } else {
      els.locationDesc.textContent = `${node?.summary || loc.summary}｜先看清、聽清，再決定要互動還是移動。`;
    }
    els.timeWeather.textContent = `第 ${state.day} 日｜${GD.periods[state.periodIndex]}｜${GD.weathers[state.weatherIndex]}`;
  }

  const _baseMoveTo = moveTo;
  moveTo = function (locationId, opts = {}) {
    const target = GD.locations[locationId];
    if (!target) return;
    if (!target.unlocked) {
      logEntry('system', '這條路線尚未開放。');
      render();
      return;
    }
    const passive = recalcDerived().passive;
    const baseSpCost = typeof opts.overrideCost === 'number' ? opts.overrideCost : 6;
    const cost = Math.max(2, Math.floor(baseSpCost * (1 - passive.travelSpDiscount)));
    if (state.resources.sp < cost) {
      logEntry('system', `體力不足，前往 ${target.name} 需要 ${cost} 點體力。`);
      render();
      return;
    }
    spendResource('sp', cost);
    state.location = locationId;
    if (state.ui) { state.ui.mode = null; state.ui.sceneFocus = null; }
    ensureWorldViewState();
    state.view.nodeId = opts.arrivalNodeId || getStartNodeIdForLocation(locationId);
    advanceTime(1);
    const node = getCurrentSceneNode();
    if (hasLearnedSkill('traveler_instinct')) gainSkillProficiency('traveler_instinct', 65, `移動至 ${target.name}`);
    if (typeof addSkillPractice === 'function') addSkillPractice('traveler_instinct', 4, `抵達 ${target.name}`);
    logEntry('system', `${opts.entryText ? opts.entryText + ' ' : ''}你抵達了 ${target.name}，現在看見的是【${node?.title || target.name}】。${node?.summary || ''}`.trim());
    syncQuestProgress();
    autoSave();
    render();
  };

  const _baseHandleAction = handleAction;
  handleAction = function (actionId) {
    if (actionId && actionId.startsWith('step_exit:')) return stepByExit(actionId.split(':')[1]);
    if (actionId === 'scene_listen') return sceneListen();
    if (actionId === 'scene_pause') return scenePause();
    if (actionId === 'scene_recover') {
      const recoveredNodeId = getStartNodeIdForLocation(state.location) || getStartNodeIdForLocation(Object.keys(GD.locations || {})[0]);
      if (recoveredNodeId) {
        setSceneNode(recoveredNodeId, { entryText: '你重新穩定呼吸與方向感，視線逐漸回到可辨識的起始位置。', silent: false });
        autoSave();
      } else {
        const fallbackNode = Object.values(GD.sceneNodes || {}).find((row) => row.isStart) || Object.values(GD.sceneNodes || {})[0];
        if (fallbackNode) {
          state.location = fallbackNode.locationId;
          setSceneNode(fallbackNode.id, { entryText: '目前位置資料已斷裂，已強制回到第一個可辨識節點。', silent: false });
          autoSave();
        } else {
          logEntry('system', '目前資料庫裡沒有任何可用視野節點，請重新解壓新版。');
        }
      }
      render();
      return;
    }
    return _baseHandleAction(actionId);
  };

  const _syncRuntimeState = syncRuntimeState;
  syncRuntimeState = function () {
    _syncRuntimeState();
    ensureWorldViewState();
  };

  const _newGame = newGame;
  newGame = function () {
    _newGame();
    ensureWorldViewState();
    saveGame(false);
    render();
  };

  const _pickUpStone = typeof pickUpStone === 'function' ? pickUpStone : null;
  if (_pickUpStone) {
    pickUpStone = function () {
      _pickUpStone();
      const focus = getSceneFocusObject();
      if (focus && /石/.test(focus.title)) {
        logEntry('system', '你重新掂了掂這塊石頭的重量，之後可以投擲、敲擊或收納。');
        render();
      }
    };
  }

  window.ensureWorldViewState = ensureWorldViewState;
  window.getCurrentSceneNode = getCurrentSceneNode;
  window.getNodeExits = getNodeExits;
  window.getVisibleSceneObjects = getVisibleSceneObjects;
  window.getSceneFocusObject = getSceneFocusObject;
  window.openSceneFocus = openSceneFocus;
  window.closeSceneFocus = closeSceneFocus;
  window.renderPerspectiveChoices = renderPerspectiveChoices;
  window.renderScene = renderScene;
})();

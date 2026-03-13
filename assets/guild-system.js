// Guild system: commission board, acceptance, progress, turn-in
function setUiMode(mode) {
  if (!state.ui) state.ui = { mode: null };
  state.ui.mode = mode;
}

function ensureCommissionState(commissionId) {
  if (!state.guild) state.guild = { commissions: {} };
  if (!state.guild.commissions) state.guild.commissions = {};
  if (!state.guild.commissions[commissionId]) {
    state.guild.commissions[commissionId] = { accepted: false, completed: false, turnedIn: false, killCount: 0 };
  }
  return state.guild.commissions[commissionId];
}

function commissionUnlocked(def) {
  return (def.unlockFlags || []).every((flag) => !!state.flags[flag]);
}

function commissionItemRequirementsMet(def) {
  const requiredItems = def.requiredItems || [];
  const requiredParts = def.requiredParts || [];
  const itemsOk = requiredItems.every((row) => (state.inventory[row.itemId] || 0) >= row.qty);
  const partsOk = requiredParts.every((row) => (state.inventory[row.itemId] || 0) >= row.qty);
  return itemsOk && partsOk;
}

function commissionKillsMet(def, runtime) {
  return !def.requiredKills || (runtime.killCount || 0) >= def.requiredKills;
}

function commissionReadyToTurnIn(commissionId) {
  const def = GD.guildCommissions[commissionId];
  const runtime = ensureCommissionState(commissionId);
  if (!runtime.accepted || runtime.turnedIn) return false;
  return commissionKillsMet(def, runtime) && commissionItemRequirementsMet(def);
}

function getCommissionStatusLabel(commissionId) {
  const def = GD.guildCommissions[commissionId];
  const runtime = ensureCommissionState(commissionId);
  if (!commissionUnlocked(def)) return "未解鎖";
  if (runtime.turnedIn) return "已完成";
  if (commissionReadyToTurnIn(commissionId)) return "可交付";
  if (runtime.accepted) return "進行中";
  return "可接取";
}

function getCommissionProgressText(commissionId) {
  const def = GD.guildCommissions[commissionId];
  const runtime = ensureCommissionState(commissionId);
  const lines = [];
  if (def.requiredKills) {
    const targetName = GD.enemies[def.targetEnemyId]?.name || def.targetEnemyId;
    lines.push(`討伐 ${targetName}：${runtime.killCount || 0} / ${def.requiredKills}`);
  }
  (def.requiredItems || []).forEach((row) => {
    lines.push(`${row.label || GD.items[row.itemId].name}：${state.inventory[row.itemId] || 0} / ${row.qty}`);
  });
  (def.requiredParts || []).forEach((row) => {
    lines.push(`${row.label || GD.items[row.itemId].name}：${state.inventory[row.itemId] || 0} / ${row.qty}`);
  });
  return lines.join("｜");
}

function openGuildBoard() {
  if (!state.flags.met_guild_master) {
    state.flags.met_guild_master = true;
    state.quests.main_rift.stage = 1;
    logEntry("system", "公會幹事告訴你：近期灰霧與裂隙反應同時出現在荒鐘禮拜堂與斷塔遺蹟，若能帶回兩地線索，就能推算裂隙源頭。你也可以在委託板挑選適合自己的工作。");
    addExp(18, "取得公會情報");
  }
  setUiMode("guild_board");
  autoSave();
  render();
}

function acceptCommission(commissionId) {
  const def = GD.guildCommissions[commissionId];
  if (!def || !commissionUnlocked(def)) return;
  const runtime = ensureCommissionState(commissionId);
  if (runtime.turnedIn) {
    logEntry("system", "這份委託已完成。Beta 版暫不支援重複接取。");
    render();
    return;
  }
  if (runtime.accepted) {
    logEntry("system", `你已接下「${def.title}」。`);
    render();
    return;
  }
  runtime.accepted = true;
  if (commissionId === "guild_herb_supply") {
    state.flags.herb_contract_accepted = true;
    state.quests.herb_contract.stage = 0;
  }
  logEntry("reward", `已接取委託：${def.title}。${def.objectiveText}`);
  autoSave();
  render();
}

function registerCommissionKill(enemyId) {
  Object.values(GD.guildCommissions).forEach((def) => {
    const runtime = ensureCommissionState(def.id);
    if (!runtime.accepted || runtime.turnedIn) return;
    if (def.targetEnemyId === enemyId) {
      runtime.killCount = (runtime.killCount || 0) + 1;
      logEntry("system", `委託進度更新：${def.title}｜討伐數 ${runtime.killCount} / ${def.requiredKills}。`);
    }
  });
}

function turnInCommission(commissionId) {
  const def = GD.guildCommissions[commissionId];
  const runtime = ensureCommissionState(commissionId);
  if (!commissionReadyToTurnIn(commissionId)) {
    logEntry("system", `尚未完成「${def.title}」的交付條件。`);
    render();
    return;
  }
  (def.requiredItems || []).forEach((row) => removeItem(row.itemId, row.qty));
  (def.requiredParts || []).forEach((row) => removeItem(row.itemId, row.qty));
  runtime.completed = true;
  runtime.turnedIn = true;

  if (commissionId === "guild_herb_supply") {
    state.quests.herb_contract.stage = 2;
    gainSkillProficiency("traveler_instinct", 80, "完成探索委託");
  } else {
    gainSkillProficiency("monster_anatomy", 90, "交付解剖部位委託");
  }

  const reward = def.reward || {};
  if (reward.gold) gainGold(reward.gold);
  if (reward.exp) addExp(reward.exp, `完成委託：${def.title}`);
  (reward.items || []).forEach((row) => {
    addItem(row.id, row.qty || 1);
    logEntry("reward", `獲得 ${GD.items[row.id].name} ×${row.qty || 1}。`);
  });
  logEntry("reward", `你完成並交付了「${def.title}」。`);
  autoSave();
  render();
}

function rewardText(reward = {}) {
  const parts = [];
  if (reward.gold) parts.push(`${reward.gold} 金幣`);
  if (reward.exp) parts.push(`${reward.exp} 經驗`);
  (reward.items || []).forEach((row) => parts.push(`${GD.items[row.id].name} ×${row.qty || 1}`));
  return parts.join("、");
}

function renderGuildChoices() {
  const cards = Object.values(GD.guildCommissions)
    .filter((def) => commissionUnlocked(def) || ensureCommissionState(def.id).accepted || ensureCommissionState(def.id).turnedIn)
    .map((def) => {
      const status = getCommissionStatusLabel(def.id);
      const progress = getCommissionProgressText(def.id) || def.objectiveText;
      const runtime = ensureCommissionState(def.id);
      const canAccept = commissionUnlocked(def) && !runtime.accepted && !runtime.turnedIn;
      const canTurnIn = commissionReadyToTurnIn(def.id);
      return `
        <div class="choice-card-block">
          <div class="card-title-row">
            <div class="card-title">${def.title}</div>
            <span class="tag">${status}</span>
          </div>
          <div class="card-sub">${def.summary}</div>
          <div class="card-meta">目標：${def.objectiveText}</div>
          <div class="card-meta">進度：${progress}</div>
          <div class="card-meta">報酬：${rewardText(def.reward)}</div>
          <div class="inventory-actions">
            ${canAccept ? `<button class="inventory-btn" data-action="guild_accept:${def.id}">接取委託</button>` : ""}
            ${canTurnIn ? `<button class="inventory-btn" data-action="guild_turnin:${def.id}">交付委託</button>` : ""}
          </div>
        </div>
      `;
    });

  els.choicesPanel.innerHTML = `
    <div class="choice-board-wrap">
      <div class="choice-board-header">冒險者公會委託板</div>
      <div class="choice-board-sub">可在此選擇委託、追蹤進度，並交付指定素材或解剖部位。</div>
      ${cards.join("") || `<div class="choice-card-block"><div class="card-sub">目前沒有可公開接取的委託。</div></div>`}
      <button class="choice-btn" data-action="guild_close">
        <span class="choice-main">離開委託板</span>
        <span class="choice-sub">返回一般場景行動。</span>
      </button>
    </div>
  `;
}

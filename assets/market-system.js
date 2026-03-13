// Market system: town trade board, buy/sell resolution, price helpers
function ensureMarketUiState() {
  if (!state.ui) state.ui = { mode: null };
  if (typeof state.ui.marketId === 'undefined') state.ui.marketId = null;
  if (!state.ui.marketTab) state.ui.marketTab = 'buy';
}

function getActiveMarketId() {
  ensureMarketUiState();
  return state.ui.marketId || null;
}

function getMarketDef(marketId = getActiveMarketId()) {
  return marketId ? GD.markets?.[marketId] || null : null;
}

function openMarket(marketId = 'emberport_market', tab = 'buy') {
  ensureMarketUiState();
  const market = getMarketDef(marketId) || GD.markets?.[marketId];
  if (!market) {
    logEntry('system', '這裡目前沒有可用的市場。');
    render();
    return;
  }
  state.ui.mode = 'market';
  state.ui.marketId = marketId;
  state.ui.marketTab = tab;
  logEntry('system', `你走入【${market.name}】，可在此購買補給或出售戰利品。`);
  render();
}

function closeMarket() {
  ensureMarketUiState();
  state.ui.mode = null;
  state.ui.marketId = null;
  state.ui.marketTab = 'buy';
  render();
}

function setMarketTab(tab) {
  ensureMarketUiState();
  state.ui.mode = 'market';
  state.ui.marketTab = tab === 'sell' ? 'sell' : 'buy';
  render();
}

function getMarketStockRow(itemId, marketId = getActiveMarketId()) {
  const market = getMarketDef(marketId);
  if (!market) return null;
  return (market.stock || []).find((row) => row.itemId === itemId) || null;
}

function getMarketBuyPrice(itemId, marketId = getActiveMarketId()) {
  const market = getMarketDef(marketId);
  const item = GD.items[itemId];
  if (!market || !item) return 0;
  const stock = getMarketStockRow(itemId, marketId);
  const base = stock?.buyPrice || item.value || 0;
  return Math.max(1, Math.round(base * (market.buyRate || 1)));
}

function isCommissionLockedItem(itemId) {
  const commissions = state.guild?.commissions || {};
  return Object.values(GD.guildCommissions || {}).some((def) => {
    const runtime = commissions[def.id];
    if (!runtime || !runtime.accepted || runtime.turnedIn) return false;
    const itemReq = (def.requiredItems || []).some((row) => row.itemId === itemId);
    const partReq = (def.requiredParts || []).some((row) => row.itemId === itemId);
    return itemReq || partReq;
  });
}

function getMarketSellPrice(itemId, marketId = getActiveMarketId()) {
  const market = getMarketDef(marketId);
  const item = GD.items[itemId];
  if (!market || !item || !item.value) return 0;
  const byKind = market.sellRateByKind || {};
  const ratio = typeof byKind[item.kind] === 'number' ? byKind[item.kind] : (market.sellRate || 0.45);
  return ratio <= 0 ? 0 : Math.max(1, Math.floor(item.value * ratio));
}

function canSellItemInMarket(itemId, marketId = getActiveMarketId()) {
  const item = GD.items[itemId];
  if (!item) return false;
  if ((state.inventory[itemId] || 0) <= 0) return false;
  if ((item.value || 0) <= 0) return false;
  if (item.kind === 'key') return false;
  if (isCommissionLockedItem(itemId)) return false;
  return getMarketSellPrice(itemId, marketId) > 0;
}

function getSellLockReason(itemId, marketId = getActiveMarketId()) {
  const item = GD.items[itemId];
  if (!item) return '未知物品';
  if ((state.inventory[itemId] || 0) <= 0) return '目前未持有';
  if ((item.value || 0) <= 0 || item.kind === 'key') return '關鍵物品不可販售';
  if (isCommissionLockedItem(itemId)) return '交付中的公會委託暫時鎖定';
  if (getMarketSellPrice(itemId, marketId) <= 0) return '此市場不收購';
  return '';
}

function getMarketBuyRows(marketId = getActiveMarketId()) {
  const market = getMarketDef(marketId);
  if (!market) return [];
  return (market.stock || [])
    .map((row) => ({ ...row, item: GD.items[row.itemId], price: getMarketBuyPrice(row.itemId, marketId) }))
    .filter((row) => row.item)
    .sort((a, b) => a.price - b.price || a.item.name.localeCompare(b.item.name, 'zh-Hant'));
}

function getMarketSellRows(marketId = getActiveMarketId()) {
  return Object.entries(state.inventory)
    .filter(([, qty]) => qty > 0)
    .map(([itemId, qty]) => ({ itemId, qty, item: GD.items[itemId], price: getMarketSellPrice(itemId, marketId), lockedReason: getSellLockReason(itemId, marketId) }))
    .filter((row) => row.item)
    .sort((a, b) => {
      const aLocked = !!a.lockedReason;
      const bLocked = !!b.lockedReason;
      if (aLocked !== bLocked) return aLocked - bLocked;
      return (b.price || 0) - (a.price || 0) || a.item.name.localeCompare(b.item.name, 'zh-Hant');
    });
}

function buyFromMarket(itemId, qty = 1) {
  const market = getMarketDef();
  const item = GD.items[itemId];
  if (!market || !item) return;
  const price = getMarketBuyPrice(itemId) * qty;
  if (state.gold < price) {
    logEntry('system', `購買 ${item.name} 需要 ${price} 金幣，但你目前只有 ${state.gold}。`);
    render();
    return;
  }
  state.gold -= price;
  addItem(itemId, qty);
  logEntry('reward', `你在【${market.name}】購得 ${item.name} ×${qty}，支付 ${price} 金幣。`);
  autoSave();
  render();
}

function sellToMarket(itemId, qty = 1) {
  const market = getMarketDef();
  const item = GD.items[itemId];
  if (!market || !item) return;
  if (!canSellItemInMarket(itemId)) {
    logEntry('system', `無法出售 ${item.name}：${getSellLockReason(itemId) || '不符合交易條件'}。`);
    render();
    return;
  }
  if ((state.inventory[itemId] || 0) < qty) {
    logEntry('system', `你持有的 ${item.name} 數量不足。`);
    render();
    return;
  }
  const price = getMarketSellPrice(itemId) * qty;
  removeItem(itemId, qty);
  gainGold(price);
  logEntry('reward', `你將 ${item.name} ×${qty} 售予【${market.name}】，取得 ${price} 金幣。`);
  autoSave();
  render();
}

function renderMarketChoices() {
  ensureMarketUiState();
  const market = getMarketDef();
  if (!market) {
    els.choicesPanel.innerHTML = `<div class="inventory-card"><div class="card-sub">找不到可用的市場資料。</div></div>`;
    return;
  }
  const isBuy = state.ui.marketTab !== 'sell';
  const rows = isBuy ? getMarketBuyRows() : getMarketSellRows();
  const notes = (market.notes || []).map((note) => `<div class="card-meta">・${note}</div>`).join('');
  const rowHtml = rows.length ? rows.map((row) => {
    const disabled = isBuy ? state.gold < row.price : !!row.lockedReason;
    return `
      <button class="choice-btn" data-action="market_${isBuy ? 'buy' : 'sell'}:${row.itemId}" ${disabled ? 'disabled' : ''}>
        <span class="choice-main">${isBuy ? '購買' : '出售'}｜${row.item.name}${!isBuy ? ` ×${row.qty}` : ''}</span>
        <span class="choice-sub">${row.item.desc}｜${isBuy ? `購買價 ${row.price} 金幣` : (row.lockedReason ? row.lockedReason : `售價 ${row.price} 金幣／件`)}</span>
      </button>
    `;
  }).join('') : `<div class="inventory-card"><div class="card-sub">${isBuy ? '目前沒有可購買的商品。' : '目前沒有可出售的物品。'}</div></div>`;

  els.choicesPanel.innerHTML = `
    <div class="inventory-card market-card">
      <div class="card-title-row">
        <div class="card-title">${market.name}</div>
        <span class="tag">目前持有 ${state.gold} 金幣</span>
      </div>
      <div class="card-sub">${market.summary}</div>
      ${notes}
      <div class="inventory-actions market-tab-actions">
        <button class="inventory-btn" data-action="market_tab:buy" ${isBuy ? 'disabled' : ''}>購買</button>
        <button class="inventory-btn" data-action="market_tab:sell" ${!isBuy ? 'disabled' : ''}>出售</button>
        <button class="inventory-btn" data-action="market_close">離開市場</button>
      </div>
    </div>
    ${rowHtml}
  `;
}

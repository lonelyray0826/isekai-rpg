# 灰燼裂隙：幼體求生 Beta v2.7 接續文件

## 專案定位
- 離線網頁單機版
- 純前端執行，直接開 `index.html` 可玩
- 內容資料以 `data/game_content.db` 管理，前端離線讀取使用 `assets/db-cache.js`
- 中世紀異世界背景
- 玩法方向：**重養成 / 生存 / 偏魂類 / 永久死亡 / 方向移動→視野刷新→物件互動 / 簡潔沉浸式上下版面 UI**

## 目前版本重點
0. **介面改為簡潔沉浸式上下版面 UI**
   - 左側固定顯示場景感知、視野摘要與敘事訊息
   - 右側只顯示當下可做的具體反應，不再上下堆疊
   - 狀態 / 任務 / 敵情 / 地圖 / 技能 / 行囊 / 系統功能 維持收納式彈出視窗
   - 場景與移動按鈕文字改成更貼近角色此刻看見／聽見的描述
1. **隨機出生開局**
   - 人類嬰兒：富人家 / 平民家 / 貧民窟
   - 哥布林幼體：群居巢群分支，與人類社會價值不同
   - 史萊姆幼體：非群居，能吞食生物屍體吸收技能痕跡
2. **技能改為熟練達門檻習得**
   - 初階技能不再機率領悟
   - 透過對應行動累積「習得熟練」
   - 達 `learnThreshold` 後自動學會
   - 學會後再以正常熟練度推進進化
3. **成長放慢**
   - 升級所需經驗提高
   - 屬性點改為每 3 級才拿到 1 點
   - 技能點改為每 5 級才拿到 1 點
   - 升級只恢復部分狀態
4. **死亡改為永久死亡**
   - 不再扣金幣 / 扣經驗後原地續命
   - 直接 `game over`
   - 本機存檔會清除
   - 必須重新開局
5. **視角驅動互動已導入第一版**
   - 場景不再直接列抽象功能選單
   - 改成先列出「目前角色看見的物件」
   - 點進物件後才出現下一層操作
   - 已支援拿起石頭 → 放下 / 收納 這種鏈式互動
6. **戰鬥改為預兆反應制**
   - 敵人會先顯示準備中的動作預兆
   - 玩家再決定要：搶先攻擊 / 防守 / 閃避 / 打斷 / 反擊 / 撤退
   - 敵方狀態面板會顯示當前可見預兆

## 核心資料來源
- `data/game_content.db`
- `tools/export_cache_from_db.py`
- `assets/db-cache.js`

## 新版主迴圈
- 先在當前節點選擇移動方向
- 抵達新節點後刷新視野
- 再根據當前能看見的物件決定互動
- 戰鬥仍維持「先看見敵人準備什麼，再做反應」

## 目前重要資料表
- `items`
- `skills`
- `enemies`
- `locations`
- `quests`
- `guild_commissions`
- `anatomy_parts`
- `jobs`
- `markets`
- `scene_objects` ← 視野中可見物件與互動資料
- `scene_nodes` ← 角色目前站位 / 視角節點
- `scene_exits` ← 節點之間的方向移動與區域轉移資料

## 重要系統拆檔
- `assets/core-system.js`：共用狀態、衍生能力、升級與基礎成長
- `assets/origin-system.js`：隨機出生種族 / 出身 / 史萊姆吞食屍體 / 種族被動與交易修正
- `assets/perception-system.js`：基礎視角互動、手持物、戰鬥預兆、反應選項
- `assets/worldview-system.js`：方向移動、視野節點、可見物過濾、主行動循環覆寫
- `assets/skill-discovery-system.js`：初階技能的習得熟練累積與門檻學習
- `assets/skill-system.js`：已學會技能的熟練、進化與選單施放
- `assets/combat-system.js`：戰鬥、永久死亡、屍體生成、預兆反應處理
- `assets/anatomy-system.js`：部位解剖與戰利品品質
- `assets/survival-system.js`：飽食度與生存懲罰
- `assets/profession-system.js`：副職業
- `assets/guild-system.js`：冒險者公會委託
- `assets/market-system.js`：市場買賣與種族交易修正
- `assets/action-system.js`：場景行動派發
- `assets/render-system.js`：UI、簡潔沉浸式版面、感知摘要與敘事顯示
- `assets/save-system.js`：本機存檔 / 匯入匯出 / 新局
- `assets/main.js`：初始化、收納功能切換與事件綁定

## 新局規則
- `newGame()` 會走 `createOriginStartState()`
- 起始仍以 **平民** 為基底
- 副職業仍維持：裁縫 / 鐵匠 / 廚師 / 農夫 / 獵人
- 角色可透過後續培養選擇轉職走向

## 技能習得規則
### 初階技能
由 `learnThreshold + practiceSources` 控制。
目前已調整：
- `slash`
- `spark`
- `first_aid`
- `tough_body`
- `monster_anatomy`
- `traveler_instinct`

### 上位技能
仍維持：
- 已學會下位技能
- 熟練度滿值
- 等級 / 屬性達標
- 從技能頁進化

## 視角驅動互動規則
- 場景互動現在以 `scene_objects` 為主
- 每個場景物件至少有：
  - `locationId`
  - `title`
  - `summary`
  - `kind`
  - `interactions[]`
- 目前已支援：
  - 餘燼港 / 綠蔭林地 / 禮拜堂 / 殘塔 / 裂隙帶 的可見物件
  - 手持石頭 → 放下 / 收納
  - 由視角切換到物件，再由物件展開操作

## 戰鬥預兆反應規則
- 敵人資料內已可含 `intentProfiles`
- 每個預兆至少有：
  - `id`
  - `telegraph`
  - `style`（physical / magic）
  - `preferredReactions`
  - `damageMult`
  - `hitBonus`
- 第一版已接入：
  - 灰林狼
  - 餘燼幽影
  - 弧光飄靈
  - 裂隙獸

## 永久死亡規則
- `triggerGameOver()` 會：
  - 記錄死因摘要
  - 清除本機存檔
  - 切到 game over 畫面
  - 只能重新開局
- 不再保留舊的「拖回城鎮、扣錢扣經驗後繼續」規則

## 如果要繼續做，最適合的下一步
1. 把 `scene_objects` 擴充到所有地點與更多連鎖互動
2. 導入 **幼體期專屬序章地圖 / 巢穴 / 垃圾堆 / 下水道 / 棄屍地**
3. 導入 **人類社會 / 魔物社會** 的真正視野差異與可見互動差異
4. 導入 **更多戰鬥預兆類型**（抓投、壓制、蓄力、掃擊、多段攻擊）
5. 導入 **魂類式節奏的傷勢 / 部位破壞 / 精準反應窗口**
6. 導入 **真正的成長階段**（幼體 → 少年期 → 可轉職期）
7. 逐步把 scene_objects 補上更具體的相對方位與感官描述欄位，降低抽象感

## 更新規則
每次改版至少同步更新：
- `data/game_content.db`
- `assets/db-cache.js`
- `START_HERE_FOR_AI.txt`
- `docs/AI_CONTINUATION.md`
- `docs/ai_handoff.json`


[v2.9 update]
- UI changed back to simpler top-message / bottom-options layout.
- Added 1~5 quick hotkey buttons under the option list.
- Mobile topbar is no longer sticky to prevent the screen from being covered.
- World-view options were simplified to keep the main play loop clearer.

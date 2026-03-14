(() => {
  const content = window.GAME_CONTENT;

  function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function normalizeTable(tableData) {
    if (!tableData) return [];
    if (Array.isArray(tableData)) return tableData.map((row) => ({ ...deepClone(row), id: row.id }));
    return Object.entries(tableData).map(([id, row]) => ({ ...deepClone(row), id: row.id || id }));
  }

  class EmbeddedTable {
    constructor(name, rows = []) {
      this.name = name;
      this.rows = [];
      this.index = new Map();
      rows.forEach((row) => this.upsert(row));
    }

    upsert(row) {
      const record = deepClone(row);
      if (!record.id) throw new Error(`Table ${this.name} is missing record id.`);
      const currentIndex = this.index.get(record.id);
      if (currentIndex === undefined) {
        this.index.set(record.id, this.rows.length);
        this.rows.push(record);
      } else {
        this.rows[currentIndex] = record;
      }
      return this.get(record.id);
    }

    get(id) {
      const idx = this.index.get(id);
      return idx === undefined ? null : this.rows[idx];
    }

    list() {
      return this.rows;
    }

    asMap() {
      const map = {};
      this.rows.forEach((row) => { map[row.id] = row; });
      return map;
    }

    count() {
      return this.rows.length;
    }
  }

  class GameDatabase {
    constructor(source) {
      this.source = source;
      this.tables = {
        quests: new EmbeddedTable('quests', normalizeTable(source.questDefs)),
        items: new EmbeddedTable('items', normalizeTable(source.items)),
        skills: new EmbeddedTable('skills', normalizeTable(source.skills)),
        enemies: new EmbeddedTable('enemies', normalizeTable(source.enemies)),
        npcs: new EmbeddedTable('npcs', normalizeTable(source.npcs)),
        locations: new EmbeddedTable('locations', normalizeTable(source.locations)),
        guildCommissions: new EmbeddedTable('guildCommissions', normalizeTable(source.guildCommissions)),
        anatomyParts: new EmbeddedTable('anatomyParts', normalizeTable(source.anatomyParts)),
        jobs: new EmbeddedTable('jobs', normalizeTable(source.jobs)),
        markets: new EmbeddedTable('markets', normalizeTable(source.markets)),
        sceneObjects: new EmbeddedTable('sceneObjects', normalizeTable(source.sceneObjects)),
        sceneNodes: new EmbeddedTable('sceneNodes', normalizeTable(source.sceneNodes)),
        sceneExits: new EmbeddedTable('sceneExits', normalizeTable(source.sceneExits))
      };
      this.api = this.createLegacyApi();
    }

    meta() { return this.source.meta; }
    statOrder() { return this.source.statOrder; }
    statLabels() { return this.source.statLabels; }
    periods() { return this.source.periods; }
    weathers() { return this.source.weathers; }
    table(name) { return this.tables[name]; }
    get(tableName, id) { const table = this.table(tableName); return table ? table.get(id) : null; }
    list(tableName) { const table = this.table(tableName); return table ? table.list() : []; }
    summary() {
      const summary = {};
      Object.entries(this.tables).forEach(([name, table]) => { summary[name] = table.count(); });
      return summary;
    }

    createLegacyApi() {
      const db = this;
      return {
        get meta() { return db.meta(); },
        get statOrder() { return db.statOrder(); },
        get statLabels() { return db.statLabels(); },
        get questDefs() { return db.table('quests').asMap(); },
        get items() { return db.table('items').asMap(); },
        get skills() { return db.table('skills').asMap(); },
        get enemies() { return db.table('enemies').asMap(); },
        get npcs() { return db.table('npcs').asMap(); },
        get locations() { return db.table('locations').asMap(); },
        get guildCommissions() { return db.table('guildCommissions').asMap(); },
        get anatomyParts() { return db.table('anatomyParts').asMap(); },
        get jobs() { return db.table('jobs').asMap(); },
        get markets() { return db.table('markets').asMap(); },
        get sceneObjects() { return db.table('sceneObjects').asMap(); },
        get sceneNodes() { return db.table('sceneNodes').asMap(); },
        get sceneExits() { return db.table('sceneExits').asMap(); },
        startingState: () => db.source.startingState(),
        get periods() { return db.periods(); },
        get weathers() { return db.weathers(); },
        dbSummary: () => db.summary(),
        dbGet: (tableName, id) => db.get(tableName, id),
        dbList: (tableName) => db.list(tableName)
      };
    }
  }

  window.GAME_DB = new GameDatabase(content);
  window.GAME_DB.sourceType = 'sqlite-cache';
  window.GAME_DATA = window.GAME_DB.api;
})();

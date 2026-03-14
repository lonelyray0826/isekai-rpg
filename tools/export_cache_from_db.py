import json
import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT / 'data' / 'game_content.db'
OUT_PATH = ROOT / 'assets' / 'db-cache.js'

conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
cur = conn.cursor()


def load_map(table):
    return {row['id']: json.loads(row['json']) for row in cur.execute(f'SELECT id, json FROM {table}').fetchall()}


meta = {row['key']: row['value'] for row in cur.execute('SELECT key, value FROM meta').fetchall()}
stat_rows = cur.execute('SELECT stat_key, label FROM stat_labels ORDER BY sort_order').fetchall()
stat_order = [row['stat_key'] for row in stat_rows]
stat_labels = {row['stat_key']: row['label'] for row in stat_rows}
periods = [row['label'] for row in cur.execute('SELECT label FROM periods ORDER BY id').fetchall()]
weathers = [row['label'] for row in cur.execute('SELECT label FROM weathers ORDER BY id').fetchall()]
starting_state = json.loads(cur.execute('SELECT json FROM starting_state WHERE id = 1').fetchone()['json'])

payload = {
    'meta': meta,
    'statOrder': stat_order,
    'statLabels': stat_labels,
    'questDefs': load_map('quests'),
    'items': load_map('items'),
    'skills': load_map('skills'),
    'enemies': load_map('enemies'),
    'locations': load_map('locations'),
    'periods': periods,
    'weathers': weathers,
    'npcs': load_map('npcs'),
    'guildCommissions': load_map('guild_commissions'),
    'anatomyParts': load_map('anatomy_parts'),
    'jobs': load_map('jobs') if cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='jobs'").fetchone() else {},
    'markets': load_map('markets') if cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='markets'").fetchone() else {},
    'sceneObjects': load_map('scene_objects') if cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='scene_objects'").fetchone() else {},
    'sceneNodes': load_map('scene_nodes') if cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='scene_nodes'").fetchone() else {},
    'sceneExits': load_map('scene_exits') if cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='scene_exits'").fetchone() else {}
}

js = (
    'window.GAME_CONTENT = ' + json.dumps(payload, ensure_ascii=False, indent=2) + ';\n\n'
    + 'window.GAME_CONTENT.startingState = () => (' + json.dumps(starting_state, ensure_ascii=False, indent=2) + ');\n'
)
OUT_PATH.write_text(js, encoding='utf-8')
print(f'exported to {OUT_PATH}')

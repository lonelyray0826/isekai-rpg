window.GAME_CONTENT = {
  "meta": {
    "title": "灰燼裂隙：幼體求生 Beta v2.5",
    "version": "2.5.0",
    "saveKey": "isekai_text_rpg_beta_v2_5_save"
  },
  "statOrder": [
    "STR",
    "VIT",
    "DEX",
    "AGI",
    "INT",
    "LUK"
  ],
  "statLabels": {
    "STR": "STR 力量",
    "VIT": "VIT 體質",
    "DEX": "DEX 技巧",
    "AGI": "AGI 敏捷",
    "INT": "INT 智力",
    "LUK": "LUK 幸運"
  },
  "questDefs": {
    "main_rift": {
      "title": "主線｜灰裂隙的呼喚",
      "stages": [
        "前往餘燼港的冒險者公會蒐集灰裂隙情報。",
        "在荒鐘禮拜堂與斷塔遺蹟尋找兩份裂隙線索。",
        "裂隙沼原已開放，前往灰燼裂隙核心。",
        "你已暫時封穩裂隙，等待下一版擴充主線。"
      ]
    },
    "herb_contract": {
      "title": "支線｜公會草藥契約",
      "stages": [
        "在綠蔭林地蒐集 3 份灰葉草。",
        "回到餘燼港冒險者公會交付草藥。",
        "已完成。"
      ]
    }
  },
  "items": {
    "potion": {
      "id": "potion",
      "name": "治癒藥水",
      "kind": "consumable",
      "desc": "恢復 45 點生命。",
      "value": 24
    },
    "ether": {
      "id": "ether",
      "name": "以太藥滴",
      "kind": "consumable",
      "desc": "恢復 30 點魔力。",
      "value": 32
    },
    "ration": {
      "id": "ration",
      "name": "旅行口糧",
      "kind": "consumable",
      "desc": "恢復 18 點體力與 28 點飽食度。",
      "value": 10
    },
    "lockpick": {
      "id": "lockpick",
      "name": "開鎖針",
      "kind": "tool",
      "desc": "在部份事件中提供技巧判定補正。",
      "value": 12
    },
    "ash_herb": {
      "id": "ash_herb",
      "name": "灰葉草",
      "kind": "material",
      "desc": "餘燼港公會長期收購的常用素材。",
      "value": 8
    },
    "chapel_sigil": {
      "id": "chapel_sigil",
      "name": "破損聖印",
      "kind": "key",
      "desc": "荒鐘禮拜堂找到的舊聖印，帶有微弱灰光。",
      "value": 0
    },
    "tower_shard": {
      "id": "tower_shard",
      "name": "弧光碎晶",
      "kind": "key",
      "desc": "斷塔遺蹟深處取得的法術碎晶。",
      "value": 0
    },
    "rift_core": {
      "id": "rift_core",
      "name": "裂隙穩定核",
      "kind": "key",
      "desc": "暫時封穩灰燼裂隙的核心媒介。",
      "value": 0
    },
    "wolf_pelt_torn": {
      "id": "wolf_pelt_torn",
      "name": "破損狼皮",
      "kind": "material",
      "desc": "解剖失手時留下的粗糙皮料，價值普通。",
      "value": 6
    },
    "wolf_pelt": {
      "id": "wolf_pelt",
      "name": "完整狼皮",
      "kind": "material",
      "desc": "可供製皮與交易的狼皮素材。",
      "value": 14
    },
    "wolf_pelt_fine": {
      "id": "wolf_pelt_fine",
      "name": "精良狼皮",
      "kind": "material",
      "desc": "切口完整的高品質狼皮，售價較高。",
      "value": 28
    },
    "wolf_fang": {
      "id": "wolf_fang",
      "name": "狼牙",
      "kind": "material",
      "desc": "可作為飾品、箭頭或鍊金材料。",
      "value": 10
    },
    "beast_meat": {
      "id": "beast_meat",
      "name": "野獸鮮肉",
      "kind": "material",
      "desc": "新鮮獸肉，可烹煮熱食或販售。",
      "value": 9
    },
    "rift_hide_frayed": {
      "id": "rift_hide_frayed",
      "name": "碎裂異皮",
      "kind": "material",
      "desc": "自裂隙獸身上剝離的損傷皮膜。",
      "value": 16
    },
    "rift_hide_dense": {
      "id": "rift_hide_dense",
      "name": "致密異皮",
      "kind": "material",
      "desc": "保有完整紋理的異界皮膜，兼具韌性與魔導性。",
      "value": 34
    },
    "rift_gland": {
      "id": "rift_gland",
      "name": "變質裂腺",
      "kind": "material",
      "desc": "蘊含灰霧反應的危險器官，可做鍊金素材。",
      "value": 42
    },
    "rift_crystal": {
      "id": "rift_crystal",
      "name": "清明裂晶",
      "kind": "material",
      "desc": "從裂隙獸骨縫內剔出的穩定晶簇。",
      "value": 58
    },
    "rift_core_gland": {
      "id": "rift_core_gland",
      "name": "裂界核囊",
      "kind": "material",
      "desc": "極少見的高階解剖成果，具高價值與稀有性。",
      "value": 96
    },
    "rough_stone": {
      "id": "rough_stone",
      "name": "粗糙石塊",
      "category": "雜物／投擲素材",
      "price": 1,
      "description": "隨手可見的小石頭。可以暫時握在手中，也能收進行囊。",
      "stackable": true,
      "questLocked": false,
      "usable": false
    }
  },
  "skills": {
    "slash": {
      "id": "slash",
      "name": "斬擊",
      "type": "active",
      "category": "武技／下位",
      "tier": "lower",
      "maxProficiency": 1000,
      "description": "以基礎劍技橫斬敵人。主屬性 STR，副屬性 DEX。",
      "costSP": 6,
      "useContexts": [
        "battle"
      ],
      "evolveTo": [
        "heavy_slash",
        "rapid_slash"
      ],
      "evolveRequirements": {
        "heavy_slash": {
          "level": 4,
          "stats": {
            "STR": 10
          }
        },
        "rapid_slash": {
          "level": 4,
          "stats": {
            "DEX": 10
          }
        }
      },
      "growthHint": "每次在戰鬥中施放可提升熟練度。",
      "school": "martial",
      "learnHint": "透過普通攻擊與戰鬥勝利累積習得熟練，達門檻後學會武技【斬擊】。",
      "learnSources": {
        "basic_attack": {
          "baseChance": 16,
          "perAttempt": 5,
          "maxChance": 88,
          "mainStat": "STR",
          "mainStatWeight": 3,
          "subStat": "DEX",
          "subStatWeight": 2,
          "startProficiency": 100,
          "sourceLabel": "近身實戰",
          "basePractice": 12,
          "successBonus": 8,
          "critBonus": 6,
          "highRiskBonus": 5
        },
        "martial_victory": {
          "baseChance": 24,
          "perAttempt": 7,
          "maxChance": 92,
          "mainStat": "STR",
          "mainStatWeight": 3,
          "subStat": "DEX",
          "subStatWeight": 2,
          "startProficiency": 120,
          "sourceLabel": "武技實戰勝利",
          "basePractice": 18,
          "successBonus": 10,
          "critBonus": 6,
          "highRiskBonus": 5
        }
      },
      "learnThreshold": 120,
      "practiceSources": {
        "basic_attack": {
          "baseChance": 16,
          "perAttempt": 5,
          "maxChance": 88,
          "mainStat": "STR",
          "mainStatWeight": 3,
          "subStat": "DEX",
          "subStatWeight": 2,
          "startProficiency": 100,
          "sourceLabel": "近身實戰",
          "basePractice": 12,
          "successBonus": 8,
          "critBonus": 6,
          "highRiskBonus": 5
        },
        "martial_victory": {
          "baseChance": 24,
          "perAttempt": 7,
          "maxChance": 92,
          "mainStat": "STR",
          "mainStatWeight": 3,
          "subStat": "DEX",
          "subStatWeight": 2,
          "startProficiency": 120,
          "sourceLabel": "武技實戰勝利",
          "basePractice": 18,
          "successBonus": 10,
          "critBonus": 6,
          "highRiskBonus": 5
        }
      },
      "learnMode": "practice"
    },
    "heavy_slash": {
      "id": "heavy_slash",
      "name": "重斬",
      "type": "active",
      "category": "武技／中位",
      "tier": "mid",
      "maxProficiency": 1000,
      "description": "蓄力後爆發出沉重一擊，對高防目標更有效。",
      "costSP": 10,
      "useContexts": [
        "battle"
      ],
      "evolveTo": [
        "breaker_cleave"
      ],
      "evolveRequirements": {
        "breaker_cleave": {
          "level": 8,
          "stats": {
            "STR": 14,
            "VIT": 10
          }
        }
      },
      "growthHint": "重型近戰流的核心中位技能。",
      "school": "martial"
    },
    "rapid_slash": {
      "id": "rapid_slash",
      "name": "連斬",
      "type": "active",
      "category": "武技／中位",
      "tier": "mid",
      "maxProficiency": 1000,
      "description": "快速連續斬擊兩次，偏向技巧與暴擊。",
      "costSP": 10,
      "useContexts": [
        "battle"
      ],
      "evolveTo": [
        "storm_flurry"
      ],
      "evolveRequirements": {
        "storm_flurry": {
          "level": 8,
          "stats": {
            "DEX": 14,
            "AGI": 11
          }
        }
      },
      "growthHint": "偏 DEX / AGI 的劍技分流。",
      "school": "martial"
    },
    "breaker_cleave": {
      "id": "breaker_cleave",
      "name": "破甲斷勢",
      "type": "active",
      "category": "武技／上位",
      "tier": "high",
      "maxProficiency": 1000,
      "description": "對護甲與堅韌敵人有額外傷害。",
      "costSP": 14,
      "useContexts": [
        "battle"
      ],
      "evolveTo": [],
      "evolveRequirements": {},
      "growthHint": "Beta 版先做為高位終點。",
      "school": "martial"
    },
    "storm_flurry": {
      "id": "storm_flurry",
      "name": "疾風亂斬",
      "type": "active",
      "category": "武技／上位",
      "tier": "high",
      "maxProficiency": 1000,
      "description": "高速連續出手，容易觸發暴擊。",
      "costSP": 14,
      "useContexts": [
        "battle"
      ],
      "evolveTo": [],
      "evolveRequirements": {},
      "growthHint": "Beta 版先做為高位終點。",
      "school": "martial"
    },
    "spark": {
      "id": "spark",
      "name": "火花",
      "type": "active",
      "category": "魔法／下位",
      "tier": "lower",
      "maxProficiency": 1000,
      "description": "投射不穩定的火星攻擊敵人。主屬性 INT，副屬性 LUK。",
      "costMP": 8,
      "useContexts": [
        "battle"
      ],
      "evolveTo": [
        "firebolt",
        "ember_guard"
      ],
      "evolveRequirements": {
        "firebolt": {
          "level": 4,
          "stats": {
            "INT": 10
          }
        },
        "ember_guard": {
          "level": 4,
          "stats": {
            "INT": 8,
            "VIT": 8
          }
        }
      },
      "growthHint": "每次施放奧術技能可提升熟練度。",
      "school": "magic",
      "learnHint": "調查符文、接觸奧術殘響與異界火痕會累積習得熟練，達門檻後學會魔法【火花】。",
      "learnSources": {
        "tower_study": {
          "baseChance": 18,
          "perAttempt": 6,
          "maxChance": 90,
          "mainStat": "INT",
          "mainStatWeight": 3,
          "subStat": "LUK",
          "subStatWeight": 2,
          "startProficiency": 90,
          "sourceLabel": "符文研究",
          "basePractice": 13,
          "successBonus": 9,
          "critBonus": 6,
          "highRiskBonus": 5
        },
        "arcane_contact": {
          "baseChance": 22,
          "perAttempt": 7,
          "maxChance": 92,
          "mainStat": "INT",
          "mainStatWeight": 3,
          "subStat": "LUK",
          "subStatWeight": 2,
          "startProficiency": 110,
          "sourceLabel": "奧術接觸",
          "basePractice": 16,
          "successBonus": 10,
          "critBonus": 6,
          "highRiskBonus": 5
        }
      },
      "learnThreshold": 130,
      "practiceSources": {
        "tower_study": {
          "baseChance": 18,
          "perAttempt": 6,
          "maxChance": 90,
          "mainStat": "INT",
          "mainStatWeight": 3,
          "subStat": "LUK",
          "subStatWeight": 2,
          "startProficiency": 90,
          "sourceLabel": "符文研究",
          "basePractice": 13,
          "successBonus": 9,
          "critBonus": 6,
          "highRiskBonus": 5
        },
        "arcane_contact": {
          "baseChance": 22,
          "perAttempt": 7,
          "maxChance": 92,
          "mainStat": "INT",
          "mainStatWeight": 3,
          "subStat": "LUK",
          "subStatWeight": 2,
          "startProficiency": 110,
          "sourceLabel": "奧術接觸",
          "basePractice": 16,
          "successBonus": 10,
          "critBonus": 6,
          "highRiskBonus": 5
        }
      },
      "learnMode": "practice"
    },
    "firebolt": {
      "id": "firebolt",
      "name": "火焰箭",
      "type": "active",
      "category": "魔法／中位",
      "tier": "mid",
      "maxProficiency": 1000,
      "description": "集束後射出穩定火矢，魔法命中更高。",
      "costMP": 12,
      "useContexts": [
        "battle"
      ],
      "evolveTo": [
        "flare_lance"
      ],
      "evolveRequirements": {
        "flare_lance": {
          "level": 8,
          "stats": {
            "INT": 14,
            "LUK": 8
          }
        }
      },
      "growthHint": "偏純輸出的火焰分支。",
      "school": "magic"
    },
    "ember_guard": {
      "id": "ember_guard",
      "name": "餘燼護印",
      "type": "active",
      "category": "魔法／中位",
      "tier": "mid",
      "maxProficiency": 1000,
      "description": "以餘燼包覆自身，回合內減傷並反灼敵人。",
      "costMP": 11,
      "useContexts": [
        "battle"
      ],
      "evolveTo": [
        "blazing_aegis"
      ],
      "evolveRequirements": {
        "blazing_aegis": {
          "level": 8,
          "stats": {
            "INT": 12,
            "VIT": 12
          }
        }
      },
      "growthHint": "偏生存的法術分支。",
      "school": "magic"
    },
    "flare_lance": {
      "id": "flare_lance",
      "name": "熾炎貫槍",
      "type": "active",
      "category": "魔法／上位",
      "tier": "high",
      "maxProficiency": 1000,
      "description": "高火力的貫穿型法術。",
      "costMP": 17,
      "useContexts": [
        "battle"
      ],
      "evolveTo": [],
      "evolveRequirements": {},
      "growthHint": "Beta 版先做為高位終點。",
      "school": "magic"
    },
    "blazing_aegis": {
      "id": "blazing_aegis",
      "name": "灼焰壁障",
      "type": "active",
      "category": "魔法／上位",
      "tier": "high",
      "maxProficiency": 1000,
      "description": "強化自身護罩並灼燒靠近敵人。",
      "costMP": 16,
      "useContexts": [
        "battle"
      ],
      "evolveTo": [],
      "evolveRequirements": {},
      "growthHint": "Beta 版先做為高位終點。",
      "school": "magic"
    },
    "first_aid": {
      "id": "first_aid",
      "name": "急救",
      "type": "active",
      "category": "生活／支援",
      "tier": "lower",
      "maxProficiency": 1000,
      "description": "以布條與藥草進行簡易治療。探索與戰後皆可使用。",
      "costSP": 4,
      "useContexts": [
        "menu",
        "battle"
      ],
      "evolveTo": [
        "field_surgery"
      ],
      "evolveRequirements": {
        "field_surgery": {
          "level": 5,
          "stats": {
            "VIT": 9,
            "INT": 8
          }
        }
      },
      "growthHint": "治療成功時提升熟練度。",
      "school": "support",
      "learnHint": "休息、包紮、使用治療物資時會累積習得熟練，達門檻後學會【急救】。",
      "learnSources": {
        "medical_use": {
          "baseChance": 20,
          "perAttempt": 7,
          "maxChance": 92,
          "mainStat": "INT",
          "mainStatWeight": 2,
          "subStat": "DEX",
          "subStatWeight": 2,
          "startProficiency": 90,
          "sourceLabel": "醫療處置",
          "basePractice": 15,
          "successBonus": 10,
          "critBonus": 6,
          "highRiskBonus": 5
        },
        "field_rest": {
          "baseChance": 14,
          "perAttempt": 5,
          "maxChance": 84,
          "mainStat": "INT",
          "mainStatWeight": 2,
          "subStat": "VIT",
          "subStatWeight": 1,
          "startProficiency": 70,
          "sourceLabel": "休整與照護",
          "basePractice": 10,
          "successBonus": 8,
          "critBonus": 6,
          "highRiskBonus": 5
        }
      },
      "learnThreshold": 110,
      "practiceSources": {
        "medical_use": {
          "baseChance": 20,
          "perAttempt": 7,
          "maxChance": 92,
          "mainStat": "INT",
          "mainStatWeight": 2,
          "subStat": "DEX",
          "subStatWeight": 2,
          "startProficiency": 90,
          "sourceLabel": "醫療處置",
          "basePractice": 15,
          "successBonus": 10,
          "critBonus": 6,
          "highRiskBonus": 5
        },
        "field_rest": {
          "baseChance": 14,
          "perAttempt": 5,
          "maxChance": 84,
          "mainStat": "INT",
          "mainStatWeight": 2,
          "subStat": "VIT",
          "subStatWeight": 1,
          "startProficiency": 70,
          "sourceLabel": "休整與照護",
          "basePractice": 10,
          "successBonus": 8,
          "critBonus": 6,
          "highRiskBonus": 5
        }
      },
      "learnMode": "practice"
    },
    "field_surgery": {
      "id": "field_surgery",
      "name": "戰地療護",
      "type": "active",
      "category": "生活／支援",
      "tier": "mid",
      "maxProficiency": 1000,
      "description": "更有效率的中量治療技能。",
      "costSP": 7,
      "useContexts": [
        "menu",
        "battle"
      ],
      "evolveTo": [],
      "evolveRequirements": {},
      "growthHint": "Beta 版先做為中位終點。",
      "school": "support"
    },
    "tough_body": {
      "id": "tough_body",
      "name": "堅韌體魄",
      "type": "passive",
      "category": "體能／下位",
      "tier": "lower",
      "maxProficiency": 1000,
      "description": "最大生命 +15%，並提高環境耐受。",
      "useContexts": [],
      "evolveTo": [
        "iron_flesh"
      ],
      "evolveRequirements": {
        "iron_flesh": {
          "level": 5,
          "stats": {
            "VIT": 10
          }
        }
      },
      "growthHint": "承受傷害或完成長途旅行時增加熟練度。",
      "school": "passive",
      "learnHint": "承受傷害、熬過艱苦旅程與休息恢復時會累積習得熟練，達門檻後學會被動【鍛體】。",
      "learnSources": {
        "take_damage": {
          "baseChance": 18,
          "perAttempt": 6,
          "maxChance": 90,
          "mainStat": "VIT",
          "mainStatWeight": 3,
          "subStat": "STR",
          "subStatWeight": 1,
          "startProficiency": 100,
          "sourceLabel": "承受傷害",
          "basePractice": 13,
          "successBonus": 9,
          "critBonus": 6,
          "highRiskBonus": 5
        },
        "field_rest": {
          "baseChance": 10,
          "perAttempt": 4,
          "maxChance": 75,
          "mainStat": "VIT",
          "mainStatWeight": 2,
          "subStat": "STR",
          "subStatWeight": 1,
          "startProficiency": 80,
          "sourceLabel": "休息恢復",
          "basePractice": 10,
          "successBonus": 7,
          "critBonus": 6,
          "highRiskBonus": 5
        }
      },
      "learnThreshold": 125,
      "practiceSources": {
        "take_damage": {
          "baseChance": 18,
          "perAttempt": 6,
          "maxChance": 90,
          "mainStat": "VIT",
          "mainStatWeight": 3,
          "subStat": "STR",
          "subStatWeight": 1,
          "startProficiency": 100,
          "sourceLabel": "承受傷害",
          "basePractice": 13,
          "successBonus": 9,
          "critBonus": 6,
          "highRiskBonus": 5
        },
        "field_rest": {
          "baseChance": 10,
          "perAttempt": 4,
          "maxChance": 75,
          "mainStat": "VIT",
          "mainStatWeight": 2,
          "subStat": "STR",
          "subStatWeight": 1,
          "startProficiency": 80,
          "sourceLabel": "休息恢復",
          "basePractice": 10,
          "successBonus": 7,
          "critBonus": 6,
          "highRiskBonus": 5
        }
      },
      "learnMode": "practice"
    },
    "iron_flesh": {
      "id": "iron_flesh",
      "name": "鋼鐵血肉",
      "type": "passive",
      "category": "體能／中位",
      "tier": "mid",
      "maxProficiency": 1000,
      "description": "最大生命 +24%，物理減傷 +8%。",
      "useContexts": [],
      "evolveTo": [],
      "evolveRequirements": {},
      "growthHint": "Beta 版先做為中位終點。",
      "school": "passive"
    },
    "monster_anatomy": {
      "id": "monster_anatomy",
      "name": "魔物解剖",
      "type": "active",
      "category": "生活／支援",
      "tier": "lower",
      "maxProficiency": 1000,
      "description": "戰後處理解剖魔物屍體，熟練度越高，越容易取得高品質戰利品與稀有素材。",
      "useContexts": [],
      "evolveTo": [
        "precise_anatomy",
        "essence_extraction"
      ],
      "evolveRequirements": {
        "precise_anatomy": {
          "level": 5,
          "stats": {
            "DEX": 9,
            "INT": 8
          }
        },
        "essence_extraction": {
          "level": 5,
          "stats": {
            "INT": 9,
            "LUK": 8
          }
        }
      },
      "growthHint": "成功解剖、取得高品質素材時增加熟練度。",
      "school": "support",
      "learnHint": "處理生物型魔物屍體、觀察部位與粗略解剖時會累積習得熟練，達門檻後學會【魔物解剖】。",
      "learnSources": {
        "biological_hunt": {
          "baseChance": 12,
          "perAttempt": 5,
          "maxChance": 80,
          "mainStat": "DEX",
          "mainStatWeight": 2,
          "subStat": "INT",
          "subStatWeight": 2,
          "startProficiency": 80,
          "sourceLabel": "生物型魔物狩獵",
          "basePractice": 10,
          "successBonus": 8,
          "critBonus": 6,
          "highRiskBonus": 5
        },
        "anatomy_attempt": {
          "baseChance": 25,
          "perAttempt": 8,
          "maxChance": 95,
          "mainStat": "DEX",
          "mainStatWeight": 3,
          "subStat": "INT",
          "subStatWeight": 2,
          "startProficiency": 120,
          "sourceLabel": "實際解剖",
          "basePractice": 18,
          "successBonus": 11,
          "critBonus": 6,
          "highRiskBonus": 5
        }
      },
      "learnThreshold": 115,
      "practiceSources": {
        "biological_hunt": {
          "baseChance": 12,
          "perAttempt": 5,
          "maxChance": 80,
          "mainStat": "DEX",
          "mainStatWeight": 2,
          "subStat": "INT",
          "subStatWeight": 2,
          "startProficiency": 80,
          "sourceLabel": "生物型魔物狩獵",
          "basePractice": 10,
          "successBonus": 8,
          "critBonus": 6,
          "highRiskBonus": 5
        },
        "anatomy_attempt": {
          "baseChance": 25,
          "perAttempt": 8,
          "maxChance": 95,
          "mainStat": "DEX",
          "mainStatWeight": 3,
          "subStat": "INT",
          "subStatWeight": 2,
          "startProficiency": 120,
          "sourceLabel": "實際解剖",
          "basePractice": 18,
          "successBonus": 11,
          "critBonus": 6,
          "highRiskBonus": 5
        }
      },
      "learnMode": "practice"
    },
    "precise_anatomy": {
      "id": "precise_anatomy",
      "name": "精密解剖",
      "type": "active",
      "category": "生活／支援",
      "tier": "mid",
      "maxProficiency": 1000,
      "description": "改善切割與部位保存，提升完整素材與高品質皮膜的取得率。",
      "useContexts": [],
      "evolveTo": [],
      "evolveRequirements": {},
      "growthHint": "偏向 DEX / INT 的解剖進階分支。",
      "school": "support"
    },
    "essence_extraction": {
      "id": "essence_extraction",
      "name": "精髓萃取",
      "type": "active",
      "category": "生活／支援",
      "tier": "mid",
      "maxProficiency": 1000,
      "description": "專攻魔力器官與稀有腺體，提升稀有素材與高價值器官的掉率。",
      "useContexts": [],
      "evolveTo": [],
      "evolveRequirements": {},
      "growthHint": "偏向 INT / LUK 的魔物素材分支。",
      "school": "support"
    },
    "traveler_instinct": {
      "id": "traveler_instinct",
      "name": "旅者直覺",
      "type": "passive",
      "category": "探索／下位",
      "tier": "lower",
      "maxProficiency": 1000,
      "description": "探索檢定 +10，稀有事件發現率小幅提升。",
      "useContexts": [],
      "evolveTo": [
        "relic_sense",
        "pathfinder_eye"
      ],
      "evolveRequirements": {
        "relic_sense": {
          "level": 5,
          "stats": {
            "LUK": 9,
            "INT": 8
          }
        },
        "pathfinder_eye": {
          "level": 5,
          "stats": {
            "AGI": 9,
            "DEX": 8
          }
        }
      },
      "growthHint": "旅行、發現地點、成功探索時增加熟練度。",
      "school": "passive",
      "learnHint": "旅行、採集與探索危險區域時會累積習得熟練，達門檻後學會【旅者直覺】。",
      "learnSources": {
        "travel_move": {
          "baseChance": 14,
          "perAttempt": 5,
          "maxChance": 88,
          "mainStat": "AGI",
          "mainStatWeight": 2,
          "subStat": "LUK",
          "subStatWeight": 2,
          "startProficiency": 90,
          "sourceLabel": "長途旅行",
          "basePractice": 10,
          "successBonus": 8,
          "critBonus": 6,
          "highRiskBonus": 5
        },
        "forage": {
          "baseChance": 18,
          "perAttempt": 6,
          "maxChance": 90,
          "mainStat": "DEX",
          "mainStatWeight": 2,
          "subStat": "LUK",
          "subStatWeight": 2,
          "startProficiency": 110,
          "sourceLabel": "野外採集",
          "basePractice": 13,
          "successBonus": 9,
          "critBonus": 6,
          "highRiskBonus": 5
        },
        "danger_explore": {
          "baseChance": 22,
          "perAttempt": 7,
          "maxChance": 93,
          "mainStat": "AGI",
          "mainStatWeight": 2,
          "subStat": "LUK",
          "subStatWeight": 2,
          "startProficiency": 120,
          "sourceLabel": "危險探索",
          "basePractice": 16,
          "successBonus": 10,
          "critBonus": 6,
          "highRiskBonus": 5
        }
      },
      "learnThreshold": 120,
      "practiceSources": {
        "travel_move": {
          "baseChance": 14,
          "perAttempt": 5,
          "maxChance": 88,
          "mainStat": "AGI",
          "mainStatWeight": 2,
          "subStat": "LUK",
          "subStatWeight": 2,
          "startProficiency": 90,
          "sourceLabel": "長途旅行",
          "basePractice": 10,
          "successBonus": 8,
          "critBonus": 6,
          "highRiskBonus": 5
        },
        "forage": {
          "baseChance": 18,
          "perAttempt": 6,
          "maxChance": 90,
          "mainStat": "DEX",
          "mainStatWeight": 2,
          "subStat": "LUK",
          "subStatWeight": 2,
          "startProficiency": 110,
          "sourceLabel": "野外採集",
          "basePractice": 13,
          "successBonus": 9,
          "critBonus": 6,
          "highRiskBonus": 5
        },
        "danger_explore": {
          "baseChance": 22,
          "perAttempt": 7,
          "maxChance": 93,
          "mainStat": "AGI",
          "mainStatWeight": 2,
          "subStat": "LUK",
          "subStatWeight": 2,
          "startProficiency": 120,
          "sourceLabel": "危險探索",
          "basePractice": 16,
          "successBonus": 10,
          "critBonus": 6,
          "highRiskBonus": 5
        }
      },
      "learnMode": "practice"
    },
    "relic_sense": {
      "id": "relic_sense",
      "name": "遺物感知",
      "type": "passive",
      "category": "探索／中位",
      "tier": "mid",
      "maxProficiency": 1000,
      "description": "搜尋與古代遺跡判定 +16，稀有掉落率提高。",
      "useContexts": [],
      "evolveTo": [],
      "evolveRequirements": {},
      "growthHint": "Beta 版先做為中位終點。",
      "school": "passive"
    },
    "pathfinder_eye": {
      "id": "pathfinder_eye",
      "name": "踏途者之眼",
      "type": "passive",
      "category": "探索／中位",
      "tier": "mid",
      "maxProficiency": 1000,
      "description": "移動時體力消耗降低，閃避與先制提升。",
      "useContexts": [],
      "evolveTo": [],
      "evolveRequirements": {},
      "growthHint": "Beta 版先做為中位終點。",
      "school": "passive"
    }
  },
  "enemies": {
    "wolf": {
      "id": "wolf",
      "name": "灰林狼",
      "maxHp": 52,
      "atk": 11,
      "def": 4,
      "matk": 0,
      "mdef": 2,
      "agi": 8,
      "exp": 22,
      "gold": 12,
      "drops": [
        {
          "id": "ash_herb",
          "chance": 0.25,
          "qty": 1
        }
      ],
      "intro": "灌木間傳來低沉喘息，一匹飢餓灰狼撲了過來。",
      "dissection": {
        "difficulty": 48,
        "spCost": 5,
        "loot": {
          "poor": [
            {
              "id": "wolf_pelt_torn",
              "qty": 1,
              "chance": 1
            },
            {
              "id": "beast_meat",
              "qty": 1,
              "chance": 0.45
            }
          ],
          "normal": [
            {
              "id": "wolf_pelt",
              "qty": 1,
              "chance": 1
            },
            {
              "id": "wolf_fang",
              "qty": 1,
              "chance": 0.58
            },
            {
              "id": "beast_meat",
              "qty": 1,
              "chance": 0.72
            }
          ],
          "fine": [
            {
              "id": "wolf_pelt_fine",
              "qty": 1,
              "chance": 1
            },
            {
              "id": "wolf_fang",
              "qty": 2,
              "chance": 0.82
            },
            {
              "id": "beast_meat",
              "qty": 2,
              "chance": 0.88
            }
          ],
          "rare": [
            {
              "id": "wolf_pelt_fine",
              "qty": 1,
              "chance": 1
            },
            {
              "id": "wolf_fang",
              "qty": 2,
              "chance": 1
            },
            {
              "id": "beast_meat",
              "qty": 2,
              "chance": 1
            }
          ]
        }
      },
      "bodyType": "biological",
      "monsterClass": "monster",
      "ac": 14,
      "note": "生物型魔物。討伐後可解剖皮膜、牙齒與肉塊；史萊姆可吞食殘骸汲取本能。",
      "devourRewards": [
        {
          "skillId": "tough_body",
          "practice": 16
        },
        {
          "skillId": "traveler_instinct",
          "practice": 12
        },
        {
          "skillId": "slash",
          "practice": 10
        }
      ],
      "intentProfiles": [
        {
          "id": "lunge",
          "telegraph": "灰林狼壓低前肢、喉間發出低鳴，下一瞬間很像會直接撲咬過來。",
          "style": "physical",
          "preferredReactions": [
            "guard",
            "dodge"
          ],
          "damageMult": 1.0,
          "hitBonus": 6
        },
        {
          "id": "circle",
          "telegraph": "灰林狼繞到側面，像是在等你露出破綻後再撕咬。",
          "style": "physical",
          "preferredReactions": [
            "dodge",
            "counter"
          ],
          "damageMult": 0.9,
          "hitBonus": 3
        },
        {
          "id": "feint",
          "telegraph": "灰林狼短暫退開，尾巴壓低，像是假動作後接近身撕扯。",
          "style": "physical",
          "preferredReactions": [
            "guard",
            "counter"
          ],
          "damageMult": 0.85,
          "hitBonus": 1
        }
      ]
    },
    "chapel_wraith": {
      "id": "chapel_wraith",
      "name": "餘燼幽影",
      "maxHp": 68,
      "atk": 13,
      "def": 5,
      "matk": 10,
      "mdef": 6,
      "agi": 9,
      "exp": 30,
      "gold": 18,
      "drops": [
        {
          "id": "chapel_sigil",
          "chance": 1,
          "qty": 1
        }
      ],
      "intro": "祭壇下升起灰白陰霧，失落靈體在鐘聲殘響中成形。",
      "bodyType": "spirit",
      "monsterClass": "aberration",
      "ac": 15,
      "note": "靈體敵人，沒有可供解剖的實體部位。",
      "devourRewards": [],
      "intentProfiles": [
        {
          "id": "hex",
          "telegraph": "餘燼幽影把灰霧聚成一束，像要把咒力直直壓到你身上。",
          "style": "magic",
          "preferredReactions": [
            "interrupt",
            "dodge"
          ],
          "damageMult": 1.05,
          "hitBonus": 4
        },
        {
          "id": "drift_slash",
          "telegraph": "幽影的輪廓突然變薄，像是要從側面掠過並劃開你。",
          "style": "physical",
          "preferredReactions": [
            "guard",
            "dodge"
          ],
          "damageMult": 0.95,
          "hitBonus": 3
        }
      ]
    },
    "arcane_wisp": {
      "id": "arcane_wisp",
      "name": "弧光飄靈",
      "maxHp": 74,
      "atk": 10,
      "def": 4,
      "matk": 14,
      "mdef": 8,
      "agi": 11,
      "exp": 34,
      "gold": 20,
      "drops": [
        {
          "id": "tower_shard",
          "chance": 1,
          "qty": 1
        }
      ],
      "intro": "斷裂的魔法陣被你觸動，漂浮弧光聚成躁動靈體。",
      "bodyType": "spirit",
      "monsterClass": "aberration",
      "ac": 15,
      "note": "奧術性靈體，不產生可解剖屍體。",
      "devourRewards": [],
      "intentProfiles": [
        {
          "id": "arc_bolt",
          "telegraph": "弧光飄靈的電芒開始集中，下一擊多半是直接射來的奧術束。",
          "style": "magic",
          "preferredReactions": [
            "interrupt",
            "dodge"
          ],
          "damageMult": 1.1,
          "hitBonus": 5
        },
        {
          "id": "flash_burst",
          "telegraph": "弧光飄靈忽明忽暗，像是要先閃你視線再貼近炸開。",
          "style": "magic",
          "preferredReactions": [
            "guard",
            "interrupt"
          ],
          "damageMult": 0.95,
          "hitBonus": 2
        }
      ]
    },
    "rift_beast": {
      "id": "rift_beast",
      "name": "裂隙獸",
      "maxHp": 126,
      "atk": 20,
      "def": 9,
      "matk": 18,
      "mdef": 9,
      "agi": 12,
      "exp": 90,
      "gold": 45,
      "drops": [
        {
          "id": "rift_core",
          "chance": 1,
          "qty": 1
        }
      ],
      "intro": "灰燼裂隙核心中，一頭扭曲獸影撕開霧幕，向你咆哮。",
      "dissection": {
        "difficulty": 92,
        "spCost": 10,
        "loot": {
          "poor": [
            {
              "id": "rift_hide_frayed",
              "qty": 1,
              "chance": 1
            },
            {
              "id": "rift_gland",
              "qty": 1,
              "chance": 0.28
            }
          ],
          "normal": [
            {
              "id": "rift_hide_dense",
              "qty": 1,
              "chance": 0.9
            },
            {
              "id": "rift_gland",
              "qty": 1,
              "chance": 0.55
            },
            {
              "id": "rift_crystal",
              "qty": 1,
              "chance": 0.26
            }
          ],
          "fine": [
            {
              "id": "rift_hide_dense",
              "qty": 1,
              "chance": 1
            },
            {
              "id": "rift_gland",
              "qty": 1,
              "chance": 0.88
            },
            {
              "id": "rift_crystal",
              "qty": 1,
              "chance": 0.72
            }
          ],
          "rare": [
            {
              "id": "rift_hide_dense",
              "qty": 2,
              "chance": 1
            },
            {
              "id": "rift_gland",
              "qty": 1,
              "chance": 1
            },
            {
              "id": "rift_crystal",
              "qty": 1,
              "chance": 0.92
            },
            {
              "id": "rift_core_gland",
              "qty": 1,
              "chance": 0.46
            }
          ]
        }
      },
      "bodyType": "biological",
      "monsterClass": "monster",
      "ac": 18,
      "note": "裂隙污染的生物型魔物，可解剖，也可被史萊姆吞食以吸收異界殘響。",
      "devourRewards": [
        {
          "skillId": "monster_anatomy",
          "practice": 18
        },
        {
          "skillId": "spark",
          "practice": 14
        },
        {
          "skillId": "tough_body",
          "practice": 12
        }
      ],
      "intentProfiles": [
        {
          "id": "crush",
          "telegraph": "裂隙獸抬起前肢，龐大的身影正把力道往你這邊壓過來。",
          "style": "physical",
          "preferredReactions": [
            "guard",
            "dodge"
          ],
          "damageMult": 1.15,
          "hitBonus": 5
        },
        {
          "id": "void_howl",
          "telegraph": "裂隙獸胸腔鼓起，扭曲的吼聲正要噴發出來。",
          "style": "magic",
          "preferredReactions": [
            "interrupt",
            "guard"
          ],
          "damageMult": 1.0,
          "hitBonus": 4
        },
        {
          "id": "rush",
          "telegraph": "裂隙獸前傾蓄力，像是下一拍就會猛衝。",
          "style": "physical",
          "preferredReactions": [
            "dodge",
            "counter"
          ],
          "damageMult": 1.0,
          "hitBonus": 6
        }
      ]
    }
  },
  "locations": {
    "emberport": {
      "id": "emberport",
      "name": "餘燼港",
      "summary": "霧與鹽味交纏的邊境港鎮，冒險者、公會與異界流民混居。",
      "unlocked": true,
      "actions": [
        {
          "id": "guild_report",
          "label": "查看冒險者公會委託板",
          "desc": "選擇接取委託、交付指定素材，並整理主線情報。"
        },
        {
          "id": "rest_inn",
          "label": "在旅店休息",
          "desc": "花費少量金幣恢復生命、體力與魔力。"
        },
        {
          "id": "open_market",
          "label": "前往市場",
          "desc": "向商人購買補給，也可出售素材與戰利品。"
        },
        {
          "id": "cook_meal",
          "label": "烹煮熱食",
          "desc": "消耗獸肉或口糧恢復飽食度，並培養廚師副職。"
        },
        {
          "id": "travel_greenwood",
          "label": "前往綠蔭林地",
          "desc": "邊境林地，適合採集、狩獵與低階戰鬥。"
        },
        {
          "id": "travel_chapel",
          "label": "前往荒鐘禮拜堂",
          "desc": "殘破宗教遺址，潛藏舊聖印與幽影。"
        },
        {
          "id": "travel_tower",
          "label": "前往斷塔遺蹟",
          "desc": "古老法師塔殘基，能取得裂隙相關線索。"
        },
        {
          "id": "travel_rift",
          "label": "前往裂隙沼原",
          "desc": "灰霧滲出的危險區域，需先完成兩條主線線索。",
          "requires": [
            "rift_path_unlocked"
          ]
        }
      ]
    },
    "greenwood": {
      "id": "greenwood",
      "name": "綠蔭林地",
      "summary": "林冠繁密、潮氣濃重，偶有公會委託者在此採藥與巡查。",
      "unlocked": true,
      "actions": [
        {
          "id": "forage_herb",
          "label": "搜尋灰葉草",
          "desc": "消耗體力進行採集與探索判定。"
        },
        {
          "id": "hunt_wolf",
          "label": "追蹤灰林狼",
          "desc": "進行一場基礎戰鬥。"
        },
        {
          "id": "hidden_cache",
          "label": "搜尋林中藏匣",
          "desc": "以 DEX / INT 與被動技能進行探索。"
        },
        {
          "id": "travel_emberport",
          "label": "返回餘燼港",
          "desc": "沿著潮濕土路回到港鎮。"
        }
      ]
    },
    "chapel": {
      "id": "chapel",
      "name": "荒鐘禮拜堂",
      "summary": "失去教會維護的石造禮拜堂，鐘樓傾頹，祭壇仍殘留異光。",
      "unlocked": true,
      "actions": [
        {
          "id": "chapel_investigate",
          "label": "調查殘破祭壇",
          "desc": "以 INT / LUK 進行遺跡判定，有機會觸發戰鬥與主線進度。"
        },
        {
          "id": "chapel_pray_rest",
          "label": "在長椅短暫整備",
          "desc": "小幅恢復魔力與體力。"
        },
        {
          "id": "travel_emberport",
          "label": "返回餘燼港",
          "desc": "穿過舊石道回港。"
        }
      ]
    },
    "tower": {
      "id": "tower",
      "name": "斷塔遺蹟",
      "summary": "半毀的法師塔殘址仍有奧術流轉，碎石中散落舊式符文。",
      "unlocked": true,
      "actions": [
        {
          "id": "tower_study",
          "label": "解析塔底符文",
          "desc": "以 INT / DEX 進行知識判定，可能觸發戰鬥與主線進度。"
        },
        {
          "id": "tower_salvage",
          "label": "翻找殘留物資",
          "desc": "有機會取得以太藥滴與金幣。"
        },
        {
          "id": "travel_emberport",
          "label": "返回餘燼港",
          "desc": "沿風蝕石道回港。"
        }
      ]
    },
    "riftmoor": {
      "id": "riftmoor",
      "name": "裂隙沼原",
      "summary": "灰霧籠罩的濕地，裂隙像脈動傷痕般嵌在大地深處。",
      "unlocked": false,
      "actions": [
        {
          "id": "rift_descend",
          "label": "深入灰燼裂隙",
          "desc": "Beta v1 的主線終點戰。"
        },
        {
          "id": "rift_harvest",
          "label": "採集裂隙結晶",
          "desc": "高風險探索，可能受傷但能獲得獎勵。"
        },
        {
          "id": "travel_emberport",
          "label": "返回餘燼港",
          "desc": "在灰霧完全收束前撤退。"
        }
      ]
    }
  },
  "periods": [
    "清晨",
    "白晝",
    "黃昏",
    "深夜"
  ],
  "weathers": [
    "晴朗",
    "陰霧",
    "細雨",
    "強風"
  ],
  "npcs": {
    "guild_master_lyra": {
      "id": "guild_master_lyra",
      "name": "萊菈",
      "title": "冒險者公會會長",
      "faction": "餘燼港冒險者公會",
      "homeLocation": "emberport",
      "role": "quest_giver",
      "summary": "負責統籌餘燼港委託與裂隙情報的冷靜女會長。"
    },
    "innkeeper_bram": {
      "id": "innkeeper_bram",
      "name": "布蘭姆",
      "title": "港鎮旅店老闆",
      "faction": "餘燼港",
      "homeLocation": "emberport",
      "role": "service",
      "summary": "掌管港鎮旅店與補給情報，對異界來客觀察入微。"
    },
    "herbalist_serin": {
      "id": "herbalist_serin",
      "name": "瑟琳",
      "title": "林地草藥師",
      "faction": "冒險者公會外聘",
      "homeLocation": "greenwood",
      "role": "gathering",
      "summary": "熟悉綠蔭林地藥草分佈，長期與公會合作。"
    },
    "chapel_echo": {
      "id": "chapel_echo",
      "name": "鐘聲殘影",
      "title": "禮拜堂殘留意志",
      "faction": "失落教會",
      "homeLocation": "chapel",
      "role": "lore",
      "summary": "依附在荒鐘禮拜堂的殘響意識，知曉部分裂隙異變歷史。"
    },
    "tower_shade": {
      "id": "tower_shade",
      "name": "塔底抄錄者",
      "title": "奧術殘影",
      "faction": "舊法師塔",
      "homeLocation": "tower",
      "role": "lore",
      "summary": "徘徊於斷塔遺蹟的奧術殘影，保存破碎的符文記錄。"
    }
  },
  "guildCommissions": {
    "guild_herb_supply": {
      "id": "guild_herb_supply",
      "title": "委託｜灰葉草補給單",
      "commissionType": "gather",
      "rank": "一般",
      "issuer": "餘燼港冒險者公會",
      "locationId": "emberport",
      "summary": "公會補給室短缺常備草材，請帶回 3 份灰葉草。",
      "objectiveText": "交付灰葉草 ×3。",
      "requiredItems": [
        {
          "itemId": "ash_herb",
          "qty": 3,
          "label": "灰葉草"
        }
      ],
      "reward": {
        "gold": 42,
        "exp": 38,
        "items": [
          {
            "id": "potion",
            "qty": 1
          }
        ]
      },
      "unlockFlags": [],
      "repeatable": false
    },
    "guild_wolf_fang": {
      "id": "guild_wolf_fang",
      "title": "委託｜灰林狼討伐與牙齒採取",
      "commissionType": "hunt",
      "rank": "銅級",
      "issuer": "餘燼港冒險者公會",
      "locationId": "emberport",
      "summary": "綠蔭林地近郊的灰林狼開始襲擊採藥者。請完成討伐，並從屍體上解剖採取狼牙。",
      "objectiveText": "討伐灰林狼 1 隻，並交付狼牙 ×2。",
      "targetEnemyId": "wolf",
      "requiredKills": 1,
      "requiredParts": [
        {
          "partId": "wolf_fangs",
          "itemId": "wolf_fang",
          "qty": 2,
          "label": "狼牙"
        }
      ],
      "reward": {
        "gold": 58,
        "exp": 44,
        "items": [
          {
            "id": "ration",
            "qty": 2
          }
        ]
      },
      "unlockFlags": [],
      "repeatable": false
    },
    "guild_rift_gland": {
      "id": "guild_rift_gland",
      "title": "委託｜裂隙獸腺體回收",
      "commissionType": "hunt",
      "rank": "鐵級",
      "issuer": "餘燼港冒險者公會",
      "locationId": "emberport",
      "summary": "研究班需要裂隙獸的活性腺體。請在裂隙沼原完成討伐，並解剖取得 1 份變質裂腺。",
      "objectiveText": "討伐裂隙獸 1 隻，並交付變質裂腺 ×1。",
      "targetEnemyId": "rift_beast",
      "requiredKills": 1,
      "requiredParts": [
        {
          "partId": "rift_gland",
          "itemId": "rift_gland",
          "qty": 1,
          "label": "變質裂腺"
        }
      ],
      "reward": {
        "gold": 120,
        "exp": 88,
        "items": [
          {
            "id": "ether",
            "qty": 2
          }
        ]
      },
      "unlockFlags": [
        "rift_path_unlocked"
      ],
      "repeatable": false
    }
  },
  "anatomyParts": {
    "wolf_hide": {
      "id": "wolf_hide",
      "enemyId": "wolf",
      "label": "剝取皮膜",
      "slot": "hide",
      "summary": "沿著切口完整剝取狼皮。",
      "dc": 11,
      "spCost": 3,
      "main": "DEX",
      "sub": "INT",
      "loot": {
        "poor": [
          {
            "id": "wolf_pelt_torn",
            "qty": 1,
            "chance": 1
          }
        ],
        "normal": [
          {
            "id": "wolf_pelt",
            "qty": 1,
            "chance": 1
          }
        ],
        "fine": [
          {
            "id": "wolf_pelt_fine",
            "qty": 1,
            "chance": 1
          }
        ],
        "rare": [
          {
            "id": "wolf_pelt_fine",
            "qty": 1,
            "chance": 1
          },
          {
            "id": "wolf_pelt",
            "qty": 1,
            "chance": 0.5
          }
        ]
      }
    },
    "wolf_fangs": {
      "id": "wolf_fangs",
      "enemyId": "wolf",
      "label": "拔取狼牙",
      "slot": "fang",
      "summary": "保留齒根完整，採取可交付的尖牙。",
      "dc": 10,
      "spCost": 2,
      "main": "DEX",
      "sub": "LUK",
      "loot": {
        "poor": [
          {
            "id": "wolf_fang",
            "qty": 1,
            "chance": 0.45
          }
        ],
        "normal": [
          {
            "id": "wolf_fang",
            "qty": 1,
            "chance": 1
          }
        ],
        "fine": [
          {
            "id": "wolf_fang",
            "qty": 2,
            "chance": 1
          }
        ],
        "rare": [
          {
            "id": "wolf_fang",
            "qty": 3,
            "chance": 1
          }
        ]
      }
    },
    "wolf_meat": {
      "id": "wolf_meat",
      "enemyId": "wolf",
      "label": "分離可食肉塊",
      "slot": "meat",
      "summary": "切下仍可利用的鮮肉。",
      "dc": 9,
      "spCost": 2,
      "main": "VIT",
      "sub": "DEX",
      "loot": {
        "poor": [
          {
            "id": "beast_meat",
            "qty": 1,
            "chance": 0.35
          }
        ],
        "normal": [
          {
            "id": "beast_meat",
            "qty": 1,
            "chance": 1
          }
        ],
        "fine": [
          {
            "id": "beast_meat",
            "qty": 2,
            "chance": 1
          }
        ],
        "rare": [
          {
            "id": "beast_meat",
            "qty": 3,
            "chance": 1
          }
        ]
      }
    },
    "rift_hide": {
      "id": "rift_hide",
      "enemyId": "rift_beast",
      "label": "剝離異界皮膜",
      "slot": "hide",
      "summary": "採取致密而帶有魔導性的外皮。",
      "dc": 15,
      "spCost": 4,
      "main": "DEX",
      "sub": "INT",
      "loot": {
        "poor": [
          {
            "id": "rift_hide_frayed",
            "qty": 1,
            "chance": 1
          }
        ],
        "normal": [
          {
            "id": "rift_hide_dense",
            "qty": 1,
            "chance": 0.8
          }
        ],
        "fine": [
          {
            "id": "rift_hide_dense",
            "qty": 1,
            "chance": 1
          }
        ],
        "rare": [
          {
            "id": "rift_hide_dense",
            "qty": 2,
            "chance": 1
          }
        ]
      }
    },
    "rift_gland": {
      "id": "rift_gland",
      "enemyId": "rift_beast",
      "label": "切取變質裂腺",
      "slot": "gland",
      "summary": "需要穩定刀口與判讀器官位置。",
      "dc": 16,
      "spCost": 4,
      "main": "INT",
      "sub": "DEX",
      "loot": {
        "poor": [
          {
            "id": "rift_gland",
            "qty": 1,
            "chance": 0.2
          }
        ],
        "normal": [
          {
            "id": "rift_gland",
            "qty": 1,
            "chance": 0.7
          }
        ],
        "fine": [
          {
            "id": "rift_gland",
            "qty": 1,
            "chance": 1
          }
        ],
        "rare": [
          {
            "id": "rift_gland",
            "qty": 1,
            "chance": 1
          },
          {
            "id": "rift_core_gland",
            "qty": 1,
            "chance": 0.25
          }
        ]
      }
    },
    "rift_crystal": {
      "id": "rift_crystal",
      "enemyId": "rift_beast",
      "label": "剔取穩定裂晶",
      "slot": "crystal",
      "summary": "從骨縫與皮膜下方挖出穩定晶簇。",
      "dc": 14,
      "spCost": 3,
      "main": "INT",
      "sub": "LUK",
      "loot": {
        "poor": [
          {
            "id": "rift_crystal",
            "qty": 1,
            "chance": 0.2
          }
        ],
        "normal": [
          {
            "id": "rift_crystal",
            "qty": 1,
            "chance": 0.6
          }
        ],
        "fine": [
          {
            "id": "rift_crystal",
            "qty": 1,
            "chance": 1
          }
        ],
        "rare": [
          {
            "id": "rift_crystal",
            "qty": 2,
            "chance": 1
          }
        ]
      }
    },
    "rift_core_sac": {
      "id": "rift_core_sac",
      "enemyId": "rift_beast",
      "label": "搜尋核囊",
      "slot": "core",
      "summary": "高難度部位，只有熟練解剖者才有把握保留。",
      "dc": 18,
      "spCost": 5,
      "main": "INT",
      "sub": "LUK",
      "loot": {
        "poor": [],
        "normal": [
          {
            "id": "rift_core_gland",
            "qty": 1,
            "chance": 0.18
          }
        ],
        "fine": [
          {
            "id": "rift_core_gland",
            "qty": 1,
            "chance": 0.45
          }
        ],
        "rare": [
          {
            "id": "rift_core_gland",
            "qty": 1,
            "chance": 1
          }
        ]
      }
    }
  },
  "jobs": {
    "tailor": {
      "id": "tailor",
      "name": "裁縫",
      "family": "life",
      "summary": "擅長布料、皮革與縫補處理，適合利用魔物皮膜與急救技巧。",
      "unlockHint": "取得皮革類素材 2 份後可就職。",
      "learnCostGold": 30,
      "activityType": "hideHarvested",
      "rankThresholds": [
        0,
        80,
        180,
        320
      ],
      "bonuses": [
        "解剖 hide 類部位時額外獲得品質修正",
        "使用急救類技能時提高恢復量"
      ]
    },
    "blacksmith": {
      "id": "blacksmith",
      "name": "鐵匠",
      "family": "life",
      "summary": "熟悉金屬、鍛打與器具維護，能提升武技輸出與遺跡翻找收穫。",
      "unlockHint": "斷塔翻找或武技施展累計達標後可就職。",
      "learnCostGold": 35,
      "activityType": "smithProgress",
      "rankThresholds": [
        0,
        80,
        180,
        320
      ],
      "bonuses": [
        "武技造成的傷害提高",
        "斷塔翻找時額外獲得金幣"
      ]
    },
    "cook": {
      "id": "cook",
      "name": "廚師",
      "family": "life",
      "summary": "擅長處理食材與維持隊伍狀態，能把獸肉與口糧轉成更高效率的恢復。",
      "unlockHint": "烹煮或進食口糧達標後可就職。",
      "learnCostGold": 28,
      "activityType": "cookProgress",
      "rankThresholds": [
        0,
        80,
        180,
        320
      ],
      "bonuses": [
        "食物恢復更多飽食與體力",
        "時間流逝時飽食下降較慢"
      ]
    },
    "farmer": {
      "id": "farmer",
      "name": "農夫",
      "family": "life",
      "summary": "擅長作物與土地觀察，對採集、草藥與補給準備特別熟練。",
      "unlockHint": "成功採集灰葉草 3 次後可就職。",
      "learnCostGold": 24,
      "activityType": "forageCount",
      "rankThresholds": [
        0,
        80,
        180,
        320
      ],
      "bonuses": [
        "採集判定獲得額外加值",
        "探索時飽食下降較慢"
      ]
    },
    "hunter": {
      "id": "hunter",
      "name": "獵人",
      "family": "life",
      "summary": "熟悉追蹤與魔物生物學，能更穩定地討伐與解剖生物型目標。",
      "unlockHint": "討伐生物型魔物或完成解剖累計達標後可就職。",
      "learnCostGold": 32,
      "activityType": "huntProgress",
      "rankThresholds": [
        0,
        80,
        180,
        320
      ],
      "bonuses": [
        "對生物型敵人命中提高",
        "解剖與討伐相關判定更穩定"
      ]
    }
  },
  "markets": {
    "emberport_market": {
      "id": "emberport_market",
      "name": "餘燼港市場",
      "locationId": "emberport",
      "summary": "港邊棚市與常設商鋪混雜的補給區，能購入冒險用品，也能販售戰利品換取現金。",
      "buyRate": 1.0,
      "sellRate": 0.45,
      "sellRateByKind": {
        "consumable": 0.45,
        "tool": 0.5,
        "material": 0.58,
        "key": 0.0
      },
      "stock": [
        {
          "itemId": "potion",
          "buyPrice": 24,
          "stock": -1,
          "tag": "藥品"
        },
        {
          "itemId": "ether",
          "buyPrice": 32,
          "stock": -1,
          "tag": "藥品"
        },
        {
          "itemId": "ration",
          "buyPrice": 10,
          "stock": -1,
          "tag": "食物"
        },
        {
          "itemId": "lockpick",
          "buyPrice": 12,
          "stock": -1,
          "tag": "工具"
        },
        {
          "itemId": "ash_herb",
          "buyPrice": 8,
          "stock": -1,
          "tag": "素材"
        }
      ],
      "notes": [
        "目前為第一版市場系統，採單件買賣。",
        "關鍵任務物品不會出現在販售清單。",
        "正在交付中的公會委託材料會暫時鎖定，避免誤賣。"
      ]
    }
  },
  "sceneObjects": {
    "emberport_stone": {
      "id": "emberport_stone",
      "locationId": "emberport",
      "title": "腳邊的小石塊",
      "summary": "碼頭石板縫邊躺著一塊剛好能抓進掌心的石頭。",
      "kind": "pickup",
      "sort": 10,
      "interactions": [
        {
          "id": "pick_stone",
          "label": "彎腰拿起石頭",
          "desc": "先把石頭抓在手裡，之後可以選擇放下或收進行囊。"
        }
      ],
      "nodeIds": [
        "emberport_harbor"
      ]
    },
    "emberport_guild_sign": {
      "id": "emberport_guild_sign",
      "locationId": "emberport",
      "title": "掛著鐵牌的公會門",
      "summary": "門板後傳來人聲與羊皮紙翻動聲，像是委託板就設在裡面。",
      "kind": "building",
      "sort": 20,
      "interactions": [
        {
          "id": "guild_report",
          "label": "推門進入公會",
          "desc": "查看委託板、接取委託與交付指定素材。"
        }
      ],
      "nodeIds": [
        "emberport_guild_front"
      ]
    },
    "emberport_market_stalls": {
      "id": "emberport_market_stalls",
      "locationId": "emberport",
      "title": "喧鬧的市場攤位",
      "summary": "叫賣聲和食物香氣混在一起，布棚下堆滿貨物。",
      "kind": "building",
      "sort": 30,
      "interactions": [
        {
          "id": "open_market",
          "label": "走近攤位交易",
          "desc": "購買補給、出售素材，觀察市場物價。"
        }
      ],
      "nodeIds": [
        "emberport_market_edge"
      ]
    },
    "emberport_inn_sign": {
      "id": "emberport_inn_sign",
      "locationId": "emberport",
      "title": "冒煙的旅店招牌",
      "summary": "木牌上有磨損的床鋪圖案，從半開的門縫透出熱湯味。",
      "kind": "building",
      "sort": 40,
      "interactions": [
        {
          "id": "rest_inn",
          "label": "進去休息",
          "desc": "支付住宿費，恢復狀態。"
        },
        {
          "id": "cook_meal",
          "label": "借火處理食物",
          "desc": "若有肉或口糧，可以整理成一頓熱食。"
        }
      ],
      "nodeIds": [
        "emberport_inn_front"
      ]
    },
    "emberport_road_greenwood": {
      "id": "emberport_road_greenwood",
      "locationId": "emberport",
      "title": "通往綠蔭林地的泥路",
      "summary": "離開港鎮後，道路很快被潮濕的林地吞沒。",
      "kind": "exit",
      "sort": 90,
      "interactions": [
        {
          "id": "travel_greenwood",
          "label": "沿著泥路前往林地",
          "desc": "離開餘燼港，深入近郊林地。"
        }
      ],
      "nodeIds": [
        "emberport_north_road"
      ]
    },
    "emberport_road_chapel": {
      "id": "emberport_road_chapel",
      "locationId": "emberport",
      "title": "倒向荒鐘禮拜堂的小徑",
      "summary": "路邊野草壓出一條少有人走的斜徑，盡頭隱約可見石牆。",
      "kind": "exit",
      "sort": 91,
      "interactions": [
        {
          "id": "travel_chapel",
          "label": "往禮拜堂走去",
          "desc": "前往廢棄禮拜堂。"
        }
      ],
      "nodeIds": [
        "emberport_north_road"
      ]
    },
    "emberport_road_tower": {
      "id": "emberport_road_tower",
      "locationId": "emberport",
      "title": "通往殘塔的碎石路",
      "summary": "遠處塔影高出霧線，地上有馬車留下的舊輪印。",
      "kind": "exit",
      "sort": 92,
      "interactions": [
        {
          "id": "travel_tower",
          "label": "走向殘塔",
          "desc": "前往弧痕殘塔。"
        }
      ],
      "nodeIds": [
        "emberport_north_road"
      ]
    },
    "greenwood_tracks": {
      "id": "greenwood_tracks",
      "locationId": "greenwood",
      "title": "泥地上的新鮮獸足跡",
      "summary": "爪痕還沒有被雨水沖淡，附近應該有活躍的掠食者。",
      "kind": "trail",
      "sort": 10,
      "interactions": [
        {
          "id": "hunt_wolf",
          "label": "順著足跡追過去",
          "desc": "可能會直接撞上灰林狼。"
        }
      ],
      "nodeIds": [
        "greenwood_trackside"
      ]
    },
    "greenwood_herbs": {
      "id": "greenwood_herbs",
      "locationId": "greenwood",
      "title": "潮濕草叢",
      "summary": "灰葉草就長在陰影和積水邊緣，得伸手慢慢翻找。",
      "kind": "resource",
      "sort": 20,
      "interactions": [
        {
          "id": "forage_herb",
          "label": "撥開草叢採集",
          "desc": "消耗體力搜尋草藥。"
        }
      ],
      "nodeIds": [
        "greenwood_herb_patch"
      ]
    },
    "greenwood_loose_stone": {
      "id": "greenwood_loose_stone",
      "locationId": "greenwood",
      "title": "樹根旁的扁石",
      "summary": "一塊被泥水沖出來的扁石，抓在手裡剛好。",
      "kind": "pickup",
      "sort": 30,
      "interactions": [
        {
          "id": "pick_stone",
          "label": "拾起扁石",
          "desc": "先拿在手上，再決定要放下還是收納。"
        }
      ],
      "nodeIds": [
        "greenwood_herb_patch"
      ]
    },
    "greenwood_cache": {
      "id": "greenwood_cache",
      "locationId": "greenwood",
      "title": "藤蔓掩著的木箱輪廓",
      "summary": "幾片破木板從葉間探出，像是有人故意藏過東西。",
      "kind": "resource",
      "sort": 40,
      "interactions": [
        {
          "id": "hidden_cache",
          "label": "蹲下檢查木箱",
          "desc": "也許藏著可帶走的東西。"
        }
      ],
      "nodeIds": [
        "greenwood_vine_cache"
      ]
    },
    "greenwood_to_port": {
      "id": "greenwood_to_port",
      "locationId": "greenwood",
      "title": "回到港鎮的路標",
      "summary": "簡陋木牌濕透了，但還看得出回餘燼港的箭頭。",
      "kind": "exit",
      "sort": 90,
      "interactions": [
        {
          "id": "travel_emberport",
          "label": "沿路返回餘燼港",
          "desc": "暫時離開林地。"
        }
      ],
      "nodeIds": [
        "greenwood_entry"
      ]
    },
    "greenwood_to_chapel": {
      "id": "greenwood_to_chapel",
      "locationId": "greenwood",
      "title": "林間偏向石牆的窄路",
      "summary": "有風從斷裂石牆方向吹來，帶著灰與蠟的味道。",
      "kind": "exit",
      "sort": 91,
      "interactions": [
        {
          "id": "travel_chapel",
          "label": "穿林走向禮拜堂",
          "desc": "前往荒鐘禮拜堂。"
        }
      ],
      "nodeIds": [
        "greenwood_chapel_path"
      ]
    },
    "chapel_altar": {
      "id": "chapel_altar",
      "locationId": "chapel",
      "title": "裂開的祭壇",
      "summary": "灰白光線從裂隙滲出，像有什麼在石底喘息。",
      "kind": "anomaly",
      "sort": 10,
      "interactions": [
        {
          "id": "chapel_investigate",
          "label": "靠近調查祭壇",
          "desc": "仔細接觸祭壇，可能引發事件或戰鬥。"
        }
      ],
      "nodeIds": [
        "chapel_altar_front"
      ]
    },
    "chapel_bench": {
      "id": "chapel_bench",
      "locationId": "chapel",
      "title": "覆滿灰塵的長椅",
      "summary": "木頭乾裂，但還勉強能坐。至少能靠著牆整理一下呼吸。",
      "kind": "rest",
      "sort": 20,
      "interactions": [
        {
          "id": "chapel_pray_rest",
          "label": "坐下短暫整備",
          "desc": "小幅恢復體力與魔力。"
        }
      ],
      "nodeIds": [
        "chapel_side_bench"
      ]
    },
    "chapel_grave_stones": {
      "id": "chapel_grave_stones",
      "locationId": "chapel",
      "title": "墓碑邊碎裂的小石堆",
      "summary": "風把碎石吹到腳邊，伸手就能抓起來。",
      "kind": "pickup",
      "sort": 30,
      "interactions": [
        {
          "id": "pick_stone",
          "label": "從石堆中挑一塊",
          "desc": "先拿在手上，再決定後續處理。"
        }
      ],
      "nodeIds": [
        "chapel_yard"
      ]
    },
    "chapel_to_port": {
      "id": "chapel_to_port",
      "locationId": "chapel",
      "title": "回港鎮的坡道",
      "summary": "下坡後就是較多人走動的道路。",
      "kind": "exit",
      "sort": 90,
      "interactions": [
        {
          "id": "travel_emberport",
          "label": "離開禮拜堂",
          "desc": "返回餘燼港。"
        }
      ],
      "nodeIds": [
        "chapel_yard"
      ]
    },
    "chapel_to_tower": {
      "id": "chapel_to_tower",
      "locationId": "chapel",
      "title": "指向殘塔的崩裂石道",
      "summary": "石道邊緣坑坑洞洞，像曾有重物拖行而過。",
      "kind": "exit",
      "sort": 91,
      "interactions": [
        {
          "id": "travel_tower",
          "label": "沿石道前往殘塔",
          "desc": "移動到弧痕殘塔。"
        }
      ],
      "nodeIds": [
        "chapel_tower_road"
      ]
    },
    "tower_rune_slab": {
      "id": "tower_rune_slab",
      "locationId": "tower",
      "title": "浮著餘光的符文石板",
      "summary": "石板上還有未散盡的奧術痕跡，只要再靠近就可能觸動它。",
      "kind": "anomaly",
      "sort": 10,
      "interactions": [
        {
          "id": "tower_study",
          "label": "貼近石板研究",
          "desc": "解讀奧術殘痕，可能學到什麼，也可能喚醒東西。"
        }
      ],
      "nodeIds": [
        "tower_rune_floor"
      ]
    },
    "tower_rubble": {
      "id": "tower_rubble",
      "locationId": "tower",
      "title": "半塌的研究碎堆",
      "summary": "斷裂器材、焦黑書頁與碎晶混雜在一起。",
      "kind": "resource",
      "sort": 20,
      "interactions": [
        {
          "id": "tower_salvage",
          "label": "翻找可用碎片",
          "desc": "尋找能帶走的資源或線索。"
        }
      ],
      "nodeIds": [
        "tower_rubble_pile"
      ]
    },
    "tower_stone": {
      "id": "tower_stone",
      "locationId": "tower",
      "title": "台階旁的碎石",
      "summary": "風化的碎石就在你靴尖旁。",
      "kind": "pickup",
      "sort": 30,
      "interactions": [
        {
          "id": "pick_stone",
          "label": "拾起碎石",
          "desc": "先握在手裡。"
        }
      ],
      "nodeIds": [
        "tower_stairs"
      ]
    },
    "tower_to_port": {
      "id": "tower_to_port",
      "locationId": "tower",
      "title": "回港鎮的斜坡道路",
      "summary": "走回去會先看到港區的煙囪。",
      "kind": "exit",
      "sort": 90,
      "interactions": [
        {
          "id": "travel_emberport",
          "label": "下坡返回餘燼港",
          "desc": "暫時離開殘塔。"
        }
      ],
      "nodeIds": [
        "tower_stairs"
      ]
    },
    "tower_to_rift": {
      "id": "tower_to_rift",
      "locationId": "tower",
      "title": "深入裂隙沼地的黑路",
      "summary": "前方的霧比周圍更厚，像是在吞吐。",
      "kind": "exit",
      "sort": 91,
      "interactions": [
        {
          "id": "travel_rift",
          "label": "走向灰燼裂隙",
          "desc": "前往更危險的裂隙帶。"
        }
      ],
      "nodeIds": [
        "tower_black_path"
      ]
    },
    "rift_sinkhole": {
      "id": "rift_sinkhole",
      "locationId": "riftmoor",
      "title": "扭曲下陷的裂隙坑口",
      "summary": "灰霧在坑口盤旋不散，有東西正從更深處往上感知你。",
      "kind": "anomaly",
      "sort": 10,
      "interactions": [
        {
          "id": "rift_descend",
          "label": "靠近裂隙坑口",
          "desc": "面對裂隙深處的威脅。"
        }
      ],
      "nodeIds": [
        "rift_sinkhole_edge"
      ]
    },
    "rift_crystals": {
      "id": "rift_crystals",
      "locationId": "riftmoor",
      "title": "脈動的碎晶簇",
      "summary": "灰紫色晶體偶爾會自己發亮，像活著一樣。",
      "kind": "resource",
      "sort": 20,
      "interactions": [
        {
          "id": "rift_harvest",
          "label": "伸手採取碎晶",
          "desc": "冒險收集裂隙殘渣與碎晶。"
        }
      ],
      "nodeIds": [
        "rift_crystal_bank"
      ]
    },
    "rift_to_tower": {
      "id": "rift_to_tower",
      "locationId": "riftmoor",
      "title": "離開霧區的殘塔方向",
      "summary": "那是目前唯一還算明確的退路。",
      "kind": "exit",
      "sort": 90,
      "interactions": [
        {
          "id": "travel_tower",
          "label": "撤回殘塔",
          "desc": "退出裂隙帶，回到較安全區域。"
        }
      ],
      "nodeIds": [
        "rift_fringe"
      ]
    }
  },
  "sceneNodes": {
    "emberport_harbor": {
      "id": "emberport_harbor",
      "locationId": "emberport",
      "title": "港鎮主路口",
      "summary": "潮濕的石板路在你腳下延伸。前方能看到掛著鐵牌的門、市場布棚與冒煙的旅店招牌。",
      "isStart": true,
      "sort": 10,
      "listenText": "你聽見海風、攤販吆喝與鐵牌偶爾撞牆的輕響。"
    },
    "emberport_guild_front": {
      "id": "emberport_guild_front",
      "locationId": "emberport",
      "title": "公會門前",
      "summary": "你站在掛著鐵牌的門前。門內不時傳出討論委託與裝備碰撞的聲音。",
      "sort": 20,
      "listenText": "門後傳來冒險者與接待員交談的聲音。"
    },
    "emberport_market_edge": {
      "id": "emberport_market_edge",
      "locationId": "emberport",
      "title": "市場邊緣",
      "summary": "布棚與木箱擠在一起，叫賣聲與食物香氣從近處壓過來。",
      "sort": 30,
      "listenText": "你聽見討價還價、木箱拖動與鍋湯翻滾的聲音。"
    },
    "emberport_inn_front": {
      "id": "emberport_inn_front",
      "locationId": "emberport",
      "title": "旅店前",
      "summary": "煙囪冒著熱氣，木門旁堆著乾柴。這裡比街口稍微安穩。",
      "sort": 40,
      "listenText": "你聞到濃湯與焦香，裡面有人拖著椅子走動。"
    },
    "emberport_north_road": {
      "id": "emberport_north_road",
      "locationId": "emberport",
      "title": "鎮外岔路",
      "summary": "離開建物之後，道路分出通往林地、禮拜堂與斷塔的不同方向。",
      "sort": 50,
      "listenText": "遠處沒有城內那麼吵，只剩風聲與泥地水聲。"
    },
    "greenwood_entry": {
      "id": "greenwood_entry",
      "locationId": "greenwood",
      "title": "林地入口",
      "summary": "濕氣從林冠下壓來，泥地上留著舊腳印與回港方向的路標。",
      "isStart": true,
      "sort": 10,
      "listenText": "你聽見遠處林鳥短促地叫了一聲，然後又安靜下來。"
    },
    "greenwood_trackside": {
      "id": "greenwood_trackside",
      "locationId": "greenwood",
      "title": "獸跡彎道",
      "summary": "泥地被來回踩得鬆散。這裡最容易看見新鮮的獸足跡。",
      "sort": 20,
      "listenText": "草叢深處有很短暫的沙沙聲，像有東西經過。"
    },
    "greenwood_herb_patch": {
      "id": "greenwood_herb_patch",
      "locationId": "greenwood",
      "title": "潮濕草叢",
      "summary": "樹根邊的泥土比別處更濕，幾叢灰葉草與扁石就伏在眼前。",
      "sort": 30,
      "listenText": "你蹲低後能聽見草葉摩擦與細小水滴落地。"
    },
    "greenwood_vine_cache": {
      "id": "greenwood_vine_cache",
      "locationId": "greenwood",
      "title": "藤蔓掩蔽處",
      "summary": "倒木與藤蔓纏在一起，像遮住了一個可以藏東西的角落。",
      "sort": 40,
      "listenText": "這裡太安靜了，安靜得像有人刻意把東西藏在這裡。"
    },
    "greenwood_chapel_path": {
      "id": "greenwood_chapel_path",
      "locationId": "greenwood",
      "title": "偏向石牆的小路",
      "summary": "地勢慢慢抬高，碎石和殘牆讓你意識到禮拜堂不遠了。",
      "sort": 50,
      "listenText": "風從石牆間穿過，帶來乾燥灰塵的味道。"
    },
    "chapel_yard": {
      "id": "chapel_yard",
      "locationId": "chapel",
      "title": "禮拜堂前院",
      "summary": "破敗石牆與傾斜鐘樓壓著視野，院裡散落墓碑與回港的坡道。",
      "isStart": true,
      "sort": 10,
      "listenText": "沒有鐘聲，只有空洞風聲從鐘樓裂縫裡漏下。"
    },
    "chapel_nave": {
      "id": "chapel_nave",
      "locationId": "chapel",
      "title": "破裂中殿",
      "summary": "殘破長椅與翻倒石塊讓你只能小心移步。前方祭壇仍有異樣殘光。",
      "sort": 20,
      "listenText": "石牆深處不時傳來極輕的迴音，像有人在更裡面低語。"
    },
    "chapel_altar_front": {
      "id": "chapel_altar_front",
      "locationId": "chapel",
      "title": "裂開的祭壇前",
      "summary": "你已經靠到祭壇夠近的位置，能清楚看見裂縫裡殘留的異色微光。",
      "sort": 30,
      "listenText": "靠近祭壇後，耳裡像被一層低鳴壓住。"
    },
    "chapel_side_bench": {
      "id": "chapel_side_bench",
      "locationId": "chapel",
      "title": "側邊長椅",
      "summary": "灰塵厚得幾乎看不出木紋。這裡勉強能短暫休整。",
      "sort": 40,
      "listenText": "這個角落比中央安靜，只有灰塵被你撥動的聲音。"
    },
    "chapel_tower_road": {
      "id": "chapel_tower_road",
      "locationId": "chapel",
      "title": "通往殘塔的崩裂石道",
      "summary": "石道邊滿是碎塊與斷裂護牆，路還能走，但很不好走。",
      "sort": 50,
      "listenText": "風沿著崩裂石道一直往更高處吹去。"
    },
    "tower_stairs": {
      "id": "tower_stairs",
      "locationId": "tower",
      "title": "殘塔台階",
      "summary": "半毀台階與傾倒牆面把入口切得支離破碎。你能從這裡退回港鎮，也能往塔內探。",
      "isStart": true,
      "sort": 10,
      "listenText": "奧術殘響像細碎電流一樣，在石縫間不停跳動。"
    },
    "tower_rune_floor": {
      "id": "tower_rune_floor",
      "locationId": "tower",
      "title": "符文地板",
      "summary": "殘缺法陣還在呼吸般閃滅。你只要再靠近一些就能研究石板上的痕跡。",
      "sort": 20,
      "listenText": "每一道微弱弧光都伴著像玻璃摩擦的細鳴。"
    },
    "tower_rubble_pile": {
      "id": "tower_rubble_pile",
      "locationId": "tower",
      "title": "研究碎堆旁",
      "summary": "倒塌書架、金屬零件與石塊堆在一起，是翻找舊物的好地方。",
      "sort": 30,
      "listenText": "碎片之間偶爾會滑落一小塊石屑。"
    },
    "tower_black_path": {
      "id": "tower_black_path",
      "locationId": "tower",
      "title": "通往裂隙的黑路",
      "summary": "再往前就要離開塔體殘影，真正踏進灰霧與泥沼。",
      "sort": 40,
      "listenText": "你幾乎聽不見正常風聲，只剩灰霧翻動的窸窣。"
    },
    "rift_fringe": {
      "id": "rift_fringe",
      "locationId": "riftmoor",
      "title": "裂隙邊緣",
      "summary": "灰霧把視野壓得很低，退路仍在身後，前面則是更危險的濕地。",
      "isStart": true,
      "sort": 10,
      "listenText": "這裡沒有鳥鳴，只有濕泥冒泡與灰霧摩擦地面的聲音。"
    },
    "rift_crystal_bank": {
      "id": "rift_crystal_bank",
      "locationId": "riftmoor",
      "title": "碎晶灘",
      "summary": "脈動碎晶在霧中一明一暗，你只要再靠近就能伸手採取。",
      "sort": 20,
      "listenText": "晶簇彼此共鳴，像遠遠敲著薄鐘。"
    },
    "rift_sinkhole_edge": {
      "id": "rift_sinkhole_edge",
      "locationId": "riftmoor",
      "title": "裂隙坑口",
      "summary": "地面在你前方塌落成扭曲坑口。只要再往前一步，就等於真正碰上核心危險。",
      "sort": 30,
      "listenText": "坑口深處傳來不規律的鼓動聲，像有什麼在底下呼吸。"
    }
  },
  "sceneExits": {
    "exit_ember_harbor_to_guild": {
      "id": "exit_ember_harbor_to_guild",
      "fromNodeId": "emberport_harbor",
      "toNodeId": "emberport_guild_front",
      "direction": "東側",
      "label": "往掛著鐵牌的門口靠近",
      "desc": "先移動腳步，靠近那扇屬於冒險者公會的門。",
      "sort": 10,
      "spCost": 1
    },
    "exit_ember_harbor_to_market": {
      "id": "exit_ember_harbor_to_market",
      "fromNodeId": "emberport_harbor",
      "toNodeId": "emberport_market_edge",
      "direction": "南側",
      "label": "往喧鬧的市場邊緣走去",
      "desc": "靠近布棚與攤位，看清楚有哪些可交易的東西。",
      "sort": 20,
      "spCost": 1
    },
    "exit_ember_harbor_to_inn": {
      "id": "exit_ember_harbor_to_inn",
      "fromNodeId": "emberport_harbor",
      "toNodeId": "emberport_inn_front",
      "direction": "西側",
      "label": "往冒著熱氣的旅店走去",
      "desc": "先靠近旅店門前，再決定要不要休息或整理。",
      "sort": 30,
      "spCost": 1
    },
    "exit_ember_harbor_to_road": {
      "id": "exit_ember_harbor_to_road",
      "fromNodeId": "emberport_harbor",
      "toNodeId": "emberport_north_road",
      "direction": "前方",
      "label": "走向鎮外的岔路",
      "desc": "離開主路口，先到可以看清外部道路的地方。",
      "sort": 40,
      "spCost": 1
    },
    "exit_ember_guild_back": {
      "id": "exit_ember_guild_back",
      "fromNodeId": "emberport_guild_front",
      "toNodeId": "emberport_harbor",
      "direction": "後方",
      "label": "退回港鎮主路口",
      "desc": "把視線從公會鐵牌前移開，回到街口。",
      "sort": 90,
      "spCost": 1
    },
    "exit_ember_market_back": {
      "id": "exit_ember_market_back",
      "fromNodeId": "emberport_market_edge",
      "toNodeId": "emberport_harbor",
      "direction": "北側",
      "label": "回到港鎮主路口",
      "desc": "離開攤位與人潮，退回比較開闊的地方。",
      "sort": 90,
      "spCost": 1
    },
    "exit_ember_inn_back": {
      "id": "exit_ember_inn_back",
      "fromNodeId": "emberport_inn_front",
      "toNodeId": "emberport_harbor",
      "direction": "東側",
      "label": "回到港鎮主路口",
      "desc": "從旅店前退開，回到主路口重新環視。",
      "sort": 90,
      "spCost": 1
    },
    "exit_ember_road_back": {
      "id": "exit_ember_road_back",
      "fromNodeId": "emberport_north_road",
      "toNodeId": "emberport_harbor",
      "direction": "後方",
      "label": "回到港鎮主路口",
      "desc": "再退回鎮內，重新整理想法。",
      "sort": 90,
      "spCost": 1
    },
    "exit_green_entry_tracks": {
      "id": "exit_green_entry_tracks",
      "fromNodeId": "greenwood_entry",
      "toNodeId": "greenwood_trackside",
      "direction": "前方",
      "label": "沿著泥痕往前摸進林地",
      "desc": "先向獸跡更密集的地方移動。",
      "sort": 10,
      "spCost": 1
    },
    "exit_green_entry_patch": {
      "id": "exit_green_entry_patch",
      "fromNodeId": "greenwood_entry",
      "toNodeId": "greenwood_herb_patch",
      "direction": "右側",
      "label": "向潮濕草叢靠近",
      "desc": "靠近那些可能長著草藥的地方。",
      "sort": 20,
      "spCost": 1
    },
    "exit_green_entry_cache": {
      "id": "exit_green_entry_cache",
      "fromNodeId": "greenwood_entry",
      "toNodeId": "greenwood_vine_cache",
      "direction": "左側",
      "label": "往藤蔓纏住的角落摸去",
      "desc": "那邊看起來像能藏東西。",
      "sort": 30,
      "spCost": 1
    },
    "exit_green_entry_chapel": {
      "id": "exit_green_entry_chapel",
      "fromNodeId": "greenwood_entry",
      "toNodeId": "greenwood_chapel_path",
      "direction": "更深處",
      "label": "沿偏向石牆的小路前進",
      "desc": "先走到能看清禮拜堂方向的位置。",
      "sort": 40,
      "spCost": 1
    },
    "exit_green_tracks_back": {
      "id": "exit_green_tracks_back",
      "fromNodeId": "greenwood_trackside",
      "toNodeId": "greenwood_entry",
      "direction": "後方",
      "label": "退回林地入口",
      "desc": "回到剛踏進林地的位置。",
      "sort": 90,
      "spCost": 1
    },
    "exit_green_patch_back": {
      "id": "exit_green_patch_back",
      "fromNodeId": "greenwood_herb_patch",
      "toNodeId": "greenwood_entry",
      "direction": "左後",
      "label": "退回林地入口",
      "desc": "離開草叢與樹根。",
      "sort": 90,
      "spCost": 1
    },
    "exit_green_cache_back": {
      "id": "exit_green_cache_back",
      "fromNodeId": "greenwood_vine_cache",
      "toNodeId": "greenwood_entry",
      "direction": "右後",
      "label": "退回林地入口",
      "desc": "從藤蔓掩蔽處退回開闊些的位置。",
      "sort": 90,
      "spCost": 1
    },
    "exit_green_chapel_back": {
      "id": "exit_green_chapel_back",
      "fromNodeId": "greenwood_chapel_path",
      "toNodeId": "greenwood_entry",
      "direction": "後方",
      "label": "退回林地入口",
      "desc": "回到比較熟悉的入口地帶。",
      "sort": 90,
      "spCost": 1
    },
    "exit_chapel_yard_nave": {
      "id": "exit_chapel_yard_nave",
      "fromNodeId": "chapel_yard",
      "toNodeId": "chapel_nave",
      "direction": "前方",
      "label": "走進禮拜堂中殿",
      "desc": "先靠近內部，再看清祭壇與長椅。",
      "sort": 10,
      "spCost": 1
    },
    "exit_chapel_yard_road": {
      "id": "exit_chapel_yard_road",
      "fromNodeId": "chapel_yard",
      "toNodeId": "chapel_tower_road",
      "direction": "右側",
      "label": "往崩裂石道靠近",
      "desc": "先移到能看清通往殘塔道路的位置。",
      "sort": 20,
      "spCost": 1
    },
    "exit_chapel_nave_altar": {
      "id": "exit_chapel_nave_altar",
      "fromNodeId": "chapel_nave",
      "toNodeId": "chapel_altar_front",
      "direction": "前方",
      "label": "走近裂開的祭壇",
      "desc": "真正靠近異光殘留的位置。",
      "sort": 10,
      "spCost": 1
    },
    "exit_chapel_nave_bench": {
      "id": "exit_chapel_nave_bench",
      "fromNodeId": "chapel_nave",
      "toNodeId": "chapel_side_bench",
      "direction": "左側",
      "label": "靠向側邊長椅",
      "desc": "挪到一處稍微能整備的角落。",
      "sort": 20,
      "spCost": 1
    },
    "exit_chapel_nave_yard": {
      "id": "exit_chapel_nave_yard",
      "fromNodeId": "chapel_nave",
      "toNodeId": "chapel_yard",
      "direction": "後方",
      "label": "退出到前院",
      "desc": "從陰影裡退回院子。",
      "sort": 90,
      "spCost": 1
    },
    "exit_chapel_altar_back": {
      "id": "exit_chapel_altar_back",
      "fromNodeId": "chapel_altar_front",
      "toNodeId": "chapel_nave",
      "direction": "後方",
      "label": "從祭壇前退回中殿",
      "desc": "離開祭壇異光，回到中殿中央。",
      "sort": 90,
      "spCost": 1
    },
    "exit_chapel_bench_back": {
      "id": "exit_chapel_bench_back",
      "fromNodeId": "chapel_side_bench",
      "toNodeId": "chapel_nave",
      "direction": "右側",
      "label": "離開長椅回到中殿",
      "desc": "回到能兼顧祭壇與出入口的位置。",
      "sort": 90,
      "spCost": 1
    },
    "exit_chapel_road_back": {
      "id": "exit_chapel_road_back",
      "fromNodeId": "chapel_tower_road",
      "toNodeId": "chapel_yard",
      "direction": "後方",
      "label": "退回禮拜堂前院",
      "desc": "回到比較開闊的院子。",
      "sort": 90,
      "spCost": 1
    },
    "exit_tower_stairs_rune": {
      "id": "exit_tower_stairs_rune",
      "fromNodeId": "tower_stairs",
      "toNodeId": "tower_rune_floor",
      "direction": "前方",
      "label": "走向仍在發光的符文地板",
      "desc": "靠近石板與殘留法陣。",
      "sort": 10,
      "spCost": 1
    },
    "exit_tower_stairs_rubble": {
      "id": "exit_tower_stairs_rubble",
      "fromNodeId": "tower_stairs",
      "toNodeId": "tower_rubble_pile",
      "direction": "左側",
      "label": "往研究碎堆靠近",
      "desc": "看清那些倒塌器具與零件。",
      "sort": 20,
      "spCost": 1
    },
    "exit_tower_stairs_path": {
      "id": "exit_tower_stairs_path",
      "fromNodeId": "tower_stairs",
      "toNodeId": "tower_black_path",
      "direction": "更深處",
      "label": "走向通往裂隙的黑路",
      "desc": "先靠到霧區前線，再決定是否踏進去。",
      "sort": 30,
      "spCost": 1
    },
    "exit_tower_rune_back": {
      "id": "exit_tower_rune_back",
      "fromNodeId": "tower_rune_floor",
      "toNodeId": "tower_stairs",
      "direction": "後方",
      "label": "退回殘塔台階",
      "desc": "離開符文地板，回到塔外入口附近。",
      "sort": 90,
      "spCost": 1
    },
    "exit_tower_rubble_back": {
      "id": "exit_tower_rubble_back",
      "fromNodeId": "tower_rubble_pile",
      "toNodeId": "tower_stairs",
      "direction": "右側",
      "label": "退回殘塔台階",
      "desc": "從碎堆旁回到入口位置。",
      "sort": 90,
      "spCost": 1
    },
    "exit_tower_path_back": {
      "id": "exit_tower_path_back",
      "fromNodeId": "tower_black_path",
      "toNodeId": "tower_stairs",
      "direction": "後方",
      "label": "退回殘塔台階",
      "desc": "回到還有牆體掩護的位置。",
      "sort": 90,
      "spCost": 1
    },
    "exit_rift_fringe_crystal": {
      "id": "exit_rift_fringe_crystal",
      "fromNodeId": "rift_fringe",
      "toNodeId": "rift_crystal_bank",
      "direction": "左前",
      "label": "向脈動碎晶靠近",
      "desc": "慢慢靠近那些一明一暗的晶簇。",
      "sort": 10,
      "spCost": 1
    },
    "exit_rift_fringe_sinkhole": {
      "id": "exit_rift_fringe_sinkhole",
      "fromNodeId": "rift_fringe",
      "toNodeId": "rift_sinkhole_edge",
      "direction": "前方",
      "label": "朝裂隙坑口逼近",
      "desc": "靠近真正危險的核心地帶。",
      "sort": 20,
      "spCost": 1
    },
    "exit_rift_crystal_back": {
      "id": "exit_rift_crystal_back",
      "fromNodeId": "rift_crystal_bank",
      "toNodeId": "rift_fringe",
      "direction": "後方",
      "label": "退回裂隙邊緣",
      "desc": "離開碎晶灘，回到較能辨認退路的位置。",
      "sort": 90,
      "spCost": 1
    },
    "exit_rift_sinkhole_back": {
      "id": "exit_rift_sinkhole_back",
      "fromNodeId": "rift_sinkhole_edge",
      "toNodeId": "rift_fringe",
      "direction": "後方",
      "label": "退回裂隙邊緣",
      "desc": "從坑口邊緣退回灰霧較薄的位置。",
      "sort": 90,
      "spCost": 1
    },
    "travel_ember_to_greenwood": {
      "id": "travel_ember_to_greenwood",
      "fromNodeId": "emberport_north_road",
      "travelLocationId": "greenwood",
      "arrivalNodeId": "greenwood_entry",
      "direction": "前方",
      "label": "沿泥路真正進入綠蔭林地",
      "desc": "離開港鎮範圍，踏進林冠與潮氣壓低視野的地帶。",
      "sort": 110,
      "spCost": 5
    },
    "travel_ember_to_chapel": {
      "id": "travel_ember_to_chapel",
      "fromNodeId": "emberport_north_road",
      "travelLocationId": "chapel",
      "arrivalNodeId": "chapel_yard",
      "direction": "右前",
      "label": "沿碎石小徑前往荒鐘禮拜堂",
      "desc": "先離開鎮外岔路，再往乾燥石牆與鐘樓廢墟前進。",
      "sort": 120,
      "spCost": 5
    },
    "travel_ember_to_tower": {
      "id": "travel_ember_to_tower",
      "fromNodeId": "emberport_north_road",
      "travelLocationId": "tower",
      "arrivalNodeId": "tower_stairs",
      "direction": "左前",
      "label": "沿碎石路前往斷塔遺蹟",
      "desc": "把城鎮丟在身後，走向還殘留奧術反應的塔。",
      "sort": 130,
      "spCost": 5
    },
    "travel_green_to_port": {
      "id": "travel_green_to_port",
      "fromNodeId": "greenwood_entry",
      "travelLocationId": "emberport",
      "arrivalNodeId": "emberport_harbor",
      "direction": "後方",
      "label": "沿路標退回餘燼港",
      "desc": "循著比較安全的方向離開林地。",
      "sort": 120,
      "spCost": 5
    },
    "travel_green_to_chapel": {
      "id": "travel_green_to_chapel",
      "fromNodeId": "greenwood_chapel_path",
      "travelLocationId": "chapel",
      "arrivalNodeId": "chapel_yard",
      "direction": "前方",
      "label": "沿石牆路徑前往荒鐘禮拜堂",
      "desc": "真正走向那座失去維護的石造建築。",
      "sort": 130,
      "spCost": 5
    },
    "travel_chapel_to_port": {
      "id": "travel_chapel_to_port",
      "fromNodeId": "chapel_yard",
      "travelLocationId": "emberport",
      "arrivalNodeId": "emberport_harbor",
      "direction": "後方",
      "label": "沿坡道退回餘燼港",
      "desc": "離開鐘樓與墓碑，回到有人群與交易的地方。",
      "sort": 120,
      "spCost": 5
    },
    "travel_chapel_to_tower": {
      "id": "travel_chapel_to_tower",
      "fromNodeId": "chapel_tower_road",
      "travelLocationId": "tower",
      "arrivalNodeId": "tower_stairs",
      "direction": "前方",
      "label": "沿崩裂石道前往斷塔遺蹟",
      "desc": "真正離開禮拜堂，朝更高處的殘塔前進。",
      "sort": 130,
      "spCost": 5
    },
    "travel_tower_to_port": {
      "id": "travel_tower_to_port",
      "fromNodeId": "tower_stairs",
      "travelLocationId": "emberport",
      "arrivalNodeId": "emberport_harbor",
      "direction": "後方",
      "label": "沿斜坡退回餘燼港",
      "desc": "退出殘塔與奧術碎響，回到港鎮。",
      "sort": 120,
      "spCost": 5
    },
    "travel_tower_to_rift": {
      "id": "travel_tower_to_rift",
      "fromNodeId": "tower_black_path",
      "travelLocationId": "riftmoor",
      "arrivalNodeId": "rift_fringe",
      "direction": "前方",
      "label": "踏進灰霧，前往裂隙沼原",
      "desc": "真正離開殘塔最後的遮蔽，進入裂隙濕地。",
      "sort": 130,
      "spCost": 5
    },
    "travel_rift_to_tower": {
      "id": "travel_rift_to_tower",
      "fromNodeId": "rift_fringe",
      "travelLocationId": "tower",
      "arrivalNodeId": "tower_stairs",
      "direction": "後方",
      "label": "循退路撤回斷塔遺蹟",
      "desc": "沿著還看得清的方向退回塔區。",
      "sort": 120,
      "spCost": 5
    }
  }
};

window.GAME_CONTENT.startingState = () => ({
  "version": "2.5.0",
  "day": 1,
  "periodIndex": 0,
  "weatherIndex": 1,
  "turn": 0,
  "location": "emberport",
  "gold": 0,
  "level": 1,
  "exp": 0,
  "statPoints": 0,
  "skillPoints": 0,
  "stats": {
    "STR": {
      "base": 5,
      "gear": 0,
      "buff": 0,
      "debuff": 0
    },
    "VIT": {
      "base": 5,
      "gear": 0,
      "buff": 0,
      "debuff": 0
    },
    "DEX": {
      "base": 5,
      "gear": 0,
      "buff": 0,
      "debuff": 0
    },
    "AGI": {
      "base": 5,
      "gear": 0,
      "buff": 0,
      "debuff": 0
    },
    "INT": {
      "base": 5,
      "gear": 0,
      "buff": 0,
      "debuff": 0
    },
    "LUK": {
      "base": 5,
      "gear": 0,
      "buff": 0,
      "debuff": 0
    }
  },
  "resources": {
    "hp": 0,
    "sp": 0,
    "mp": 0,
    "satiety": 70
  },
  "inventory": {
    "potion": 0,
    "ether": 0,
    "ration": 0,
    "lockpick": 0,
    "ash_herb": 0,
    "chapel_sigil": 0,
    "tower_shard": 0,
    "rift_core": 0,
    "wolf_pelt_torn": 0,
    "wolf_pelt": 0,
    "wolf_pelt_fine": 0,
    "wolf_fang": 0,
    "beast_meat": 0,
    "rift_hide_frayed": 0,
    "rift_hide_dense": 0,
    "rift_gland": 0,
    "rift_crystal": 0,
    "rift_core_gland": 0
  },
  "quests": {
    "main_rift": {
      "stage": 0
    },
    "herb_contract": {
      "stage": 0
    }
  },
  "skills": {
    "slash": {
      "learned": false,
      "equipped": false,
      "proficiency": 0
    },
    "spark": {
      "learned": false,
      "equipped": false,
      "proficiency": 0
    },
    "first_aid": {
      "learned": false,
      "equipped": false,
      "proficiency": 0
    },
    "tough_body": {
      "learned": false,
      "equipped": false,
      "proficiency": 0
    },
    "traveler_instinct": {
      "learned": false,
      "equipped": false,
      "proficiency": 0
    },
    "monster_anatomy": {
      "learned": false,
      "equipped": false,
      "proficiency": 0
    }
  },
  "flags": {
    "met_guild_master": false,
    "herb_contract_accepted": false,
    "chapel_clue_found": false,
    "tower_clue_found": false,
    "rift_path_unlocked": false,
    "rift_core_stabilized": false,
    "opened_hidden_cache": false,
    "bought_supplies_once": false
  },
  "recentCorpse": null,
  "battle": null,
  "log": [
    {
      "type": "system",
      "text": "Beta v2.0：遊戲調整為重養成／生存導向，能力值提升節奏顯著放慢。"
    },
    {
      "type": "system",
      "text": "新局會隨機抽取出生種族與出身，並依據成長方式逐步選擇戰鬥流派與生活副職。"
    },
    {
      "type": "system",
      "text": "初階技能改為累積習得熟練，達到門檻後才會真正學會；上位技能仍需靠熟練進化。"
    }
  ],
  "ui": {
    "mode": null,
    "sceneFocus": null
  },
  "guild": {
    "commissions": {
      "guild_herb_supply": {
        "accepted": false,
        "completed": false,
        "turnedIn": false,
        "killCount": 0
      },
      "guild_wolf_fang": {
        "accepted": false,
        "completed": false,
        "turnedIn": false,
        "killCount": 0
      },
      "guild_rift_gland": {
        "accepted": false,
        "completed": false,
        "turnedIn": false,
        "killCount": 0
      }
    }
  },
  "originClass": "平民",
  "currentJob": null,
  "jobs": {
    "tailor": {
      "learned": false,
      "exp": 0
    },
    "blacksmith": {
      "learned": false,
      "exp": 0
    },
    "cook": {
      "learned": false,
      "exp": 0
    },
    "farmer": {
      "learned": false,
      "exp": 0
    },
    "hunter": {
      "learned": false,
      "exp": 0
    }
  },
  "records": {
    "forageCount": 0,
    "monsterKills": 0,
    "biologicalKills": 0,
    "anatomyCount": 0,
    "hideHarvested": 0,
    "mealsCooked": 0,
    "rationUsed": 0,
    "towerSalvage": 0,
    "martialSkillUses": 0,
    "magicSkillUses": 0,
    "smithProgress": 0,
    "cookProgress": 0,
    "huntProgress": 0
  },
  "skillDiscovery": {
    "slash": {
      "attempts": {},
      "discovered": false,
      "practice": 0,
      "lastSource": null
    },
    "spark": {
      "attempts": {},
      "discovered": false,
      "practice": 0,
      "lastSource": null
    },
    "first_aid": {
      "attempts": {},
      "discovered": false,
      "practice": 0,
      "lastSource": null
    },
    "tough_body": {
      "attempts": {},
      "discovered": false,
      "practice": 0,
      "lastSource": null
    },
    "traveler_instinct": {
      "attempts": {},
      "discovered": false,
      "practice": 0,
      "lastSource": null
    },
    "monster_anatomy": {
      "attempts": {},
      "discovered": false,
      "practice": 0,
      "lastSource": null
    }
  },
  "raceId": null,
  "raceName": null,
  "birthOriginId": null,
  "birthOriginName": null,
  "growthStage": "幼體",
  "originData": null,
  "growthProfile": {
    "mode": "harsh",
    "label": "重養成／生存",
    "summary": "升級只會少量帶來成長印記，能力值不再輕易上升；一旦死亡，本輪旅程就會直接結束。"
  },
  "heldObject": null,
  "gameOver": null
});

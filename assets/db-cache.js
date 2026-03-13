window.GAME_CONTENT = {
  "meta": {
    "title": "灰燼裂隙：異世界旅者",
    "version": "Beta v1.7 Market System",
    "saveKey": "isekai_text_rpg_beta_v1_6_save"
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
      "learnHint": "多以普通攻擊參與實戰，有機率領悟武技【斬擊】。",
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
          "sourceLabel": "近身實戰"
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
          "sourceLabel": "武技實戰勝利"
        }
      }
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
      "learnHint": "調查符文、接觸奧術殘響與異界火痕，有機率領悟魔法【火花】。",
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
          "sourceLabel": "符文研究"
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
          "sourceLabel": "奧術接觸"
        }
      }
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
      "learnHint": "休息、包紮、使用治療物資時，有機率學會生活／支援技能【急救】。",
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
          "sourceLabel": "醫療處置"
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
          "sourceLabel": "休整與照護"
        }
      }
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
      "learnHint": "承受傷害、熬過艱苦旅程與休息恢復時，有機率學會被動技能【鍛體】。",
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
          "sourceLabel": "承受傷害"
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
          "sourceLabel": "休息恢復"
        }
      }
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
      "learnHint": "處理生物型魔物屍體、觀察部位與粗略解剖時，有機率學會【魔物解剖】。",
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
          "sourceLabel": "生物型魔物狩獵"
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
          "sourceLabel": "實際解剖"
        }
      }
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
      "learnHint": "旅行、採集與探索危險區域時，有機率學會被動技能【旅者直覺】。",
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
          "sourceLabel": "長途旅行"
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
          "sourceLabel": "野外採集"
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
          "sourceLabel": "危險探索"
        }
      }
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
      "note": "生物型魔物。討伐後可解剖皮膜、牙齒與肉塊。"
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
      "note": "靈體敵人，沒有可供解剖的實體部位。"
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
      "note": "奧術性靈體，不產生可解剖屍體。"
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
      "note": "高危險生物型魔物。可解剖異皮、裂腺、結晶與核囊。"
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
  }
};

window.GAME_CONTENT.startingState = () => ({
  "version": "Beta v1.7 Market System",
  "day": 1,
  "periodIndex": 0,
  "weatherIndex": 1,
  "turn": 0,
  "location": "emberport",
  "gold": 55,
  "level": 1,
  "exp": 0,
  "statPoints": 4,
  "skillPoints": 1,
  "stats": {
    "STR": {
      "base": 6,
      "gear": 0,
      "buff": 0,
      "debuff": 0
    },
    "VIT": {
      "base": 6,
      "gear": 0,
      "buff": 0,
      "debuff": 0
    },
    "DEX": {
      "base": 6,
      "gear": 0,
      "buff": 0,
      "debuff": 0
    },
    "AGI": {
      "base": 6,
      "gear": 0,
      "buff": 0,
      "debuff": 0
    },
    "INT": {
      "base": 6,
      "gear": 0,
      "buff": 0,
      "debuff": 0
    },
    "LUK": {
      "base": 6,
      "gear": 0,
      "buff": 0,
      "debuff": 0
    }
  },
  "resources": {
    "hp": 0,
    "sp": 0,
    "mp": 0,
    "satiety": 78
  },
  "inventory": {
    "potion": 2,
    "ether": 1,
    "ration": 2,
    "lockpick": 2,
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
      "text": "你從不屬於此世的灰霧中甦醒，最初只是個在中世紀異世界求生的平民。餘燼港成了你在這個世界的第一個落腳點。"
    },
    {
      "type": "system",
      "text": "Beta v1.6 已改為行動式技能習得：初始技能需要透過實際行動機率領悟，之後再以熟練度進化成上位技能。"
    },
    {
      "type": "system",
      "text": "Beta v1.7 已加入市場買賣系統：可在餘燼港市場購買補給，並出售戰利品與素材。"
    }
  ],
  "ui": {
    "mode": null
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
      "discovered": false
    },
    "spark": {
      "attempts": {},
      "discovered": false
    },
    "first_aid": {
      "attempts": {},
      "discovered": false
    },
    "tough_body": {
      "attempts": {},
      "discovered": false
    },
    "traveler_instinct": {
      "attempts": {},
      "discovered": false
    },
    "monster_anatomy": {
      "attempts": {},
      "discovered": false
    }
  }
});

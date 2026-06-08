import type { LessonContent } from '@/content/types';

export const content: LessonContent = {
  introduction: `Добре дошли в нивото A2! Преди да продължим напред, ще направим кратък преговор на всичко, което научихте в A1.

Темите, които ще повторим:
• Поздрави
• Държави и националности
• Числа
• Плодове, зеленчуци, хранителни продукти и напитки
• Сгради
• Семейство и антоними
• Дни, месеци, сезони, времето и посоки
• Цветове
• Дрехи и обувки
• Мебели и домакински уреди
• Превозни средства
• Всекидневни дейности

• Граматика: глаголът „съм", род и число, определителен член, степенуване, предлози, сегашно време, местоимения и въпросителни думи`,

  dialogues: [],
  sections: [],

  vocabulary: [
    // Поздрави
    { id: 'dobro-utro',    bulgarian: 'Добро утро!'   },
    { id: 'dobar-den',     bulgarian: 'Добър ден!'    },
    { id: 'dobar-vecher',  bulgarian: 'Добър вечер!'  },
    { id: 'leka-nosht',    bulgarian: 'Лека нощ!'     },
    // Националности
    { id: 'siriyets',      bulgarian: 'сириец'        },
    { id: 'siriyка',       bulgarian: 'сирийка'       },
    { id: 'siriytsi',      bulgarian: 'сирийци'       },
    { id: 'irakchanian',   bulgarian: 'иракчанин'     },
    { id: 'irakchanka',    bulgarian: 'иракчанка'     },
    { id: 'irakchani',     bulgarian: 'иракчани'      },
    { id: 'iranets',       bulgarian: 'иранец'        },
    { id: 'iranka',        bulgarian: 'иранка'        },
    { id: 'irantsi',       bulgarian: 'иранци'        },
    { id: 'ukrainets',     bulgarian: 'украинец'      },
    { id: 'ukrainka',      bulgarian: 'украинка'      },
    { id: 'ukraintsi',     bulgarian: 'украинци'      },
    // Плодове и зеленчуци
    { id: 'yabalka',       bulgarian: 'ябълка'        },
    { id: 'portokal',      bulgarian: 'портокал'      },
    { id: 'banan',         bulgarian: 'банан'         },
    { id: 'limon',         bulgarian: 'лимон'         },
    { id: 'dinya',         bulgarian: 'диня'          },
    { id: 'grozde',        bulgarian: 'грозде'        },
    { id: 'praskova',      bulgarian: 'праскова'      },
    { id: 'sliva',         bulgarian: 'слива'         },
    { id: 'yagoda',        bulgarian: 'ягода'         },
    { id: 'cheresha',      bulgarian: 'череша'        },
    { id: 'smokinya',      bulgarian: 'смокиня'       },
    { id: 'krusha',        bulgarian: 'круша'         },
    { id: 'domat',         bulgarian: 'домат'         },
    { id: 'krastavitsa',   bulgarian: 'краставица'    },
    { id: 'chushka',       bulgarian: 'чушка'         },
    { id: 'kartof',        bulgarian: 'картоф'        },
    { id: 'luk',           bulgarian: 'лук'           },
    { id: 'marulya',       bulgarian: 'маруля'        },
    { id: 'gaba',          bulgarian: 'гъба'          },
    { id: 'tikvichka',     bulgarian: 'тиквичка'      },
    // Хранителни продукти
    { id: 'brashno',       bulgarian: 'брашно'        },
    { id: 'zahar',         bulgarian: 'захар'         },
    { id: 'sol',           bulgarian: 'сол'           },
    { id: 'olio',          bulgarian: 'олио'          },
    { id: 'maslo',         bulgarian: 'масло'         },
    { id: 'mlyako',        bulgarian: 'мляко'         },
    { id: 'yaytsa',        bulgarian: 'яйца'          },
    { id: 'sirene',        bulgarian: 'сирене'        },
    { id: 'kashkaval',     bulgarian: 'кашкавал'      },
    { id: 'kiselo-mlyako', bulgarian: 'кисело мляко'  },
    { id: 'med',           bulgarian: 'мед'           },
    { id: 'oriz',          bulgarian: 'ориз'          },
    // Храни и напитки
    { id: 'chay',          bulgarian: 'чай'           },
    { id: 'kafe',          bulgarian: 'кафе'          },
    { id: 'voda',          bulgarian: 'вода'          },
    { id: 'sok',           bulgarian: 'сок'           },
    { id: 'bira',          bulgarian: 'бира'          },
    { id: 'vino',          bulgarian: 'вино'          },
    { id: 'supa',          bulgarian: 'супа'          },
    { id: 'salata',        bulgarian: 'салата'        },
    { id: 'pitsa',         bulgarian: 'пица'          },
    { id: 'sandvich',      bulgarian: 'сандвич'       },
    { id: 'banitsa',       bulgarian: 'баница'        },
    // Сгради
    { id: 'magazin',       bulgarian: 'магазин'       },
    { id: 'bolnitsa',      bulgarian: 'болница'       },
    { id: 'banka',         bulgarian: 'банка'         },
    { id: 'apteka',        bulgarian: 'аптека'        },
    { id: 'poshta',        bulgarian: 'пощa'          },
    // Цветове
    { id: 'cherven',       bulgarian: 'червен'        },
    { id: 'zelen',         bulgarian: 'зелен'         },
    { id: 'zhalt',         bulgarian: 'жълт'          },
    { id: 'sin',           bulgarian: 'син'           },
    { id: 'byal',          bulgarian: 'бял'           },
    { id: 'cheren',        bulgarian: 'черен'         },
    { id: 'oranzhev',      bulgarian: 'оранжев'       },
    { id: 'rozov',         bulgarian: 'розов'         },
    { id: 'lilav',         bulgarian: 'лилав'         },
    { id: 'kafyav',        bulgarian: 'кафяв'         },
    // Дрехи и обувки
    { id: 'riza',          bulgarian: 'риза'          },
    { id: 'teniska',       bulgarian: 'тениска'       },
    { id: 'bluza',         bulgarian: 'блуза'         },
    { id: 'pulover',       bulgarian: 'пуловер'       },
    { id: 'yake',          bulgarian: 'яке'           },
    { id: 'palto',         bulgarian: 'палто'         },
    { id: 'pantalon',      bulgarian: 'панталон'      },
    { id: 'pola',          bulgarian: 'пола'          },
    { id: 'roklya',        bulgarian: 'рокля'         },
    { id: 'obuvki',        bulgarian: 'обувки'        },
    // Мебели и уреди
    { id: 'stol',          bulgarian: 'стол'          },
    { id: 'masa',          bulgarian: 'маса'          },
    { id: 'leglo',         bulgarian: 'легло'         },
    { id: 'divan',         bulgarian: 'диван'         },
    { id: 'shkaf',         bulgarian: 'шкаф'          },
    { id: 'hladilnik',     bulgarian: 'хладилник'     },
    { id: 'peralnya',      bulgarian: 'пералня'       },
    { id: 'pechka',        bulgarian: 'печка'         },
    { id: 'televizor',     bulgarian: 'телевизор'     },
    { id: 'kompyutar',     bulgarian: 'компютър'      },
    // Превозни средства
    { id: 'kola',          bulgarian: 'кола'          },
    { id: 'avtobus',       bulgarian: 'автобус'       },
    { id: 'vlak',          bulgarian: 'влак'          },
    { id: 'samolet',       bulgarian: 'самолет'       },
    { id: 'taksi',         bulgarian: 'такси'         },
    // Семейство
    { id: 'mayka',         bulgarian: 'майка'         },
    { id: 'bashta',        bulgarian: 'баща'          },
    { id: 'brat',          bulgarian: 'брат'          },
    { id: 'sestra',        bulgarian: 'сестра'        },
    { id: 'dyado',         bulgarian: 'дядо'          },
    { id: 'baba',          bulgarian: 'баба'          },
    { id: 'vnuk',          bulgarian: 'внук'          },
    { id: 'vnuchka',       bulgarian: 'внучка'        },
    { id: 'syn',           bulgarian: 'син'           },
    { id: 'dashterya',     bulgarian: 'дъщеря'        },
  ],

  culturalNotes: [],
};

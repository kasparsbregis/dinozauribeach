export const lv = {
  brand: {
    name: "Dinozauri Beach",
    tagline: "Pludmales volejbola turnīrs",
    logoAlt: "Dinozauri Beach logo ar volejbola bumbu",
    mascotAlt: "Dinozauri Beach maskotne ar volejbola bumbu",
  },
  nav: {
    myDates: "Manas dienas",
    overview: "Kopējais skats",
    signIn: "Pieteikties",
    signInGoogle: "Pieteikties ar Google",
    signOut: "Iziet",
  },
  landing: {
    eyebrow: "Pludmales volejbols",
    title: "Atrodi labāko turnīra datumu",
    description:
      "Piesakies ar Google, iestati savus iniciāļus un atzīmē, kad vari spēlēt jūlijā vai augustā. Visi redzēs, kuras dienas grupai der vislabāk.",
    feature1: "Atzīmē brīvās dienas kopīgajā kalendārā",
    feature2: "Skaties, kas ir pieejams katrā datumā",
    feature3: "Izvēlies dienu ar visvairāk spēlētājiem",
    tagline: "Astoņi spēlētāji. Lai uzvar labākais.",
  },
  home: {
    eyebrow: "Tavs grafiks",
    title: "Mana pieejamība",
    signedInAs: "Pieteicies kā",
    initialsFirst:
      "Vispirms saglabā iniciālus, tad vari izvēlēties brīvās dienas.",
  },
  initials: {
    title: "Iestati savus iniciāļus",
    welcome: (name: string) =>
      `Laipni lūgti, ${name}. Izmanto līdz 2 burtiem - piemēram, Jānis Bērziņš → `,
    hint: "Izmanto līdz 2 burtiem, lai citi tevi redz kalendārā.",
    label: "Iniciāļi",
    placeholder: "JB",
    save: "Saglabāt iniciāļus",
    saving: "Saglabā…",
  },
  picker: {
    title: "Izvēlies savas dienas",
    description: (year: number) =>
      `Pieskaries dienām, kad vari spēlēt ${year}. gada jūlijā un augustā.`,
    saving: "Saglabā…",
    available: "pieejams",
    notAvailable: "nav pieejams",
    disabled: "nav pieejams",
  },
  overview: {
    eyebrow: "Grupas skats",
    title: "Grupas pieejamība",
    description:
      "Tumšākas zaļās dienas nozīmē vairāk brīvu spēlētāju. Iniciāli rāda, kurš izvēlējās katru datumu — izmanto to, lai atrastu labāko turnīra dienu.",
    noOneAvailable: "Neviens nav pieejams",
    empty:
      "Vēl nav iesniegta neviena pieejamība. Kad spēlētāji izvēlēsies dienas, šeit parādīsies labākās opcijas.",
    bestDates: "Labākie datumi līdz šim",
    playersAvailable: (count: number) =>
      count === 1 ? "1 spēlētājs pieejams" : `${count} spēlētāji pieejami`,
    dateTooltip: (count: number, names: string) =>
      `${count} pieejami: ${names}`,
  },
  months: {
    july: "Jūlijs",
    august: "Augusts",
  },
  weekdays: ["Pr", "Ot", "Tr", "Ce", "Pk", "Se", "Sv"] as const,
  weekdayNames: [
    "Pirmdiena",
    "Otrdiena",
    "Trešdiena",
    "Ceturtdiena",
    "Piektdiena",
    "Sestdiena",
    "Svētdiena",
  ] as const,
  errors: {
    signInRequired: "Vispirms jāpiesakās.",
    initialsInvalid: "Iniciāliem jābūt 1–2 burtiem.",
    invalidDate: "Nederīgs datums.",
    initialsRequired: "Pirms datumu izvēles iestati iniciālus.",
  },
  meta: {
    title: "Dinozauri Beach — Turnīra datumi",
    description: "Norādi savu pieejamību pludmales volejbola turnīram.",
  },
} as const;

export const TOURNAMENT_MONTHS_LV = [
  { index: 6, label: lv.months.july },
  { index: 7, label: lv.months.august },
] as const;

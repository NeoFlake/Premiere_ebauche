// URL base de départ pour l'appel API
export const BASE_URL = "https://api.altered.gg/cards?";
export const DETAIL_SEARCH_BASE_URL = "https://api.altered.gg/cards/";
export const VARIANTE_URL = "/variants";

// Valeurs possible pour l'appel API (consommé par le back)
export const FACTION_API_OPTIONS: Array<string> = ["AX", "BR", "LY", "MU", "OR", "YZ"];
export const RARITY_API_OPTIONS: Array<string> = ["COMMON", "RARE", "UNIQUE"];
export const TYPE_API_OPTIONS: Array<string> = ["EXPEDITION_PERMANENT", "LANDMARK_PERMANENT", "PERMANENT", "TOKEN", "CHARACTER", "HERO", "TOKEN_MANA"];
export const SUB_TYPE_API_OPTIONS: Array<string> = [
    "ADVENTURER",
    "ANIMAL",
    "APPRENTICE",
    "ARTIST",
    "BOON",
    "BUREAUCRAT",
    "CITIZEN",
    "COMPANION",
    "CONJURATION",
    "DEITY",
    "DISRUPTION",
    "DRAGON",
    "DRUID",
    "FAIRY",
    "GEAR",
    "LANDMARK",
    "LEVIATHAN",
    "MAGE",
    "MANEUVER",
    "MESSENGER",
    "NOBLE",
    "PLANT",
    "ROBOT",
    "SCHOLAR",
    "SITE",
    "SOLDIER",
    "SONG",
    "SPIRIT",
    "TITAN",
    "TRAINER"
];

export const SET_API_OPTIONS: Array<string> = ["COREKS", "CORE", "ALIZE", "BISE", "CYCLONE", "WCQ25"];
export const KEYWORD_API_OPTIONS: Array<string> = ["RESUPPLY",
    "SEASONED",
    "BOOSTED",
    "BRASSBUG",
    "SABOTAGE",
    "BOODA",
    "ORDIS_RECRUIT",
    "GIGANTIC",
    "TOUGH_1",
    "TOUGH_2",
    "TOUGH_X",
    "DEFENDER",
    "ETERNAL",
    "AFTER_YOU",
    "MAW",
    "ANCHORED",
    "FLEETING",
    "ASLEEP"];

export const SORT_API_OPTIONS: Array<string> = ["collectionNumber ", "name ", "mainCost ", "recallCost "];
export const SORT_ORDER_API_OPTIONS: Array<string> = ["ASC", "DESC"];

// Valeurs affiché à l'utilisateur et qui correspondent à celles envoyées à l'API
export const FACTION_USER_OPTIONS: Array<string> = ["Axiom", "Bravos", "Lyra", "Muna", "Ordis", "Yzmir"];
export const RARITY_USER_OPTIONS: Array<string> = ["Commune", "Rare", "Unique"];
export const TYPE_USER_OPTIONS: Array<string> = ["Permanent d'expédition", "Repère", "Permanent", "Jeton", "Personnage", "Héro", "Jeton de mana"];
export const SUB_TYPE_USER_OPTIONS: Array<string> = [
    "Aventurier",
    "Animal",
    "Apprenti",
    "Artiste",
    "Bénédiction",
    "Bureaucrate",
    "Citoyen",
    "Compagnion",
    "Conjuration",
    "Divinité",
    "Interférence",
    "Dragon",
    "Druide",
    "Fée",
    "Matos",
    "Repère",
    "Lévihatan",
    "Mage",
    "Manoeuvre",
    "Émissaire",
    "Noble",
    "Plante",
    "Robot",
    "Érudit",
    "Lieu",
    "Soldat",
    "Chant",
    "Esprit",
    "Titan",
    "Mentor"
];
export const SET_USER_OPTIONS: Array<string> = ["KickStarter", "Au-délà des Portes", "L'Épreuve du Froid", "Murmures du Labyrinthe", "L'Odyssée des Cieux", "World Championship Qualifier 2025" ];
export const KEYWORD_USER_OPTIONS: Array<string> = ["Ravitaille",
    "Aguerri",
    "Boosté",
    "Scarabot",
    "Sabotage",
    "Booda",
    "Recrue Ordis",
    "Gigantesque",
    "Coriace 1",
    "Coriace 2",
    "Coriace X",
    "Défenseur",
    "Éternel",
    "Après-vous",
    "Maw",
    "Ancré",
    "Fugace",
    "Endormi"];
export const ALT_ART_OPTION: string = "Art Alternatif";
export const NAME_OPTION: string = "Nom";

export const SORT_USER_OPTIONS: Array<string> = ["Collection Asc", "Collection Desc", "Nom A-Z", "Nom Z-A", "Mana asc", "Mana desc", "Réserve asc", "Réserve desc"];

// Constructeurs permettant de relier les deux valeurs pour l'affectation aux diverses Checkbox du formulaire
export const FACTION_OPTIONS: Array<CheckBoxData> = FACTION_USER_OPTIONS.map((element: string, i: number) => ({
    libelle: element,
    value: FACTION_API_OPTIONS[i]
} as CheckBoxData));

export const RARITY_OPTIONS: Array<CheckBoxData> = RARITY_USER_OPTIONS.map((element: string, i: number) => ({
    libelle: element,
    value: RARITY_API_OPTIONS[i]
} as CheckBoxData));

export const TYPE_OPTIONS: Array<CheckBoxData> = TYPE_USER_OPTIONS.map((element: string, i: number) => ({
    libelle: element,
    value: TYPE_API_OPTIONS[i]
} as CheckBoxData));

export const SUB_TYPE_OPTIONS: Array<CheckBoxData> = SUB_TYPE_USER_OPTIONS.map((element: string, i: number) => ({
    libelle: element,
    value: SUB_TYPE_API_OPTIONS[i]
} as CheckBoxData));

export const SET_OPTIONS: Array<CheckBoxData> = SET_USER_OPTIONS.map((element: string, i: number) => ({
    libelle: element,
    value: SET_API_OPTIONS[i]
} as CheckBoxData));

export const KEYWORD_OPTIONS: Array<CheckBoxData> = KEYWORD_USER_OPTIONS.map((element: string, i: number) => ({
    libelle: element,
    value: KEYWORD_API_OPTIONS[i]
} as CheckBoxData));

export const SORT_OPTIONS: Array<CheckBoxData> = SORT_API_OPTIONS.flatMap((element: string, i: number) =>
  SORT_ORDER_API_OPTIONS.map((ordererElement: string, j: number): CheckBoxData => ({
    libelle: SORT_USER_OPTIONS[i * SORT_ORDER_API_OPTIONS.length + j],
    value: element + ordererElement
  }))
);

// Valeurs des options possible pour l'appel API
export const URL_FACTION = "factions[]";
export const URL_RARITY = "rarity[]";
export const URL_TYPE = "cardType[]";
export const URL_SUB_TYPE = "cardSubTypes[]";
export const URL_SET = "cardSet[]";
export const URL_ALT_ART = "altArt";
export const URL_NAME = "query";
export const URL_MAIN_COST = "mainCost[]";
export const URL_RECALL_COST = "recallCost[]";
export const URL_KEYWORD = "keyword[]";
export const URL_CARAC_FOREST = "forestPower[]";
export const URL_CARAC_MOUNTAIN = "mountainPower[]";
export const URL_CARAC_OCEAN = "oceanPower[]";
export const URL_SORT_BY = "order";
export const URL_LANGUE = "locale";
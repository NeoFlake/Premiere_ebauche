interface SearchFormData {
    factions: Array<string>,
    rarities: Array<string>,
    types: Array<string>,
    sets: Array<string>,
    altArt: boolean,
    name: string,
    mainCosts: Array<number>,
    recallCosts: Array<number>,
    keywords: Array<string>,
    forestCaracValues: Array<number>,
    mountainCaracValues: Array<number>,
    oceanCaracValues: Array<number>,
    sortBy : string;
    page: number
}
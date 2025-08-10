export interface ApiResult {
    nombresCartesTrouvees: number,
    cards: Array<any>, // TODO : créer le DTO d'une carte pour permettre de virer le any
    nombrePage: number
}
import { CardModel } from "./card.model";


export class AlteredApiGetCards {

    constructor(
        public nombreCartesTrouvees: number,
        public cards: Array<CardModel>,
        public nombrePage: number
    ){}

}
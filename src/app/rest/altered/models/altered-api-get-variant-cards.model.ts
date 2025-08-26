import { CardVariantModel } from "./card-variant.model";

export class AlteredApiGetVariantCardsModel {

    constructor(
        public nombreCartesTrouvees: number,
        public cards: Array<CardVariantModel>,
        public nombrePage: number
    ) { }

}
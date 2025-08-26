import { Elements } from "./elements.model";
import { Reference } from "./reference.model";

export class CardModel {

    constructor(
        public id: string,
        public name: string,
        public reference: string,
        public imagePath: string,
        public cardSet: Reference,
        public mainFaction: Reference,
        public rarity: Reference,
        public cardType: Reference,
        public cardSubTypes: Array<Reference>,
        public elements: Elements,
        public isSuspended: boolean,
    ) { }

}
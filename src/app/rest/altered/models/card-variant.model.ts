export class CardVariantModel {

    constructor(
        public id: string,
        public imagePath: string,
        public name: string,
        public reference: string,
        public rarity: {reference: string}
    ){}

}
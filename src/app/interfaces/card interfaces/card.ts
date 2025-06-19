import { CardElements } from "./card-elements";
import { CardMainFaction } from "./card-main-faction";
import { CardRarity } from "./card-rarity";
import { CardSet } from "./card-set";
import { CardType } from "./card-type";

export interface CardInterface {

    "@id": string,
    cardSet: CardSet,
    cardType: CardType,
    elements: CardElements,
    id: string,
    imagePath: string,
    isSuspended: boolean,
    mainFaction: CardMainFaction,
    name: string,
    qrUrlDetail: string,
    rarity: CardRarity,
    reference: string

}

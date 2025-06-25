import { CardInterface } from "./card";
import { ImagePath } from "./image-path";

export interface CardDetail extends CardInterface {
    "@context": string,
    "@type": string,
    allImagePath: ImagePath,
    cardRulings: Array<string>
}
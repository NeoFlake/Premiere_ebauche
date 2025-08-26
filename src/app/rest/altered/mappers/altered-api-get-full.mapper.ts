import { AlteredAPIGetFullDto } from "../dtos/altered-api-get-full.dto";
import { AlteredApiGetCards } from "../models/altered-api-get-cards.model";
import { CardMapper } from "./card.mapper";
import { CardVariantMapper } from "./card-variant.mapper";
import { AlteredApiGetVariantCardsModel } from "../models/altered-api-get-variant-cards.model";

export class AlteredAPIGetFullMapper {

    static fromDTO(dto: AlteredAPIGetFullDto): AlteredApiGetCards {
        
        return new AlteredApiGetCards(
            dto["hydra:totalItems"],
            dto["hydra:member"].map(CardMapper.fromDto),
            Math.ceil(dto["hydra:totalItems"] / 36)
        );
    }

    static fromVariantDTO(dto: AlteredAPIGetFullDto): AlteredApiGetVariantCardsModel {
        return new AlteredApiGetVariantCardsModel(
            dto["hydra:totalItems"],
            dto["hydra:member"].map(CardVariantMapper.fromDto),
            Math.ceil(dto["hydra:totalItems"] / 36)
        );
    }

}
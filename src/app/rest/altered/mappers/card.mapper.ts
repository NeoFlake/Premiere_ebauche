import { HydraMemberDto } from "../dtos/hydra-member.dto";
import { CardModel } from "../models/card.model";
import { ElementMapper } from "./elements.mapper";
import { ReferenceMapper } from "./reference.mapper";

export class CardMapper {

    static fromDto(dto: HydraMemberDto){
        return new CardModel(
            dto.id,
            dto.name,
            dto.reference,
            dto.imagePath,
            ReferenceMapper.fromDto(dto.cardSet),
            ReferenceMapper.fromDto(dto.mainFaction),
            ReferenceMapper.fromDto(dto.rarity),
            ReferenceMapper.fromDto(dto.cardType),
            dto.cardSubTypes.map(ReferenceMapper.fromDto),
            ElementMapper.fromDto(dto.elements),
            dto.isSuspended
        );
    }

}
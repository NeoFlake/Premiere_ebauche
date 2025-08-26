import { HydraMemberDto } from "../dtos/hydra-member.dto";
import { CardVariantModel } from "../models/card-variant.model";

export class CardVariantMapper {

    static fromDto(dto: HydraMemberDto){
        return new CardVariantModel(
            dto.id,
            dto.imagePath,
            dto.name,
            dto.reference,
            {reference: dto.reference}
        );
    }

}
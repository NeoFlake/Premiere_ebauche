import { HydraReferenceDto } from "../dtos/hydra-reference.dto";
import { Reference } from "../models/reference.model";

export class ReferenceMapper {

    static fromDto(dto: HydraReferenceDto){
        return new Reference(
            dto.id,
            dto.name,
            dto.reference,
            dto.color? dto.color : undefined
        );
    }

}
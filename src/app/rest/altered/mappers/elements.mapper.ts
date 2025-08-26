import { HydraElementDto } from "../dtos/hydra-element.dto";
import { Elements } from "../models/elements.model";

export class ElementMapper {

    static fromDto(dto: HydraElementDto){
        return new Elements(
            dto.MAIN_COST,
            dto.RECALL_COST,
            dto.FOREST_POWER,
            dto.MOUNTAIN_POWER,
            dto.OCEAN_POWER,
            dto.MAIN_EFFECT? dto.MAIN_EFFECT : undefined,
            dto.ECHO_EFFECT? dto.ECHO_EFFECT : undefined
        );
    }

} 
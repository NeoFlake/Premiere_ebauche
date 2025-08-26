import { HydraMappingDto } from "./hydra-mapping.dto";

export interface HydraSearchDto {

    "@type": string,
    "hydra:template": string,
    "hydra:variableRepresentation": string,
    "hydra:mapping": Array<HydraMappingDto>

}
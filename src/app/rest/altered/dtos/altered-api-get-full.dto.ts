import { HydraSearchDto } from "./hydra-search.dto";
import { HydraViewDto } from "./hydra-view.dto";

export interface AlteredAPIGetFullDto {

    "@context": string,
    "@id": string,
    "@type": string,
    "hydra:totalItems": number,
    "hydra:member": Array<any>,
    "hydra:view": HydraViewDto,
    "hydra:search": HydraSearchDto,

}
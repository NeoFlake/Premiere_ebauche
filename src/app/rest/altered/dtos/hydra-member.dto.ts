import { HydraElementDto } from "./hydra-element.dto"
import { HydraReferenceDto } from "./hydra-reference.dto"

export interface HydraMemberDto {

    id: string,
    cardType: HydraReferenceDto,
    cardSet: HydraReferenceDto,
    cardSubTypes: Array<HydraReferenceDto>,
    rarity: HydraReferenceDto,
    imagePath: string,
    assets: {
        WEB: Array<string>
    },
    qrUrlDetail: string,
    mainFaction: HydraReferenceDto,
    name: string,
    elements: HydraElementDto,
    cardHistoryStatus: null,
    isSuspended: boolean,
    isErrated: boolean,
    reference: string,
    "@id": string

}
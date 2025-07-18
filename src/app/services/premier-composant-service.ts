import { Injectable } from '@angular/core';
import { ApiRestAltered } from './api-rest-altered';
import { map, Observable, of } from 'rxjs';
import { BASE_URL, URL_ALT_ART, URL_CARAC_FOREST, URL_CARAC_MOUNTAIN, URL_CARAC_OCEAN, URL_FACTION, URL_KEYWORD, URL_MAIN_COST, URL_NAME, URL_RARITY, URL_RECALL_COST, URL_SET, URL_TYPE } from '../../utils/api-altered';

@Injectable({
  providedIn: 'root'
})
export class PremierComposantService {

  constructor(private apiRestAltered: ApiRestAltered) {

  }

  public premierAppelRest(formOptions: SearchFormData, rechercheComplexe: boolean):
    Observable<{ totalPages: number; totalItems: number; cards: any[] }> {

    let cardList: Array<any> = [];

    let apiRequestUrl: string = BASE_URL;
    let nbElement: number;

    if (formOptions.factions.length > 0) {
      formOptions.factions.forEach((faction: string) => {
        apiRequestUrl += `${URL_FACTION}=${faction}&`;
      });
    }

    if (formOptions.rarities.length > 0) {
      formOptions.rarities.forEach((rarity: string) => {
        apiRequestUrl += `${URL_RARITY}=${rarity}&`;
      });
    }

    if (formOptions.types.length > 0) {
      formOptions.types.forEach((type: string) => {
        apiRequestUrl += `${URL_TYPE}=${type}&`;
      });
    }

    if (formOptions.sets.length > 0) {
      formOptions.sets.forEach((set: string) => {
        apiRequestUrl += `${URL_SET}=${set}&`;
      });
    }

    if (formOptions.mainCosts.length > 0) {
      formOptions.mainCosts.forEach((mainCost: number) => {
        apiRequestUrl += `${URL_MAIN_COST}=${mainCost}&`;
      });
    }

    if (formOptions.recallCosts.length > 0) {
      formOptions.recallCosts.forEach((recallCost: number) => {
        apiRequestUrl += `${URL_RECALL_COST}=${recallCost}&`;
      });
    }

    if (formOptions.forestCaracValues.length > 0) {
      formOptions.forestCaracValues.forEach((forestCaracValue: number) => {
        apiRequestUrl += `${URL_CARAC_FOREST}=${forestCaracValue}&`;
      });
    }

    if (formOptions.mountainCaracValues.length > 0) {
      formOptions.mountainCaracValues.forEach((mountainCaracValue: number) => {
        apiRequestUrl += `${URL_CARAC_MOUNTAIN}=${mountainCaracValue}&`;
      });
    }

    if (formOptions.oceanCaracValues.length > 0) {
      formOptions.oceanCaracValues.forEach((oceanCaracValue: number) => {
        apiRequestUrl += `${URL_CARAC_OCEAN}=${oceanCaracValue}&`;
      });
    }

    if (formOptions.keywords.length > 0) {
      formOptions.keywords.forEach((keyword: string) => {
        apiRequestUrl += `${URL_KEYWORD}=${keyword}&`;
      });
    }

    if (formOptions.altArt) {
      apiRequestUrl += `${URL_ALT_ART}=true&`;
    }

    if (formOptions.name.trim() !== "") {
      apiRequestUrl += `${URL_NAME}=${formOptions.name}&`;
    }

    if (formOptions.page > 1) {
      if (rechercheComplexe) {
        apiRequestUrl += "&";
      } else {
        apiRequestUrl += "?";
      }
      apiRequestUrl + "page=" + formOptions.page
    }

    apiRequestUrl = apiRequestUrl.slice(0, -1);

    return this.apiRestAltered.getAlteredResources(apiRequestUrl).pipe(
      map((data: any) => {
        nbElement = data["hydra:totalItems"];

        this.alimenterCardArray(data["hydra:member"], cardList);

          return {
            totalPages: parseInt(data["hydra:view"]["hydra:last"].split("=")[data["hydra:view"]["hydra:last"].split("=").length - 1]),
            totalItems: nbElement,
            cards: cardList
          };
        
      }));
  }

  private alimenterCardArray(data: Array<any>, cardList: Array<any>) {
    data.forEach((element: any) => cardList.push(element));
  }

}

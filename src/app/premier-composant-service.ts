import { Injectable } from '@angular/core';
import { ApiRestAltered } from './api-rest-altered';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { BASE_URL, URL_ALT_ART, URL_CARAC_FOREST, URL_CARAC_MOUNTAIN, URL_CARAC_OCEAN, URL_FACTION, URL_KEYWORD, URL_MAIN_COST, URL_NAME, URL_RARITY, URL_RECALL_COST, URL_SET, URL_TYPE } from '../utils/api-altered';

@Injectable({
  providedIn: 'root'
})
export class PremierComposantService {

  constructor(private apiRestAltered: ApiRestAltered) {

  }

  public premierAppelRest(formOptions: SearchFormData, rechercheComplexe: boolean): Observable<{ totalItems: number; cards: any[] }> {

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

    if(formOptions.altArt){
      apiRequestUrl += `${URL_ALT_ART}=true&`;
    }

    if(formOptions.name.trim() !== ""){
      apiRequestUrl += `${URL_NAME}=${formOptions.name}&`;
    }

    // https://api.altered.gg/cards?rarity%5B%5D=COMMON&itemsPerPage=36&locale=fr-fr

    apiRequestUrl = apiRequestUrl.slice(0, -1);

    return this.apiRestAltered.getAlteredResources(apiRequestUrl).pipe(
      switchMap((data: any) => {
        nbElement = data["hydra:totalItems"];

        this.alimenterCardArray(data["hydra:member"], cardList);

        if (nbElement > 36) {
          let appels: Array<string> = [];
          for (let i: number = 2; i <= Math.round(nbElement / 36) + 1; ++i) {
            let request: string = apiRequestUrl;
            if (rechercheComplexe) {
              request += "&";
            } else {
              request += "?";
            }

            appels.push(request + "page=" + i);
          }

          return forkJoin(appels.map((appel: string) => this.apiRestAltered.getAlteredResources(appel)))
            .pipe(
              map((datas: Array<any>) => {
                datas.forEach((data: any) => {
                  this.alimenterCardArray(data["hydra:member"], cardList);
                });
                return {
                  totalItems: nbElement,
                  cards: cardList
                };
              })
            );

        } else {
          return of({
            totalItems: nbElement,
            cards: cardList
          });
        }
      }));
  }

  private alimenterCardArray(data: Array<any>, cardList: Array<any>) {
      data.forEach((element: any) => cardList.push(element));
  }

}

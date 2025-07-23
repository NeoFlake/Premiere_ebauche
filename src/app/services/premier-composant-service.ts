import { Injectable } from '@angular/core';
import { ApiRestAltered } from './api-rest-altered';
import { map, Observable, of } from 'rxjs';
import { BASE_URL, URL_ALT_ART, URL_CARAC_FOREST, URL_CARAC_MOUNTAIN, URL_CARAC_OCEAN, URL_FACTION, URL_KEYWORD, URL_MAIN_COST, URL_NAME, URL_RARITY, URL_RECALL_COST, URL_SET, URL_SUB_TYPE, URL_TYPE } from '../../utils/api-altered';
import { FormArray, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PremierComposantService {

  private totalPages: number = 1;

  constructor(private apiRestAltered: ApiRestAltered) { }

  public premierAppelRest(formOptions: SearchFormData, rechercheComplexe: boolean):
    Observable<{ totalPages: number; totalItems: number; cards: any[] }> {

    let cardList: Array<any> = [];

    let apiRequestUrl: string = BASE_URL;
    let nbElement: number;

    apiRequestUrl += this.buildApiUrl([
      [formOptions.factions, URL_FACTION, true],
      [formOptions.rarities, URL_RARITY, true],
      [formOptions.types, URL_TYPE, true],
      [formOptions.subTypes, URL_SUB_TYPE, false],
      [formOptions.sets, URL_SET, true],
      [formOptions.mainCosts, URL_MAIN_COST, true],
      [formOptions.recallCosts, URL_RECALL_COST, true],
      [formOptions.forestCaracValues, URL_CARAC_FOREST, true],
      [formOptions.mountainCaracValues, URL_CARAC_MOUNTAIN, true],
      [formOptions.oceanCaracValues, URL_CARAC_OCEAN, true],
      [formOptions.keywords, URL_KEYWORD, true],
      [formOptions.name, URL_NAME, false],
    ]);

    if (formOptions.altArt) {
      apiRequestUrl += `${URL_ALT_ART}=true&`;
    }

    if (formOptions.sortBy !== "") {
      apiRequestUrl += `${formOptions.sortBy}&`;
    }

    if (formOptions.page > 1) {
      if (rechercheComplexe) {
        apiRequestUrl += "&";
      } else {
        apiRequestUrl += "?";
      }
      apiRequestUrl = apiRequestUrl + "page=" + formOptions.page
    }

    if (apiRequestUrl[apiRequestUrl.length - 1] === "&" || apiRequestUrl[apiRequestUrl.length - 1] === "?") {
      apiRequestUrl = apiRequestUrl.slice(0, -1);
    }

    return this.apiRestAltered.getAlteredResources(apiRequestUrl).pipe(
      map((data: any) => {
        nbElement = data["hydra:totalItems"];

        this.totalPages = Math.ceil(nbElement / 36);

        this.alimenterCardArray(data["hydra:member"], cardList);
        return {
          totalPages: this.totalPages,
          totalItems: nbElement,
          cards: cardList
        };

      }));
  }

  private alimenterCardArray(data: Array<any>, cardList: Array<any>) {
    data.forEach((element: any) => cardList.push(element));
  }

  public createPaginationDisplay(numberOfPages: number, currentPage: number): Array<number | string> {
    const pagination: Array<number | string> = [];

    if (numberOfPages <= 5) {
      for (let i: number = 1; i <= numberOfPages; ++i) {
        pagination.push(i);
      }
      return pagination;
    }

    if (currentPage <= 3) {
      pagination.push(...[1, 2, 3, 4, 5], "...", numberOfPages);
    } else if (currentPage >= numberOfPages - 2) {
      pagination.push(1, "...", numberOfPages - 4, numberOfPages - 3, numberOfPages - 2, numberOfPages - 1, numberOfPages);
    } else {
      pagination.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", numberOfPages);
    }

    return pagination;
  }

  public hydrateForm(arrayOfChunks: Array<Array<any>>): boolean {
    let rechercheComplexe: boolean = false;
    arrayOfChunks.forEach((chunk: Array<any>) => {
      let isAdded = this.hydrateChunkOfForm(chunk[0], chunk[1], chunk[2], chunk[3]);
      if (rechercheComplexe === false && isAdded === true) {
        rechercheComplexe = true;
      }
    });
    return rechercheComplexe;
  }

  private hydrateChunkOfForm(options: Array<CheckBoxData> | FormArray<FormControl<any>>, formArray: FormArray<FormControl<any>>, savedData: Array<any>, withElement: boolean): boolean {
    let rechercheComplexe: boolean = false;
    if (withElement === true && Array.isArray(options)) {
      options.forEach((element: CheckBoxData, i: number) => {
        if (formArray.value[i] === true) {
          savedData.push(element.value);
          rechercheComplexe = true;
        }
      });
    } else if (withElement === false && !Array.isArray(options)) {
      options.controls.forEach((element: FormControl<boolean>, i: number) => {
        if (element.value === true) {
          savedData.push(element);
          rechercheComplexe = true;
        }
      });
    }
    return rechercheComplexe;
  }

  private buildApiUrl(arrayOfChunks: Array<Array<any>>): string {
    let apiUrl: string = "";
    arrayOfChunks.forEach((chunk: Array<any>) => {
      apiUrl += this.buildChunkOfApiUrl(chunk[0], chunk[1], chunk[2]);
    });
    return apiUrl;
  }

  private buildChunkOfApiUrl(formGroup: Array<string | number> | string, urlParams: string, isSoloElement: boolean): string {
    let chunkOfApiUrl: string = "";
    if (isSoloElement === true && Array.isArray(formGroup)) {
      if (formGroup.length > 0) {
        formGroup.forEach((element: string | number) => {
          chunkOfApiUrl += `${urlParams}=${element}&`;
        });
      }
    } else if (isSoloElement === false && !Array.isArray(formGroup)) {
      if (formGroup.trim() !== "") {
        chunkOfApiUrl += `${urlParams}=${formGroup}&`;
      }
    }
    return chunkOfApiUrl;
  }

}

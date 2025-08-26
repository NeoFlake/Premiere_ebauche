import { Injectable } from '@angular/core';
import { ApiRestAltered } from '../../../rest/altered/service/api-rest-altered';
import { CardModel } from '../../../rest/altered/models/card.model';
import { forkJoin, map, Observable, tap } from 'rxjs';
import { DETAIL_SEARCH_BASE_URL, VARIANTE_URL } from '../../../../utils/api-altered';
import { CardVariantModel } from '../../../rest/altered/models/card-variant.model';

@Injectable({
  providedIn: 'root'
})
export class DetailCarteService {

  constructor(
    private apiRestAltered: ApiRestAltered
  ) { }

  public chargerPage(idCard: string): Observable<{ detail: CardModel, variantes: Array<CardVariantModel> }> {  
    return forkJoin([
      this.apiRestAltered.getCard(`${DETAIL_SEARCH_BASE_URL}${idCard}`), 
      this.apiRestAltered.getVariant(`${DETAIL_SEARCH_BASE_URL}${idCard}${VARIANTE_URL}`)
    ]).pipe(
      map(([card, variantes]) => {
        return {
          detail: card,
          variantes: variantes.cards ?? []
        };
      }));
  }

}

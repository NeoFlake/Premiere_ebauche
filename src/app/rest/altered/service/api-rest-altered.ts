import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AlteredAPIGetFullDto } from '../dtos/altered-api-get-full.dto';
import { AlteredApiGetCards } from '../models/altered-api-get-cards.model';
import { AlteredAPIGetFullMapper } from '../mappers/altered-api-get-full.mapper';
import { CardModel } from '../models/card.model';
import { HydraMemberDto } from '../dtos/hydra-member.dto';
import { CardMapper } from '../mappers/card.mapper';
import { AlteredApiGetVariantCardsModel } from '../models/altered-api-get-variant-cards.model';

@Injectable({
  providedIn: 'root'
})
export class ApiRestAltered {

  constructor(private http: HttpClient) { }

  getAlteredResources(url: string): Observable<any> {
    return this.http.get(url);
  }

  getCards(url: string): Observable<AlteredApiGetCards> {
    return this.http.get<AlteredAPIGetFullDto>(url)
      .pipe(
        map(dto => AlteredAPIGetFullMapper.fromDTO(dto))
      );
  }

  getCard(url: string): Observable<CardModel> {
    return this.http.get<HydraMemberDto>(url).pipe(
      map(dto => CardMapper.fromDto(dto))
    );
  }

  getVariant(url: string): Observable<AlteredApiGetVariantCardsModel> {
    return this.http.get<AlteredAPIGetFullDto>(url)
      .pipe(
        map(dto => AlteredAPIGetFullMapper.fromVariantDTO(dto))
      );
  }

}

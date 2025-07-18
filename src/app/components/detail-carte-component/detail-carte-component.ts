import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { CardDetail } from '../../interfaces/card/card-details';
import { BASE_URL, DETAIL_SEARCH_BASE_URL, URL_TYPE } from '../../../utils/api-altered';
import { DETAIL_CARTE_HTML_TEXTE } from '../../../utils/text-constantes';

@Component({
  selector: 'detail-carte-component',
  imports: [],
  templateUrl: './detail-carte-component.html',
  styleUrl: './detail-carte-component.css'
})
export class DetailCarteComponent {

  public card!: CardDetail;

  public readonly DETAIL_CARTE_HTML_TEXTE = DETAIL_CARTE_HTML_TEXTE;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<CardDetail>(`${DETAIL_SEARCH_BASE_URL}${id}`).pipe(
      tap((card: CardDetail) => {

        this.card = card;

      })
    ).subscribe();
  }

  public goToSearchWithType(type: string): void {
    this.router.navigate(['/'], { queryParams: { cardType: type } });
  }

  public goToSearchWithSubType(subType: string): void {
    this.router.navigate(['/'], { queryParams: { subCardTypes: subType } });
  }

}

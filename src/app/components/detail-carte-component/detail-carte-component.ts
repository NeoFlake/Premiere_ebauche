import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, tap } from 'rxjs';
import { CardDetail } from '../../interfaces/card/card-details';
import { DETAIL_SEARCH_BASE_URL, URL_TYPE, VARIANTE_URL } from '../../../utils/api-altered';
import { DETAIL_CARTE_HTML_TEXTE } from '../../../utils/text-constantes';
import { GoldenTextPipe } from '../../pipes/golden-text-pipe';
import { TextParserPipe } from "../../pipes/text-parser-pipe";
import { FactionParserPipe } from "../../pipes/faction-parser-pipe";
import { Card } from '../card/card';

@Component({
  selector: 'detail-carte-component',
  imports: [GoldenTextPipe, TextParserPipe, FactionParserPipe, Card],
  templateUrl: './detail-carte-component.html',
  styleUrl: './detail-carte-component.css'
})
export class DetailCarteComponent {

  public card!: CardDetail;
  public variantesCarte!: Array<CardDetail>;

  public readonly DETAIL_CARTE_HTML_TEXTE = DETAIL_CARTE_HTML_TEXTE;

  public readonly CHARACTER: string = "CHARACTER";

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const idCarte = this.route.snapshot.paramMap.get('id')!;
    this.chargerPage(idCarte);
  }

  public getRecallCostColor(faction: string): string {
    let background: string = "grey";
    switch (faction) {
      case "AX":
        background = "radial-gradient(circle, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 70%),rgb(131, 77, 54)";
        break;
      case "BR":
        background = "radial-gradient(circle, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 70%),rgb(160, 37, 54)";
        break;
      case "LY":
        background = "radial-gradient(circle, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 70%),rgb(205, 68, 110)";
        break;
      case "MU":
        background = "radial-gradient(circle, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 70%),rgb(205, 107, 64)";
        break;
      case "OR":
        background = "radial-gradient(circle, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 70%),rgb(34, 96, 139)";
        break;
      case "YZ":
        background = "radial-gradient(circle, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 70%),rgb(107, 79, 146)";
        break;
    }
    return background;
  }

  public goToSearch(wichOne: string, research: string) {
    const query = { [wichOne]: research.replace(/#/g, '') };
    this.router.navigate(['/'], { queryParams: query });
  }

  public afficherVariante(idCarte: string) {
    this.chargerPage(idCarte);
  }

  public chargerPage(idCarte: string) {
    const appelDetailCarte: Observable<CardDetail> = this.http.get<CardDetail>(`${DETAIL_SEARCH_BASE_URL}${idCarte}`);
    const appelVarianteCarte: Observable<any> = this.http.get<any>(`${DETAIL_SEARCH_BASE_URL}${idCarte}${VARIANTE_URL}`); // Renvoi le type de ressource standard
    forkJoin([appelDetailCarte, appelVarianteCarte]).pipe(
      tap(([card, variantesCarte]) => {
        this.card = card as CardDetail; // Ici on match avec le premier appel REST, celui qui remonte le détail de la carte
        this.variantesCarte = (variantesCarte?.["hydra:member"] ?? []) as Array<CardDetail>; // Celui-ci sera matché avec le deuxième appel REST, celui qui remonte les variantes
      })
    ).subscribe();
  }

}

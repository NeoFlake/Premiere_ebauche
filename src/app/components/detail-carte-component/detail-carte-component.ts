import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { CardDetail } from '../../interfaces/card/card-details';
import { DETAIL_SEARCH_BASE_URL, URL_TYPE } from '../../../utils/api-altered';
import { DETAIL_CARTE_HTML_TEXTE } from '../../../utils/text-constantes';
import { GoldenTextPipe } from '../../pipes/golden-text-pipe';
import { TextParserPipe } from "../../pipes/text-parser-pipe";
import { FactionParserPipe } from "../../pipes/faction-parser-pipe";

@Component({
  selector: 'detail-carte-component',
  imports: [GoldenTextPipe, TextParserPipe, FactionParserPipe],
  templateUrl: './detail-carte-component.html',
  styleUrl: './detail-carte-component.css'
})
export class DetailCarteComponent {

  public card!: CardDetail;

  public readonly DETAIL_CARTE_HTML_TEXTE = DETAIL_CARTE_HTML_TEXTE;

  public readonly CHARACTER: string = "CHARACTER";

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

  public getRecallCostColor(faction: string): string {
    let backgroundColor: string = "grey";
    switch (faction) {
      case "AX":
        backgroundColor = "rgb(131, 77, 54)";
        break;
      case "BR":
        backgroundColor = "rgb(160, 37, 54)";
        break;
      case "LY":
        backgroundColor = "rgb(205, 68, 110)";
        break;
      case "MU":
        backgroundColor = "rgb(205, 107, 64)";
        break;
      case "OR":
        backgroundColor = "rgb(34, 96, 139)";
        break;
      case "YZ":
        backgroundColor = "rgb(107, 79, 146)";
        break;
    }
    return backgroundColor;
  }

  public goToSearch(wichOne: string, research: string) {
    const query = { [wichOne]: research.replace(/#/g, '') };
    this.router.navigate(['/'], { queryParams: query });
  }

}

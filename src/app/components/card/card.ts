import { Component, Input, output } from '@angular/core';
import { Router } from '@angular/router';
import { CardModel } from '../../rest/altered/models/card.model';
import { CardVariantModel } from '../../rest/altered/models/card-variant.model';

@Component({
  selector: 'card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {

  @Input() card!: CardModel|CardVariantModel;
  @Input() modeVariante!: boolean;

  public varianteADetailler = output<string>();

  constructor(
    private router: Router
  ) { }

  public openDetailCard(card: CardModel|CardVariantModel) {
    if (this.router.url.split('/')[1] === "carte") {   
      this.varianteADetailler.emit(card.reference);
    } else {
      this.router.navigate(["carte", card.reference]);
    }
  }

}

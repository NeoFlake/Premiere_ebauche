import { Component, input, Input, output } from '@angular/core';
import { CardInterface } from '../../interfaces/card/card';
import { Router } from '@angular/router';

@Component({
  selector: 'card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {

  @Input() card!: CardInterface;

  public varianteADetailler = output<string>();
  @Input() modeVariante!: boolean;

  constructor(
    private router: Router
  ) { }

  public openDetailCard(card: CardInterface) {
    if (this.router.url.split('/')[1] === "carte") {   
      this.varianteADetailler.emit(card.reference);
    } else {
      this.router.navigate(["carte", card.reference]);
    }
  }

}

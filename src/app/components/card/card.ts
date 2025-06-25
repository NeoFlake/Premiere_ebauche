import { Component, Input } from '@angular/core';
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

  constructor(
    private router: Router
  ){}

  public openDetailCard(card: CardInterface) {
    this.router.navigate(["carte", card.reference]);
  }

}

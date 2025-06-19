import { Component, Input } from '@angular/core';
import { CardInterface } from '../interfaces/card interfaces/card';

@Component({
  selector: 'card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {

  @Input() card!: CardInterface;

}

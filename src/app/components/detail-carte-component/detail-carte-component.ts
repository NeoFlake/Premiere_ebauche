import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from '../card/card';

@Component({
  selector: 'detail-carte-component',
  imports: [],
  templateUrl: './detail-carte-component.html',
  styleUrl: './detail-carte-component.css'
})
export class DetailCarteComponent {

  card!: Card;

  constructor(private router: Router) { 
    const nav = this.router.getCurrentNavigation();
    this.card = nav?.extras?.state?.['card'] ?? history.state.card;
  }

}

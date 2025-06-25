import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardInterface } from '../../interfaces/card/card';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { CardDetail } from '../../interfaces/card/card-details';

@Component({
  selector: 'detail-carte-component',
  imports: [],
  templateUrl: './detail-carte-component.html',
  styleUrl: './detail-carte-component.css'
})
export class DetailCarteComponent {

  card!: CardDetail;

  constructor(private http: HttpClient, private route: ActivatedRoute) { 
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<CardDetail>(`https://api.altered.gg/cards/${id}`).pipe(
      tap((card: CardDetail) => {
        this.card = card;
      })
    ).subscribe();
  }

}

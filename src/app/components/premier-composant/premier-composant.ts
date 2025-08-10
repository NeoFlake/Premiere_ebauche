import { Component } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Pagination } from '../shared/pagination/pagination';
import { Card } from '../card/card';
import { SearchForm } from "../shared/search-form/search-form";
import { ApiResult } from '../../interfaces/api/api-result';

@Component({
  selector: 'premier-composant',
  imports: [CommonModule, Card, Pagination, SearchForm],
  templateUrl: './premier-composant.html',
  styleUrl: './premier-composant.css',
  standalone: true
})
export class PremierComposant {

  public rechercheEffectuee: boolean = false;

  public nombresCartesTrouvees: number = 0;
  public cards: Array<any> = [];
  // Input du composant de pagination
  public nombrePage: number = 0;

  // Page actuelle sur laquelle se situe la pagination
  public actualPage$ : BehaviorSubject<number> = new BehaviorSubject<number>(0);

  // Permet de réinitialiser la pagination si une nouvelle recherche est effectuée
  public isNavigation$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    this.actualPage$
    .pipe(
      tap((actualPage: number) =>{ 
        if(actualPage > 0){
          this.navigation();
        }
      })
    )
    .subscribe();
  }

  // Intercepte les changements de page sur la navigation
  public navigation(): void {
    this.isNavigation$.next(true);
  }

  public displayApiResult(apiResult: ApiResult): void {
    this.nombresCartesTrouvees = apiResult.nombresCartesTrouvees;
    this.cards = apiResult.cards;
    this.nombrePage = apiResult.nombrePage;
  }

  public displayResultArea(displayed: boolean): void {
    this.rechercheEffectuee = displayed;
  }

}

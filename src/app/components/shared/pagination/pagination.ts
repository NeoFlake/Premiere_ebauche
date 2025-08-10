import { Component, Input, SimpleChanges } from '@angular/core';
import { PaginationService } from './service/pagination-service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css'
})
export class Pagination {

  @Input() nombrePage!: number;

  @Input() actualPage$!: BehaviorSubject<number>;

  public actualPage: number = 1;

  public pagination: (number | string)[] = [];

  constructor(private paginationService: PaginationService) { }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes["nombrePage"] );
    if (changes["nombrePage"] && changes["nombrePage"].currentValue > 0) {
      this.actualPage = 1;
      this.pagination = [];
      this.reloadPagination();
    }
  }

  public previous(): void {
    if (this.actualPage > 1) {
      this.actualPage -= 1;
      this.actualPage$.next(this.actualPage);
      this.reloadPagination();
    }
  }

  public next(): void {
    if (this.actualPage < this.nombrePage) {
      this.actualPage += 1;
      this.actualPage$.next(this.actualPage);
      this.reloadPagination();
    }
  }

  public changePage(page: number): void {
    if (typeof page === 'number' && page !== this.actualPage) {
      this.actualPage = page;
      this.actualPage$.next(page);
      this.reloadPagination();
    }
  }

  public reloadPagination() {
    this.pagination = this.paginationService.createDisplay(this.nombrePage, this.actualPage);
  }

}

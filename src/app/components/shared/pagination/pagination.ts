import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { PaginationService } from './service/pagination-service';

@Component({
  selector: 'pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css'
})
export class Pagination {

  @Input() totalPages!: number;

  @Output() pageChange = new EventEmitter<number>();

  public pagination: (number | string)[] = [];
  public currentPage: number = 1;

  constructor(private paginationService: PaginationService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["totalPages"]) {
      this.currentPage = 1;
      this.pagination = [];
      this.reloadPagination();
    }
  }

  public previous(): void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.pageChange.emit(this.currentPage);
      this.reloadPagination();
    }
  }

  public next(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      this.pageChange.emit(this.currentPage);
      this.reloadPagination();
    }
  }

  public changePage(page: number): void {
    if (typeof page === 'number' && page !== this.currentPage) {
      this.currentPage = page;
      this.pageChange.emit(page);
      this.reloadPagination();
    }
  }

  public reloadPagination() {
    this.pagination = this.paginationService.createDisplay(this.totalPages, this.currentPage);
  }

}

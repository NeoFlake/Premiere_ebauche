import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }

  public createDisplay(numberOfPages: number, currentPage: number): Array<number | string> {
    const pagination: Array<number | string> = [];

    if (numberOfPages <= 5) {
      for (let i: number = 1; i <= numberOfPages; ++i) {
        pagination.push(i);
      }
      return pagination;
    }

    if (currentPage <= 3) {
      pagination.push(...[1, 2, 3, 4, 5], "...", numberOfPages);
    } else if (currentPage >= numberOfPages - 2) {
      pagination.push(1, "...", numberOfPages - 4, numberOfPages - 3, numberOfPages - 2, numberOfPages - 1, numberOfPages);
    } else {
      pagination.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", numberOfPages);
    }

    return pagination;
  }

}

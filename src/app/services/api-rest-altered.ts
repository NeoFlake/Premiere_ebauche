import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRestAltered {

  constructor(private http: HttpClient) { 

  }

  getAlteredResources(url: string): Observable<any> {
    return this.http.get(url);
  }

}

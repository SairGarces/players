import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from './environment';

@Injectable({
  providedIn: 'root',
})
export class Services {
  private url = environment.apiUrl;

  constructor(public http: HttpClient) { }

  public post(data: any): Observable<any> {
    return this.http.post(`${this.url}/create`, data);
  }

  public put(data: any): Observable<any> {
    return this.http.put(`${this.url}/update`, data);
  }

  public get(): Observable<any> {
    return this.http.get(`${this.url}/read`);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/delete`);
  }
}

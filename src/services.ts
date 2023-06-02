import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { env } from './environment';

@Injectable({
  providedIn: 'root',
})
export class Services {
  private url = env.apiUrl;

  constructor(public http: HttpClient) { }

  public post(data: any): Observable<any> {
    return this.http.post(`${this.url}/create`, data);
  }

  public put(data: any, id: number): Observable<any> {
    let dato = {
      name: data.name,
      cups: data.cups,
      team: data.team,
      position: data.position,
      birthdate: data.birthdate,
      id: id
    }

    return this.http.put(`${this.url}/update`, dato);
  }

  public get(): Observable<any> {
    return this.http.get(`${this.url}/read`);
  }
  public calculate(): Observable<any> {
    return this.http.get(`${this.url}/calculate`);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/delete`, { body: { id: id } });
  }
}

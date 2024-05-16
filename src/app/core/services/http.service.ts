import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getAll<T>(url: string, params?: HttpParams): Observable<ListResponse<T>> {
    return this.http.get<ListResponse<T>>(url, { params,  responseType: 'json'});
  }

  get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(url, { params, responseType: 'json' });
  }
}

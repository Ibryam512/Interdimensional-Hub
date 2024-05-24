import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ListResponse } from '../../core/models/list-response.model';
import { HttpService } from '../../core/services/http.service';
import { Location } from './location.model';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  private searchValue: string = '';

  locationsChanged = new Subject<ListResponse<Location>>();

  constructor(private httpService: HttpService) {}

  getLocations(params?: HttpParams) {
    this.httpService
      .getAll<Location>('https://rickandmortyapi.com/api/location', params)
      .subscribe({
        next: (data: ListResponse<Location>) => {
          this.locationsChanged.next(data);
        },
        error: (error) => {
          const data: ListResponse<Location> = {
            info: {
              count: 0,
              pages: 0,
              next: null,
              prev: null,
            },
            results: [],
          };
          this.locationsChanged.next(data);
        },
      });
  }

  getLocationsByPage(page: number) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('name', this.searchValue);

    this.getLocations(params);
  }

  getLocationsByName(value: string) {
    this.searchValue = value;
    this.getLocationsByPage(1);
  }
}

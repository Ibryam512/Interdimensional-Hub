import { Component } from '@angular/core';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { LocationCardComponent } from '../location-card/location-card.component';
import { MatDivider } from '@angular/material/divider';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ListResponse } from '../../../../core/models/list-response.model';
import { Subscription } from 'rxjs';
import { Location } from '../../location.model';
import { LocationsService } from '../../locations.service';
import { LOCATIONS_COUNT_PER_PAGE } from '../../../../shared/constants/pagination.constants';

@Component({
  selector: 'app-locations-list',
  standalone: true,
  imports: [SearchComponent, LocationCardComponent, MatDivider, MatPaginator],
  templateUrl: './locations-list.component.html',
  styleUrl: './locations-list.component.scss'
})
export class LocationsListComponent {
    public response!: ListResponse<Location>;
    private locationsChanged!: Subscription; //TODO: fix this
  
    locationsCountPerPage = LOCATIONS_COUNT_PER_PAGE;
  
    constructor(private locationsService: LocationsService) { }
  
    ngOnInit(): void {
      this.locationsChanged = this.locationsService.locationsChanged.subscribe(
        (response: ListResponse<Location>) => {
          this.response = response;
        }
      );
  
      this.locationsService.getLocations();
    }
  
    ngOnDestroy(): void {
      this.locationsChanged.unsubscribe();
    }
  
    handlePageEvent(e: PageEvent) {
      this.locationsService.getLocationsByPage(e.pageIndex + 1);
    }
  
    onSearch(value: string) {
      this.locationsService.getLocationsByName(value);
    }
}

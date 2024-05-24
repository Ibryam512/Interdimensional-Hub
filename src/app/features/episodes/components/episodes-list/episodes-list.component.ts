import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { ListResponse } from '../../../../core/models/list-response.model';
import { Subscription } from 'rxjs';
import { EpisodesService } from '../../episodes.service';
import { Episode } from '../../episode.model';
import { EpisodeItemComponent } from '../episode-item/episode-item.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { COUNT_PER_PAGE } from '../../../../shared/constants/pagination.constants';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [EpisodeItemComponent, SearchComponent, MatButtonModule, MatListModule, MatPaginator],
  templateUrl: './episodes-list.component.html',
  styleUrl: './episodes-list.component.scss',
})
export class EpisodesListComponent implements OnInit, OnDestroy {
  public response!: ListResponse<Episode>;
  private episodesChanged!: Subscription;

  episodesCountPerPage = COUNT_PER_PAGE;

  constructor(private episodesService: EpisodesService) {}

  ngOnInit(): void {
    this.episodesChanged = this.episodesService.episodesChanged.subscribe(
      (response: ListResponse<Episode>) => {
        this.response = response;
      }
    );

    this.episodesService.getEpisodes();
  }

  ngOnDestroy(): void {
    this.episodesChanged.unsubscribe();
  }

  handlePageEvent(e: PageEvent) {
    this.episodesService.getEpisodesByPage(e.pageIndex + 1);
  }

  onSearch(value: string) {
    this.episodesService.searchEpisode(value);
  }

  onSelect(e: MatSelectionListChange) {
    const selectedOptions = e.source.selectedOptions.selected;
    const selectedItems = selectedOptions.map(option => option.value);
    
    this.episodesService.toggleWatchedEpisodes(selectedItems);
  }

  reset() {
    this.episodesService.resetWatchedEpisodes();
  }
}

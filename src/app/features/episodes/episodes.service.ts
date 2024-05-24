import { Injectable } from '@angular/core';
import { Episode } from './episode.model';
import { ListResponse } from '../../core/models/list-response.model';
import { Subject } from 'rxjs';
import { HttpService } from '../../core/services/http.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  private watchedEpisodes: Episode[] = [];
  private searchValue: string = '';

  episodesChanged = new Subject<ListResponse<Episode>>();

  constructor(private httpService: HttpService) {
    const watched = localStorage.getItem('watched');
    this.watchedEpisodes = watched ? JSON.parse(watched) : [];
  }

  getEpisodes(params?: HttpParams) {
    this.httpService
      .getAll<Episode>('https://rickandmortyapi.com/api/episode', params)
      .subscribe({
        next: (data: ListResponse<Episode>) => {
          this.watchedEpisodes.map((ep) => {
            const episode = data.results.find((x) => x.id == ep.id);

            if (episode) {
              episode.watched = true;
            }
          });

          this.episodesChanged.next(data);
        },
        error: (error) => {
          const data: ListResponse<Episode> = {
            info: {
              count: 0,
              pages: 0,
              next: null,
              prev: null,
            },
            results: [],
          };
          this.episodesChanged.next(data);
        },
      });
  }

  searchEpisode(value: string) {
    this.searchValue = value;

    const params = new HttpParams()
      .set('page', 1)
      .set('name', value);

    this.getEpisodes(params);
  }

  getEpisodesByPage(page: number) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('name', this.searchValue);

    this.getEpisodes(params);
  }

  toggleWatchedEpisodes(episodes: Episode[]) {
    this.watchedEpisodes = this.getUniqueWatchedEpisodes(this.watchedEpisodes, episodes);

    localStorage.setItem('watched', JSON.stringify(this.watchedEpisodes));
  }

  resetWatchedEpisodes() {
    this.watchedEpisodes.map((episode) => episode.watched = false);

    this.watchedEpisodes = [];
    localStorage.setItem('watched', JSON.stringify(this.watchedEpisodes));
  }

  private getUniqueWatchedEpisodes(watchedEpisodes: Episode[], newWatchedEpisodes: Episode[]): Episode[] {
    const map = new Map<number, Episode>();

    watchedEpisodes.forEach((episode) => map.set(episode.id, episode));
    newWatchedEpisodes.forEach((episode) => map.set(episode.id, episode));

    return Array.from(map.values());
  }
}

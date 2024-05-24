import { Routes } from '@angular/router';
import { CharactersListComponent } from './features/characters/components/characters-list/characters-list.component';
import { EpisodesListComponent } from './features/episodes/components/episodes-list/episodes-list.component';
import { LocationsListComponent } from './features/locations/components/locations-list/locations-list.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'characters',
    component: CharactersListComponent,
  },
  {
    path: 'locations',
    component: LocationsListComponent,
  },
  {
    path: 'episodes',
    component: EpisodesListComponent,
  },
];

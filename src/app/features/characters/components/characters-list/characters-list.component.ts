import { Component, OnDestroy, OnInit } from '@angular/core';
import { CharactersService } from '../../characters.service';
import { Character } from '../../character.model';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { Subscription } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ListResponse } from '../../../../core/models/list-response.model';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  CHARACTERS_COUNT_PER_PAGE,
  FAVOURITE_CHARACTERS_COUNT_PER_PAGE,
} from '../../../../shared/constants/pagination.constants';
import { SearchComponent } from '../../../../shared/components/search/search.component';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.scss',
  imports: [
    CharacterCardComponent,
    MatFormFieldModule,
    MatDividerModule,
    MatPaginatorModule,
    MatInputModule,
    FormsModule,
    SearchComponent,
  ],
})
export class CharactersListComponent implements OnInit, OnDestroy {
  public response!: ListResponse<Character>;
  public favouriteCharacters: ListResponse<Character>;
  private charactersChanged!: Subscription; //TODO: fix this
  private favouriteCharacterChanged!: Subscription;

  charactersCountPerPage = CHARACTERS_COUNT_PER_PAGE;
  favouriteCharactersCountPerPage = FAVOURITE_CHARACTERS_COUNT_PER_PAGE;

  constructor(private charactersService: CharactersService) {
    this.favouriteCharacters = this.charactersService.getFavoriteCharacters();
  }

  ngOnInit(): void {
    this.charactersChanged = this.charactersService.charactersChanged.subscribe(
      (response: ListResponse<Character>) => {
        this.response = response;
      }
    );

    this.favouriteCharacterChanged =
      this.charactersService.favoriteCharactersChanged.subscribe(
        (response: ListResponse<Character>) => {
          this.favouriteCharacters = response;
        }
      );

    this.charactersService.getCharacters();
  }

  ngOnDestroy(): void {
    this.charactersChanged.unsubscribe();
    this.favouriteCharacterChanged.unsubscribe();
  }

  handlePageEvent(e: PageEvent) {
    this.charactersService.getCharactersByPage(e.pageIndex + 1);
  }

  handleFavouritePageEvent(e: PageEvent) {
    this.favouriteCharacters = this.charactersService.getFavoriteCharacters(
      e.pageIndex + 1
    );
  }
}

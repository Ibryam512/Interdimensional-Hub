import { Component, OnDestroy, OnInit } from '@angular/core';
import { CharactersService } from '../../characters.service';
import { Character } from '../../character.model';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { Subscription } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ListResponse } from '../../../../core/models/response.model';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.scss',
  imports: [CharacterCardComponent, MatDividerModule, MatPaginatorModule],
})
export class CharactersListComponent implements OnInit, OnDestroy {
  public response!: ListResponse<Character>;
  public favouriteCharacters: ListResponse<Character>;
  private charactersChanged!: Subscription; //TODO: fix this
  private favouriteCharacterChanged!: Subscription;

  constructor(private charactersService: CharactersService) {
    this.favouriteCharacters = this.charactersService.getFavoriteCharacters();
  }

  ngOnInit(): void {
    this.charactersService.getCharacters();
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
  }

  ngOnDestroy(): void {
    this.charactersChanged.unsubscribe();
    this.favouriteCharacterChanged.unsubscribe();
  }

  handlePageEvent(e: PageEvent) {
    this.charactersService.getCharactersByPage(e.pageIndex + 1);
  }

  handleFavouritePageEvent(e: PageEvent) {
    this.favouriteCharacters = this.charactersService.getFavoriteCharacters(e.pageIndex + 1);
  }
}

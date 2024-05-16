import { Component, OnDestroy, OnInit } from '@angular/core';
import { CharactersService } from '../../characters.service';
import { Character } from '../../character.model';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { Subscription } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ListResponse } from '../../../../core/models/response.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.scss',
  imports: [CharacterCardComponent, MatDividerModule, MatPaginatorModule, MatInputModule, MatIconModule, FormsModule],
})
export class CharactersListComponent implements OnInit, OnDestroy {
  public response!: ListResponse<Character>;
  public favouriteCharacters: ListResponse<Character>;
  private charactersChanged!: Subscription; //TODO: fix this
  private favouriteCharacterChanged!: Subscription;

  value: string = '';

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

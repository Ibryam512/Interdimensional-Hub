import { Injectable } from '@angular/core';
import { HttpService } from '../../core/services/http.service';
import { Character } from './character.model';
import { Subject } from 'rxjs';
import { ListResponse } from '../../core/models/list-response.model';
import { HttpParams } from '@angular/common/http';
import { FAVOURITE_CHARACTERS_COUNT_PER_PAGE } from '../../shared/constants/pagination.constants';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private favoriteCharacters: Character[] = [];
  private searchValue: string = '';

  charactersChanged = new Subject<ListResponse<Character>>();
  favoriteCharactersChanged = new Subject<ListResponse<Character>>();

  constructor(private httpService: HttpService) {}

  //TODO: move the conn string somewhere else
  getCharacters(params?: HttpParams) {
    this.httpService
      .getAll<Character>('https://rickandmortyapi.com/api/character', params)
      .subscribe({
        next: (data: ListResponse<Character>) => {
          this.charactersChanged.next(data);
        },
        error: (error) => {
          const data: ListResponse<Character> = {
            info: {
              count: 0,
              pages: 0,
              next: null,
              prev: null,
            },
            results: [],
          };
          this.charactersChanged.next(data);
        },
      });
  }

  getCharactersByPage(page: number) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('name', this.searchValue);

    this.getCharacters(params);
  }

  getCharactersByName(value: string) {
    this.searchValue = value;

    this.getCharactersByPage(1);
  }

  getFavoriteCharacters(page?: number) {
    const characters = localStorage.getItem('characters');

    if (characters) {
      this.favoriteCharacters = JSON.parse(characters);
    }

    const response: ListResponse<Character> = {
      info: {
        count: this.favoriteCharacters.length,
        pages:
          this.favoriteCharacters.length / FAVOURITE_CHARACTERS_COUNT_PER_PAGE,
        next: null,
        prev: null,
      },
      results: this.favoriteCharacters.slice(
        page ? (page - 1) * FAVOURITE_CHARACTERS_COUNT_PER_PAGE : 0,
        page
          ? page * FAVOURITE_CHARACTERS_COUNT_PER_PAGE
          : this.favoriteCharacters.length
      ),
    };

    return response;
  }

  saveCharacter(character: Character) {
    if (this.favoriteCharacters.some((c) => c.id === character.id)) {
      return;
    }

    this.favoriteCharacters.push(character);
    localStorage.setItem('characters', JSON.stringify(this.favoriteCharacters));

    const page =
      this.favoriteCharacters.length % FAVOURITE_CHARACTERS_COUNT_PER_PAGE == 0
        ? this.favoriteCharacters.length / FAVOURITE_CHARACTERS_COUNT_PER_PAGE
        : Math.floor(
            this.favoriteCharacters.length / FAVOURITE_CHARACTERS_COUNT_PER_PAGE
          ) + 1;

    this.favoriteCharactersChanged.next(this.getFavoriteCharacters(page));
  }

  removeCharacter(character: Character) {
    this.favoriteCharacters = this.favoriteCharacters.filter(
      (c) => c.id !== character.id
    );

    localStorage.setItem('characters', JSON.stringify(this.favoriteCharacters));
    this.favoriteCharactersChanged.next(this.getFavoriteCharacters());
  }
}

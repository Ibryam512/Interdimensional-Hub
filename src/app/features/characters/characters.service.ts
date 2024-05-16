import { Injectable } from '@angular/core';
import { HttpService } from '../../core/services/http.service';
import { Character } from './character.model';
import { Subject } from 'rxjs';
import { ListResponse } from '../../core/models/response.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private favoriteCharacters: Character[] = [];

  charactersChanged = new Subject<ListResponse<Character>>();
  favoriteCharactersChanged = new Subject<ListResponse<Character>>();

  constructor(private httpService: HttpService) {}

  getCharacters(params?: HttpParams) {
    this.httpService
      .getAll<Character>('https://rickandmortyapi.com/api/character', params)
      .subscribe((data: ListResponse<Character>) => {
        this.charactersChanged.next(data);
      });
  }

  getCharactersByPage(page: number) {
    const params = new HttpParams().set('page', page.toString());
    this.getCharacters(params);
  }

  getCharacterById(id: number) {
    return this.httpService.get<Character>(
      `https://rickandmortyapi.com/api/character/${id}`
    );
  }

  getFavoriteCharacters(page?: number) {
    const characters = localStorage.getItem('characters');

    if (characters) {
      this.favoriteCharacters = JSON.parse(characters);
    }

    const response: ListResponse<Character> = {
      info: {
        count: this.favoriteCharacters.length,
        pages: this.favoriteCharacters.length / 20,
        next: null,
        prev: null,
      },
      results: this.favoriteCharacters.slice(
        page ? (page - 1) * 20 : 0,
        page ? page * 20 : this.favoriteCharacters.length
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
    this.favoriteCharactersChanged.next(this.getFavoriteCharacters());
  }

  removeCharacter(character: Character) {
    this.favoriteCharacters = this.favoriteCharacters.filter(
      (c) => c.id !== character.id
    );
    localStorage.setItem('characters', JSON.stringify(this.favoriteCharacters));
    this.favoriteCharactersChanged.next(this.getFavoriteCharacters());
  }
}

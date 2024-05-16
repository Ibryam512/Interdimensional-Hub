import { Injectable } from '@angular/core';
import { HttpService } from '../../core/services/http.service';
import { Character } from './character.model';
import { Subject } from 'rxjs';
import { ListResponse } from '../../core/models/response.model';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private characters: Character[] = [];
  private favoriteCharacters: Character[] = [];

  charactersChanged = new Subject<Character[]>();

  constructor(private httpService: HttpService) {
  }

  getCharacters() {
    this.httpService
      .get<Character>('https://rickandmortyapi.com/api/character')
      .subscribe((data: ListResponse<Character>) => {
        this.characters = data.results;
        this.charactersChanged.next(this.characters);
      });
  }

  getCharacterById(id: number) {
    return this.characters.find((character) => character.id === id);
  }

  saveCharacter(character: Character) {
    this.favoriteCharacters.push(character);
    localStorage.setItem('characters', JSON.stringify(this.favoriteCharacters));
  }

  removeCharacter(character: Character) {
    this.favoriteCharacters = this.favoriteCharacters.filter(
      (c) => c.id !== character.id
    );
    localStorage.setItem('characters', JSON.stringify(this.favoriteCharacters));
  }
}

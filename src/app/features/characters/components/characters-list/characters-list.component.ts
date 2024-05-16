import { Component, OnDestroy, OnInit } from '@angular/core';
import { CharactersService } from '../../characters.service';
import { Character } from '../../character.model';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { Subscription } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
    selector: 'app-characters-list',
    standalone: true,
    templateUrl: './characters-list.component.html',
    styleUrl: './characters-list.component.scss',
    imports: [CharacterCardComponent, MatDividerModule, MatPaginatorModule]
})
export class CharactersListComponent implements OnInit, OnDestroy {
  characters: Character[] = [];
  private charactersChanged!: Subscription; //TODO: fix this

  constructor(private charactersService: CharactersService) {}

  ngOnInit(): void {
    this.charactersService.getCharacters();
    this.charactersChanged = this.charactersService.charactersChanged.subscribe(
      (characters: Character[]) => {
        this.characters = characters;
      }
    );
  }

  ngOnDestroy(): void {
    this.charactersChanged.unsubscribe();
  }
}

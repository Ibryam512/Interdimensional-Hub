import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CharactersService } from '../../../features/characters/characters.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatButton, MatInputModule, FormsModule, MatFormFieldModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Input() type: 'characters' | 'locations' | 'episodes' = 'characters';
  value: string = '';

  constructor(private charactersService: CharactersService) {}

  onSearch() {
    switch (this.type) {
        case 'characters':
            this.charactersService.getCharactersByPageAndName(1, this.value);
            break;
    }
  }
}

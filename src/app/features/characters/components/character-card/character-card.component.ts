import { Component, Input } from '@angular/core';
import { Character } from '../../character.model';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss'
})
export class CharacterCardComponent {
    @Input() character: Character = {} as Character;
}

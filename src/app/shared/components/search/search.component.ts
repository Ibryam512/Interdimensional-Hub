import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatButton, MatInputModule, FormsModule, MatFormFieldModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Output() search = new EventEmitter<string>();
  value: string = ''; 

  constructor() {}

  onSearch() {
    this.search.emit(this.value);
  }
}

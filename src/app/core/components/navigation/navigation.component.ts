import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

}

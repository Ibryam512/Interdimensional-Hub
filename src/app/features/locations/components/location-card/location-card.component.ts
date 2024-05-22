import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Location } from '../../location.model';

@Component({
  selector: 'app-location-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './location-card.component.html',
  styleUrl: './location-card.component.scss'
})
export class LocationCardComponent {
    @Input({required: true}) location: Location = {} as Location;
}

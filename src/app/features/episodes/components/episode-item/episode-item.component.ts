import { Component, Input } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { Episode } from '../../episode.model';
import { EpisodesService } from '../../episodes.service';

@Component({
  selector: 'app-episode-item',
  standalone: true,
  imports: [MatListOption],
  templateUrl: './episode-item.component.html',
  styleUrl: './episode-item.component.scss'
})
export class EpisodeItemComponent {
  @Input({required: true}) episode!: Episode;
}

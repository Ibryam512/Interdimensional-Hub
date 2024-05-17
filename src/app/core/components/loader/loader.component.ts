import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent implements OnInit, OnDestroy {
  isLoading!: Subscription;
  isVisible: boolean = false;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.isLoading = this.loaderService.isLoading.subscribe((isVisible) => {
      this.isVisible = isVisible;
    });
  }

  ngOnDestroy(): void {
    this.isLoading.unsubscribe();
  }
}

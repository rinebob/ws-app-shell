import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CounterStore } from './store/counter.store';

/**
 * A component that demonstrates NgRx signals state management with a counter.
 * Features increment, decrement, and reset functionality with a computed double count.
 */
@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {
  protected readonly store = inject(CounterStore);
}

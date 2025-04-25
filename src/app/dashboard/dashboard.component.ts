import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

export interface DashboardCard {
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  route: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatGridListModule, MatIconModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true
})
export class DashboardComponent {
  readonly cards: DashboardCard[] = [
    {
      title: 'Counter Demo',
      subtitle: 'NgRx Signals State Management',
      icon: 'add_circle',
      description: 'Explore state management with NgRx Signals',
      route: '/counter'
    },
    {
      title: 'Design System',
      subtitle: 'Color, Typography & Components',
      icon: 'palette',
      description: "Browse the app's color palette, typography, and reusable UI components.",
      route: '/design-system'
    },
    {
      title: 'Dividend Tracker',
      subtitle: 'Financial Dashboard',
      icon: 'trending_up',
      description: 'Monitor portfolio, holdings, and dividend income with real-time data.',
      route: '/tracker'
    }
  ];
}


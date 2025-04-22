import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

interface PortfolioSummary {
  totalValue: number;
  totalYield: number;
  annualIncome: number;
  monthlyIncome: number;
  holdings: number;
  lastUpdated: Date;
}

interface PortfolioHolding {
  symbol: string;
  name: string;
  shares: number;
  price: number;
  value: number;
  yield: number;
  annualIncome: number;
  change: number;
}

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule
  ],
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent {
  portfolioSummary = signal<PortfolioSummary>({
    totalValue: 40239.26,
    totalYield: 4.25,
    annualIncome: 1710.17,
    monthlyIncome: 142.51,
    holdings: 12,
    lastUpdated: new Date()
  });

  holdings = signal<PortfolioHolding[]>([
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      shares: 25,
      price: 175.34,
      value: 4383.50,
      yield: 0.52,
      annualIncome: 22.80,
      change: 1.24
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      shares: 15,
      price: 402.12,
      value: 6031.80,
      yield: 0.72,
      annualIncome: 43.43,
      change: -0.45
    },
    {
      symbol: 'JNJ',
      name: 'Johnson & Johnson',
      shares: 20,
      price: 147.53,
      value: 2950.60,
      yield: 3.12,
      annualIncome: 92.06,
      change: 0.78
    }
  ]);

  displayedColumns = [
    'symbol',
    'name',
    'shares',
    'price',
    'value',
    'yield',
    'annualIncome',
    'change'
  ];

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  }

  formatPercent(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value / 100);
  }
}

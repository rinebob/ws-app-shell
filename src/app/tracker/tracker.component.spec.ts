import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TrackerComponent } from './tracker.component';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('TrackerComponent', () => {
  let component: TrackerComponent;
  let fixture: ComponentFixture<TrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatTableModule,
        TrackerComponent
      ],
      providers: [provideNoopAnimations()]
    });

    fixture = TestBed.createComponent(TrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial portfolio summary data', () => {
    const summary = component.portfolioSummary();
    expect(summary.totalValue).toBe(40239.26);
    expect(summary.totalYield).toBe(4.25);
    expect(summary.annualIncome).toBe(1710.17);
    expect(summary.monthlyIncome).toBe(142.51);
    expect(summary.holdings).toBe(12);
  });

  it('should have initial holdings data', () => {
    const holdings = component.holdings();
    expect(holdings.length).toBe(3);
    expect(holdings[0].symbol).toBe('AAPL');
  });

  describe('formatCurrency', () => {
    it('should format positive numbers correctly', () => {
      expect(component.formatCurrency(1234.56)).toBe('$1,234.56');
    });

    it('should format zero correctly', () => {
      expect(component.formatCurrency(0)).toBe('$0.00');
    });

    it('should format negative numbers correctly', () => {
      expect(component.formatCurrency(-1234.56)).toBe('-$1,234.56');
    });
  });

  describe('formatPercent', () => {
    it('should format positive percentages correctly', () => {
      expect(component.formatPercent(4.25)).toBe('4.25%');
    });

    it('should format zero percent correctly', () => {
      expect(component.formatPercent(0)).toBe('0.00%');
    });

    it('should format negative percentages correctly', () => {
      expect(component.formatPercent(-2.50)).toBe('-2.50%');
    });
  });

  describe('template rendering', () => {
    it('should display all summary cards', () => {
      const cards = fixture.nativeElement.querySelectorAll('.summary-card');
      expect(cards.length).toBe(3);
    });

    it('should display holdings table', () => {
      const table = fixture.nativeElement.querySelector('.holdings-table');
      expect(table).toBeTruthy();
    });

    it('should show correct number of table columns', () => {
      const headers = fixture.nativeElement.querySelectorAll('th[role="columnheader"]');
      expect(headers.length).toBe(component.displayedColumns.length);
    });
  });
});
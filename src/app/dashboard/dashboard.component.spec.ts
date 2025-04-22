import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        provideNoopAnimations(),
        provideRouter([])
      ]
    });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render counter demo card', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cardTitle = compiled.querySelector('mat-card-title');
    const cardSubtitle = compiled.querySelector('mat-card-subtitle');
    const cardIcon = compiled.querySelector('mat-icon');
    const cardText = compiled.querySelector('mat-card-content p');

    expect(cardTitle?.textContent).toContain('Counter Demo');
    expect(cardSubtitle?.textContent).toContain('NgRx Signals State Management');
    expect(cardIcon?.textContent).toContain('add_circle');
    expect(cardText?.textContent).toContain('Explore state management with NgRx Signals');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';
import { CounterStore } from './store/counter.store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let store: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(CounterStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display initial count', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Current Count: 0');
  });

  it('should increment count when increment button is clicked', () => {
    const incrementButton = fixture.nativeElement.querySelector('button:nth-child(1)');
    incrementButton.click();
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Current Count: 1');
  });

  it('should decrement count when decrement button is clicked', () => {
    store.increment();
    fixture.detectChanges();
    
    const decrementButton = fixture.nativeElement.querySelector('button:nth-child(2)');
    decrementButton.click();
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Current Count: 0');
  });

  it('should reset count when reset button is clicked', () => {
    store.increment();
    store.increment();
    fixture.detectChanges();
    
    const resetButton = fixture.nativeElement.querySelector('button:nth-child(3)');
    resetButton.click();
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Current Count: 0');
  });
});

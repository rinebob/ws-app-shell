import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        HeaderComponent
      ],
      providers: [provideNoopAnimations()]
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit toggleSidenav event when menu button is clicked', () => {
    const spy = jest.spyOn(component.toggleSidenav, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should render app title', () => {
    const title = fixture.nativeElement.querySelector('h1');
    expect(title.textContent).toContain('Windsurf App Shell');
  });
});
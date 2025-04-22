import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header/header.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        HeaderComponent
      ],
      providers: [
        provideNoopAnimations(),
        provideRouter([])
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'ws-app-shell' title`, () => {
    expect(component.title).toEqual('ws-app-shell');
  });

  it('should render sidenav with navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('mat-nav-list a');
    expect(links.length).toBe(4);
    expect(links[0].textContent).toContain('Home');
    expect(links[1].textContent).toContain('Counter');
    expect(links[2].textContent).toContain('Design System');
    expect(links[3].textContent).toContain('Dividend Tracker');
  });
});

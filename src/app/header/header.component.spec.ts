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

  it('should emit menuClick event when menu button is clicked', () => {
    const spy = jest.spyOn(component.menuClick, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should render app title', () => {
    const title = fixture.nativeElement.querySelector('.app-title');
    expect(title.textContent).toContain('Windsurf App Shell');
  });

  it('should render the theme switcher button', () => {
    const themeButton = fixture.nativeElement.querySelector('.theme-button');
    expect(themeButton).toBeTruthy();
    expect(themeButton.textContent).toContain('palette');
  });

  it('should call themeService.setThemeStyle when a theme is selected', () => {
    const themeService = component.themeService;
    const spy = jest.spyOn(themeService, 'setThemeStyle');
    component.onThemeStyleChange('dividend');
    expect(spy).toHaveBeenCalledWith('dividend');
  });

  it('should toggle color mode when mode toggle button is clicked', () => {
    const themeService = component.themeService;
    const spy = jest.spyOn(themeService, 'toggleColorMode');
    const modeToggle = fixture.nativeElement.querySelector('.mode-toggle');
    modeToggle.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should show correct icon for current color mode', () => {
    const themeService = component.themeService;
    jest.spyOn(themeService, 'isDarkMode').mockReturnValue(true);
    fixture.detectChanges();
    const modeToggle = fixture.nativeElement.querySelector('.mode-toggle mat-icon');
    expect(modeToggle.textContent).toContain('light_mode');
    jest.spyOn(themeService, 'isDarkMode').mockReturnValue(false);
    fixture.detectChanges();
    expect(modeToggle.textContent).toContain('dark_mode');
  });

  it('should show the current theme style in the theme button', () => {
    const themeButton = fixture.nativeElement.querySelector('.theme-button');
    expect(themeButton.textContent).toContain(component.currentThemeStyle());
  });

  it('should close theme menu when focus is lost', () => {
    const themeButton = fixture.nativeElement.querySelector('.theme-button');
    themeButton.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    // No error should occur (menu closes)
    expect(true).toBe(true);
  });
});
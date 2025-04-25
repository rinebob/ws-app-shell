import { Component, Output, EventEmitter, inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeService, ThemeStyle } from '../core/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule
  ]
})
export class HeaderComponent {
  @Output() menuClick = new EventEmitter<void>();
  
  readonly themeService = inject(ThemeService);
  readonly themeStyles: ThemeStyle[] = ['default', 'dividend', 'financial'];

  onMenuClick() {
    this.menuClick.emit();
  }

  get isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  // Signal for the current theme style
  readonly currentThemeStyle = this.themeService.themeStyleSignal;

  onThemeStyleChange(style: ThemeStyle): void {
    this.themeService.setThemeStyle(style);
  }

  toggleColorMode(): void {
    this.themeService.toggleColorMode();
  }
}

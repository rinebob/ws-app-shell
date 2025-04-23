import { Injectable, signal } from '@angular/core';
import { effect } from '@angular/core';

export type ColorMode = 'light' | 'dark';
export type ThemeStyle = 'default' | 'dividend' | 'financial';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly colorModeKey = 'app-color-mode';
  private readonly themeStyleKey = 'app-theme-style';
  private readonly darkModeClass = 'dark-theme';
  
  // Use signals for reactive theme state
  private colorMode = signal<ColorMode>(this.getInitialColorMode());
  private themeStyle = signal<ThemeStyle>(this.getInitialThemeStyle());

  constructor() {
    // Set up effects to handle theme changes
    effect(() => {
      const mode = this.colorMode();
      this.applyColorMode(mode);
      localStorage.setItem(this.colorModeKey, mode);
    });

    effect(() => {
      const style = this.themeStyle();
      this.applyThemeStyle(style);
      localStorage.setItem(this.themeStyleKey, style);
    });
  }

  private getInitialColorMode(): ColorMode {
    // Check local storage first
    const savedMode = localStorage.getItem(this.colorModeKey) as ColorMode;
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      return savedMode;
    }

    // If no saved preference, check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  private getInitialThemeStyle(): ThemeStyle {
    // Check local storage first
    const savedStyle = localStorage.getItem(this.themeStyleKey) as ThemeStyle;
    if (savedStyle && ['default', 'dividend', 'financial'].includes(savedStyle)) {
      return savedStyle;
    }

    return 'default';
  }

  private applyColorMode(mode: ColorMode): void {
    if (mode === 'dark') {
      document.documentElement.classList.add(this.darkModeClass);
    } else {
      document.documentElement.classList.remove(this.darkModeClass);
    }
  }

  private applyThemeStyle(style: ThemeStyle): void {
    // Remove all theme classes
    document.documentElement.classList.remove('theme-default', 'theme-dividend', 'theme-financial');
    // Add the selected theme class
    document.documentElement.classList.add(`theme-${style}`);
  }

  getCurrentColorMode(): ColorMode {
    return this.colorMode();
  }

  getCurrentThemeStyle(): ThemeStyle {
    return this.themeStyle();
  }

  toggleColorMode(): void {
    const newMode = this.colorMode() === 'light' ? 'dark' : 'light';
    this.colorMode.set(newMode);
  }

  setThemeStyle(style: ThemeStyle): void {
    this.themeStyle.set(style);
  }

  isDarkMode(): boolean {
    console.log('thSvc iDM isDarkMode called');
    return this.colorMode() === 'dark';
  }
}

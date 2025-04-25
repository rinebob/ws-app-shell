// --- localStorage mock must be set BEFORE any imports ---
let storage: Record<string, string> = {};
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: (key: string) => storage[key] || null,
    setItem: (key: string, value: string) => { storage[key] = value; },
    removeItem: (key: string) => { delete storage[key]; },
    clear: () => { storage = {}; }
  },
  configurable: true
});

// --- matchMedia mock must be set BEFORE any imports ---
let matchMediaMatches = false;
Object.defineProperty(window, 'matchMedia', {
  value: jest.fn().mockImplementation(query => ({
    matches: matchMediaMatches,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  })),
  configurable: true
});

import { TestBed } from '@angular/core/testing';
import { ThemeService, ColorMode, ThemeStyle } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let originalMatchMedia: typeof window.matchMedia;

  beforeEach(() => {
    // Clear the localStorage mock's storage object
    storage = {};
    window.localStorage && window.localStorage.clear && window.localStorage.clear(); // Defensive: clear if real or mock
    // Save original matchMedia, but do not mock by default
    originalMatchMedia = window.matchMedia;
    // Clear theme classes
    document.documentElement.className = '';
    // Do NOT configure or inject ThemeService here!
    // Each test must configure and inject after patching mocks.
  });

  afterEach(() => {
    // Reset matchMedia
    Object.defineProperty(window, 'matchMedia', { value: originalMatchMedia, configurable: true });
    // Clear the localStorage mock's storage object
    storage = {};
    window.localStorage && window.localStorage.clear && window.localStorage.clear();
    // Reset Angular TestBed
    TestBed.resetTestingModule();
    document.documentElement.className = '';
  });



  it('should initialize with system dark mode if no storage', () => {
    TestBed.resetTestingModule();
    matchMediaMatches = true;
    TestBed.configureTestingModule({ providers: [ThemeService] });
    const s = TestBed.inject(ThemeService);
    expect(s.getCurrentColorMode()).toBe('dark');
  });

  it('should initialize with light mode if system is not dark', () => {
    TestBed.resetTestingModule();
    matchMediaMatches = false;
    expect(window.matchMedia('(prefers-color-scheme: dark)').matches).toBe(false);
    TestBed.configureTestingModule({ providers: [ThemeService] });
    const s = TestBed.inject(ThemeService);
    expect(s.getCurrentColorMode()).toBe('light');
  });

  it('should initialize with color mode from localStorage', () => {
    window.localStorage.setItem('app-color-mode', 'dark');
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [ThemeService] });
    const s = TestBed.inject(ThemeService);
    expect(s.getCurrentColorMode()).toBe('dark');
  });

  it('should initialize with theme style from localStorage', () => {
    window.localStorage.setItem('app-theme-style', 'financial');
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [ThemeService] });
    const s = TestBed.inject(ThemeService);
    expect(s.getCurrentThemeStyle()).toBe('financial');
  });

  it('should apply dark mode class', () => {
    TestBed.configureTestingModule({ providers: [ThemeService] });
    const service = TestBed.inject(ThemeService);
    service['applyColorMode']('dark');
    expect(document.documentElement.classList.contains('dark-theme')).toBe(true);
  });

  it('should remove dark mode class for light', () => {
    TestBed.configureTestingModule({ providers: [ThemeService] });
    const service = TestBed.inject(ThemeService);
    document.documentElement.classList.add('dark-theme');
    service['applyColorMode']('light');
    expect(document.documentElement.classList.contains('dark-theme')).toBe(false);
  });

  it('should apply correct theme style class', () => {
    TestBed.configureTestingModule({ providers: [ThemeService] });
    const service = TestBed.inject(ThemeService);
    service['applyThemeStyle']('dividend');
    expect(document.documentElement.classList.contains('theme-dividend')).toBe(true);
  });

  it('should remove other theme style classes', () => {
    TestBed.configureTestingModule({ providers: [ThemeService] });
    const service = TestBed.inject(ThemeService);
    document.documentElement.classList.add('theme-default', 'theme-financial');
    service['applyThemeStyle']('dividend');
    expect(document.documentElement.classList.contains('theme-default')).toBe(false);
    expect(document.documentElement.classList.contains('theme-financial')).toBe(false);
    expect(document.documentElement.classList.contains('theme-dividend')).toBe(true);
  });

  it('should toggle color mode', () => {
    TestBed.configureTestingModule({ providers: [ThemeService] });
    const service = TestBed.inject(ThemeService);
    service['colorMode'].set('light');
    service.toggleColorMode();
    expect(service.getCurrentColorMode()).toBe('dark');
    service.toggleColorMode();
    expect(service.getCurrentColorMode()).toBe('light');
  });

  it('should set theme style', () => {
    TestBed.configureTestingModule({ providers: [ThemeService] });
    const service = TestBed.inject(ThemeService);
    service.setThemeStyle('financial');
    expect(service.getCurrentThemeStyle()).toBe('financial');
  });

  it('should return true for isDarkMode when dark', () => {
    TestBed.configureTestingModule({ providers: [ThemeService] });
    const service = TestBed.inject(ThemeService);
    service['colorMode'].set('dark');
    expect(service.isDarkMode()).toBe(true);
  });

  it('should return false for isDarkMode when light', () => {
    TestBed.configureTestingModule({ providers: [ThemeService] });
    const service = TestBed.inject(ThemeService);
    service['colorMode'].set('light');
    expect(service.isDarkMode()).toBe(false);
  });
});

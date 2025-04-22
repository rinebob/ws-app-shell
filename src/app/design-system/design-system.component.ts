import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-design-system',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './design-system.component.html',
  styleUrls: ['./design-system.component.scss']
})
export class DesignSystemComponent {
  colors = {
    brand: [
      { name: 'Primary', value: '#2563eb' },
      { name: 'Primary Dark', value: '#1e40af' },
      { name: 'Accent', value: '#10b981' },
      { name: 'Accent Dark', value: '#059669' }
    ],
    text: [
      { name: 'Primary', value: '#0f172a' },
      { name: 'Secondary', value: '#475569' },
      { name: 'Disabled', value: '#94a3b8' }
    ],
    background: [
      { name: 'White', value: '#ffffff' },
      { name: 'Alt', value: '#f8fafc' }
    ]
  };

  typographyExamples = [
    { name: 'Heading 1', class: 'heading-1', text: 'The quick brown fox' },
    { name: 'Heading 2', class: 'heading-2', text: 'The quick brown fox' },
    { name: 'Heading 3', class: 'heading-3', text: 'The quick brown fox' },
    { name: 'Body Large', class: 'body-large', text: 'The quick brown fox jumps over the lazy dog' },
    { name: 'Body Base', class: 'body-base', text: 'The quick brown fox jumps over the lazy dog' },
    { name: 'Body Small', class: 'body-small', text: 'The quick brown fox jumps over the lazy dog' }
  ];

  spacingValues = [
    { name: 'XS', value: '4px', class: 'spacing-xs' },
    { name: 'SM', value: '8px', class: 'spacing-sm' },
    { name: 'MD', value: '16px', class: 'spacing-md' },
    { name: 'LG', value: '24px', class: 'spacing-lg' },
    { name: 'XL', value: '32px', class: 'spacing-xl' },
    { name: '2XL', value: '48px', class: 'spacing-2xl' },
    { name: '3XL', value: '64px', class: 'spacing-3xl' }
  ];

  shadowValues = [
    { name: 'Small', class: 'shadow-sm' },
    { name: 'Medium', class: 'shadow-md' },
    { name: 'Large', class: 'shadow-lg' },
    { name: 'Extra Large', class: 'shadow-xl' }
  ];
}

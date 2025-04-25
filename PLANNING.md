# WS App Shell - Planning Document

## Project Overview
An Angular workspace application that serves as a shell for future applications, featuring:
- Material UI integration
- Responsive layout with sidenav
- NgRx signals for state management
- Modular component architecture

## Architecture
1. **Core Components**
   - Header (standalone component)
   - App Shell layout with Material sidenav
   - Router outlet for content injection

2. **State Management**
   - NgRx signals for reactive state
   - Counter implementation as proof of concept

3. **UI Framework**
   - Angular Material
   - Responsive design principles
   - Consistent styling and theming

## Layout & Responsiveness Best Practices
- **App Shell**: Do not wrap `<router-outlet>` in extra containers. Let each feature/component manage its own layout, centering, and max-width.
- **Feature-Level Layout**: Each routed component (e.g., Dashboard, Design System) is responsible for its own horizontal centering, padding, and `max-width` using a root container (e.g., `.design-system`, `.dashboard-cards`).
- **Flexbox for Cards**: Use flexbox (`display: flex; flex-wrap: wrap;`) for card layouts for natural responsiveness, unless a true grid is required.
- **Main Scroll Area**: Only the main content area inside `mat-sidenav-content` should scroll. Header and sidenav remain fixed.
- **Max-Width and Padding**: Use `max-width: theme.$container-max-width` and `margin: 0 auto` or similar for horizontal centering and constraining content width at the feature level.
- **Responsive Padding**: Avoid hardcoded `width: 100%` unless necessary. Use responsive padding and container widths for consistent layouts across breakpoints.
- **Minimal Media Queries**: Prefer container-based responsiveness and flexbox. Use media queries only for true breakpoint-specific adjustments.
- **No Outer Scrollbars**: Ensure only the main content area scrolls, not the app shell or body.

_These patterns ensure robust, maintainable, and visually consistent layouts across the workspace._

## Future Considerations
1. **Authentication & Authorization**
   - User authentication flow
   - Role-based access control
   - Protected routes

2. **Feature Modules**
   - Lazy-loaded modules
   - Domain-specific features
   - Shared components library

3. **Performance**
   - Code splitting
   - Bundle optimization
   - Caching strategies

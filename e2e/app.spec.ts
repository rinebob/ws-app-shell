import { test, expect } from '@playwright/test';

test.describe('WS App Shell', () => {
  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  const formatPercent = (value: number) => new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(value / 100);
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200');
    await page.waitForLoadState('networkidle');
  });

  test('should display app title', async ({ page }) => {
    await expect(page.locator('app-header')).toBeVisible();
  });

  test('should verify header and navigation functionality', async ({ page }) => {
    const menuButton = page.getByRole('button', { name: 'Toggle navigation' });
    const sidenav = page.locator('mat-sidenav');
    
    // Check header elements
    await expect(page.getByRole('img', { name: 'Angular Logo' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Windsurf App Shell' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Toggle navigation' })).toBeVisible();
    
    // Check sidenav icons
    await expect(page.locator('mat-nav-list .material-icons:text("home")')).toBeVisible();
    await expect(page.locator('mat-nav-list .material-icons:text("calculate")')).toBeVisible();
    await expect(page.locator('mat-nav-list .material-icons:text("trending_up")')).toBeVisible();

    // Initially opened
    await expect(sidenav).toHaveClass(/mat-drawer-opened/);

    // Close sidenav
    await menuButton.click();
    await expect(sidenav).not.toHaveClass(/mat-drawer-opened/);

    // Open sidenav
    await menuButton.click();
    await expect(sidenav).toHaveClass(/mat-drawer-opened/);
    
    // Check active route highlighting
    await expect(page.getByRole('link', { name: 'Home' })).toHaveClass(/active/);
    await page.getByRole('link', { name: 'Counter' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('link', { name: 'Counter' })).toHaveClass(/active/);
  });

  test('should toggle sidenav when menu button is clicked', async ({ page }) => {
    const menuButton = page.locator('app-header button');
    const sidenav = page.locator('mat-sidenav');

    // Initial state - sidenav is open
    await expect(sidenav).toBeVisible();
    await expect(sidenav).toHaveAttribute('mode', 'side');

    // Click menu button to close
    await menuButton.click();
    await expect(sidenav).not.toBeVisible();

    // Click menu button to open
    await menuButton.click();
    await expect(sidenav).toBeVisible();
  });

  test('should navigate to counter page and verify layout', async ({ page }) => {
    await page.getByRole('link', { name: 'Counter' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*\/counter/);
    
    // Verify header
    await expect(page.locator('mat-card-title:text("Counter")')).toBeVisible();
    await expect(page.locator('mat-card-subtitle:text("NgRx Signals Demo")')).toBeVisible();
    
    // Verify buttons
    await expect(page.getByRole('button', { name: 'Increment' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Decrement' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reset' })).toBeVisible();
    
    // Verify initial state
    await expect(page.getByText('Current Count: 0')).toBeVisible();
    await expect(page.getByText('Double Count: 0')).toBeVisible();
  });

  test('should navigate to tracker page and verify all portfolio data', async ({ page }) => {
    await page.getByRole('link', { name: 'Dividend Tracker' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*\/tracker/);
    
    // Check summary cards
    const summaryCards = page.locator('.summary-cards mat-card');
    await expect(summaryCards).toHaveCount(3);
    
    // Check card titles and values
    await expect(page.locator('.summary-cards h3:text("Total Value")')).toBeVisible();
    await expect(page.locator('.summary-cards h3:text("Portfolio Yield")')).toBeVisible();
    await expect(page.locator('.summary-cards h3:text("Annual Income")')).toBeVisible();
    
    // Check card subtitles
    await expect(page.locator('.card-subtitle >> text=Last updated')).toBeVisible();
    await expect(page.locator('.card-subtitle >> text=Holdings')).toBeVisible();
    await expect(page.locator('.card-subtitle >> text=Monthly')).toBeVisible();
    
    // Check holdings table
    const table = page.locator('.holdings-table');
    await expect(table).toBeVisible();
    await expect(table.getByRole('row')).toHaveCount(4); // header + 3 holdings
    
    // Check all table headers
    const expectedColumns = ['Symbol', 'Name', 'Shares', 'Price', 'Value', 'Yield', 'Annual Income', 'Change'];
    for (const column of expectedColumns) {
      await expect(page.getByRole('columnheader', { name: column })).toBeVisible();
    }
    
    // Check table data formatting
    await expect(page.locator('td.mono')).toHaveCount(21); // 7 columns × 3 rows
    await expect(page.locator('td.mono.positive').first()).toBeVisible();
    await expect(page.locator('td.mono.negative').first()).toBeVisible();
  });

  test('counter functionality should work completely', async ({ page }) => {
    await page.getByRole('link', { name: 'Counter' }).click();
    await page.waitForLoadState('networkidle');
    
    const count = page.getByText('Current Count:');
    const doubleCount = page.getByText('Double Count:');
    const incrementButton = page.getByRole('button', { name: 'Increment' });
    const decrementButton = page.getByRole('button', { name: 'Decrement' });
    const resetButton = page.getByRole('button', { name: 'Reset' });

    // Initial state
    await expect(count).toContainText('Current Count: 0');
    await expect(doubleCount).toContainText('Double Count: 0');
    await expect(page.locator('.positive')).toHaveCount(0);
    await expect(page.locator('.negative')).toHaveCount(0);

    // Increment and check positive values
    await page.waitForTimeout(500); // Wait for animations to complete
    await incrementButton.click();
    await expect(count).toContainText('Current Count: 1');
    await expect(doubleCount).toContainText('Double Count: 2');
    await expect(page.locator('.positive')).toHaveCount(2);

    // Increment again
    await incrementButton.click();
    await expect(count).toContainText('Current Count: 2');
    await expect(doubleCount).toContainText('Double Count: 4');

    // Decrement to negative and check classes
    await decrementButton.click();
    await decrementButton.click();
    await decrementButton.click();
    await expect(count).toContainText('Current Count: -1');
    await expect(doubleCount).toContainText('Double Count: -2');
    await expect(page.locator('.negative')).toHaveCount(2);

    // Reset and verify neutral state
    await resetButton.click();
    await expect(count).toContainText('Current Count: 0');
    await expect(doubleCount).toContainText('Double Count: 0');
    await expect(page.locator('.positive')).toHaveCount(0);
    await expect(page.locator('.negative')).toHaveCount(0);
  });
});

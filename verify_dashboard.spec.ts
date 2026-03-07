import { test, expect } from '@playwright/test';

test('Verify student dashboard layout', async ({ page }) => {
  // Use mock storage injection matching project memory rules
  await page.addInitScript(() => {
    window.localStorage.setItem('nst_current_user', JSON.stringify({
      id: "IIC-TEST",
      name: "Test Student",
      mobile: "9999999999",
      email: "test@example.com",
      role: "STUDENT",
      board: "CBSE",
      classLevel: "10",
      stream: "Science",
      credits: 50,
      subscriptionTier: "ULTRA",
      subscriptionLevel: "ULTRA",
      subscriptionEndDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      profileCompleted: true,
      lastLoginRewardDate: new Date().toISOString()
    }));
    window.sessionStorage.setItem('app_session_splash', 'true');
    window.localStorage.setItem('nst_terms_accepted', 'true');
    window.localStorage.setItem('nst_has_seen_welcome', 'true');
  });

  await page.goto('http://localhost:5000');

  // Wait for App Header
  await expect(page.getByRole('heading', { level: 2 }).first()).toBeVisible({ timeout: 10000 });

  // Take screenshot of mobile view specifically since layout fixes were targeted for mobile
  await page.setViewportSize({ width: 390, height: 844 }); // iPhone 12 Pro dimensions
  await page.waitForTimeout(1000); // Wait for animations

  // Click "Claim Later (Moves to Rewards)" if it appears
  try {
      const claimButton = page.locator('button:has-text("Claim Later (Moves to Rewards)")');
      if (await claimButton.isVisible({ timeout: 1000 })) {
          await claimButton.click();
          await page.waitForTimeout(500); // Wait for modal to close
      }
  } catch(e) {}

  await page.screenshot({ path: '/home/jules/verification/dashboard_mobile_clean.png' });
});
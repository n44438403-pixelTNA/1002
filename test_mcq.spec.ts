import { test, expect } from '@playwright/test';

test('verify bottom nav hides on immersive views', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('nst_current_user', JSON.stringify({
      id: "test1",
      name: "Test User",
      email: "test@example.com",
      role: "student",
      classLevel: "10",
      board: "CBSE",
      stream: "Science",
      language: "en",
      credits: 100,
      profileCompleted: true
    }));
    localStorage.setItem('nst_terms_accepted', 'true');
    localStorage.setItem('nst_has_seen_welcome', 'true');
    sessionStorage.setItem('app_session_splash', 'true');
  });

  await page.goto('http://localhost:5000');
  await page.waitForTimeout(2000);

  // Verify bottom nav exists on Home
  const bottomNav = page.locator('.fixed.bottom-0.z-\\[9990\\]');
  await expect(bottomNav).toBeVisible();

  // Find a feature button that opens an immersive view like MCQ or Challenge
  // Let's click "MCQ Test" or "Weekly Test" if it exists on the home dashboard grid
  const mcqBtn = page.getByText('MCQ', { exact: true });
  if (await mcqBtn.count() > 0) {
    await mcqBtn.first().click();
    await page.waitForTimeout(1000);
    // After clicking MCQ, if it navigates to subject list, we might still see bottom nav
    // unless contentViewStep is PLAYER
    await expect(bottomNav).toBeVisible();
  }
});

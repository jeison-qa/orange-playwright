import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('login exitoso', async ({ page }) => {
    await loginPage.login('Admin', 'admin123');

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
  });

  test('login con usuario inválido', async ({ page }) => {
    await loginPage.login('UsuarioP', 'admin123');

    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });

  test('login con contraseña inválida', async ({ page }) => {
    await loginPage.login('Admin', 'claveP');

    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });

  test('login con campos vacíos', async ({ page }) => {
    await loginPage.loginButton.click();

    await expect(page.getByText('Required')).toHaveCount(2);
  });
});
// Test de login exitoso
import { test, expect } from '@playwright/test';

test('login exitoso', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
});

// Test de login con usuario inválido
test('login con usuario inválido', async ({ page }) => {
    await page.goto('/');
  
    await page.getByRole('textbox', { name: 'Username' }).fill('UsuarioFalso');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
  
    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });
  // Test de login con contraseña inválida

  test('login con contraseña inválida', async ({ page }) => {
    await page.goto('/');
  
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('claveMala');
    await page.getByRole('button', { name: 'Login' }).click();
  
    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });

  // Test de login con campos vacíos
  test('login con campos vacíos', async ({ page }) => {
    await page.goto('/');
  
    await page.getByRole('button', { name: 'Login' }).click();
  
    await expect(page.getByText('Required')).toHaveCount(2);
  });
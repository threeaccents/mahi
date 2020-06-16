import { newE2EPage } from '@stencil/core/testing';

describe('forgot-password-view', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<forgot-password-view></forgot-password-view>');

    const element = await page.find('forgot-password-view');
    expect(element).toHaveClass('hydrated');
  });
});

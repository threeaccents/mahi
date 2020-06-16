import { newE2EPage } from '@stencil/core/testing';

describe('ta-form-label', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-form-label></ta-form-label>');

    const element = await page.find('ta-form-label');
    expect(element).toHaveClass('hydrated');
  });
});

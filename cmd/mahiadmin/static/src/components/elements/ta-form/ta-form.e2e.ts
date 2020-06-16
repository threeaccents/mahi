import { newE2EPage } from '@stencil/core/testing';

describe('ta-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-form></ta-form>');

    const element = await page.find('ta-form');
    expect(element).toHaveClass('hydrated');
  });
});

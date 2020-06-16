import {newE2EPage} from '@stencil/core/testing';

describe('ta-billing-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-billing-card></ta-billing-card>');

    const element = await page.find('ta-billing-card');
    expect(element).toHaveClass('hydrated');
  });
});

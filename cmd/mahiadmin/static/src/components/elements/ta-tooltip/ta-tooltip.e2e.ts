import { newE2EPage } from '@stencil/core/testing';

describe('ta-tooltip', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-tooltip></ta-tooltip>');

    const element = await page.find('ta-tooltip');
    expect(element).toHaveClass('hydrated');
  });
});

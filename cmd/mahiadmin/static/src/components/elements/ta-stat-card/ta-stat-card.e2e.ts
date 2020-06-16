import {newE2EPage} from '@stencil/core/testing';

describe('ta-stat-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-stat-card></ta-stat-card>');

    const element = await page.find('ta-stat-card');
    expect(element).toHaveClass('hydrated');
  });
});

import {newE2EPage} from '@stencil/core/testing';

describe('ta-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-card></ta-card>');

    const element = await page.find('ta-card');
    expect(element).toHaveClass('hydrated');
  });
});

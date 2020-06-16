import {newE2EPage} from '@stencil/core/testing';

describe('ta-page-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-page-header></ta-page-header>');

    const element = await page.find('ta-page-header');
    expect(element).toHaveClass('hydrated');
  });
});

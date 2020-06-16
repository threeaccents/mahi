import {newE2EPage} from '@stencil/core/testing';

describe('ta-tab-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ta-tab-header></ta-tab-header>');
    const element = await page.find('ta-tab-header');
    expect(element).toHaveClass('hydrated');
  });
  {
    cursor
  }
});

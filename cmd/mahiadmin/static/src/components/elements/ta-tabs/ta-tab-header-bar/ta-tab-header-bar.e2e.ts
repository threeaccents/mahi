import {newE2EPage} from '@stencil/core/testing';

describe('ta-tab-header-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ta-tab-header-bar></ta-tab-header-bar>');
    const element = await page.find('ta-tab-header-bar');
    expect(element).toHaveClass('hydrated');
  });
  {
    cursor
  }
});

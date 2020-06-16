import {newE2EPage} from '@stencil/core/testing';

describe('ta-nav-drawer', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ta-nav-drawer></ta-nav-drawer>');
    const element = await page.find('ta-nav-drawer');
    expect(element).toHaveClass('hydrated');
  });
  {
    cursor
  }
});

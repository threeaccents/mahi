import {newE2EPage} from '@stencil/core/testing';

describe('ta-sidebar', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ta-sidebar></ta-sidebar>');
    const element = await page.find('ta-sidebar');
    expect(element).toHaveClass('hydrated');
  });
  {
    cursor
  }
});

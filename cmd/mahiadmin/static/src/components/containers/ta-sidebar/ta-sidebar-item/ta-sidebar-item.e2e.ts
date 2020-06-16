import {newE2EPage} from '@stencil/core/testing';

describe('ta-sidebar-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ta-sidebar-item></ta-sidebar-item>');
    const element = await page.find('ta-sidebar-item');
    expect(element).toHaveClass('hydrated');
  });
  {
    cursor
  }
});

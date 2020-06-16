import {newE2EPage} from '@stencil/core/testing';

describe('ta-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ta-dropdown></ta-dropdown>');
    const element = await page.find('ta-dropdown');
    expect(element).toHaveClass('hydrated');
  });
  {
    cursor
  }
});

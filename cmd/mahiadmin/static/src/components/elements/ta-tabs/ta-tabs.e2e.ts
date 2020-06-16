import {newE2EPage} from '@stencil/core/testing';

describe('ta-tabs', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ta-tabs></ta-tabs>');
    const element = await page.find('ta-tabs');
    expect(element).toHaveClass('hydrated');
  });
  {
    cursor
  }
});

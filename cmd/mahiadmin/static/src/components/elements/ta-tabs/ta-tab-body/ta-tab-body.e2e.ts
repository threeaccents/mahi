import {newE2EPage} from '@stencil/core/testing';

describe('ta-tab-body', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ta-tab-body></ta-tab-body>');
    const element = await page.find('ta-tab-body');
    expect(element).toHaveClass('hydrated');
  });
  {
    cursor
  }
});

import {newE2EPage} from '@stencil/core/testing';

describe('ta-topbar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-topbar></ta-topbar>');

    const element = await page.find('ta-topbar');
    expect(element).toHaveClass('hydrated');
  });
});

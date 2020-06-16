import {newE2EPage} from '@stencil/core/testing';

describe('ta-drawer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-drawer></ta-drawer>');

    const element = await page.find('ta-drawer');
    expect(element).toHaveClass('hydrated');
  });
});

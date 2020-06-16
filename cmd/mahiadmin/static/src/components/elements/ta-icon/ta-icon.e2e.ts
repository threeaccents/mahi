import {newE2EPage} from '@stencil/core/testing';

describe('ta-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-icon></ta-icon>');

    const element = await page.find('ta-icon');
    expect(element).toHaveClass('hydrated');
  });
});

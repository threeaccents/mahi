import {newE2EPage} from '@stencil/core/testing';

describe('ta-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-checkbox></ta-checkbox>');

    const element = await page.find('ta-checkbox');
    expect(element).toHaveClass('hydrated');
  });
});

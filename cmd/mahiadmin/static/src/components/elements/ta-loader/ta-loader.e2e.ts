import {newE2EPage} from '@stencil/core/testing';

describe('ta-loader', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-loader></ta-loader>');

    const element = await page.find('ta-loader');
    expect(element).toHaveClass('hydrated');
  });
});

import {newE2EPage} from '@stencil/core/testing';

describe('ta-app-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-app-page></ta-app-page>');

    const element = await page.find('ta-app-page');
    expect(element).toHaveClass('hydrated');
  });
});

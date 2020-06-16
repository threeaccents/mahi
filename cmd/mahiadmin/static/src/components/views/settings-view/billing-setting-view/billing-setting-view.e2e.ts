import {newE2EPage} from '@stencil/core/testing';

describe('billing-setting-view', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<billing-setting-view></billing-setting-view>');

    const element = await page.find('billing-setting-view');
    expect(element).toHaveClass('hydrated');
  });
});

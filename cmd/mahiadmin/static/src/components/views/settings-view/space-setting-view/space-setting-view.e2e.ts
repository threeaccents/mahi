import {newE2EPage} from '@stencil/core/testing';

describe('space-setting-view', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<space-setting-view></space-setting-view>');

    const element = await page.find('space-setting-view');
    expect(element).toHaveClass('hydrated');
  });
});

import {newE2EPage} from '@stencil/core/testing';

describe('personal-setting-view', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<personal-setting-view></personal-setting-view>');

    const element = await page.find('personal-setting-view');
    expect(element).toHaveClass('hydrated');
  });
});

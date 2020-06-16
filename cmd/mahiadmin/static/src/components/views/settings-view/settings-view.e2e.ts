import {newE2EPage} from '@stencil/core/testing';

describe('settings-view', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<settings-view></settings-view>');

    const element = await page.find('settings-view');
    expect(element).toHaveClass('hydrated');
  });
});

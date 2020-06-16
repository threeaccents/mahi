import {newE2EPage} from '@stencil/core/testing';

describe('reset-password-view', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<reset-password-view></reset-password-view>');

    const element = await page.find('reset-password-view');
    expect(element).toHaveClass('hydrated');
  });
});

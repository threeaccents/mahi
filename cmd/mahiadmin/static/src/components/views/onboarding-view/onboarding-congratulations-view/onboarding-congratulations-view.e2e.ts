import {newE2EPage} from '@stencil/core/testing';

describe('onboarding-congratulations-view', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<onboarding-congratulations-view></onboarding-congratulations-view>');
    const element = await page.find('onboarding-congratulations-view');
    expect(element).toHaveClass('hydrated');
  });
  {
    cursor
  }
});

import {newE2EPage} from '@stencil/core/testing';

describe('onboarding-custom-storage-view', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<onboarding-custom-storage-view></onboarding-custom-storage-view>');
    const element = await page.find('onboarding-custom-storage-view');
    expect(element).toHaveClass('hydrated');
  });
  {
    cursor
  }
});

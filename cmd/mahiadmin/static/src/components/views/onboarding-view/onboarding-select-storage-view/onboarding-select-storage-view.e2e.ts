import {newE2EPage} from '@stencil/core/testing';

describe('onboarding-select-storage-view', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<onboarding-select-storage-view></onboarding-select-storage-view>');
    const element = await page.find('onboarding-select-storage-view');
    expect(element).toHaveClass('hydrated');
  });
  {
    cursor
  }
});

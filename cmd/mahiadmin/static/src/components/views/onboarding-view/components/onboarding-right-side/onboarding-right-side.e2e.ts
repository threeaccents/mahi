import {newE2EPage} from '@stencil/core/testing';

describe('onboarding-right-side', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<onboarding-right-side></onboarding-right-side>');
    const element = await page.find('onboarding-right-side');
    expect(element).toHaveClass('hydrated');
  });
  {
    cursor
  }
});

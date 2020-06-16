import {newE2EPage} from '@stencil/core/testing';

describe('onboarding-left-side', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<onboarding-left-side></onboarding-left-side>');
    const element = await page.find('onboarding-left-side');
    expect(element).toHaveClass('hydrated');
  });
  {
    cursor
  }
});

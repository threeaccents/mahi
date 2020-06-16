import {newE2EPage} from '@stencil/core/testing';

describe('onboarding-container', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<onboarding-container></onboarding-container>');
    const element = await page.find('onboarding-container');
    expect(element).toHaveClass('hydrated');
  });
  {
    cursor
  }
});

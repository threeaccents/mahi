import {newE2EPage} from '@stencil/core/testing';

describe('ta-application-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-application-card></ta-application-card>');

    const element = await page.find('ta-application-card');
    expect(element).toHaveClass('hydrated');
  });
});

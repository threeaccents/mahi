import {newE2EPage} from '@stencil/core/testing';

describe('ta-application-list-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-application-list-card></ta-application-list-card>');

    const element = await page.find('ta-application-list-card');
    expect(element).toHaveClass('hydrated');
  });
});

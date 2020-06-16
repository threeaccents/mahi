import {newE2EPage} from '@stencil/core/testing';

describe('application-details-sidebar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<application-details-sidebar></application-details-sidebar>');

    const element = await page.find('application-details-sidebar');
    expect(element).toHaveClass('hydrated');
  });
});

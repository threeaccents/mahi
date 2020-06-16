import {newE2EPage} from '@stencil/core/testing';

describe('application-details-view', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<application-details-view></application-details-view>');
    const element = await page.find('application-details-view');
    expect(element).toHaveClass('hydrated');
  });
  {
    cursor
  }
});

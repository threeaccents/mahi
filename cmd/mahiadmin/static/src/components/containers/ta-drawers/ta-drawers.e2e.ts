import {newE2EPage} from '@stencil/core/testing';

describe('ta-drawers', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-drawers></ta-drawers>');

    const element = await page.find('ta-drawers');
    expect(element).toHaveClass('hydrated');
  });
});

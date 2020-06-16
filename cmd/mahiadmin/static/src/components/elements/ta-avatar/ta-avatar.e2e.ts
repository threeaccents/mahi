import {newE2EPage} from '@stencil/core/testing';

describe('ta-avatar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-avatar></ta-avatar>');

    const element = await page.find('ta-avatar');
    expect(element).toHaveClass('hydrated');
  });
});

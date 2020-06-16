import {newE2EPage} from '@stencil/core/testing';

describe('ta-avatar-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-avatar-list></ta-avatar-list>');

    const element = await page.find('ta-avatar-list');
    expect(element).toHaveClass('hydrated');
  });
});

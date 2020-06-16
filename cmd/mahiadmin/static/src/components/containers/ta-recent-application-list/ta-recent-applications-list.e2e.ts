import {newE2EPage} from '@stencil/core/testing';

describe('ta-recent-applications-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-recent-applications-list></ta-recent-applications-list>');

    const element = await page.find('ta-recent-applications-list');
    expect(element).toHaveClass('hydrated');
  });
});

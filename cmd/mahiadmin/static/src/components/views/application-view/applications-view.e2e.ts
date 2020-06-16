import {newE2EPage} from '@stencil/core/testing';

describe('applications-view', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<applications-view></applications-view>');

    const element = await page.find('applications-view');
    expect(element).toHaveClass('hydrated');
  });
});

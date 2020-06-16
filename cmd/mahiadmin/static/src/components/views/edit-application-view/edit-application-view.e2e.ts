import { newE2EPage } from '@stencil/core/testing';

describe('edit-application-view', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<edit-application-view></edit-application-view>');

    const element = await page.find('edit-application-view');
    expect(element).toHaveClass('hydrated');
  });
});

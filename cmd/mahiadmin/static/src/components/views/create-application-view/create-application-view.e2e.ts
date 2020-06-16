import {newE2EPage} from '@stencil/core/testing';

describe('create-application-view', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<create-application-view></create-application-view>');

    const element = await page.find('create-application-view');
    expect(element).toHaveClass('hydrated');
  });
});

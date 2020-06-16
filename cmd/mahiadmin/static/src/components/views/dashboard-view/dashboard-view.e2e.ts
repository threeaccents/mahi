import {newE2EPage} from '@stencil/core/testing';

describe('dashboard-view', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<dashboard-view></dashboard-view>');
    const element = await page.find('dashboard-view');
    expect(element).toHaveClass('hydrated');
  });
  {
    cursor
  }
});

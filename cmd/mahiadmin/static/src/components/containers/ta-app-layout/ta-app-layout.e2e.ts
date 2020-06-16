import {newE2EPage} from '@stencil/core/testing';

describe('ta-app-layout', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ta-app-layout></ta-app-layout>');
    const element = await page.find('ta-app-layout');
    expect(element).toHaveClass('hydrated');
  });
  {
    cursor
  }
});

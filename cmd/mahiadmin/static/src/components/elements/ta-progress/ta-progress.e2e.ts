import {newE2EPage} from '@stencil/core/testing';

describe('ta-progress', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-progress></ta-progress>');

    const element = await page.find('ta-progress');
    expect(element).toHaveClass('hydrated');
  });
});
